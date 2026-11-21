import { PROFILE } from "@/data/profile";

export default function Footer() {
  return (
    <footer className="border-t border-border/60 py-8">
      <div className="site-container flex flex-col items-center justify-between gap-2 text-xs text-subtle sm:flex-row">
        <p>
          {PROFILE.name} — {PROFILE.role}
        </p>
        <p>{PROFILE.location}</p>
      </div>
    </footer>
  );
}
