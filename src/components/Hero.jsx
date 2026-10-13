import { profile } from '../data/portfolio'
import Icon from './Icon'
import Terminal from './Terminal'

export default function Hero() {
  const { availability } = profile

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-[calc(var(--nav-height)+3rem)] pb-20 lg:pb-24"
    >
      <div className="hero-grid pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
      <div
        className="hero-glow pointer-events-none absolute top-1/4 right-[-10%] -z-10 size-[44rem] max-w-[120vw]"
        aria-hidden="true"
      />

      <div className="container-page grid items-center gap-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
        <div>
          {availability.open && (
            <p
              className="enter inline-flex items-center gap-2.5 rounded-full border border-line-strong bg-surface/70 py-1.5 pr-4 pl-3 text-sm text-text"
              style={{ '--enter-step': 0 }}
            >
              <span className="status-dot size-2 rounded-full bg-accent" aria-hidden="true" />
              {availability.label}
            </p>
          )}

          <h1
            id="hero-title"
            className="enter mt-7 text-display font-semibold"
            style={{ '--enter-step': 1 }}
          >
            Hi, I&apos;m {profile.name}.
          </h1>
          <p
            className="enter mt-5 max-w-[22ch] text-[clamp(1.5rem,1.05rem+1.9vw,2.4rem)] leading-[1.15] font-medium tracking-[-0.03em] text-muted"
            style={{ '--enter-step': 2 }}
          >
            {profile.tagline}
          </p>
          <p
            className="enter mt-7 max-w-[34rem] text-lead text-muted"
            style={{ '--enter-step': 3 }}
          >
            {profile.summary}
          </p>

          <div
            className="enter mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
            style={{ '--enter-step': 4 }}
          >
            <a href="#projects" className="btn btn-primary">
              Explore My Work
              <Icon name="arrowDown" size={17} />
            </a>
            <a href="#contact" className="btn btn-ghost">
              Get in Touch
            </a>
            {profile.githubUrl && (
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="text-link mt-2 self-start sm:mt-0 sm:ml-3 sm:self-center"
              >
                <Icon name="github" size={17} />
                View my GitHub
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            )}
          </div>
        </div>

        <div className="enter relative" style={{ '--enter-step': 3 }}>
          <Terminal />
        </div>
      </div>
    </section>
  )
}
