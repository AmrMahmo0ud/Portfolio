import { about } from '../data/portfolio'
import Icon from './Icon'
import Reveal from './Reveal'

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="section">
      <div className="container-page grid gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
        <Reveal>
          <h2 id="about-title" className="section-title">
            About me
          </h2>
          <p className="mt-8 max-w-[36rem] text-[clamp(1.2rem,1.05rem+0.6vw,1.45rem)] leading-[1.55] tracking-[-0.01em] text-text">
            {about.intro}
          </p>
        </Reveal>

        <ul className="grid gap-px overflow-hidden rounded-[var(--radius-lg)] border border-line bg-line sm:grid-cols-2">
          {about.highlights.map((item, index) => (
            <Reveal
              as="li"
              key={item.id}
              step={index}
              className="group bg-bg p-7 transition-colors duration-300 hover:bg-surface sm:p-8"
            >
              <span className="inline-grid size-11 place-items-center rounded-[var(--radius-md)] border border-line-strong bg-surface text-accent transition-transform duration-300 group-hover:-translate-y-0.5">
                <Icon name={item.icon} size={20} />
              </span>
              <h3 className="mt-6 text-lg font-semibold tracking-[-0.015em]">{item.title}</h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{item.description}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
