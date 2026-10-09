import { services } from '../config/site'
import { useContactIntent } from '../contactIntent'
import Arrow from '../components/Arrow'

export default function Services() {
  const { requestContact } = useContactIntent()
  return (
    <section id="services" className="section services" aria-labelledby="services-title">
      <div className="container">
        <p className="section__label">
          <span>03</span> Services
        </p>
        <div className="services__head">
          <h2 id="services-title" className="section__title" data-reveal>
            What you can
            <br />
            <em>hire me to build.</em>
          </h2>
          <p className="services__intro" data-reveal>
            Freelance work for businesses and individuals. You talk to the person who writes the code, from the first call to
            launch.
          </p>
        </div>

        <ol className="service-list">
          {services.map((s, i) => (
            <li key={s.title} className="service" data-reveal>
              <span className="service__num">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="service__title">{s.title}</h3>
              <p className="service__outcome">{s.outcome}</p>
              <ul className="service__includes">
                {s.includes.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>

        <div className="services__cta" data-reveal>
          <p>Not sure which of these you need? Describe the problem and we’ll work it out together.</p>
          <a href="#contact" className="btn btn--accent" onClick={() => requestContact('project')}>
            Tell me about your project <Arrow />
          </a>
        </div>
      </div>
    </section>
  )
}
