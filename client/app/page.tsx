// client/src/app/page.tsx

const PROFILE = {
  name: "Siddhant Mishra",
  role: "Junior Full Stack Developer",
  location: "Noida, Uttar Pradesh, India",
  phone: "+91 9984218038",
  summary:
    "Junior Full Stack Developer with professional internship experience building and enhancing web applications using React.js, Next.js, TypeScript, and Node.js. Experienced in REST API integration, MongoDB, real-time communication with Socket.IO, and working with existing codebases. Familiar with Git-based collaboration, debugging, and developing responsive, maintainable web interfaces.",
  links: {
    email: "mailto:your-email@example.com",
    github: "https://github.com/your-username",
    linkedin: "https://linkedin.com/in/your-username",
    portfolio: "https://personal-portfolio-siddhant.vercel.app/",
  },
};

const SKILL_GROUPS = [
  {
    category: "Programming Languages",
    items: ["JavaScript", "TypeScript"],
  },
  {
    category: "Frontend",
    items: ["HTML", "CSS", "React.js", "Next.js", "Tailwind CSS"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Express.js", "REST APIs"],
  },
  {
    category: "Database",
    items: ["MongoDB"],
  },
  {
    category: "Real-time",
    items: ["Socket.IO"],
  },
  {
    category: "Tools",
    items: ["Git", "GitHub", "Postman", "VS Code"],
  },
];

const EXPERIENCE = [
  {
    company: "Classy Endeavors",
    role: "Full Stack Developer Intern",
    period: "March 2026 – Present",
    highlights: [
      "Developed and enhanced responsive web application interfaces using React.js, Next.js, TypeScript, and Tailwind CSS.",
      "Integrated REST APIs with frontend components and worked with MongoDB-backed application workflows.",
      "Contributed to real-time application features using Socket.IO and event-driven communication.",
      "Debugged existing application issues, implemented fixes, and collaborated with team members through Git/GitHub workflows.",
      "Improved website SEO through metadata optimization and on-page enhancements.",
    ],
  },
];

const PROJECTS = [
  {
    name: "HiveRadar",
    url: "https://hiveradar.com",
    displayUrl: "HiveRadar.com",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "i18n", "SEO"],
    highlights: [
      "Developed responsive frontend interfaces using reusable, component-based architecture with Next.js and TypeScript.",
      "Implemented internationalization (i18n) to support multilingual website experiences.",
      "Contributed to SEO improvements through metadata configuration and on-page optimization.",
    ],
  },
  {
    name: "EProcureAI",
    url: "https://eprocureai.com",
    displayUrl: "eprocureai.com",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Node.js", "Socket.IO"],
    highlights: [
      "Contributed to procurement and vendor management interfaces using Next.js, TypeScript, and Tailwind CSS.",
      "Integrated frontend components with REST APIs and MongoDB-backed application workflows.",
      "Supported selected backend and real-time communication functionality using Node.js and Socket.IO.",
    ],
  },
  {
    name: "GetNorthPath",
    url: "https://getnorthpath.com",
    displayUrl: "GetNorthPath.com",
    tech: ["Frontend Development", "API Integration", "Responsive UI"],
    highlights: [
      "Developed responsive website interfaces and reusable UI components for an immigration services platform.",
      "Integrated frontend components with backend APIs to support interactive user flows and dynamic application data.",
    ],
  },
];

const EDUCATION = [
  {
    degree: "Master of Computer Applications (MCA)",
    institution: "Rajarshi School of Management of Technology, Varanasi",
    year: "2024",
    score: "7.33 CGPA",
  },
  {
    degree: "Bachelor of Computer Applications (BCA)",
    institution: "Mahatma Gandhi Kashi Vidyapith, Varanasi, UP",
    year: "2021",
    score: "65%",
  },
];

