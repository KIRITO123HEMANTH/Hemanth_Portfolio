/**
 * Plain-number geometry for the hero stack. No three.js import, so the static SVG fallback can
 * draw the exact same composition without loading WebGL code.
 * Units: layer i sits at y = i. Each layer is a W × D plane in XZ.
 */
export const LAYERS = 4
/** Resting distance between layers; scroll pulls them up to GAP + EXPLODE. */
export const GAP = 1.4
export const EXPLODE = 0.5
export const W = 4.4
export const D = 3
export const LAYER_NAMES = ['Data', 'Logic', 'Interface', 'Experience']

type Vec = [number, number, number]
export type Connector = { x: number; z: number; y0: number; y1: number; speed: number }

const hx = W / 2
const hz = D / 2

function rect(out: number[], y: number, x0: number, z0: number, x1: number, z1: number) {
  const c: Vec[] = [[x0, y, z0], [x1, y, z0], [x1, y, z1], [x0, y, z1]]
  for (let i = 0; i < 4; i++) out.push(...c[i], ...c[(i + 1) % 4])
}

// Logic layer graph (x, z) — also where vertical connectors run.
const NODES: [number, number][] = [[-1.5, -0.8], [-0.5, -1.0], [0.6, -0.6], [1.6, -0.9], [-1.2, 0.5], [0.0, 0.3], [1.1, 0.7], [-0.2, 1.1]]
const LINKS: [number, number][] = [[0, 1], [1, 2], [2, 3], [0, 4], [4, 5], [1, 5], [5, 2], [5, 6], [2, 6], [3, 6], [4, 7], [7, 5], [7, 6]]

export function buildLayers(lowPower: boolean) {
  const edges: number[] = []
  const details: number[] = []
  const accent: number[] = []
  const nodes: number[] = []

  // Plane outlines; the top (experience) layer is the accent.
  for (let i = 0; i < LAYERS; i++) rect(i === LAYERS - 1 ? accent : edges, i, -hx, -hz, hx, hz)

  // 0 — Data: a field of records plus table rules.
  const cols = lowPower ? 6 : 9
  const rows = lowPower ? 4 : 6
  for (let c = 0; c < cols; c++)
    for (let r = 0; r < rows; r++) nodes.push(-hx + 0.45 + (c * (W - 0.9)) / (cols - 1), 0, -hz + 0.4 + (r * (D - 0.8)) / (rows - 1))
  for (const z of [-0.55, 0.55]) details.push(-hx, 0, z, hx, 0, z)

  // 1 — Logic: a small service graph.
  for (const [x, z] of NODES) nodes.push(x, 1, z)
  for (const [a, b] of LINKS) details.push(NODES[a][0], 1, NODES[a][1], NODES[b][0], 1, NODES[b][1])

  // 2 — Interface: header, sidebar, content cards and text lines.
  rect(details, 2, -hx + 0.25, -hz + 0.25, hx - 0.25, -hz + 0.6)
  rect(details, 2, -hx + 0.25, -hz + 0.8, -hx + 1.2, hz - 0.25)
  rect(details, 2, -hx + 1.45, -hz + 0.8, 0.35, 0.35)
  rect(details, 2, 0.55, -hz + 0.8, hx - 0.25, 0.35)
  for (const z of [0.65, 0.85, 1.05]) details.push(-hx + 1.45, 2, z, z === 1.05 ? 0.4 : hx - 0.6, 2, z)

  // 3 — Experience: one confident curve across the surface.
  const steps = 48
  for (let s = 0; s < steps; s++) {
    const x0 = -hx + 0.3 + (s / steps) * (W - 0.6)
    const x1 = -hx + 0.3 + ((s + 1) / steps) * (W - 0.6)
    const z = (x: number) => Math.sin(x * 1.35) * 0.75
    accent.push(x0, 3, z(x0), x1, 3, z(x1))
  }

  // Corner rules tie the layers together like an architectural section.
  for (const [x, z] of [[-hx, -hz], [hx, -hz], [hx, hz], [-hx, hz]])
    for (let i = 0; i < LAYERS - 1; i++)
      for (let d = 0; d < 6; d++) details.push(x, i + d / 6, z, x, i + d / 6 + 1 / 12, z)

  // Vertical connectors from data up to experience through selected logic nodes.
  const connectors: Connector[] = [0, 2, 3, 5, 7].map((n, i) => ({ x: NODES[n][0], z: NODES[n][1], y0: 0, y1: 3, speed: 0.11 + i * 0.023 }))
  for (const c of connectors) details.push(c.x, c.y0, c.z, c.x, c.y1, c.z)

  return { edges, details, accent, nodes, connectors }
}
