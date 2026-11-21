import { EDUCATION } from "@/data/education";

export default function Education() {
  return (
    <section
      id="education"
      className="section-spacing border-t border-border/60"
    >
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
  );
}
