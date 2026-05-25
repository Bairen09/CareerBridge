import type { ReactNode } from "react";
import { AppHeader } from "./AppHeader";
import { AppFooter } from "./AppFooter";
import { AnnouncementTicker } from "./AnnouncementTicker";

export function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <AppHeader />
      <AnnouncementTicker />
      <main className="flex-1">{children}</main>
      <AppFooter />
    </div>
  );
}