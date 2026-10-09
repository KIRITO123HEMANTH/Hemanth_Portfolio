import { education, profile } from '../config/site'

export default function About() {
  return (
    <section id="about" className="section about" aria-labelledby="about-title">
      <div className="container">
        <p className="section__label">
          <span>01</span> About
        </p>
        <div className="about__grid">
          <h2 id="about-title" className="section__title about__title" data-reveal>
            Curious by nature.
            <br />
            <em>Builder by practice.</em>
          </h2>

          <div className="about__body prose" data-reveal>
            <p className="about__lead">
              I’m {profile.name}, a Computer Science Engineering student specializing in Blockchain Technology at{' '}
              {education[0].org}.
            </p>
            <p>
              My interests sit where software engineering, thoughtful design and emerging technology meet. I work with modern
              JavaScript to build full-stack applications, explore decentralized systems, and learn how well-designed digital
              products come together.
            </p>
            <p>
              I care about writing code that other people can understand, building experiences that are actually useful, and
              getting a little better at engineering problems with every project.
            </p>
            <p className="muted">Away from the keyboard, I read science books, listen to a lot of music and experiment in the kitchen.</p>
          </div>

          <aside className="about__index" aria-label="Profile at a glance" data-reveal>
            <div className="about__crop" aria-hidden="true">
              <img src={profile.portrait.srcSmall} alt="" width={520} height={520} loading="lazy" decoding="async" />
            </div>
            <dl className="index-list">
              <div>
                <dt>Name</dt>
                <dd>{profile.fullName}</dd>
              </div>
              <div>
                <dt>Roles</dt>
                <dd>{profile.roles.join(' · ')}</dd>
              </div>
              <div>
                <dt>Interested in</dt>
                <dd>{profile.focus.join(', ')}</dd>
              </div>
              <div>
                <dt>Off-screen</dt>
                <dd>{profile.interests.join(', ')}</dd>
              </div>
            </dl>
          </aside>
        </div>
      </div>
    </section>
  )
}
