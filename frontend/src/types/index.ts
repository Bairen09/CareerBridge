export type TenantSlug = "msa-group" | "rush-people" | "mana-services" | "miya-services";

export interface Tenant {
  slug: TenantSlug;
  name: string;
  shortName: string;
  tagline: string;
  isParent?: boolean;
}

export type UserRole = "super_admin" | "admin" | "employee";

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  tenantSlug: TenantSlug;
  jobTitle?: string;
  department?: string;
  avatarUrl?: string;
}

export interface LoginPayload {
  tenantSlug: string;
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface AuthSession {
  accessToken: string;
  user: AuthUser;
}