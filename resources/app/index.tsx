import { StrictMode } from 'react';

import '@/styles/index.scss';
import ReactDOM from 'react-dom/client';
import { RouteObject, RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App';
import { RootAdminRouter, RootClientRouter, RootSimpleRouter } from './routes';
import { AppProvider } from './AppProvider';

//Define all routes here
const routes: RouteObject[] = [...RootClientRouter, ...RootAdminRouter, ...RootSimpleRouter];

const router = createBrowserRouter(routes, {
  // basename: process.env.PUBLIC_URL,
});

ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
  <StrictMode>
    <AppProvider>
      <App>
        <RouterProvider router={router} />
      </App>
    </AppProvider>
  </StrictMode>,
);
