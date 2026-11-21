import {SKILL_GROUPS} from "@/data/skills";

export default function Skills(){
    return (
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
    )
}