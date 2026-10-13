import Icon from './Icon'
import ProjectMockup from './ProjectMockup'

/**
 * A link button that degrades to a visibly disabled placeholder when the
 * project has no URL yet, so the page never ships a broken link.
 */
function ProjectLink({ href, variant, icon, children }) {
  const className = `btn btn-sm ${variant === 'primary' ? 'btn-primary' : 'btn-ghost'}`

  if (!href) {
    return (
      <span className={className} aria-disabled="true" title="Link not added yet">
        {icon && <Icon name={icon} size={16} />}
        {children}
        <span className="sr-only">(link not added yet)</span>
      </span>
    )
  }

  return (
    <a href={href} target="_blank" rel="noreferrer" className={className}>
      {icon && <Icon name={icon} size={16} />}
      {children}
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  )
}

export default function ProjectCard({ project, wide = false }) {
  const titleId = `project-${project.id}`
  return (
    <article
      aria-labelledby={titleId}
      className={`group flex h-full flex-col overflow-hidden ${wide ? 'md:max-xl:grid md:max-xl:grid-cols-2' : ''} rounded-[var(--radius-lg)] border border-line bg-surface transition-[border-color,transform,box-shadow] duration-300 ease-[var(--ease-out-quart)] hover:-translate-y-1 hover:border-line-strong hover:shadow-[0_30px_60px_-30px_#000,0_0_0_1px_#c5f82a14]`}
    >
      <ProjectMockup type={project.mockup} wide={wide} />

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <h3 id={titleId} className="text-[1.3rem] leading-snug font-semibold tracking-[-0.02em]">
            {project.title}
          </h3>
          {project.status && (
            <span className="mt-1 shrink-0 rounded-full border border-accent/40 bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent">
              {project.status}
            </span>
          )}
        </div>
        <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">{project.description}</p>

        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies">
          {project.tags.map((tag) => (
            <li key={tag} className="tag">
              {tag}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap gap-2.5 pt-7">
          <ProjectLink href={project.primaryUrl} variant="primary" icon="arrowUpRight">
            {project.primaryLabel}
          </ProjectLink>
          <ProjectLink href={project.repoUrl} variant="ghost" icon="github">
            GitHub Repository
          </ProjectLink>
        </div>
      </div>
    </article>
  )
}
