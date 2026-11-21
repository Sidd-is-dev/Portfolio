import Image from "next/image";
import { PROFILE } from "@/data/profile";

export default function HeroSection(){
    return (
        <section className="section-spacing pt-14 md:pt-24">
  <div className="site-container">
    <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-12">
      {/* Text Column: Bottom on mobile, Left on tablet & desktop */}
      <div className="order-2 space-y-6 md:order-1 md:col-span-7">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/80 px-3.5 py-1.5 text-xs font-medium text-muted">
          <span className="h-2 w-2 rounded-full bg-success" />
          <span>{PROFILE.location}</span>
        </div>

        <div className="space-y-3">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            {PROFILE.name}
          </h1>
          <p className="text-gradient text-xl font-medium sm:text-2xl">
            {PROFILE.role}
          </p>
        </div>

        <p className="max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          {PROFILE.summary}
        </p>

        {/* Primary CTAs: Projects + Resume */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <a
            href="#projects"
            className="rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-[var(--glow-primary)] transition-colors hover:bg-primary-hover"
          >
            View Projects
          </a>
          <a
            href={PROFILE.links.resume}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-secondary/50 bg-card px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-secondary hover:bg-card-hover"
          >
            <span>Resume</span>
            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-4 w-4 text-secondary"
            >
              <path d="M10.75 2.75a.75.75 0 0 0-1.5 0v8.614L6.295 8.235a.75.75 0 1 0-1.09 1.03l4.25 4.5a.75.75 0 0 0 1.09 0l4.25-4.5a.75.75 0 0 0-1.09-1.03l-2.955 3.129V2.75Z" />
              <path d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z" />
            </svg>
          </a>
        </div>

        {/* Social & Contact Links */}
        <div className="flex flex-wrap items-center gap-3">
          <a
            href={PROFILE.links.github}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl border border-border bg-surface px-4 py-2 text-sm font-medium text-muted transition-colors hover:border-primary hover:bg-card hover:text-foreground"
          >
            GitHub
          </a>
          <a
            href={PROFILE.links.linkedin}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl border border-border bg-surface px-4 py-2 text-sm font-medium text-muted transition-colors hover:border-primary hover:bg-card hover:text-foreground"
          >
            LinkedIn
          </a>
          <a
            href={PROFILE.links.email}
            className="rounded-xl border border-border bg-surface px-4 py-2 text-sm font-medium text-muted transition-colors hover:border-primary hover:bg-card hover:text-foreground"
          >
            Email
          </a>
        </div>
      </div>

      {/* Image Column: Top on mobile, Right on tablet & desktop */}
      <div className="order-1 flex justify-center md:order-2 md:col-span-5 md:justify-end">
        <div className="relative">
          {/* Midnight Studio subtle accent glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-3 rounded-3xl bg-gradient-to-tr from-primary/25 via-secondary/15 to-transparent blur-2xl"
          />

          <div className="relative h-60 w-60 overflow-hidden rounded-3xl border border-border bg-card p-1.5 shadow-[var(--shadow-card)] sm:h-72 sm:w-72 md:h-80 md:w-80 lg:h-[360px] lg:w-[360px]">
            <div className="relative h-full w-full overflow-hidden rounded-2xl bg-surface">
              <Image
                src={PROFILE.profileImage}
                alt={`${PROFILE.name} — ${PROFILE.role}`}
                fill
                priority
                sizes="(max-width: 768px) 240px, (max-width: 1024px) 320px, 360px"
                className="object-cover object-top"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    );
}


