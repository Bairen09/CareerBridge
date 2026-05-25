import React from "react";
import ReactDOM from "react-dom/client";

import {
  RouterProvider,
} from "@tanstack/react-router";

import { router } from "./router";

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import { AuthProvider } from "./contexts/AuthContext";
import { TenantProvider } from "./contexts/TenantContext";

import "./styles.css";

const queryClient = new QueryClient();



ReactDOM.createRoot(
  document.getElementById("root")!,
).render(
  
    <QueryClientProvider client={queryClient}>
      <TenantProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </TenantProvider>
    </QueryClientProvider>
  
);