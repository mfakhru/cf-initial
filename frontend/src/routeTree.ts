import { createRootRoute, createRoute } from "@tanstack/react-router";
import { RootLayout } from "./routes/__root";
import { HomePage } from "./routes/index";
import { HealthPage } from "./routes/health";

const rootRoute = createRootRoute({ component: RootLayout });
const indexRoute = createRoute({ getParentRoute: () => rootRoute, path: "/", component: HomePage });
const healthRoute = createRoute({ getParentRoute: () => rootRoute, path: "/health", component: HealthPage });

export const routeTree = rootRoute.addChildren([indexRoute, healthRoute]);
