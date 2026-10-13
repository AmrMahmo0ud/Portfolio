import { profile } from '../data/portfolio'
import ContactForm from './ContactForm'
import Icon from './Icon'
import Reveal from './Reveal'

function ContactRow({ icon, label, value, href, external = false }) {
  const content = (
    <>
      <span className="inline-grid size-11 shrink-0 place-items-center rounded-full border border-line-strong bg-surface text-text transition-colors group-hover:border-accent/60 group-hover:text-accent">
        <Icon name={icon} size={18} />
      </span>
      <span className="min-w-0">
        <span className="block text-sm text-subtle">{label}</span>
        <span className="block truncate font-medium text-text">{value}</span>
      </span>
    </>
  )

  if (!href) {
    return (
      <li className="flex items-center gap-4 py-4 opacity-60" title="Not added yet">
        {content}
      </li>
    )
  }

  return (
    <li>
      <a
        href={href}
        {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
        className="group flex items-center gap-4 rounded-lg py-4"
      >
        {content}
        <Icon
          name="arrowUpRight"
          size={18}
          className="ml-auto shrink-0 text-subtle transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
        />
        {external && <span className="sr-only">(opens in a new tab)</span>}
      </a>
    </li>
  )
}

export default function Contact() {
  const githubHandle = profile.githubUrl.replace(/^https?:\/\/(www\.)?github\.com\//, '')

  return (
    <section id="contact" aria-labelledby="contact-title" className="section relative isolate overflow-hidden">
      <div
        className="hero-glow pointer-events-none absolute -bottom-1/3 -left-1/4 -z-10 size-[40rem] max-w-[120vw] opacity-70"
        aria-hidden="true"
      />
      <div className="container-page grid gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
        <Reveal>
          <h2 id="contact-title" className="section-title">
            Have a project in mind?
          </h2>
          <p className="section-lead">
            Whether you&apos;re hiring, collaborating, or just want to talk front-end, I&apos;d like to
            hear from you. Send a message and I&apos;ll get back to you.
          </p>

          <ul className="mt-10 divide-y divide-line border-y border-line">
            <ContactRow
              icon="mail"
              label="Email"
              value={profile.email || 'Email address coming soon'}
              href={profile.email ? `mailto:${profile.email}` : ''}
            />
            <ContactRow
              icon="github"
              label="GitHub"
              value={profile.githubUrl ? `@${githubHandle}` : 'Profile coming soon'}
              href={profile.githubUrl}
              external
            />
            <ContactRow
              icon="linkedin"
              label="LinkedIn"
              value={profile.linkedinUrl ? 'Connect on LinkedIn' : 'Profile coming soon'}
              href={profile.linkedinUrl}
              external
            />
          </ul>
        </Reveal>

        <Reveal step={1}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  )
}
