import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

// Emits robots.txt and sitemap.xml for the configured domain, so they never drift from VITE_SITE_URL.
function seoFiles(siteUrl: string): Plugin {
  return {
    name: 'seo-files',
    apply: 'build',
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n` })
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${siteUrl}/</loc><lastmod>${new Date().toISOString().slice(0, 10)}</lastmod></url>\n</urlset>\n`,
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  if (!env.VITE_SITE_URL) throw new Error('VITE_SITE_URL is not set (see .env)')
  return {
    plugins: [react(), seoFiles(env.VITE_SITE_URL.replace(/\/$/, ''))],
    // three.js (~130 kB gzip) is its own chunk, loaded after the page is idle — the size is expected.
    build: { chunkSizeWarningLimit: 600 },
  }
})
