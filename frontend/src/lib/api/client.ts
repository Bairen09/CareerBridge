import axios, { AxiosError, type AxiosInstance, type InternalAxiosRequestConfig } from "axios";

export const API_BASE_URL = "http://localhost:5000/api";

/**
 * In-memory access token store.
 * We deliberately do NOT persist the access token to localStorage —
 * refresh tokens live in an httpOnly cookie issued by the backend.
 */
let accessToken: string | null = null;
let activeTenantSlug: string | null = null;

type TokenListener = (token: string | null) => void;
const tokenListeners = new Set<TokenListener>();

export const tokenStore = {
  get: () => accessToken,
  set: (token: string | null) => {
    accessToken = token;
    tokenListeners.forEach((l) => l(token));
  },
  subscribe: (listener: TokenListener) => {
    tokenListeners.add(listener);
    return () => tokenListeners.delete(listener);
  },
};

export const tenantStore = {
  get: () => activeTenantSlug,
  set: (slug: string | null) => {
    activeTenantSlug = slug;
  },
};

export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = tokenStore.get();
  if (token) {
    config.headers.set("Authorization", `Bearer ${token}`);
  }
  const tenant = tenantStore.get();
  if (tenant) {
    config.headers.set("x-tenant-slug", tenant);
  }
  return config;
});

/* -------- Refresh-token rotation architecture --------
 * On 401: call /auth/refresh once, queue concurrent failed requests,
 * retry them with the new token. On refresh failure, clear the session.
 */
let isRefreshing = false;
let refreshQueue: Array<(token: string | null) => void> = [];

const subscribeRefresh = (cb: (token: string | null) => void) => {
  refreshQueue.push(cb);
};
const flushQueue = (token: string | null) => {
  refreshQueue.forEach((cb) => cb(token));
  refreshQueue = [];
};

export type SessionExpiredHandler = () => void;
let onSessionExpired: SessionExpiredHandler | null = null;
export const setSessionExpiredHandler = (handler: SessionExpiredHandler | null) => {
  onSessionExpired = handler;
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
    if (!originalRequest || error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }
    const url = originalRequest.url ?? "";
    if (url.includes("/auth/refresh") || url.includes("/auth/login")) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        subscribeRefresh((token) => {
          if (!token) return reject(error);
          originalRequest._retry = true;
          originalRequest.headers.set("Authorization", `Bearer ${token}`);
          resolve(apiClient(originalRequest));
        });
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;
    try {
    const response = await apiClient.post("/auth/refresh");
    const newToken = response.data.data.accessToken;
    tokenStore.set(newToken);
    flushQueue(newToken);
    originalRequest.headers.set("Authorization", `Bearer ${newToken}`);
      return apiClient(originalRequest);
    } catch (refreshError) {
      flushQueue(null);
      tokenStore.set(null);
      onSessionExpired?.();
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);