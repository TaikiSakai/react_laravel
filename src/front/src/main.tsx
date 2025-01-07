import React from 'react';
import { createRoot } from 'react-dom/client';
import AppRoutes from './AppRoutes.tsx';
import ButtonMUI from './components/header.tsx';
import './css/index.css';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ButtonMUI />
    <AppRoutes />
  </React.StrictMode>
);
