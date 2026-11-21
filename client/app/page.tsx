import HeroSection from "@/components/Herosection";
import Contact from "@/components/Contact";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Project";

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
        <HeroSection />

        {/* Experience Section */}
        <Experience />

        {/* Projects Section */}
        <Projects />

        {/* Technical Skills Section */}
        <Skills />

        {/* Education Section */}
        

        {/* Contact Section */}
        <Contact />
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