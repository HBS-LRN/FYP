import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { BrowserRouter as Router } from "react-router-dom"
import router from './router.jsx'
import { ContextProvider } from './contexts/ContextProvider.jsx'
import { NotificationProvider } from './contexts/NotificationProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContextProvider>
      <NotificationProvider>
         {/* <Route path="/" element={<App />} /> */}
        <RouterProvider router={router} />
      </NotificationProvider>
    </ContextProvider>
  </React.StrictMode>,
)
