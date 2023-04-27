import App from '@/App';
import CharacterPage from '@/pages/character/character-page';
import HomePage from '@/pages/home/home-page';
import { RootRoute, Route, Router } from '@tanstack/router';

// Create a root route
export const rootRoute = new RootRoute({
  component: App,
});

export const homeRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

export const characterRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/character/$id',
  component: CharacterPage,
});

// Create the route tree using your routes
const routeTree = rootRoute.addChildren([homeRoute, characterRoute]);

// Create the router using your route tree
export const router = new Router({ routeTree });

// Register your router for maximum type safety
declare module '@tanstack/router' {
  interface Register {
    router: typeof router;
  }
}
