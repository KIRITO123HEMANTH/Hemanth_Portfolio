/**
 * "The stack": four layers of a product — data, logic, interface, experience — drawn as an
 * exploded, isometric wireframe. Signals travel up through the layers. Pointer tilts it,
 * hero scroll pulls the layers apart.
 *
 * Kept to 5 draw calls: everything is built in unit-gap space (layer i at y = i) inside one
 * group, so "exploding" is just scaling that group in Y (all layer content is flat in XZ).
 */
import {
  BufferGeometry,
  Color,
  Float32BufferAttribute,
  Group,
  LineBasicMaterial,
  LineSegments,
  PerspectiveCamera,
  Points,
  PointsMaterial,
  Scene,
  WebGLRenderer,
} from 'three'
import { EXPLODE, GAP, LAYERS, buildLayers } from './stackGeometry'

export type StackOptions = { reducedMotion: boolean; lowPower: boolean; ink: string; accent: string }

export function createStackScene(canvas: HTMLCanvasElement, opts: StackOptions) {
  const renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'low-power' })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, opts.lowPower ? 1.5 : 2))
  renderer.setClearColor(0x000000, 0)

  const scene = new Scene()
  const camera = new PerspectiveCamera(28, 1, 0.1, 100)
  camera.position.set(0, 0, 16.5)

  const root = new Group()
  root.rotation.set(0.58, -0.72, 0)
  scene.add(root)

  const stack = new Group()
  stack.position.y = -((LAYERS - 1) / 2) * GAP
  root.add(stack)

  const ink = new Color(opts.ink)
  const accent = new Color(opts.accent)
  const geo = buildLayers(opts.lowPower)

  const line = (positions: number[], color: Color, opacity: number) => {
    const g = new BufferGeometry()
    g.setAttribute('position', new Float32BufferAttribute(positions, 3))
    return new LineSegments(g, new LineBasicMaterial({ color, transparent: true, opacity, depthWrite: false }))
  }
  const points = (positions: number[], color: Color, size: number, opacity: number) => {
    const g = new BufferGeometry()
    g.setAttribute('position', new Float32BufferAttribute(positions, 3))
    return new Points(g, new PointsMaterial({ color, size, sizeAttenuation: false, transparent: true, opacity, depthWrite: false }))
  }

  const dpr = renderer.getPixelRatio()
  stack.add(line(geo.edges, ink, 0.62))
  stack.add(line(geo.details, ink, 0.24))
  stack.add(line(geo.accent, accent, 0.95))
  stack.add(points(geo.nodes, ink, 2.6 * dpr, 0.85))

  // Signals: each rides one vertical connector from its bottom to top, then restarts.
  const pulseCount = geo.connectors.length
  const pulsePositions = new Float32Array(pulseCount * 3)
  const pulseGeo = new BufferGeometry()
  pulseGeo.setAttribute('position', new Float32BufferAttribute(pulsePositions, 3))
  const pulses = new Points(pulseGeo, new PointsMaterial({ color: accent, size: 6 * dpr, sizeAttenuation: false, transparent: true, depthWrite: false }))
  stack.add(pulses)
  const phase = geo.connectors.map((_, i) => (i * 0.618) % 1)

  const placePulses = (time: number) => {
    geo.connectors.forEach((c, i) => {
      const t = (phase[i] + time * c.speed) % 1
      pulsePositions[i * 3] = c.x
      pulsePositions[i * 3 + 1] = c.y0 + (c.y1 - c.y0) * t
      pulsePositions[i * 3 + 2] = c.z
    })
    pulseGeo.attributes.position.needsUpdate = true
  }

  // Animated state, eased towards targets each frame.
  const pointer = { x: 0, y: 0, tx: 0, ty: 0 }
  let gap = GAP
  let gapTarget = GAP
  let raf = 0
  let running = false
  let start = performance.now()

  const frame = (now: number) => {
    const time = (now - start) / 1000
    const ease = opts.reducedMotion ? 1 : 0.06
    pointer.x += (pointer.tx - pointer.x) * ease
    pointer.y += (pointer.ty - pointer.y) * ease
    gap += (gapTarget - gap) * (opts.reducedMotion ? 1 : 0.08)

    const idle = opts.reducedMotion ? 0 : Math.sin(time * 0.18) * 0.07
    root.rotation.y = -0.72 + idle + pointer.x * 0.32
    root.rotation.x = 0.58 + pointer.y * 0.14
    stack.scale.y = gap
    stack.position.y = -((LAYERS - 1) / 2) * gap
    placePulses(opts.reducedMotion ? 0.35 : time)
    renderer.render(scene, camera)
  }

  const loop = (now: number) => {
    frame(now)
    if (running) raf = requestAnimationFrame(loop)
  }

  return {
    /** Starts the render loop (no-op with reduced motion: we only draw on demand). */
    start() {
      if (running || opts.reducedMotion) return
      running = true
      raf = requestAnimationFrame(loop)
    },
    stop() {
      running = false
      cancelAnimationFrame(raf)
    },
    renderOnce() {
      frame(performance.now())
    },
    resize(width: number, height: number) {
      renderer.setSize(width, height, false)
      camera.aspect = width / height
      // Keep the whole stack in frame on tall/narrow canvases.
      camera.position.z = width / height < 1 ? 16.5 / Math.max(width / height, 0.7) : 16.5
      camera.updateProjectionMatrix()
      if (!running) frame(performance.now())
    },
    /** x, y in -1..1 */
    setPointer(x: number, y: number) {
      pointer.tx = x
      pointer.ty = y
    },
    /** 0..1 — how far the layers are pulled apart. */
    setExplode(p: number) {
      gapTarget = GAP + p * EXPLODE
      if (opts.reducedMotion && !running) frame(performance.now())
    },
    dispose() {
      this.stop()
      scene.traverse((o) => {
        if (o instanceof LineSegments || o instanceof Points) {
          o.geometry.dispose()
          ;(o.material as LineBasicMaterial | PointsMaterial).dispose()
        }
      })
      renderer.dispose()
    },
  }
}

export type StackScene = ReturnType<typeof createStackScene>
