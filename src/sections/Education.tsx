import { achievements, certifications, education, experience, siteConfig } from '../config/site'
import type { Entry } from '../types'
import Arrow from '../components/Arrow'

function Record({ title, entries }: { title: string; entries: Entry[] }) {
  if (!entries.length) return null
  return (
    <div className="record" data-reveal>
      <h3 className="record__label">{title}</h3>
      <ul>
        {entries.map((e) => (
          <li key={e.title + e.org} className="record__entry">
            <p className="record__title">{e.title}</p>
            <p className="record__org">{e.org}</p>
            {e.detail && <p className="record__detail">{e.detail}</p>}
            {e.dates && <p className="record__dates">{e.dates}</p>}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Education() {
  return (
    <section id="education" className="section education" aria-labelledby="education-title">
      <div className="container">
        <p className="section__label">
          <span>05</span> Background
        </p>
        <div className="education__grid">
          <h2 id="education-title" className="section__title" data-reveal>
            Education
            {experience.length > 0 && <> &amp; experience</>}
          </h2>
          <div className="education__records">
            <Record title="Experience" entries={experience} />
            <Record title="Education" entries={education} />
            <Record title="Certifications" entries={certifications} />
            <Record title="Achievements" entries={achievements} />
            {siteConfig.resumeUrl && (
              <a className="btn btn--ghost" href={siteConfig.resumeUrl} target="_blank" rel="noopener" data-reveal>
                Download résumé (PDF) <Arrow />
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
