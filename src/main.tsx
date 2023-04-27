import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from '@tanstack/router';
import './index.css';
import { router } from '@/lib/routes';
import { SWRConfig } from 'swr';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
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
