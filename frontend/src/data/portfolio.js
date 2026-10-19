
export const profile = {
  name: "Amr Mahmoud",
  firstName: "Amr",
  role: "Front-End Developer",
  tagline: "Front-End Developer crafting modern digital experiences.",
  summary:
    "I build responsive, accessible, and user-friendly web interfaces, turning ideas into clean layouts that feel good to use on any screen.",

  // Toggle `open` to false to hide the badge, or change the label.
  availability: {
    open: true,
    label: "Open to Opportunities",
  },

  email: "amr1.mahmoud1.dev@gmail.com",
  githubUrl: "https://github.com/AmrMahmo0ud",
  linkedinUrl: "https://www.linkedin.com/in/amr1-mahmoud1/",

  
  contactEndpoint: "http://127.0.0.1:8000/api/contact",
};

export const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

export const about = {
  intro:
    "I'm a Front-End Developer passionate about building modern, responsive, and intuitive web experiences. I enjoy turning ideas into functional interfaces and continuously improving my skills through hands-on projects and learning new technologies.",
  highlights: [
    {
      id: 'responsive',
      icon: 'layout',
      title: 'Responsive UI development',
      description:
        'Layouts built with Grid and Flexbox that adapt naturally from small phones to wide desktop screens.',
    },
    {
      id: 'detail',
      icon: 'target',
      title: 'Attention to detail',
      description:
        'Spacing, focus states, and edge cases get the same care as the main flow of a page.',
    },
    {
      id: 'problem-solving',
      icon: 'puzzle',
      title: 'Problem-solving',
      description:
        'Breaking features into small, understandable pieces before writing the code that ties them together.',
    },
    {
      id: 'learning',
      icon: 'spark',
      title: 'Continuous learning',
      description:
        'Picking up new tools and techniques by building real projects, then refining what works.',
    },
  ],
}

export const skillGroups = [
  {
    id: 'frontend',
    title: 'Frontend',
    description: 'What I build interfaces with.',
    skills: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Bootstrap', 'Tailwind CSS', 'Next.js'],
  },
  {
    id: 'tools',
    title: 'Tools',
    description: 'Where the work gets written, tracked, and shared.',
    skills: ['Git', 'GitHub', 'VS Code'],
  },
  {
    id: 'additional',
    title: 'Additional knowledge',
    description: 'Beyond the browser.',
    skills: ['Python', 'SQL', 'REST APIs'],
  },
]

/**
 * Projects. `mockup` picks the CSS illustration shown on the card
 * ('weather' | 'ticket' | 'risk'). Leave a URL empty until it exists.
 */
export const projects = [
  {
    id: "weather-app",
    title: "Weather App",
    description:
      "A responsive weather application that displays current weather conditions and forecasts using a weather API.",
    tags: ["React", "JavaScript", "Bootstrap", "REST API"],
    mockup: "weather",
    status: null,
    primaryLabel: "Live Demo",
    primaryUrl: "",
    repoUrl: "",
  },
  {
    id: "conference-ticket-generator",
    title: "Conference Ticket Generator",
    description:
      "A web application that generates a personalized conference ticket using user-provided information and an avatar.",
    tags: ["HTML", "CSS", "JavaScript", "Local Storage"],
    mockup: "ticket",
    status: null,
    primaryLabel: "Live Demo",
    primaryUrl: "",
    repoUrl: "https://github.com/AmrMahmo0ud/Ticket-Generation",
  },
  {
    id: "startup-risk-analyzer",
    title: "AI-Powered Startup Risk Analyzer",
    description:
      "A concept project that analyzes startup information and presents potential risks and key risk factors.",
    tags: ["React", "Python", "FastAPI", "AI"],
    mockup: "risk",
    // Shown as a badge. Remove once the implementation is confirmed.
    status: "Concept",
    primaryLabel: "View Project",
    primaryUrl: "",
    repoUrl: "",
  },
];

// Where "View all projects" points. Falls back to GitHub repositories tab.
export const allProjectsUrl = profile.githubUrl ? `${profile.githubUrl}?tab=repositories` : ''
