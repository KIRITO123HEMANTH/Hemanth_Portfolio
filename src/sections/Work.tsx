import { useState, type ReactNode } from 'react'
import { projects } from '../config/site'
import { useContactIntent } from '../contactIntent'
import type { Project } from '../types'
import ProjectDialog from '../components/ProjectDialog'
import Arrow from '../components/Arrow'
import CafeCraaftVisual from '../visuals/CafeCraaftVisual'
import ChainDiagram from '../visuals/ChainDiagram'
import ZorotoMock from '../visuals/ZorotoMock'

const total = String(projects.length).padStart(2, '0')
const num = (p: Project) => String(projects.indexOf(p) + 1).padStart(2, '0')

function Visual({ project }: { project: Project }): ReactNode {
  const v = project.visual
  switch (v.kind) {
    case 'cafecraaft':
      return <CafeCraaftVisual />
    case 'chain':
      return <ChainDiagram />
    case 'zoroto':
      return <ZorotoMock />
    case 'image':
      return <img src={v.src} alt={v.alt} width={v.width} height={v.height} loading="lazy" decoding="async" />
  }
}

function Links({ project }: { project: Project }) {
  return project.links.map((l) => (
    <a key={l.href} className="link" href={l.href} target="_blank" rel="noopener noreferrer">
      {l.label}
      <span className="visually-hidden"> for {project.title} (opens in a new tab)</span> <Arrow />
    </a>
  ))
}

export default function Work() {
  const [open, setOpen] = useState<Project | null>(null)
  const { requestContact } = useContactIntent()
  const featured = projects.filter((p) => p.featured)
  const more = projects.filter((p) => !p.featured)

  return (
    <section id="work" className="section work" aria-labelledby="work-title">
      <div className="container">
        <p className="section__label">
          <span>02</span> Work
        </p>
        <header className="work__head">
          <h2 id="work-title" className="section__title" data-reveal>
            Selected work <sup>({total})</sup>
          </h2>
          <p className="work__intro" data-reveal>
            From a live studio website to a blockchain research system. Each project says what was built, what I did, and where it
            stands today.
          </p>
        </header>

        {featured.map((p, i) => (
          <article key={p.id} className={`project project--${p.visual.kind} ${i % 2 ? 'project--flip' : ''}`} aria-labelledby={`${p.id}-title`}>
            <div className="project__visual" data-reveal>
              <Visual project={p} />
              {p.visualNote && <p className="project__note">{p.visualNote}</p>}
            </div>
            <div className="project__info" data-reveal>
              <p className="project__num">
                {num(p)} <span>/ {total}</span>
              </p>
              <p className="eyebrow">{p.category}</p>
              <h3 id={`${p.id}-title`} className="project__title">
                {p.title}
              </h3>
              <p className="project__summary">{p.summary}</p>
              <dl className="project__meta">
                <div>
                  <dt>Role</dt>
                  <dd>{p.role}</dd>
                </div>
                <div>
                  <dt>Status</dt>
                  <dd>{p.status}</dd>
                </div>
                <div>
                  <dt>Stack</dt>
                  <dd>{p.stack.slice(0, 5).join(', ')}</dd>
                </div>
              </dl>
              <div className="project__actions">
                <button type="button" className="btn btn--ghost" onClick={() => setOpen(p)}>
                  {p.caseStudyLabel}
                </button>
                {p.contactCta && (
                  <a href="#contact" className="btn btn--accent" onClick={() => requestContact('project', 'Café or restaurant website')}>
                    {p.contactCta} <Arrow />
                  </a>
                )}
              </div>
              <div className="project__links">
                <Links project={p} />
              </div>
            </div>
          </article>
        ))}

        <div className="more">
          <h3 className="more__title">More work</h3>
          <ul className="more__list">
            {more.map((p) => (
              <li key={p.id} className="more__item" data-reveal>
                <div className="more__thumb">
                  <Visual project={p} />
                </div>
                <div className="more__body">
                  <p className="project__num">
                    {num(p)} <span>/ {total}</span>
                  </p>
                  <h4 className="more__name">{p.title}</h4>
                  <p className="eyebrow">{p.category}</p>
                  <p>{p.summary}</p>
                  <ul className="tags">
                    {p.stack.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                  <p className="more__status">{p.status}</p>
                  <div className="project__links">
                    <button type="button" className="link" onClick={() => setOpen(p)}>
                      {p.caseStudyLabel}
                      <span className="visually-hidden"> about {p.title}</span>
                    </button>
                    <Links project={p} />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <ProjectDialog project={open} onClose={() => setOpen(null)} />
    </section>
  )
}
