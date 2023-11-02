import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import router from './router.jsx';
import { ContextProvider } from './contexts/ContextProvider.jsx';
import { NotificationProvider } from './contexts/NotificationProvider.jsx';

ReactDOM.render(
  <React.StrictMode>
    <ContextProvider>
      <NotificationProvider>
        <RouterProvider router={router}>
          <App />
        </RouterProvider>
      </NotificationProvider>
    </ContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
