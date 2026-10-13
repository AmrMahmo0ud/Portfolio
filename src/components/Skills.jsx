import { skillGroups } from '../data/portfolio'
import Reveal from './Reveal'

export default function Skills() {
  const [primary, ...secondary] = skillGroups

  return (
    <section id="skills" aria-labelledby="skills-title" className="section">
      <div className="container-page">
        <Reveal className="max-w-2xl">
          <h2 id="skills-title" className="section-title">
            Skills &amp; tools
          </h2>
          <p className="section-lead">
            The languages, frameworks, and tools I use to design and build for the web.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
          <SkillGroup group={primary} featured />
          <div className="grid gap-5">
            {secondary.map((group, index) => (
              <SkillGroup key={group.id} group={group} step={index + 1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function SkillGroup({ group, featured = false, step = 0 }) {
  const headingId = `skills-${group.id}`
  return (
    <Reveal
      step={step}
      className={`relative overflow-hidden rounded-[var(--radius-lg)] border border-line bg-surface p-7 sm:p-9 ${
        featured ? 'lg:flex lg:flex-col lg:justify-between' : ''
      }`}
    >
      {featured && (
        <div
          className="pointer-events-none absolute -top-24 -right-24 size-64 rounded-full bg-accent/10 blur-3xl"
          aria-hidden="true"
        />
      )}
      <div className="relative">
        <h3 id={headingId} className="text-xl font-semibold tracking-[-0.02em]">
          {group.title}
        </h3>
        <p className="mt-1.5 text-[0.95rem] text-muted">{group.description}</p>
      </div>
      <ul aria-labelledby={headingId} className={`relative flex flex-wrap gap-2.5 ${featured ? 'mt-10' : 'mt-7'}`}>
        {group.skills.map((skill) => (
          <li key={skill} className="skill-badge">
            {skill}
          </li>
        ))}
      </ul>
    </Reveal>
  )
}
