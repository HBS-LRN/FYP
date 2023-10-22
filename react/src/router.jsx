import { Navigate, createBrowserRouter } from "react-router-dom";
import Users from "./views/Users";
import ShoppingCart from "./views/shoppingCart";
import Singup from "./views/SignUp";

import NotFound from "./views/NotFound";
import GuestLayout from "./components/StaffLayout";
import AccessProhibited from "./views/accessProhibited";
import Index from "./views/Index";
import CustomerLayout from "./components/CustomerLayout";

import ContactUs from "./views/static/ContactUs";
import FAQ from "./views/static/FAQ";
import Service from "./views/static/service";



import Profile from "./views/profile/Profile";
import ChangePassword from "./views/profile/ChangePassword";
import Dashboard from "./views/profile/Dashboard";
import OrderStatus from "./views/profile/OrderStatus";
import VerifyEmail from "./views/auth/Verify-Email";
import Login from "./views/auth/login";
import Register from "./views/auth/register";
import ResetPassword from "./views/auth/ResetPassword";
import Addresses from "./views/address/addresses";
import AddressForm from "./views/address/addressForm";
import CheckOut from "./views/shoppingCart/checkOut";

import MyReservation from "./views/profile/MyReservation";
import RealTimeOrderTracking from "./views/profile/RealTimeOrderTracking";
import MyOrder from "./views/profile/MyOrders";
import Aboutus from "./views/static/Aboutus";
import NuritionMenuCard from "./views/menu/NutritionMenuCard";
import OrderMenuCard from "./views/menu/OrderMenuCard";
import CategoryMenuCard from "./views/menu/CategoryMenuCard";
import StaffLayout from "./components/StaffLayout";
import DashBoard from "./views/staff/DashBoard";
import MealsList from "./views/staff/meal/MealsList";

import MealDetail from "./views/staff/meal/MealDetail";
import Customers from "./views/staff/customer/CustomersList";

import Orders from "./views/staff/Orders";
import AddMeal from "./views/staff/meal/AddMeal";
import FloorPlanMapping from "./views/reservation/FloorPlanMapping";
import RequestBMI from "./views/auth/Request-BMI";
import LoginSample from "./views/Login";
import ReservationForm from "./views/reservation/ReservationForm";
import CustomersList from "./views/staff/customer/CustomersList";

import AddCustomer from "./views/staff/customer/AddCustomer";
const router = createBrowserRouter([
  {
    path: '/',
    element: <CustomerLayout />,
    children: [
      {
        path: '/',
        element: <Navigate to="/index" />
      },
      {
        path: '/index',
        element: <Index />
      },
      {
        path: '/about',
        element: <Aboutus />
      },
      {
        path: '/contact',
        element: <ContactUs />
      },
      {
        path: '/faq',
        element: <FAQ />
      },
      {
        path: '/service',
        element: <Service />
      },
      {
        path: '/login',
        element: <Login />
      },
      
      {
       path:'/RequestBMI',
       element: <RequestBMI />
      },
      {
        path: '/register',
        element: <Register />
      },

      {
        path: '/profile',
        element: <Profile />
      },
      {
        path: '/changePassword',
        element: <ChangePassword />
      },
      {
        path: '/dashboard',
        element: <Dashboard />
      },
      {
        path: '/orderStatus',
        element: <OrderStatus />
      },

      {
        path: '/forgetPassword',
        element: <VerifyEmail />
      },
      {
        path: '/resetPassword',
        element: <ResetPassword />
      },
      {
        path: '/addresses',
        element: <Addresses />
      },
      {
        path: '/address/new',
        element: <AddressForm />
      },

      {
        path: '/checkOut',
        element: <CheckOut />
      },
      {
        path: '/nutritionMenuCard',
        element: <NuritionMenuCard />
      },
      {
        path: '/orderMenuCard',
        element: <OrderMenuCard />
      },
      {
        path: '/categoryMenuCard',
        element: <CategoryMenuCard />
      },




      {
        path: '/myReservation',
        element: <MyReservation />
      },
      {
        path: '/reservationForm',
        element: <ReservationForm />
      },
      {
        path: '/myOrder',
        element: <MyOrder />

      },
     
      
      // {
      //   path: '/purchaseStatus',
      //   element: <PurchaseStatus/>
      // },

      // {
      //   path: '/users/new',
      //   element: <UserForm key="userCreate" />
      // },
      // {
      //   path: '/users/:id',
      //   element: <UserForm key="userUpdate" />
      // },
      // {
      //   path: '/shoppingCart',
      //   element: <ShoppingCart/>
      // }
    ]
  },
  {
    path: '/realTimeTracking',
    element: <RealTimeOrderTracking />

  },
  {
    path: '/floorPlanMapping',
    element: <FloorPlanMapping />

  },
  {
    path: '/loginSample',
    element: <Singup />

  },
  {
    path: '/',
    element: <StaffLayout />,
    children: [
      {
        path: '/staffDashboard',
        element: <DashBoard />
      },
      {
        path: '/mealList',
        element: <MealsList />
      },
      {
        path: '/mealDetail',
        element: <MealDetail />
      },
      {
        path: '/addMeal',
        element: <AddMeal />
      },
      {
        path: '/orders',
        element: <Orders />
      },
      {
        path: '/customers',
        element: <CustomersList />
      },
      {
        path: '/addCustomer',
        element: <AddCustomer />
      },
     
    ]
  },
  {
    path: "*",
    element: <NotFound />
  },
  {
    path: "/accessProhibited",
    element: <AccessProhibited />
  },
  {
    path: "/index",
    element: <Index />
  }



])
export default router;