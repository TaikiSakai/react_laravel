import React from 'react';
import { createRoot } from 'react-dom/client';
import AppRoutes from './AppRoutes.tsx';
import './css/index.css';
import { CurrentUserProvider } from './contexts/currentUserContext';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CurrentUserProvider>
      <AppRoutes />
    </CurrentUserProvider>
    {/* <AppRoutes /> */}
  </React.StrictMode>
);
