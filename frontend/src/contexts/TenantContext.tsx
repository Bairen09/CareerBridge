import * as React from "react";

import { tenantApi } from "../lib/api/tenants";
import { tenantStore } from "../lib/api/client";

interface Tenant {
  _id: string;
  name: string;
  slug: string;

  branding: {
    logo?: string;
    primaryColor?: string;
    secondaryColor?: string;
    heroImage?: string;
    heroTagline?: string;
    font?: string;
  };
}

interface TenantContextValue {
  tenant: Tenant | null;
  isLoading: boolean;
  setTenantSlug: (slug: string) => void;
  tenantSlug: string;
}

const TenantContext =
  React.createContext<TenantContextValue | null>(null);

const STORAGE_KEY = "msa-tenant-slug";

export function TenantProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [tenant, setTenant] =
    React.useState<Tenant | null>(null);

  const [isLoading, setIsLoading] =
    React.useState(true);

  const [tenantSlug, setTenantSlugState] =
    React.useState<string>(() => {
      return (
        localStorage.getItem(STORAGE_KEY) ||
        "msa-group"
      );
    });

  const setTenantSlug = (slug: string) => {
    localStorage.setItem(STORAGE_KEY, slug);

    tenantStore.set(slug);

    setTenantSlugState(slug);
  };

  React.useEffect(() => {
    tenantStore.set(tenantSlug);

    const loadTenant = async () => {
      try {
        setIsLoading(true);

        const data =
          await tenantApi.getCurrent(
            tenantSlug,
          );

        setTenant(data);
      } catch (error: any) {
          if (error?.response?.status === 401) {
            setTenant(null);
            return;
          }

          console.error(error);
        }finally {
        setIsLoading(false);
      }
    };

    loadTenant();
  }, [tenantSlug]);

  const value = {
    tenant,
    isLoading,
    tenantSlug,
    setTenantSlug,
  };

  return (
    <TenantContext.Provider value={value}>
      {children}
    </TenantContext.Provider>
  );
}

export function useTenant() {
  const context =
    React.useContext(TenantContext);

  if (!context) {
    throw new Error(
      "useTenant must be used within TenantProvider",
    );
  }

  return context;
}