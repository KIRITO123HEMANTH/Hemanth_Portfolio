import { useEffect, useRef, useState } from 'react'
import { profile } from '../config/site'
import { useContactIntent } from '../contactIntent'
import { useActiveSection } from '../hooks/useActiveSection'

const LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'services', label: 'Services' },
  { id: 'contact', label: 'Contact' },
]
const IDS = LINKS.map((l) => l.id)

export default function Nav() {
  const active = useActiveSection(IDS)
  const { requestContact } = useContactIntent()
  const [scrolled, setScrolled] = useState(false)
  const menu = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile menu if the viewport grows past the breakpoint.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 900px)')
    const onChange = () => mq.matches && menu.current?.close()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const close = () => menu.current?.close()

  const links = (onPick?: () => void) =>
    LINKS.map((l) => (
      <li key={l.id}>
        <a href={`#${l.id}`} aria-current={active === l.id ? 'true' : undefined} onClick={onPick}>
          {l.label}
        </a>
      </li>
    ))

  return (
    <header className={`nav ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="nav__inner container">
        <a href="#home" className="nav__logo" aria-label={`${profile.initials}, ${profile.name}, home`}>
          <span aria-hidden="true">{profile.initials}</span>
        </a>
        <nav aria-label="Primary" className="nav__primary">
          <ul>{links()}</ul>
        </nav>
        <a href="#contact" className="btn btn--small btn--accent nav__cta" onClick={() => requestContact('project')}>
          Start a project
        </a>
        <button type="button" className="nav__toggle" aria-haspopup="dialog" onClick={() => menu.current?.showModal()}>
          Menu
        </button>
      </div>

      <dialog ref={menu} className="menu" aria-label="Site menu" onClick={(e) => e.target === menu.current && close()}>
        <div className="menu__inner">
          <div className="menu__top">
            <span className="nav__logo" aria-hidden="true">
              <span>{profile.initials}</span>
            </span>
            <button type="button" className="nav__toggle" onClick={close} autoFocus>
              Close
            </button>
          </div>
          <nav aria-label="Mobile">
            <ul className="menu__links">{links(close)}</ul>
          </nav>
          <a
            href="#contact"
            className="btn btn--accent menu__cta"
            onClick={() => {
              requestContact('project')
              close()
            }}
          >
            Start a project
          </a>
        </div>
      </dialog>
    </header>
  )
}
