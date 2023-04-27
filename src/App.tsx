import { SiteHeader } from '@/components/site-header';
import { router } from '@/lib/routes';
import { Outlet, RouterProvider } from '@tanstack/router';
import React from 'react';
import { SWRConfig } from 'swr';

function App() {
  return (
    <>
      <SiteHeader />
      <main className="container h-full py-8">
        <Outlet />
      </main>
    </>
  );
}

export default App;

export const Root = () => (
  <React.StrictMode>
    <SWRConfig
      value={{
        fetcher: (resource, init) => fetch(resource, init).then(res => res.json()),
        provider: () => new Map(),
      }}
    >
      <RouterProvider router={router} />
    </SWRConfig>
  </React.StrictMode>
);
