import { Award, Sparkles } from "lucide-react";
import avatar1 from "../../assets/avatar-1.jpg";
import avatar2 from "../../assets/avatar-2.jpg";
import avatar3 from "../../assets/avatar-3.jpg";
import avatar4 from "../../assets/avatar-4.jpg";
import { SectionHeader } from "./FeaturedNewsCarousel";

const FEATURED = {
  name: "Priya Raman",
  role: "Chief Operating Officer",
  tenant: "Mana Services",
  quote:
    "What I love most about MSA is how every team — from Rush People to Miya — works from the same playbook. We win together.",
  highlight: "10 years at the group",
  avatar: avatar3,
};

const NEW_JOINERS = [
  { name: "Elena Marchetti", role: "Senior Brand Designer", tenant: "MSA Group", avatar: avatar1 },
  { name: "James Holloway", role: "Engineering Manager", tenant: "Rush People", avatar: avatar2 },
  { name: "Daniel Mensah", role: "Operations Lead", tenant: "Miya Services", avatar: avatar4 },
];

export function EmployeeSpotlight() {
  return (
    <section className="mx-auto mt-24 max-w-[1400px] px-4 sm:px-6">
      <SectionHeader
        eyebrow="People"
        title="Employee spotlight"
        description="Celebrating the colleagues who make MSA Group what it is."
      />
      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <article className="relative overflow-hidden rounded-2xl border border-border bg-card p-7 shadow-card">
          <div className="absolute right-6 top-6 inline-flex items-center gap-1.5 rounded-full bg-surface px-2.5 py-1 text-[11px] font-medium text-foreground">
            <Award className="h-3 w-3 text-[var(--warning)]" />
            {FEATURED.highlight}
          </div>
          <div className="flex items-start gap-5">
            <img
              src={FEATURED.avatar}
              alt={FEATURED.name}
              loading="lazy"
              width={96}
              height={96}
              className="h-24 w-24 rounded-2xl object-cover ring-1 ring-border"
            />
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--info)]">
                {FEATURED.tenant}
              </p>
              <h3 className="mt-1 text-xl font-semibold tracking-tight text-foreground">
                {FEATURED.name}
              </h3>
              <p className="text-sm text-muted-foreground">{FEATURED.role}</p>
            </div>
          </div>
          <blockquote className="mt-6 max-w-xl text-[17px] leading-relaxed text-foreground/90">
            &ldquo;{FEATURED.quote}&rdquo;
          </blockquote>
        </article>

        <aside className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--info)]">
            <Sparkles className="h-3 w-3" /> New joiners this month
          </div>
          <ul className="mt-5 space-y-4">
            {NEW_JOINERS.map((p) => (
              <li key={p.name} className="flex items-center gap-3.5">
                <img
                  src={p.avatar}
                  alt=""
                  loading="lazy"
                  width={48}
                  height={48}
                  className="h-12 w-12 rounded-xl object-cover ring-1 ring-border"
                />
                <div className="flex-1 leading-tight">
                  <p className="text-sm font-semibold text-foreground">{p.name}</p>
                  <p className="text-[12px] text-muted-foreground">{p.role}</p>
                </div>
                <span className="rounded-full bg-surface px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-foreground/80">
                  {p.tenant}
                </span>
              </li>
            ))}
          </ul>
          <button className="mt-6 w-full rounded-lg border border-border bg-surface px-3 py-2 text-[13px] font-medium text-foreground transition hover:bg-card">
            View people directory
          </button>
        </aside>
      </div>
    </section>
  );
}