import { useEffect, useRef, useState } from 'react'
import { D, GAP, LAYERS, LAYER_NAMES, W, buildLayers } from '../scene/stackGeometry'

const INK = '#f3f0e9'
const ACCENT = '#c6f24e'

/** Static isometric drawing of the same stack: shown before WebGL loads, and instead of it when unavailable. */
function StackFallback() {
  const { edges, accent } = buildLayers(true)
  const [rx, ry] = [0.58, -0.72]
  const project = (x: number, y: number, z: number): [number, number] => {
    y = (y - (LAYERS - 1) / 2) * GAP
    const x1 = x * Math.cos(ry) + z * Math.sin(ry)
    const z1 = -x * Math.sin(ry) + z * Math.cos(ry)
    const y2 = y * Math.cos(rx) - z1 * Math.sin(rx)
    return [x1, -y2]
  }
  const path = (seg: number[]) => {
    let d = ''
    for (let i = 0; i < seg.length; i += 6) {
      const [ax, ay] = project(seg[i], seg[i + 1], seg[i + 2])
      const [bx, by] = project(seg[i + 3], seg[i + 4], seg[i + 5])
      d += `M${ax.toFixed(3)} ${ay.toFixed(3)}L${bx.toFixed(3)} ${by.toFixed(3)}`
    }
    return d
  }
  const s = Math.max(W, D) * 1.05
  return (
    <svg className="stage__fallback" viewBox={`${-s} ${-s} ${s * 2} ${s * 2}`} aria-hidden="true">
      <path d={path(edges)} stroke={INK} strokeOpacity="0.55" strokeWidth="0.012" fill="none" />
      <path d={path(accent)} stroke={ACCENT} strokeWidth="0.016" fill="none" />
    </svg>
  )
}

/** Probe without keeping a context alive (and without three.js logging errors when WebGL is off). */
function hasWebGL() {
  const c = document.createElement('canvas')
  const gl = c.getContext('webgl2') ?? c.getContext('webgl')
  gl?.getExtension('WEBGL_lose_context')?.loseContext()
  return !!gl
}

export default function HeroStage() {
  const wrap = useRef<HTMLDivElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const el = wrap.current
    const cv = canvas.current
    if (!el || !cv || !hasWebGL()) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const lowPower = window.innerWidth < 768 || (navigator.hardwareConcurrency ?? 8) <= 4
    const finePointer = window.matchMedia('(pointer: fine)').matches
    let disposed = false
    const cleanups: (() => void)[] = []

    // Load three.js after the page is interactive so it never competes with the content.
    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 200))
    const boot = () => idle(async () => {
      let scene: import('../scene/stackScene').StackScene
      try {
        const { createStackScene } = await import('../scene/stackScene')
        if (disposed) return
        scene = createStackScene(cv, { reducedMotion, lowPower, ink: INK, accent: ACCENT })
      } catch {
        return // No WebGL, or the chunk failed to load: the static drawing stays.
      }

      const ro = new ResizeObserver(([e]) => scene.resize(e.contentRect.width, e.contentRect.height))
      ro.observe(el)

      let visible = true
      const io = new IntersectionObserver(([e]) => {
        visible = e.isIntersecting
        if (visible && !document.hidden) scene.start()
        else scene.stop()
      })
      io.observe(el)
      const onVisibility = () => (document.hidden || !visible ? scene.stop() : scene.start())
      document.addEventListener('visibilitychange', onVisibility)

      const onPointer = (e: PointerEvent) => scene.setPointer((e.clientX / window.innerWidth) * 2 - 1, (e.clientY / window.innerHeight) * 2 - 1)
      if (finePointer && !reducedMotion) window.addEventListener('pointermove', onPointer, { passive: true })

      const onScroll = () => scene.setExplode(Math.min(1, Math.max(0, window.scrollY / (window.innerHeight * 0.8))))
      window.addEventListener('scroll', onScroll, { passive: true })
      onScroll()

      scene.renderOnce()
      setReady(true)
      cleanups.push(() => {
        ro.disconnect()
        io.disconnect()
        document.removeEventListener('visibilitychange', onVisibility)
        window.removeEventListener('pointermove', onPointer)
        window.removeEventListener('scroll', onScroll)
        scene.dispose()
      })
    })

    // Phones and low-core devices wait for the first interaction, so the static drawing carries first paint.
    if (lowPower) {
      const events = ['pointerdown', 'scroll', 'keydown'] as const
      const go = () => {
        events.forEach((e) => window.removeEventListener(e, go))
        boot()
      }
      events.forEach((e) => window.addEventListener(e, go, { passive: true }))
      cleanups.push(() => events.forEach((e) => window.removeEventListener(e, go)))
    } else boot()

    return () => {
      disposed = true
      cleanups.forEach((c) => c())
    }
  }, [])

  return (
    <figure className={`stage ${ready ? 'is-ready' : ''}`} aria-label="Figure 01: an exploded view of a digital product, layer by layer">
      <div className="stage__canvas" ref={wrap}>
        <StackFallback />
        <canvas ref={canvas} aria-hidden="true" />
      </div>
      <ol className="stage__legend" aria-label="Layers, bottom to top">
        {LAYER_NAMES.map((n, i) => (
          <li key={n}>
            <span>0{i + 1}</span> {n}
          </li>
        ))}
      </ol>
    </figure>
  )
}
