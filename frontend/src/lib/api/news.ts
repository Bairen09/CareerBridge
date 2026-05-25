import { apiClient } from "./client";

export interface NewsItem {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  featuredImage?: string;
  tenantId?: {
    name: string;
    slug: string;
  };
  authorId?: {
    name: string;
  };
  createdAt: string;
  isFeatured?: boolean;
}

export const newsApi = {
  async getFeatured(): Promise<NewsItem[]> {
    const response = await apiClient.get(
      "/news/featured",
    );

    console.log(response.data);
    return response.data.data.news;
  },

  async getAll(): Promise<NewsItem[]> {
    const response = await apiClient.get(
      "/news",
    );

    return response.data.data.news;
  },
};