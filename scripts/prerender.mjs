// Writes the server-rendered app into dist/index.html so content is in the HTML before any JS runs.
import { readFileSync, rmSync, writeFileSync } from 'node:fs'

const { render } = await import('../dist-ssr/entry-server.js')
const file = new URL('../dist/index.html', import.meta.url)
const html = readFileSync(file, 'utf8')
const marker = '<div id="root"></div>'
if (!html.includes(marker)) throw new Error('prerender: #root marker not found in dist/index.html')
writeFileSync(file, html.replace(marker, `<div id="root">${render()}</div>`))
rmSync(new URL('../dist-ssr', import.meta.url), { recursive: true })
console.log('prerender: dist/index.html')
