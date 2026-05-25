import { Newspaper } from "lucide-react";

import { MainLayout } from "../components/layouts/MainLayout";
import { PagePlaceholder } from "../components/shared/PagePlaceholder";

export function NewsPage() {
  return (
    <MainLayout>
      <PagePlaceholder
        eyebrow="Communications"
        title="Company news"
        description="A unified feed of announcements, posts and stories from MSA Group, Rush People, Mana Services and Miya Services."
        icon={Newspaper}
        upcoming={[
          "Filterable news feed per tenant",
          "Rich-text editor for admins",
          "Reactions, comments and read receipts",
          "Pinned posts and scheduled publishing",
        ]}
      />
    </MainLayout>
  );
}