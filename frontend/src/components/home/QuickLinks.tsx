import {
  BookOpen,
  CalendarPlus,
  CreditCard,
  FileText,
  Headphones,
  LifeBuoy,
  Plane,
  Users,
} from "lucide-react";
import { SectionHeader } from "./FeaturedNewsCarousel";

const LINKS = [
  { icon: Plane, label: "Request time off", desc: "Holiday & leave" },
  { icon: CreditCard, label: "Expense claim", desc: "Submit & track" },
  { icon: FileText, label: "Payslips", desc: "Latest & history" },
  { icon: CalendarPlus, label: "Book a room", desc: "Office spaces" },
  { icon: Users, label: "Org chart", desc: "Who reports to who" },
  { icon: BookOpen, label: "Handbook", desc: "Policies & how-tos" },
  { icon: Headphones, label: "IT helpdesk", desc: "Open a ticket" },
  { icon: LifeBuoy, label: "Employee support", desc: "Wellbeing & EAP" },
];

export function QuickLinks() {
  return (
    <section className="mx-auto mt-24 max-w-[1400px] px-4 sm:px-6">
      <SectionHeader
        eyebrow="Shortcuts"
        title="Quick links"
        description="The tools your team uses every day, one click away."
      />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {LINKS.map((l) => (
          <button
            key={l.label}
            className="group flex items-center gap-3.5 rounded-2xl border border-border bg-card p-4 text-left shadow-soft transition hover:-translate-y-0.5 hover:shadow-card"
          >
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-surface text-foreground transition group-hover:bg-[var(--brand-ink)] group-hover:text-primary-foreground">
              <l.icon className="h-5 w-5" />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-sm font-semibold text-foreground">{l.label}</span>
              <span className="text-[12px] text-muted-foreground">{l.desc}</span>
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}