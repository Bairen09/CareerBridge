import { CalendarDays, MapPin, Users } from "lucide-react";
import { SectionHeader } from "./FeaturedNewsCarousel";

const EVENTS = [
  {
    day: "14",
    month: "Nov",
    title: "Leadership offsite — Lisbon",
    tenant: "MSA Group",
    time: "Thu, 09:00 — 17:30 GMT",
    location: "Tivoli Avenida, Lisbon",
    attendees: 32,
    tag: "Strategy",
  },
  {
    day: "19",
    month: "Nov",
    title: "All-hands Q3 review",
    tenant: "Rush People",
    time: "Tue, 14:00 — 15:30 GMT",
    location: "London HQ + Livestream",
    attendees: 412,
    tag: "Town hall",
  },
  {
    day: "22",
    month: "Nov",
    title: "Operations playbook v3.2 walkthrough",
    tenant: "Mana Services",
    time: "Fri, 11:00 — 12:00 GMT",
    location: "Online · Teams",
    attendees: 87,
    tag: "Training",
  },
  {
    day: "28",
    month: "Nov",
    title: "Manchester office launch reception",
    tenant: "Miya Services",
    time: "Thu, 18:30 — 21:00 GMT",
    location: "Spinningfields, Manchester",
    attendees: 124,
    tag: "Culture",
  },
];

export function UpcomingEvents() {
  return (
    <section className="mx-auto mt-24 max-w-[1400px] px-4 sm:px-6">
      <SectionHeader
        eyebrow="Calendar"
        title="Upcoming events"
        description="Group meetings, town halls and culture events from across MSA companies."
      />
      <div className="grid gap-4 lg:grid-cols-2">
        {EVENTS.map((e, i) => (
          <article
            key={i}
            className="group flex gap-5 rounded-2xl border border-border bg-card p-5 shadow-soft transition hover:shadow-card"
          >
            <div className="flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-xl border border-border bg-surface text-center">
              <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--info)]">
                {e.month}
              </span>
              <span className="mt-0.5 text-2xl font-semibold leading-none tracking-tight text-foreground">
                {e.day}
              </span>
            </div>
            <div className="flex flex-1 flex-col">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center rounded-full bg-surface px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-foreground/80">
                  {e.tenant}
                </span>
                <span className="text-[11px] text-muted-foreground">· {e.tag}</span>
              </div>
              <h3 className="mt-2 text-[16px] font-semibold leading-snug text-foreground">
                {e.title}
              </h3>
              <div className="mt-3 grid gap-1.5 text-[12px] text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-3.5 w-3.5" />
                  {e.time}
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5" />
                  {e.location}
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-3.5 w-3.5" />
                  {e.attendees} attending
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <button className="rounded-md bg-[var(--brand-ink)] px-3 py-1.5 text-[12px] font-medium text-primary-foreground transition hover:opacity-90">
                  RSVP
                </button>
                <button className="rounded-md border border-border bg-card px-3 py-1.5 text-[12px] font-medium text-foreground transition hover:bg-surface">
                  Add to calendar
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}