import type { LucideIcon } from "lucide-react";
import { ArrowRight, Wrench } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { TenantBadge } from "./TenantBadge";

interface PagePlaceholderProps {
  eyebrow: string;
  title: string;
  description: string;
  icon: LucideIcon;
  upcoming: string[];
}

export function PagePlaceholder({
  eyebrow,
  title,
  description,
  icon: Icon,
  upcoming,
}: PagePlaceholderProps) {
  return (
    <section className="mx-auto max-w-[1100px] px-4 py-16 sm:px-6 lg:py-24">
      <TenantBadge />
      <div className="mt-6 flex items-start gap-5">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--brand-ink)] text-primary-foreground shadow-soft">
          <Icon className="h-5 w-5" />
        </span>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--info)]">
            {eyebrow}
          </p>
          <h1 className="mt-1.5 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {title}
          </h1>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
            {description}
          </p>
        </div>
      </div>

      <div className="mt-10 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <div className="rounded-2xl border border-dashed border-border bg-surface p-8 shadow-soft">
          <div className="inline-flex items-center gap-2 rounded-full bg-card px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            <Wrench className="h-3 w-3" /> Phase 2
          </div>
          <h2 className="mt-4 text-xl font-semibold tracking-tight text-foreground">
            This area is on the roadmap
          </h2>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
            Phase 1 ships the architecture, layouts and homepage. Full functionality for this
            workspace lands with the next release.
          </p>
          <Link
            to="/"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[var(--brand-ink)] px-4 py-2 text-sm font-medium text-primary-foreground shadow-soft transition hover:opacity-90"
          >
            Back to workplace
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <aside className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            What&apos;s coming
          </p>
          <ul className="mt-4 space-y-3 text-sm text-foreground/90">
            {upcoming.map((u, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--info)]" />
                <span className="leading-snug">{u}</span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}