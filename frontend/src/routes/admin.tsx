import { ShieldCheck } from "lucide-react";
import { MainLayout } from "../components/layouts/MainLayout";
import { PagePlaceholder } from "../components/shared/PagePlaceholder";

export function AdminPage() {
  return (
    <MainLayout>
      <PagePlaceholder
        eyebrow="Administration"
        title="Admin console"
        description="Manage tenants, users, branding and permissions across MSA Group and its subsidiaries — restricted to super admins and tenant admins."
        icon={ShieldCheck}
        upcoming={[
          "Super admin console for MSA Group",
          "Per-tenant admin tools for Rush People, Mana, Miya",
          "Branding, domains and SSO configuration",
          "Role and permission management",
        ]}
      />
    </MainLayout>
  );
}