import { useCallback, useMemo, useState } from 'react'
import { ContactIntentContext, type ContactIntent } from './contactIntent'
import type { ContactPath } from './types'
import { useReveal } from './hooks/useReveal'
import Nav from './components/Nav'
import Hero from './sections/Hero'
import About from './sections/About'
import Work from './sections/Work'
import Services from './sections/Services'
import Skills from './sections/Skills'
import Education from './sections/Education'
import Contact from './sections/Contact'
import Footer from './sections/Footer'

export default function App() {
  const [intent, setIntent] = useState<ContactIntent>({ path: 'project', nonce: 0 })
  const requestContact = useCallback((path: ContactPath, type?: string) => setIntent((i) => ({ path, type, nonce: i.nonce + 1 })), [])
  const value = useMemo(() => ({ intent, requestContact }), [intent, requestContact])
  useReveal()

  return (
    <ContactIntentContext.Provider value={value}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <About />
        <Work />
        <Services />
        <Skills />
        <Education />
        <Contact />
      </main>
      <Footer />
    </ContactIntentContext.Provider>
  )
}
