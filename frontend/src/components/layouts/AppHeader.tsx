import * as React from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Bell, ChevronDown, LogIn, Menu, Search, X } from "lucide-react";
import { Logo } from "../shared/Logo";
import { useTenant } from "../../contexts/TenantContext";
import { useAuth } from "../../contexts/AuthContext";


const NAV = [
  { to: "/" as const, label: "Home" },
  { to: "/news" as const, label: "News" },
  { to: "/people" as const, label: "People" },
  { to: "/events" as const, label: "Events" },
  { to: "/documents" as const, label: "Documents" },
];

export function AppHeader() {
  const { tenantSlug } = useTenant();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = React.useState(false);


  return (
    <header className="sticky top-0 z-40 border-b border-border bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-[72px] max-w-[1400px] items-center gap-4 px-4 sm:px-6">
        <Logo />


        <nav className="ml-2 hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              activeProps={{ className: "text-foreground bg-surface" }}
              inactiveProps={{ className: "text-muted-foreground" }}
              className="rounded-lg px-3 py-1.5 text-sm font-medium transition hover:bg-surface hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <div className="relative hidden xl:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search people, news, documents…"
              className="h-9 w-80 rounded-lg border border-border bg-white shadow-soft pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/30"
            />
            <kbd className="absolute right-2 top-1/2 -translate-y-1/2 rounded border border-border bg-surface px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
              ⌘K
            </kbd>
          </div>

          <button
            type="button"
            aria-label="Notifications"
            className="relative hidden h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition hover:bg-surface hover:text-foreground sm:inline-flex"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[var(--info)]" />
          </button>

          {isAuthenticated && user ? (
            <div className="hidden items-center gap-2.5 rounded-lg border border-border bg-card px-2 py-1 shadow-soft sm:flex">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-surface text-[11px] font-semibold text-foreground">
                {user.name
                  .split(" ")
                  .map((n: string) => n[0])
                  .slice(0, 2)
                  .join("")}
              </span>
              <span className="flex flex-col leading-tight pr-1">
                <span className="text-[13px] font-medium text-foreground">{user.name}</span>
                <span className="text-[11px] text-muted-foreground">{user.role}</span>
              </span>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => navigate({ to: "/login" })}
              className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-[#081225] px-3.5 text-sm font-medium text-primary-foreground shadow-soft transition hover:opacity-90 hover:bg-[#0d1b33]"
            >
              <LogIn className="h-3.5 w-3.5" />
              Sign in
            </button>
          )}

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Menu"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-foreground lg:hidden"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-border bg-card px-4 py-3 lg:hidden">
          <nav className="flex flex-col gap-1">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-surface"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}