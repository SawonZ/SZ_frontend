import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './shared/styles/index.css';
import { RouterProvider } from 'react-router-dom';
import router from './router/index.jsx';
import LandingHeader from './shared/components/LandingHeader.jsx';
import AuthProvider from './provider/AuthProvider.jsx';

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <RouterProvider router={router}>
      <StrictMode>
        <LandingHeader />
        <App />
      </StrictMode>,
    </RouterProvider>
  </AuthProvider>
)
