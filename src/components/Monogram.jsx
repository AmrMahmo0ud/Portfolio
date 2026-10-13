export default function Monogram({ className = '' }) {
  return (
    <span
      aria-hidden="true"
      className={`relative inline-grid size-9 place-items-center rounded-[0.6rem] border border-line-strong bg-surface text-[0.95rem] font-bold tracking-[-0.06em] text-accent ${className}`}
    >
      AM
      <span className="absolute -right-px -bottom-px size-1.5 rounded-[2px] bg-accent" />
    </span>
  )
}
