import { apiClient, tokenStore } from "./client";
import type { AuthSession, AuthUser, LoginPayload } from "../../types/index";

export const authApi = {
  async login(payload: LoginPayload): Promise<AuthSession> {
    const response = await apiClient.post(
      "/auth/login",
      payload,
      {
        headers: {
          "x-tenant-slug": payload.tenantSlug,
        },
      },
    );

    const session = response.data.data;

    tokenStore.set(session.accessToken);

    return session;
  },

  async refresh(): Promise<{ accessToken: string }> {
    const response = await apiClient.post("/auth/refresh");

    return response.data.data;
  },

  async me(): Promise<AuthUser | null> {
    try {
      const { data } = await apiClient.get<AuthUser>("/auth/me");
      return data;
    } catch (error: any) {
      if (error?.response?.status === 401) {
        return null;
      }

      throw error;
    }
  },

  async logout(): Promise<void> {
    try {
      await apiClient.post("/auth/logout");
    } finally {
      tokenStore.set(null);
    }
  },
};