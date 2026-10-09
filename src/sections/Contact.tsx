import { socialLinks } from '../config/site'
import { useContactIntent } from '../contactIntent'
import ContactForm from '../components/ContactForm'
import Arrow from '../components/Arrow'

export default function Contact() {
  const { requestContact } = useContactIntent()
  // After the anchor jump, so the browser's fragment navigation doesn't take focus back.
  const focusForm = () => requestAnimationFrame(() => document.getElementById('f-name')?.focus({ preventScroll: true }))

  return (
    <section id="contact" className="section contact" aria-labelledby="contact-title">
      <div className="container">
        <p className="section__label">
          <span>06</span> Contact
        </p>
        <h2 id="contact-title" className="contact__title" data-reveal>
          Have something
          <br />
          <em>worth building?</em>
        </h2>
        <div className="contact__grid">
          <div className="contact__side">
            <p className="contact__lede">
              Whether you’re planning a website for your business or exploring a software development opportunity, I’d be happy
              to hear from you.
            </p>
            <div className="contact__paths">
              <div className="contact__path">
                <p className="eyebrow">A — For businesses</p>
                <p>Websites, landing pages, web apps and improvements to the site you already have.</p>
                <a href="#contact-form" className="link" onClick={() => (requestContact('project'), focusForm())}>
                  Start a project <Arrow />
                </a>
              </div>
              <div className="contact__path">
                <p className="eyebrow">B — For teams & recruiters</p>
                <p>Full-time roles, internships and engineering opportunities.</p>
                <a href="#contact-form" className="link" onClick={() => (requestContact('opportunity'), focusForm())}>
                  Discuss an opportunity <Arrow />
                </a>
              </div>
            </div>
            <ul className="contact__direct" aria-label="Other ways to reach me">
              {socialLinks.email && (
                <li>
                  <span>Email</span>
                  <a className="link" href={`mailto:${socialLinks.email}`}>
                    {socialLinks.email}
                  </a>
                </li>
              )}
              {socialLinks.linkedin && (
                <li>
                  <span>LinkedIn</span>
                  <a className="link" href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                    hemanthkirito2723 <Arrow />
                  </a>
                </li>
              )}
              {socialLinks.github && (
                <li>
                  <span>GitHub</span>
                  <a className="link" href={socialLinks.github} target="_blank" rel="noopener noreferrer">
                    KIRITO123HEMANTH <Arrow />
                  </a>
                </li>
              )}
              {socialLinks.instagram && (
                <li>
                  <span>Instagram</span>
                  <a className="link" href={socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                    Instagram <Arrow />
                  </a>
                </li>
              )}
            </ul>
          </div>
          <div id="contact-form" className="contact__form">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}
