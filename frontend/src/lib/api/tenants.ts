import { apiClient } from "./client";

export const tenantApi = {
  async getCurrent(slug: string) {
    const response = await apiClient.get(
      "/tenants/current",
      {
        headers: {
          "x-tenant-slug": slug,
        },
      },
    );

    return response.data.data.tenant;
  },
};