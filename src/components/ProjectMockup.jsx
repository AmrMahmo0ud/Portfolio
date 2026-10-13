// Decorative, CSS-only previews for each project card. They illustrate the
// kind of interface each project has; they are not screenshots.

function WeatherMockup() {
  const days = [
    { day: 'Mon', high: 70 },
    { day: 'Tue', high: 85 },
    { day: 'Wed', high: 60 },
    { day: 'Thu', high: 45 },
    { day: 'Fri', high: 75 },
  ]
  return (
    <div className="flex h-full w-full max-w-[17rem] flex-col justify-between rounded-[var(--radius-md)] border border-line-strong bg-bg/80 p-4 shadow-[0_24px_40px_-24px_#000]">
      <div className="flex items-start justify-between">
        <div>
          <div className="h-2 w-16 rounded-full bg-line-strong" />
          <div className="mt-3 text-[2.6rem] leading-none font-semibold tracking-[-0.05em] text-text">
            24°
          </div>
        </div>
        <div className="relative mt-1 size-12">
          <div className="absolute top-0 right-0 size-8 rounded-full bg-accent/90 shadow-[0_0_24px_#c5f82a66]" />
          <div className="absolute bottom-1 left-0 h-5 w-10 rounded-full bg-[#d9ded3]" />
        </div>
      </div>
      <div className="mt-4 flex items-end justify-between gap-2">
        {days.map(({ day, high }) => (
          <div key={day} className="flex flex-1 flex-col items-center gap-1.5">
            <div className="flex h-12 w-full items-end justify-center">
              <div
                className="w-2 rounded-full bg-gradient-to-t from-line-strong to-accent/80"
                style={{ height: `${high}%` }}
              />
            </div>
            <span className="text-[0.6rem] text-subtle">{day}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function TicketMockup() {
  return (
    <div className="relative flex h-[8.5rem] w-full max-w-[18rem] rotate-[-4deg] overflow-hidden rounded-[var(--radius-md)] border border-line-strong bg-gradient-to-br from-surface-2 to-bg shadow-[0_24px_40px_-24px_#000] transition-transform duration-500 group-hover:rotate-[-1deg]">
      <div className="flex flex-1 flex-col justify-between p-4">
        <div className="flex items-center gap-2">
          <span className="size-3 rotate-45 rounded-[2px] bg-accent" />
          <div className="h-2 w-20 rounded-full bg-line-strong" />
        </div>
        <div className="flex items-center gap-3">
          <div className="grid size-10 place-items-center rounded-full border-2 border-accent/70 bg-surface text-[0.65rem] font-semibold text-muted">
            You
          </div>
          <div className="space-y-1.5">
            <div className="h-2.5 w-24 rounded-full bg-text/80" />
            <div className="h-2 w-16 rounded-full bg-line-strong" />
          </div>
        </div>
      </div>
      <div className="relative w-14 border-l-2 border-dashed border-line-strong">
        <span className="absolute -top-3 -left-3 size-6 rounded-full border border-line-strong bg-surface" />
        <span className="absolute -bottom-3 -left-3 size-6 rounded-full border border-line-strong bg-surface" />
        <span className="absolute inset-0 grid place-items-center text-[0.6rem] tracking-[0.2em] text-subtle [writing-mode:vertical-rl]">
          #0001
        </span>
      </div>
    </div>
  )
}

function RiskMockup() {
  const factors = [
    { id: 'a', width: '82%', tone: 'bg-accent' },
    { id: 'b', width: '58%', tone: 'bg-accent/70' },
    { id: 'c', width: '36%', tone: 'bg-accent/45' },
    { id: 'd', width: '22%', tone: 'bg-accent/25' },
  ]
  return (
    <div className="flex h-full w-full max-w-[17rem] gap-4 rounded-[var(--radius-md)] border border-line-strong bg-bg/80 p-4 shadow-[0_24px_40px_-24px_#000]">
      <div className="relative grid size-20 shrink-0 place-items-center self-center">
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              'conic-gradient(var(--color-accent) 0 62%, var(--color-line-strong) 62% 100%)',
            mask: 'radial-gradient(circle, transparent 58%, #000 60%)',
            WebkitMask: 'radial-gradient(circle, transparent 58%, #000 60%)',
          }}
        />
        <span className="font-mono text-[0.7rem] text-muted">risk</span>
      </div>
      <div className="flex flex-1 flex-col justify-center gap-3">
        {factors.map((factor) => (
          <div key={factor.id} className="space-y-1">
            <div className="h-1.5 w-10 rounded-full bg-line-strong" />
            <div className="h-2 w-full rounded-full bg-surface-2">
              <div className={`h-full rounded-full ${factor.tone}`} style={{ width: factor.width }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const mockups = {
  weather: WeatherMockup,
  ticket: TicketMockup,
  risk: RiskMockup,
}

export default function ProjectMockup({ type, wide = false }) {
  const Mockup = mockups[type]
  if (!Mockup) return null
  return (
    <div
      aria-hidden="true"
      className={`relative flex aspect-[16/10] items-center justify-center overflow-hidden border-b border-line bg-surface-2 px-8 py-7 ${
        wide ? 'md:max-xl:aspect-auto md:max-xl:h-full md:max-xl:border-r md:max-xl:border-b-0' : ''
      }`}
    >
      <div className="hero-grid absolute inset-0 opacity-60" />
      <div className="relative flex h-full w-full items-center justify-center transition-transform duration-500 ease-[var(--ease-out-quart)] group-hover:scale-[1.03]">
        <Mockup />
      </div>
    </div>
  )
}
