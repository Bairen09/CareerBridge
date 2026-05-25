
import {
  RootRoute,
  Route,
  Router,
  Outlet,
} from "@tanstack/react-router";
import { NewsPage } from "./routes/news";
import { QueryClient } from "@tanstack/react-query";

import { HomePage } from "./routes/index";
import { LoginPage } from "./routes/login";

import { PeoplePage } from "./routes/people";
import { EventsPage } from "./routes/events";
import { DocumentsPage } from "./routes/documents";
import { AdminPage } from "./routes/admin";

const queryClient = new QueryClient();

const rootRoute = new RootRoute({
  component: () => <Outlet />,
});

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const loginRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
});

const newsRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/news",
  component: NewsPage,
});

const peopleRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/people",
  component: PeoplePage,
});

const eventsRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/events",
  component: EventsPage,
});

const documentsRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/documents",
  component: DocumentsPage,
});

const adminRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  newsRoute,
  peopleRoute,
  eventsRoute,
  documentsRoute,
  adminRoute,
]);

export const router = new Router({
  routeTree,
  context: {
    queryClient,
  },
});