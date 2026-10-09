import { profile, siteConfig } from '../config/site'
import { useContactIntent } from '../contactIntent'
import HeroStage from '../components/HeroStage'
import Arrow from '../components/Arrow'

export default function Hero() {
  const { requestContact } = useContactIntent()
  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <div className="container hero__grid">
        <div className="hero__copy">
          <p className="eyebrow hero__eyebrow">
            <span>Independent developer</span>
            <span aria-hidden="true">/</span>
            <span>{profile.location}</span>
          </p>
          <h1 id="hero-title" className="hero__title">
            <span className="line">I build digital</span> <span className="line">experiences that</span>{' '}
            <span className="line">
              <em>mean business.</em>
            </span>
          </h1>
          <p className="hero__lede">
            I’m {profile.firstName}, a full-stack developer building thoughtful websites, useful applications and interactive
            digital experiences, for businesses that want to be found and teams that want to ship.
          </p>
          <div className="hero__actions">
            <a href="#contact" className="btn btn--accent" onClick={() => requestContact('project')}>
              Start a project <Arrow />
            </a>
            <a href="#work" className="btn btn--ghost">
              Explore my work
            </a>
          </div>
          <div className="hero__aside">
            {siteConfig.availability.show && (
              <p className="status">
                <span className="status__dot" aria-hidden="true" />
                {siteConfig.availability.label}
              </p>
            )}
            {siteConfig.resumeUrl && (
              <a className="link" href={siteConfig.resumeUrl} target="_blank" rel="noopener">
                View résumé <Arrow />
              </a>
            )}
          </div>
        </div>

        <div className="hero__visual">
          <HeroStage />
          <figure className="portrait">
            <div className="portrait__frame">
              <img
                src={profile.portrait.srcSmall}
                srcSet={`${profile.portrait.srcSmall} 520w, ${profile.portrait.src} 1000w`}
                sizes="(max-width: 899px) 44vw, 20vw"
                width={520}
                height={520}
                alt={profile.portrait.alt}
                fetchPriority="high"
                decoding="async"
              />
            </div>
            <figcaption>
              <span>{profile.name}</span>
              <span>{profile.roles[0]}</span>
            </figcaption>
          </figure>
        </div>
      </div>

      <dl className="container hero__meta">
        <div>
          <dt>Focus</dt>
          <dd>Full-stack &amp; creative web</dd>
        </div>
        <div>
          <dt>Study</dt>
          <dd>CSE, Blockchain Technology</dd>
        </div>
        <div>
          <dt>Based in</dt>
          <dd>{profile.location}, working remotely</dd>
        </div>
      </dl>
    </section>
  )
}
