import * as React from "react";
import { authApi } from "../lib/api/auth";
import { setSessionExpiredHandler, tokenStore } from "../lib/api/client";
import type { AuthUser, LoginPayload } from "../types/index";

interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isInitializing: boolean;
  login: (payload: LoginPayload) => Promise<AuthUser>;
  logout: () => Promise<void>;
}

const AuthContext = React.createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<AuthUser | null>(null);
  const [isInitializing, setIsInitializing] = React.useState(true);

  // Bootstrap: try silent refresh on mount.
  React.useEffect(() => {
  let cancelled = false;

  (async () => {
    try {
      const session = await authApi.refresh();

      tokenStore.set(session.accessToken);

      const me = await authApi.me();

      if (!cancelled) {
        setUser(me);
      }
    }
    catch (error: any) {
      if (error?.response?.status !== 401) {
        console.error(error);
      }

      if (!cancelled) {
        setUser(null);
      }
    }
     finally {
      if (!cancelled) {
        setIsInitializing(false);
      }
    }
  })();

  return () => {
    cancelled = true;
  };
}, []);

  React.useEffect(() => {
    setSessionExpiredHandler(() => {
      setUser(null);
      tokenStore.set(null);
    });
    return () => setSessionExpiredHandler(null);
  }, []);

  const login = React.useCallback(async (payload: LoginPayload) => {
    const session = await authApi.login(payload);

    tokenStore.set(session.accessToken);

    setUser(session.user);

    return session.user;
  }, []);

  const logout = React.useCallback(async () => {
    await authApi.logout();
    setUser(null);
  }, []);

  const value = React.useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: !!user,
      isInitializing,
      login,
      logout,
    }),
    [user, isInitializing, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = React.useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}