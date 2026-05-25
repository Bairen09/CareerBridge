import { Link } from "@tanstack/react-router";

import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  FileText,
  Megaphone,
  Sparkles,
  Users,
} from "lucide-react";
import avatar1 from "../../assets/avatar-1.jpg";
import avatar2 from "../../assets/avatar-2.jpg";
import avatar3 from "../../assets/avatar-3.jpg";
import avatar4 from "../../assets/avatar-4.jpg";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 grid-bg opacity-60" aria-hidden />
      <div className="absolute inset-x-0 top-0 -z-10 h-[520px] bg-gradient-to-b from-surface-muted to-transparent" aria-hidden />

      <div className="mx-auto grid max-w-[1400px] gap-16 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-12 lg:py-24 xl:gap-20">
        {/* LEFT — message + product explanation */}
        <div className="flex flex-col justify-center">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground shadow-soft">
            <Sparkles className="h-3.5 w-3.5 text-[var(--info)]" />
            <span>
                MSA Group · Internal workplace
            </span>
          </div>

          <h1 className="mt-6 text-[40px] font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl xl:text-[58px]">
            One workplace for every company in the group.
          </h1>

          <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-muted-foreground">
            Manage announcements, company news, events,
            documents and employee collaboration across
            all subsidiaries from one secure internal platform.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              to="/login"
              className="inline-flex h-11 items-center gap-2 rounded-lg bg-[var(--brand-ink)] px-5 text-sm font-medium text-primary-foreground shadow-soft transition hover:opacity-90"
            >
              Sign in to your workspace
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/news"
              className="inline-flex h-11 items-center gap-2 rounded-lg border border-border bg-card px-5 text-sm font-medium text-foreground shadow-soft transition hover:bg-surface"
            >
              Browse company news
            </Link>
          </div>

          {/* Quick stats */}
          <dl className="mt-10 grid max-w-xl grid-cols-3 gap-6 border-t border-border pt-6">
            {[
              { label: "Employees", value: "4,820" },
              { label: "Companies", value: "4" },
              { label: "Countries", value: "11" },
            ].map((s) => (
              <div key={s.label}>
                <dt className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
                  {s.label}
                </dt>
                <dd className="mt-1 text-2xl font-semibold tracking-tight text-foreground">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex items-center gap-3">
            <div className="flex -space-x-2">
              {[avatar1, avatar3, avatar4, avatar2].map((a, i) => (
                <img
                  key={i}
                  src={a}
                  alt=""
                  className="h-8 w-8 rounded-full border-2 border-background object-cover"
                  loading="lazy"
                />
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="font-medium text-foreground">218 colleagues</span> active in the last hour
            </p>
          </div>
        </div>

        {/* RIGHT — floating dashboard cards */}
        <div className="relative">
          <div className="relative mx-auto aspect-[5/6] w-full max-w-[560px]">
            {/* Base panel — dashboard preview */}
            <div className="absolute inset-0 rounded-2xl border border-border bg-card shadow-lift">
              <div className="flex items-center gap-1.5 border-b border-border px-4 py-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.82_0.08_30)]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.86_0.1_85)]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.78_0.1_150)]" />
                <span className="ml-3 text-[11px] font-medium text-muted-foreground">
                  workplace.msagroup.com
                </span>
              </div>
              <div className="space-y-4 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                      Good morning, Elena
                    </p>
                    <p className="mt-0.5 text-base font-semibold text-foreground">
                      Here&apos;s what&apos;s happening today
                    </p>
                  </div>
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-surface text-xs font-semibold">
                    EM
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: "News today", value: "12", icon: Megaphone },
                    { label: "Events", value: "5", icon: CalendarDays },
                    { label: "New people", value: "08", icon: Users },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className="rounded-lg border border-border bg-surface p-3"
                    >
                      <s.icon className="h-3.5 w-3.5 text-muted-foreground" />
                      <p className="mt-2 text-lg font-semibold leading-none text-foreground">
                        {s.value}
                      </p>
                      <p className="mt-1 text-[10px] text-muted-foreground">{s.label}</p>
                    </div>
                  ))}
                </div>

                <div className="rounded-lg border border-border bg-surface p-3">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    Pinned announcement
                  </p>
                  <p className="mt-1.5 text-sm font-medium leading-snug text-foreground">
                    Q3 town hall — register before Wednesday EOD
                  </p>
                  <div className="mt-3 flex items-center gap-2 text-[11px] text-muted-foreground">
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded bg-[var(--brand-ink)] text-[9px] font-semibold text-primary-foreground">
                      MSA
                    </span>
                    <span>Karim O. · People &amp; Culture</span>
                  </div>
                </div>

                <div className="rounded-lg border border-border bg-surface p-3">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    Activity
                  </p>
                  <ul className="mt-2 space-y-1.5 text-[12px]">
                    {[
                      "Rush People shipped onboarding v2",
                      "Mana Services posted Q3 OKRs",
                      "Miya Services scheduled an all-hands",
                    ].map((a, i) => (
                      <li key={i} className="flex items-start gap-2 text-foreground/85">
                        <CheckCircle2 className="mt-0.5 h-3 w-3 text-[var(--success)]" />
                        <span className="leading-snug">{a}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Floating card — announcement */}
            <div className="absolute -left-6 top-10 hidden w-[260px] -rotate-2 rounded-xl border border-border bg-card p-3.5 shadow-lift sm:block">
              <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--info)]">
                <Megaphone className="h-3 w-3" /> Announcement
              </div>
              <p className="mt-1.5 text-sm font-medium leading-snug text-foreground">
                New parental leave policy now live across the group
              </p>
              <p className="mt-2 text-[11px] text-muted-foreground">Effective from January</p>
            </div>

            {/* Floating card — event */}
            <div className="absolute -right-6 bottom-16 hidden w-[240px] rotate-2 rounded-xl border border-border bg-card p-3.5 shadow-lift sm:block">
              <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--success)]">
                <CalendarDays className="h-3 w-3" /> Upcoming event
              </div>
              <p className="mt-1.5 text-sm font-medium leading-snug text-foreground">
                Leadership offsite — Lisbon
              </p>
              <div className="mt-2 flex items-center justify-between text-[11px] text-muted-foreground">
                <span>Thu, 14 Nov · 09:00</span>
                <div className="flex -space-x-1.5">
                  {[avatar2, avatar1, avatar4].map((a, i) => (
                    <img
                      key={i}
                      src={a}
                      alt=""
                      className="h-5 w-5 rounded-full border border-card object-cover"
                      loading="lazy"
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Floating card — document */}
            <div className="absolute -left-2 -bottom-6 hidden w-[220px] rounded-xl border border-border bg-card p-3.5 shadow-lift md:block">
              <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                <FileText className="h-3 w-3" /> Document shared
              </div>
              <p className="mt-1.5 text-sm font-medium leading-snug text-foreground">
                FY26 brand guidelines.pdf
              </p>
              <p className="mt-2 text-[11px] text-muted-foreground">2.4 MB · MSA Group</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