const NAV_ITEMS = [
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-background text-foreground">
      {/* Midnight Studio ambient radial accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -top-32 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-primary/15 blur-[130px]" />
        <div className="absolute top-[38%] -right-40 h-[320px] w-[320px] rounded-full bg-secondary/10 blur-[120px]" />
      </div>

      {/* Sticky Glass Navigation */}
      <header className="sticky top-0 z-40 py-4">
        <div className="site-container">
          <nav
            aria-label="Primary navigation"
            className="glass-effect flex items-center justify-between rounded-2xl px-5 py-3"
          >
            <a
              href="#top"
              className="font-mono text-sm font-semibold tracking-tight text-foreground"
            >
              siddhant<span className="text-primary">.dev</span>
            </a>

            <ul className="hidden items-center gap-7 text-sm text-muted md:flex">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            <a
              href="#contact"
              className="rounded-lg bg-primary px-3.5 py-1.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
            >
              Get in Touch
            </a>
          </nav>
        </div>
      </header>

      <main id="top">
        {/* Hero Section */}
        <section className="section-spacing pt-16 md:pt-24">
          <div className="site-container">
            <div className="max-w-3xl space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/80 px-3.5 py-1.5 text-xs font-medium text-muted">
                <span className="h-2 w-2 rounded-full bg-success" />
                <span>{PROFILE.location}</span>
              </div>

              <div className="space-y-3">
                <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
                  {PROFILE.name}
                </h1>
                <p className="text-gradient text-xl font-medium sm:text-2xl">
                  {PROFILE.role}
                </p>
              </div>

              <p className="max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
                {PROFILE.summary}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="#projects"
                  className="rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-[var(--glow-primary)] transition-colors hover:bg-primary-hover"
                >
                  View Projects
                </a>
                <a
                  href={PROFILE.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-border bg-surface px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-primary hover:bg-card"
                >
                  GitHub
                </a>
                <a
                  href={PROFILE.links.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-border bg-surface px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-primary hover:bg-card"
                >
                  LinkedIn
                </a>
                <a
                  href={PROFILE.links.email}
                  className="rounded-xl border border-border bg-surface px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-primary hover:bg-card"
                >
                  Email
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="section-spacing border-t border-border/60">
          <div className="site-container space-y-8">
            <div className="space-y-2">
              <p className="font-mono text-xs uppercase tracking-widest text-secondary">
                Experience
              </p>
              <h2 className="text-2xl sm:text-3xl">Work History</h2>
            </div>

            <div className="space-y-6">
              {EXPERIENCE.map((item) => (
                <article
                  key={`${item.company}-${item.role}`}
                  className="surface-card p-6 sm:p-8"
                >
                  <div className="flex flex-col justify-between gap-2 border-b border-border/70 pb-5 sm:flex-row sm:items-center">
                    <div>
                      <h3 className="text-xl text-foreground">{item.role}</h3>
                      <p className="mt-1 text-sm font-medium text-primary">
                        {item.company}
                      </p>
                    </div>
                    <span className="inline-flex w-fit items-center rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs text-muted">
                      {item.period}
                    </span>
                  </div>

                  <ul className="mt-5 space-y-3 text-sm leading-relaxed text-muted sm:text-base">
                    {item.highlights.map((point) => (
                      <li key={point} className="flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="section-spacing border-t border-border/60">
          <div className="site-container space-y-8">
            <div className="space-y-2">
              <p className="font-mono text-xs uppercase tracking-widest text-secondary">
                Projects
              </p>
              <h2 className="text-2xl sm:text-3xl">Selected Work</h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {PROJECTS.map((project) => (
                <article
                  key={project.name}
                  className="surface-card flex flex-col justify-between p-6"
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-xl text-foreground">{project.name}</h3>
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noreferrer"
                        className="shrink-0 font-mono text-xs text-secondary transition-colors hover:text-primary"
                      >
                        {project.displayUrl} ↗
                      </a>
                    </div>

                    <ul className="space-y-2.5 text-sm leading-relaxed text-muted">
                      {project.highlights.map((point) => (
                        <li key={point} className="flex items-start gap-2.5">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2 border-t border-border/70 pt-4">
                    {project.tech.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-border bg-surface px-2.5 py-1 font-mono text-xs text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Technical Skills Section */}
        <section id="skills" className="section-spacing border-t border-border/60">
          <div className="site-container space-y-8">
            <div className="space-y-2">
              <p className="font-mono text-xs uppercase tracking-widest text-secondary">
                Technical Skills
              </p>
              <h2 className="text-2xl sm:text-3xl">Core Stack</h2>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {SKILL_GROUPS.map((group) => (
                <div key={group.category} className="surface-card p-6">
                  <h3 className="font-mono text-xs uppercase tracking-wider text-subtle">
                    {group.category}
                  </h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {group.items.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-lg border border-border bg-surface px-3 py-1.5 text-sm font-medium text-foreground"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="section-spacing border-t border-border/60">
          <div className="site-container space-y-8">
            <div className="space-y-2">
              <p className="font-mono text-xs uppercase tracking-widest text-secondary">
                Education
              </p>
              <h2 className="text-2xl sm:text-3xl">Academic Background</h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {EDUCATION.map((edu) => (
                <article key={edu.degree} className="surface-card p-6">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-lg text-foreground">{edu.degree}</h3>
                    <span className="shrink-0 rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs text-secondary">
                      {edu.year}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-muted">{edu.institution}</p>
                  <p className="mt-4 font-mono text-xs font-medium text-success">
                    Score: {edu.score}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="section-spacing border-t border-border/60">
          <div className="site-container">
            <div className="surface-card flex flex-col justify-between gap-6 p-8 md:flex-row md:items-center">
              <div className="space-y-2">
                <p className="font-mono text-xs uppercase tracking-widest text-secondary">
                  Contact
                </p>
                <h2 className="text-2xl sm:text-3xl">Let's Connect</h2>
                <p className="text-sm text-muted">
                  {PROFILE.location} ·{" "}
                  <a
                    href={`tel:${PROFILE.phone.replace(/\s+/g, "")}`}
                    className="text-foreground transition-colors hover:text-primary"
                  >
                    {PROFILE.phone}
                  </a>
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href={PROFILE.links.email}
                  className="rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-[var(--glow-primary)] transition-colors hover:bg-primary-hover"
                >
                  Email
                </a>
                <a
                  href={PROFILE.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-border bg-surface px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-primary"
                >
                  GitHub
                </a>
                <a
                  href={PROFILE.links.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-border bg-surface px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-primary"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/60 py-8">
        <div className="site-container flex flex-col items-center justify-between gap-2 text-xs text-subtle sm:flex-row">
          <p>{PROFILE.name} — {PROFILE.role}</p>
          <p>{PROFILE.location}</p>
        </div>
      </footer>
    </div>
  );
}