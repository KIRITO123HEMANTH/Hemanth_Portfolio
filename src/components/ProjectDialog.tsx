import { useEffect, useRef } from 'react'
import type { Project } from '../types'
import Arrow from './Arrow'

/** Case study in a native modal <dialog>: focus trapping, Esc and focus return come from the browser. */
export default function ProjectDialog({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const d = ref.current
    if (project && d && !d.open) d.showModal()
  }, [project])

  return (
    <dialog
      ref={ref}
      className="case"
      aria-labelledby="case-title"
      onClose={onClose}
      onClick={(e) => e.target === ref.current && ref.current.close()}
    >
      {project && (
        <article className="case__inner">
          <header className="case__head">
            <p className="eyebrow">{project.category}</p>
            <button type="button" className="case__close" onClick={() => ref.current?.close()}>
              Close
            </button>
          </header>
          <h2 id="case-title" className="case__title">
            {project.title}
          </h2>
          <p className="case__status">
            <span className="status__dot" aria-hidden="true" /> {project.status}
          </p>

          <div className="case__cols">
            <section>
              <h3>The goal</h3>
              <p>{project.goal}</p>
            </section>
            <section>
              <h3>The approach</h3>
              <p>{project.approach}</p>
            </section>
            <section>
              <h3>My contribution</h3>
              <p>{project.contribution}</p>
            </section>
            <section>
              <h3>Highlights</h3>
              <ul>
                {project.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </section>
            {project.nextSteps && (
              <section>
                <h3>What I’d build next</h3>
                <ul>
                  {project.nextSteps.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              </section>
            )}
            <section>
              <h3>Stack</h3>
              <ul className="tags">
                {project.stack.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </section>
          </div>

          {project.note && <p className="case__note">{project.note}</p>}

          {project.links.length > 0 && (
            <p className="case__links">
              {project.links.map((l) => (
                <a key={l.href} className="btn btn--ghost btn--small" href={l.href} target="_blank" rel="noopener noreferrer">
                  {l.label} <Arrow />
                </a>
              ))}
            </p>
          )}
        </article>
      )}
    </dialog>
  )
}
