import { useEffect, useRef, useState } from 'react'
import { profile, projects, skillGroups } from '../data/portfolio'

const quickCommands = ['whoami', 'skills', 'projects', 'contact', 'clear']

function stripProtocol(url) {
  return url.replace(/^https?:\/\/(www\.)?/, '')
}

// Each command returns lines of { text, tone } built from the portfolio data.
const commands = {
  help: () => [
    { text: 'Available commands:', tone: 'muted' },
    { text: '  whoami    who is behind this page' },
    { text: '  skills    what I work with' },
    { text: '  projects  things I have built' },
    { text: '  contact   how to reach me' },
    { text: '  clear     reset the terminal' },
  ],
  whoami: () => [
    { text: profile.name, tone: 'accent' },
    { text: profile.role },
    { text: 'Builds responsive, accessible interfaces with React.', tone: 'muted' },
  ],
  skills: () =>
    skillGroups.map((group) => ({
      text: `${group.title.toLowerCase().padEnd(11, ' ').slice(0, 11)} ${group.skills.join(', ')}`,
    })),
  projects: () =>
    projects.map((project) => ({
      text: `${project.status ? '○' : '●'} ${project.title}${project.status ? ` (${project.status.toLowerCase()})` : ''}`,
      tone: project.status ? 'muted' : undefined,
    })),
  contact: () => {
    const lines = []
    if (profile.email) lines.push({ text: `email     ${profile.email}` })
    if (profile.githubUrl) lines.push({ text: `github    ${stripProtocol(profile.githubUrl)}` })
    if (profile.linkedinUrl) lines.push({ text: `linkedin  ${stripProtocol(profile.linkedinUrl)}` })
    lines.push({ text: 'Or use the form in the contact section below.', tone: 'muted' })
    return lines
  },
}

const initialEntries = [
  { id: 0, command: 'whoami', output: commands.whoami() },
  { id: 1, command: 'projects', output: commands.projects() },
]

const toneClass = {
  accent: 'text-accent',
  muted: 'text-subtle',
  error: 'text-danger',
}

export default function Terminal() {
  const [entries, setEntries] = useState(initialEntries)
  const [input, setInput] = useState('')
  const nextId = useRef(initialEntries.length)
  const outputRef = useRef(null)

  useEffect(() => {
    const node = outputRef.current
    if (node) node.scrollTop = node.scrollHeight
  }, [entries])

  const run = (raw) => {
    const command = raw.trim().toLowerCase()
    if (!command) return
    if (command === 'clear') {
      setEntries([])
      return
    }
    const handler = commands[command]
    const output = handler
      ? handler()
      : [{ text: `command not found: ${command}. Try "help".`, tone: 'error' }]
    const id = nextId.current++
    // Keep the last few entries so the window never grows unbounded.
    setEntries((current) => [...current, { id, command, output }].slice(-5))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    run(input)
    setInput('')
  }

  return (
    <div className="relative overflow-hidden rounded-[var(--radius-lg)] border border-line-strong bg-surface shadow-[0_40px_80px_-40px_#000,0_0_0_1px_#ffffff06_inset]">
      <div className="flex items-center gap-2 border-b border-line px-4 py-3">
        <span className="size-3 rounded-full bg-[#ff5f57]/80" aria-hidden="true" />
        <span className="size-3 rounded-full bg-[#febc2e]/80" aria-hidden="true" />
        <span className="size-3 rounded-full bg-[#28c840]/80" aria-hidden="true" />
        <p className="ml-3 font-mono text-[0.75rem] text-subtle">amr@portfolio: ~</p>
      </div>

      <div
        ref={outputRef}
        role="log"
        aria-live="polite"
        aria-label="Terminal output"
        className="h-[16rem] overflow-y-auto px-5 pt-4 pb-2 font-mono text-[0.8125rem] leading-[1.75] sm:h-[16.5rem] sm:text-[0.85rem]"
      >
        {entries.length === 0 && (
          <p className="text-subtle">Type a command or tap one below. Try &quot;help&quot;.</p>
        )}
        {entries.map((entry) => (
          <div key={entry.id} className="term-line mb-3">
            <p>
              <span className="text-accent">❯</span> <span className="text-text">{entry.command}</span>
            </p>
            {entry.output.map((line, index) => (
              <p
                key={`${entry.id}-${index}`}
                className={`whitespace-pre-wrap break-words ${toneClass[line.tone] ?? 'text-muted'}`}
              >
                {line.text}
              </p>
            ))}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex items-center gap-1 px-5 pb-3 font-mono text-[0.85rem]">
        <span className="text-accent" aria-hidden="true">
          ❯
        </span>
        <label htmlFor="terminal-input" className="sr-only">
          Terminal command
        </label>
        <input
          id="terminal-input"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          autoComplete="off"
          autoCapitalize="off"
          spellCheck="false"
          placeholder="type help"
          className="min-w-0 flex-1 rounded-md bg-transparent px-2 py-1 text-text caret-accent placeholder:text-subtle/70 focus-visible:outline-offset-0"
        />
      </form>

      <div className="flex flex-wrap gap-2 border-t border-line bg-bg/40 px-4 py-3">
        {quickCommands.map((command) => (
          <button
            key={command}
            type="button"
            onClick={() => run(command)}
            className="rounded-full border border-line px-3 py-1.5 font-mono text-[0.75rem] text-muted transition-colors hover:border-accent/60 hover:text-accent"
          >
            {command}
          </button>
        ))}
      </div>
    </div>
  )
}
