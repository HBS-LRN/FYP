import { Navigate, createBrowserRouter } from "react-router-dom";
import Users from "./views/Users";
import ShoppingCart from "./views/shoppingCart";
import Singup from "./views/SignUp";

import NotFound from "./views/NotFound";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Dashboard from "./views/Dashboard";
import UserForm from "./views/UserForm";
import AccessProhibited from "./views/accessProhibited";
import Index from "./views/Index";
import CustomerLayout from "./components/CustomerLayout";

import ContactUs from "./views/static/ContactUs";
import FAQ from "./views/static/FAQ";
import Service from "./views/static/service";
import Login from "./views/auth/login";
import Aboutus from "./views/static/aboutus";
import Register from "./views/auth/register";

const router = createBrowserRouter([
    {
      path: '/',
      element: <CustomerLayout/>,
      children: [
        {
          path: '/',
          element: <Navigate to="/index"/>
        },
        {
          path: '/index',
          element: <Index/>
        },
        {
          path: '/about',
          element: <Aboutus/>
        },
        {
          path: '/contact',
          element: <ContactUs/>
        },
        {
          path: '/faq',
          element: <FAQ/>
        },
        {
          path: '/service',
          element: <Service/>
        },
        {
          path: '/login',
          element: <Login/>
        },
        {
          path: '/register',
          element: <Register/>
        },

        {
          path: '/users/new',
          element: <UserForm key="userCreate" />
        },
        {
          path: '/users/:id',
          element: <UserForm key="userUpdate" />
        },
        {
          path: '/shoppingCart',
          element: <ShoppingCart/>
        }
      ]
    },
    {
      path: '/',
      element: <GuestLayout/>,
      children: [
        {
          path: '/login',
          element: <Login/>
        },
        {
          path: '/signup',
          element: <Singup/>
        }
      ]
    },
    {
      path: "*",
      element: <NotFound/>
    },
    {
      path: "/accessProhibited",
      element: <AccessProhibited/>
    },
    {
      path: "/index",
      element: <Index/>
    }
    
    

  ])
export default router;