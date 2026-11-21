import { PROJECTS } from "@/data/projects";

export default function Projects() {
  return (
    <section
      id="projects"
      className="section-spacing border-t border-border/60"
    >
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
  );
}
