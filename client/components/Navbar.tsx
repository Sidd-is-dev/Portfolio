import { NAV_ITEMS } from "@/data/navbar";

export default function Navbar() {
  return (
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
  );
}
