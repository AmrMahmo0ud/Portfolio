import { useEffect, useState } from 'react'
import { navLinks } from '../data/portfolio'
import { useActiveSection } from '../hooks/useActiveSection'
import { useScrolled } from '../hooks/useScrolled'
import Icon from './Icon'
import Monogram from './Monogram'

const sectionIds = navLinks.map((link) => link.id)

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const scrolled = useScrolled(12)
  const active = useActiveSection(sectionIds)

  // Lock page scroll and listen for Escape while the mobile menu is open.
  useEffect(() => {
    if (!menuOpen) return undefined
    document.body.classList.add('menu-open')
    const onKey = (event) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.classList.remove('menu-open')
      window.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  // Close the mobile menu if the viewport grows to the desktop layout.
  useEffect(() => {
    const query = window.matchMedia('(min-width: 768px)')
    const onChange = (event) => event.matches && setMenuOpen(false)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  const closeMenu = () => setMenuOpen(false)
  const solid = scrolled || menuOpen

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-300 ${
        solid
          ? 'border-line bg-bg/85 backdrop-blur-md supports-[backdrop-filter]:bg-bg/70'
          : 'border-transparent bg-transparent'
      }`}
    >
      <nav
        aria-label="Main"
        className="container-page flex h-[var(--nav-height)] items-center justify-between gap-6"
      >
        <a
          href="#home"
          onClick={closeMenu}
          className="group flex items-center gap-3 rounded-lg"
          aria-label="Amr Mahmoud, back to top"
        >
          <Monogram className="transition-transform duration-300 group-hover:-rotate-6" />
          <span className="hidden text-[0.95rem] font-semibold tracking-tight sm:inline">
            Amr Mahmoud
          </span>
        </a>

        <ul className="hidden items-center gap-1 rounded-full border border-line bg-surface/60 p-1 md:flex">
          {navLinks.map((link) => {
            const isActive = active === link.id
            return (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  aria-current={isActive ? 'location' : undefined}
                  className={`block rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'bg-surface-2 text-text shadow-[inset_0_0_0_1px_var(--color-line-strong)]'
                      : 'text-muted hover:text-text'
                  }`}
                >
                  {link.label}
                </a>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-2">
          <a href="#contact" className="btn btn-primary btn-sm hidden md:inline-flex">
            Let&apos;s Talk
          </a>
          <button
            type="button"
            className="inline-grid size-11 place-items-center rounded-full border border-line-strong text-text transition-colors hover:bg-surface-2 md:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <Icon name={menuOpen ? 'close' : 'menu'} size={20} />
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        hidden={!menuOpen}
        className="h-[calc(100dvh-var(--nav-height))] overflow-y-auto border-t border-line bg-bg md:hidden"
      >
        <ul className="container-page flex flex-col pt-4">
          {navLinks.map((link, index) => {
            const isActive = active === link.id
            return (
              <li
                key={link.id}
                className="enter border-b border-line"
                style={{ '--enter-step': index * 0.6 }}
              >
                <a
                  href={`#${link.id}`}
                  onClick={closeMenu}
                  aria-current={isActive ? 'location' : undefined}
                  className={`flex items-center justify-between py-5 text-[1.75rem] font-semibold tracking-[-0.03em] ${
                    isActive ? 'text-accent' : 'text-text'
                  }`}
                >
                  {link.label}
                  {isActive && <span className="size-2 rounded-[2px] bg-accent" aria-hidden="true" />}
                </a>
              </li>
            )
          })}
        </ul>
        <div className="container-page py-8">
          <a href="#contact" onClick={closeMenu} className="btn btn-primary w-full">
            Let&apos;s Talk
          </a>
        </div>
      </div>
    </header>
  )
}
