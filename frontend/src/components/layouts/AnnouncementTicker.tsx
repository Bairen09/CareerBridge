import { Megaphone } from "lucide-react";

const ITEMS = [
  "Q3 All-Hands livestream — Thursday 14:00 GMT, hosted from MSA Group HQ",
  "Rush People wins UK Workforce Partner of the Year",
  "New parental leave policy live across all MSA Group entities",
  "Mana Services onboarding cohort #14 starts next Monday",
  "Miya Services operations playbook v3.2 published",
  "IT maintenance window: Saturday 02:00–04:00 GMT",
];

export function AnnouncementTicker() {
  const loop = [...ITEMS, ...ITEMS];
  return (
    <div className="border-y border-border bg-[var(--brand-ink)] text-primary-foreground/90">
      <div className="mx-auto flex max-w-[1400px] items-center gap-4 px-4 py-2.5 sm:px-6">
        <div className="flex shrink-0 items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary-foreground">
          <Megaphone className="h-3.5 w-3.5" />
          <span>Group-wide</span>
        </div>
        <div className="relative flex-1 overflow-hidden">
          <div className="flex w-max gap-10 whitespace-nowrap animate-ticker text-sm">
            {loop.map((item, i) => (
              <span key={i} className="inline-flex items-center gap-3">
                <span className="h-1 w-1 rounded-full bg-primary-foreground/40" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}