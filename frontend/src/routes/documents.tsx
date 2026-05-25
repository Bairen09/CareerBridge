import { FolderOpen } from "lucide-react";
import { MainLayout } from "../components/layouts/MainLayout";
import { PagePlaceholder } from "../components/shared/PagePlaceholder";

export function DocumentsPage() {
  return (
    <MainLayout>
      <PagePlaceholder
        eyebrow="Knowledge"
        title="Documents"
        description="The single source of truth for policies, handbooks, templates and internal references across the group."
        icon={FolderOpen}
        upcoming={[
          "Tenant-scoped document libraries",
          "Versioning and acknowledgement tracking",
          "Full-text search across files",
          "Granular sharing and access controls",
        ]}
      />
    </MainLayout>
  );
}