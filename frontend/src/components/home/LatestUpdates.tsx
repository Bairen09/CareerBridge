import { ArrowUpRight } from "lucide-react";
import { SectionHeader } from "./FeaturedNewsCarousel";

const UPDATES = [
  {
    tenant: "Rush People",
    date: "Today",
    title: "New onboarding flow rolling out to all new joiners from Monday",
    excerpt: "A streamlined day-one experience, plus a buddy programme for every new joiner.",
  },
  {
    tenant: "Mana Services",
    date: "Yesterday",
    title: "Q3 OKR review — outcomes published in the operations workspace",
    excerpt: "All delivery teams hit or exceeded their committed targets this quarter.",
  },
  {
    tenant: "Miya Services",
    date: "2 days ago",
    title: "Operations cohort #14 begins next Monday in Manchester",
    excerpt: "120 colleagues join the support network, expanding 24/7 client coverage.",
  },
  {
    tenant: "MSA Group",
    date: "3 days ago",
    title: "Updated information security policy — please re-acknowledge",
    excerpt: "Annual policy refresh covering acceptable use, data handling and incident reporting.",
  },
  {
    tenant: "MSA Group",
    date: "Last week",
    title: "Group benefits portal redesigned with a clearer life-event flow",
    excerpt: "Updates to pension, healthcare, and remote-working stipend selections.",
  },
  {
    tenant: "Rush People",
    date: "Last week",
    title: "Promotion cycle opens — submit nominations before 30 November",
    excerpt: "All line managers are invited to nominate colleagues for the autumn cycle.",
  },
];

export function LatestUpdates() {
  return (
    <section className="mx-auto mt-24 max-w-[1400px] px-4 sm:px-6">
      <SectionHeader
        eyebrow="Latest"
        title="Company updates"
        description="Posts from across MSA Group and its subsidiaries."
        action={
          <button className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-sm font-medium text-foreground shadow-soft transition hover:bg-surface">
            View all
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        }
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {UPDATES.map((u, i) => (
          <article
            key={i}
            className="group flex h-full flex-col rounded-2xl border border-border bg-card p-5 shadow-soft transition hover:shadow-card"
          >
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-surface px-2.5 py-0.5 text-[11px] font-medium text-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--info)]" />
                {u.tenant}
              </span>
              <span className="text-[11px] text-muted-foreground">{u.date}</span>
            </div>
            <h3 className="mt-4 text-[15px] font-semibold leading-snug tracking-tight text-foreground">
              {u.title}
            </h3>
            <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">{u.excerpt}</p>
            <div className="mt-5 flex items-center justify-between border-t border-border pt-3 text-[12px] text-muted-foreground">
              <span>Read story</span>
              <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}