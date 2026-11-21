import { PROFILE } from "@/data/profile";

export default function Contact() {
  return (
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
  );
}
