import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import router from './router.jsx';
import { ContextProvider } from './contexts/ContextProvider.jsx';
import { NotificationProvider } from './contexts/NotificationProvider.jsx';
import OffLine from './views/error/Offline.jsx';

const rootElement = document.getElementById('root');

const renderApp = () => {
  const isOnline = navigator.onLine;

  ReactDOM.render(
    isOnline ? (
      <React.StrictMode>
        <ContextProvider>
          <NotificationProvider>
            <RouterProvider router={router}>
              <App />
            </RouterProvider>
          </NotificationProvider>
        </ContextProvider>
      </React.StrictMode>
    ) : (
      <OffLine />
    ),
    rootElement
  );
};

// Initial rendering
renderApp();

// Listen for online/offline events
window.addEventListener('online', renderApp);
window.addEventListener('offline', renderApp);
