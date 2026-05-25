import { Users } from "lucide-react";
import { MainLayout } from "../components/layouts/MainLayout";
import { PagePlaceholder } from "../components/shared/PagePlaceholder";

export function PeoplePage() {
  return (
    <MainLayout>
      <PagePlaceholder
        eyebrow="Directory"
        title="People"
        description="Search and explore the org structure across every company in the group, with profiles, reporting lines and team views."
        icon={Users}
        upcoming={[
          "Searchable employee directory",
          "Interactive org chart",
          "Department and location filters",
          "Per-profile activity timeline",
        ]}
      />
    </MainLayout>
  );
}