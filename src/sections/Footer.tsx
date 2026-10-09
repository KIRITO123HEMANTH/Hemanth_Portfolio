import { profile, socialLinks } from '../config/site'
import { useContactIntent } from '../contactIntent'
import Arrow from '../components/Arrow'

const SOCIAL = [
  { label: 'GitHub', href: socialLinks.github },
  { label: 'LinkedIn', href: socialLinks.linkedin },
  { label: 'Instagram', href: socialLinks.instagram },
].filter((s) => s.href)

export default function Footer() {
  const { requestContact } = useContactIntent()
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <p className="footer__line">
            Designed with intention.
            <br />
            <em>Built with curiosity.</em>
          </p>
          <a href="#contact" className="btn btn--accent" onClick={() => requestContact('project')}>
            Let’s talk <Arrow />
          </a>
        </div>
        <div className="footer__grid">
          <div>
            <p className="footer__name">{profile.name}</p>
            <p className="muted">{profile.roles[0]} building websites, web applications and interactive experiences.</p>
          </div>
          <ul className="footer__social" aria-label="Elsewhere">
            {socialLinks.email && (
              <li>
                <a className="link" href={`mailto:${socialLinks.email}`}>
                  Email
                </a>
              </li>
            )}
            {SOCIAL.map((s) => (
              <li key={s.label}>
                <a className="link" href={s.href} target="_blank" rel="noopener noreferrer">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
          <a className="footer__top-link link" href="#home">
            Back to top <Arrow className="arrow--up" />
          </a>
        </div>
        <p className="footer__legal">
          © {new Date().getFullYear()} {profile.fullName}
        </p>
      </div>
    </footer>
  )
}
