import { Link } from "@tanstack/react-router";

import { useTenant } from "../../contexts/TenantContext";

interface LogoProps {
  variant?: "default" | "compact";
  className?: string;
}

export function Logo({
  variant = "default",
  className = "",
}: LogoProps) {
  const { tenant } = useTenant();

  const companyName =
    tenant?.name || "MSA Group";

  const shortName = companyName
    .split(" ")
    .map((w) => w[0])
    .slice(0, 3)
    .join("")
    .toUpperCase();

  return (
    <Link
      to="/"
      className={`group inline-flex items-center gap-2.5 ${className}`}
    >
      <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--brand-ink)] text-primary-foreground shadow-soft">
        {tenant?.branding?.logo ? (
          <img
            src={tenant.branding.logo}
            alt={companyName}
            className="h-full w-full rounded-lg object-cover"
          />
        ) : (
          <span className="text-[13px] font-semibold tracking-tight">
            {shortName}
          </span>
        )}

        <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-[var(--info)] ring-2 ring-background" />
      </span>

      {variant === "default" && (
        <div className="flex flex-col leading-tight">
          <span className="text-[15px] font-semibold tracking-tight text-foreground">
            {companyName}
          </span>

          <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
            Workplace
          </span>
        </div>
      )}
    </Link>
  );
}