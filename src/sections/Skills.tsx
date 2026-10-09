import { skills } from '../config/site'

export default function Skills() {
  return (
    <section id="skills" className="section skills" aria-labelledby="skills-title">
      <div className="container">
        <p className="section__label">
          <span>04</span> Skills
        </p>
        <div className="skills__head">
          <h2 id="skills-title" className="section__title" data-reveal>
            Technical index
          </h2>
          <p className="skills__intro" data-reveal>
            No percentages. Instead: what I work with, and which project you can see it in.
          </p>
        </div>
        <dl className="skill-table">
          {skills.map((g) => (
            <div key={g.label} className="skill-row" data-reveal>
              <dt>{g.label}</dt>
              <dd>
                <ul>
                  {g.items.map((s) => (
                    <li key={s.name}>
                      <span className="skill-name">{s.name}</span>
                      {s.usedIn && <span className="skill-used">{s.usedIn}</span>}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
