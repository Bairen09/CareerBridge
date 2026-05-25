import { Link } from "@tanstack/react-router";
import { Logo } from "../shared/Logo";

const SECTIONS = [
  {
    title: "Workspace",
    links: [
      { label: "News", to: "/news" as const },
      { label: "People directory", to: "/people" as const },
      { label: "Events", to: "/events" as const },
      { label: "Documents", to: "/documents" as const },
    ],
  },
  {
    title: "Group",
    links: [
      { label: "MSA Group", to: "/" as const },
      { label: "Rush People", to: "/" as const },
      { label: "Mana Services", to: "/" as const },
      { label: "Miya Services", to: "/" as const },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help centre", to: "/" as const },
      { label: "IT requests", to: "/" as const },
      { label: "HR contact", to: "/" as const },
      { label: "Report an issue", to: "/" as const },
    ],
  },
];

export function AppFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-surface">
      <div className="mx-auto max-w-[1400px] px-4 py-14 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              The MSA Group internal workplace — one secure home for company news, events,
              people, and operations across Rush People, Mana Services and Miya Services.
            </p>
          </div>
          {SECTIONS.map((s) => (
            <div key={s.title}>
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                {s.title}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {s.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      to={l.to}
                      className="text-sm text-foreground/80 transition hover:text-foreground"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <span>© {new Date().getFullYear()} MSA Group. Internal use only.</span>
          <div className="flex items-center gap-5">
            <span>Acceptable use policy</span>
            <span>Information security</span>
            <span>Data protection</span>
          </div>
        </div>
      </div>
    </footer>
  );
}