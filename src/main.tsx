import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App'
import './styles/global.css'

// Scroll reveals only hide content once we know JS is running (see [data-reveal] in global.css).
document.documentElement.classList.add('js')

const root = document.getElementById('root')!
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)
// Production HTML is prerendered (scripts/prerender.mjs); dev starts empty.
if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)
