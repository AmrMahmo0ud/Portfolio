import { profile } from '../data/portfolio'
import Icon from './Icon'
import Monogram from './Monogram'

// Read once when the page loads; the copyright year can't change mid-visit in practice.
const year = new Date().getFullYear()

export default function Footer() {
  const socials = [
    { id: 'github', label: 'GitHub', href: profile.githubUrl },
    { id: 'linkedin', label: 'LinkedIn', href: profile.linkedinUrl },
  ].filter((social) => social.href)

  return (
    <footer className="border-t border-line">
      <div className="container-page flex flex-col gap-8 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Monogram />
          <p className="text-sm text-muted">
            © {year} {profile.name}. Built with React.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {socials.map((social) => (
            <a
              key={social.id}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              aria-label={`${social.label} (opens in a new tab)`}
              className="inline-grid size-11 place-items-center rounded-full border border-line text-muted transition-colors hover:border-line-strong hover:text-text"
            >
              <Icon name={social.id} size={18} />
            </a>
          ))}
          <a
            href="#home"
            className="ml-2 inline-flex min-h-11 items-center gap-2 rounded-full border border-line px-4 text-sm text-muted transition-colors hover:border-accent/60 hover:text-accent"
          >
            Back to top
            <Icon name="arrowUp" size={16} />
          </a>
        </div>
      </div>
    </footer>
  )
}
