import {EXPERIENCE} from "@/data/experience";

export default function Experience(){
    return (
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
    )
}