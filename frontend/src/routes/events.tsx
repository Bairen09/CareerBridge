import { CalendarDays } from "lucide-react";
import { MainLayout } from "../components/layouts/MainLayout";
import { PagePlaceholder } from "../components/shared/PagePlaceholder";

export function EventsPage() {
  return (
    <MainLayout>
      <PagePlaceholder
        eyebrow="Calendar"
        title="Events"
        description="Browse upcoming town halls, training sessions and culture events. RSVP and add to your calendar in a click."
        icon={CalendarDays}
        upcoming={[
          "Combined and per-tenant calendars",
          "RSVP, waitlists and capacity limits",
          "ICS export and Outlook sync",
          "Live event check-in for in-person events",
        ]}
      />
    </MainLayout>
  );
}