# Amr Mahmoud | Portfolio

Personal portfolio for Amr Mahmoud, Front-End Developer. A single-page site built with React, Vite, and Tailwind CSS v4.

## Run it

```bash
npm install
npm run dev       # local dev server at http://localhost:5173
npm run build     # production build into dist/
npm run preview   # serve the production build
npm run lint      # oxlint
```

## Editing content

All text, links, skills, and projects live in [`src/data/portfolio.js`](src/data/portfolio.js). Components read from it, so most edits never touch JSX.

Any URL or email left as an empty string is treated as "not added yet": the UI shows a disabled placeholder instead of a broken link. Fill these in:

| Field | Where it shows |
| --- | --- |
| `profile.email` | Contact section, terminal `contact` command, email fallback in the form |
| `profile.linkedinUrl` | Contact section, footer |
| `profile.githubUrl` | Hero, contact, footer, "View all projects" (set to `github.com/AmrMahmo0ud`, the repo owner) |
| `projects[].primaryUrl` | Live Demo / View Project buttons |
| `projects[].repoUrl` | GitHub Repository buttons |
| `profile.availability` | Hero badge (`open: false` hides it) |

The AI-Powered Startup Risk Analyzer card carries a `status: 'Concept'` badge. Remove it once the implementation is confirmed.

## Contact form

The form validates in the browser. It only sends anything when `profile.contactEndpoint` is set to a URL that accepts a JSON `POST` (`{ name, email, subject, message }`), such as a Formspree form endpoint or your own API. It shows "Message sent" only when that endpoint responds with a 2xx status.

With no endpoint (the default), submitting a valid form tells the visitor plainly that nothing was sent and offers their email app (prefilled `mailto:`) when `profile.email` is set, or GitHub otherwise.

## Structure

```
src/
  data/portfolio.js        editable content
  components/              Navbar, Hero, Terminal, About, Skills, Projects,
                           ProjectCard, ProjectMockup, Contact, ContactForm,
                           Footer, Reveal, Icon, Monogram
  hooks/                   useActiveSection, useScrolled
  index.css                design tokens (@theme), shared component styles, motion
```

Design tokens (colors, type scale, radii, easing) are CSS variables declared in `@theme` in `src/index.css`, so they are available both as Tailwind utilities (`bg-surface`, `text-muted`) and as `var(--color-accent)`.

Motion is limited to transform and opacity, and is switched off under `prefers-reduced-motion`.
