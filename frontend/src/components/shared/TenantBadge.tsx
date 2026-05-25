import { Building2 } from "lucide-react";
import { useTenant } from "../../contexts/TenantContext";

export function TenantBadge() {
  const { tenantSlug } = useTenant();

  const tenantNameMap: Record<string, string> = {
    "msa-group": "MSA Group",
    "rush-people": "Rush People",
    "mana-services": "Mana Services",
    "miya-services": "Miya Services",
  };

  const tenantTaglineMap: Record<string, string> = {
    "msa-group": "Group Workplace",
    "rush-people": "People & Recruitment",
    "mana-services": "Operations Excellence",
    "miya-services": "Service Delivery",
  };

  const name = tenantNameMap[tenantSlug] || "MSA Group";
  const tagline = tenantTaglineMap[tenantSlug] || "Internal Workplace";

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground shadow-soft">
      <Building2 className="h-3.5 w-3.5 text-[var(--info)]" />

      <span className="text-foreground">{name}</span>

      <span className="hidden text-muted-foreground/70 sm:inline">
        ·
      </span>

      <span className="hidden sm:inline">{tagline}</span>
    </div>
  );
}