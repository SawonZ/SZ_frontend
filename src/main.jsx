import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './shared/styles/reset.css';
import { RouterProvider } from 'react-router-dom';
import router from './router/index.jsx';

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}>
    <StrictMode>
      <App />
    </StrictMode>,
  </RouterProvider>
)
