import { allProjectsUrl, projects } from '../data/portfolio'
import Icon from './Icon'
import ProjectCard from './ProjectCard'
import Reveal from './Reveal'

export default function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="section">
      <div className="container-page">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <h2 id="projects-title" className="section-title">
              Featured projects
            </h2>
            <p className="section-lead">
              A few things I have built and explored, from API-driven apps to an early concept.
            </p>
          </div>
          {allProjectsUrl ? (
            <a href={allProjectsUrl} target="_blank" rel="noreferrer" className="text-link shrink-0">
              View all projects
              <Icon name="arrowUpRight" size={16} />
              <span className="sr-only">(opens GitHub in a new tab)</span>
            </a>
          ) : (
            <span className="shrink-0 text-sm text-subtle">More projects coming soon</span>
          )}
        </Reveal>

        <ul className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => {
            // On two-column tablets, an odd last card spans the row in a side-by-side layout.
            const wide = index === projects.length - 1 && projects.length % 2 === 1
            return (
              <Reveal
                as="li"
                key={project.id}
                step={index}
                className={wide ? 'md:col-span-2 xl:col-span-1' : ''}
              >
                <ProjectCard project={project} wide={wide} />
              </Reveal>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
