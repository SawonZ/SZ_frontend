import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './shared/styles/index.css';
import { RouterProvider } from 'react-router-dom';
import router from './router/index.jsx';
import LandingHeader from './shared/components/LandingHeader.jsx';
import AuthProvider from './provider/AuthProvider';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}>
        <LandingHeader />
        <App />
      </RouterProvider>
    </AuthProvider>
  </StrictMode>
)
