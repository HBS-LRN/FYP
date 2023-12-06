import { Navigate, createBrowserRouter } from "react-router-dom";






import NotFound from "./views/error/NotFound";

import Index from "./views/Index";
import CustomerLayout from "./components/CustomerLayout";
import ContactUs from "./views/static/ContactUs";
import FAQ from "./views/static/FAQ";
import Service from "./views/static/service";
import Profile from "./views/profile/Profile";
import Allergic from "./views/profile/Allergic";
import AllergicForm from "./views/profile/AllergicForm";
import ChangePassword from "./views/profile/ChangePassword";
import Dashboard from "./views/profile/Dashboard";
import OrderStatus from "./views/profile/OrderStatus";
import VerifyEmail from "./views/auth/Verify-Email";
import RequireAuth from "./views/error/require-auth";
import Login from "./views/auth/login";
import Register from "./views/auth/register";
import ResetPassword from "./views/auth/ResetPassword";
import Addresses from "./views/address/addresses";
import AddressForm from "./views/address/addressForm";
import CheckOut from "./views/shoppingCart/CheckOut";
import MyReservation from "./views/profile/MyReservation";
import RealTimeOrderTracking from "./views/profile/RealTimeOrderTracking";
import MyOrder from "./views/profile/MyOrders";
import Aboutus from "./views/static/Aboutus";
import NuritionMenuCard from "./views/menu/NutritionMenuCard";
import OrderMenuCard from "./views/menu/OrderMenuCard";
import CategoryMenuCard from "./views/menu/CategoryMenuCard";
import StaffLayout from "./components/StaffLayout";
import AuthCustomer from "./components/AuthCustomer";
import DashBoard from "./views/staff/DashBoard";
import MealsList from "./views/staff/meal/MealsList";
import Calendar from "./views/staff/Calendar/calendar";
import Chat from "./views/staff/chat";
import StaffReservation from "./views/staff/customer/reservation";
import AddIngredient from "./views/staff/meal/AddIngredients";
import UpdateIngredient from "./views/staff/meal/UpdateIngredients"
import IngredientList from "./views/staff/meal/IngredientsList"
import AddCategory from "./views/staff/meal/AddCategory";
import UpdateCategory from "./views/staff/meal/UpdateCategory"
import CategoryList from "./views/staff/meal/CatogoriesList"
import MealDetail from "./views/staff/meal/MealDetail";
import Deliverylist from "./views/staff/delivery/DeliveryList"
import RealTimeDeliveryTracking from "./views/staff/delivery/RealTimeDeliveryTrack"
import CustomerOrderList from "./views/staff/customer/CustomerOrderList";
import CustomerOrderDetailList from "./views/staff/customer/CustomerOrderDetailList";
import AddMeal from "./views/staff/meal/AddMeal";
import UpdateMeal from "./views/staff/meal/UpdateMeal";
import FloorPlanMapping from "./views/reservation/FloorPlanMapping";
import RequestBMI from "./views/auth/Request-BMI";
import ReservationForm from "./views/reservation/ReservationForm";
import CustomersList from "./views/staff/customer/CustomerOrderList";
import VerifyCustomer from "./views/staff/customer/verifyAccount";
import StaffProfile from "./views/staff/staffProfile";
import AddCustomer from "./views/staff/customer/AddCustomer";
import SalesAnalyticReport from "./views/staff/report/salesAnalyticsReport";
import MealTotalRevenueReport from "./views/staff/report/mealTotalRevenueReport";
import AddStaff from "./views/staff/addStaff"
import StaffList from "./views/staff/staffList"
import CompletedDeliveryList from "./views/staff/delivery/CompletedList";
import RatingList from "./views/staff/Rating/ratingList";
import RatingForm from "./views/staff/Rating/RatingForm";
import UserChat from "./views/profile/Chat";
import ActivateCustomer from "./views/staff/customer/DeactivatedCustomer";
import NonStaff from "./views/error/Non-Staff";
import NonAdmin from "./views/error/Non-Admin";
import AdminLayout from "./components/AdminLayout";



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
        path: '/registerDetail',
        element: <RequestBMI />
      },
      {
        path: '/register',
        element: <Register />
      },
      {
        path: '/verifyAccount/:id',
        element: <VerifyCustomer />
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
        path: '/nutritionMenuCard/:id',
        element: <NuritionMenuCard />
      },
      {
        path: '/orderMenuCard/:id',
        element: <OrderMenuCard />
      },
      {
        path: '/categoryMenuCard',
        element: <CategoryMenuCard />
      },
      {
        path: '/reservationForm',
        element: <ReservationForm />
      },

      //protected router, required login from user
      {
        path: '/',
        element: <AuthCustomer />,
        children: [
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
            path: '/myReservation',
            element: <MyReservation />
          },

          {
            path: '/myOrder',
            element: <MyOrder />

          },
          {
            path: '/allergic',
            element: <Allergic />

          },
          {
            path: '/allergicForm',
            element: <AllergicForm />

          },
          {
            path: '/addresses',
            element: <Addresses />
          },
          {
            path: '/addressForm',
            element: <AddressForm key="addressCreate" />
          },
          {
            path: '/addressForm/:id',
            element: <AddressForm key="addressUpdate" />
          },

          {
            path: '/checkOut',
            element: <CheckOut />
          },
          {
            path: '/userChat',
            element: <UserChat />
          },

        ]
      },


    ]
  },

  {
    path: '/floorPlanMapping',
    element: <FloorPlanMapping />

  }, {
    path: '/realTimeTracking/:id',
    element: <RealTimeOrderTracking />

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
        path: '/Calendar',
        element: <Calendar />
      }, {
        path: "/chat",
        element: <Chat />
      },
      {
        path: "/reservation",
        element: <StaffReservation />
      },
      {
        path: "/addingredient",
        element: <AddIngredient />
      },
      {
        path: "/updateingredient/:id",
        element: <UpdateIngredient />
      },
      {
        path: "ingredientList",
        element: <IngredientList />
      },
      {
        path: "/addcategory",
        element: <AddCategory />
      },
      {
        path: "/updatecategory/:id",
        element: <UpdateCategory />
      },
      {
        path: "/categoryList",
        element: <CategoryList />
      },
      {
        path: "/addcategory",
        element: <AddCategory />
      },
      {
        path: "/updatecategory/:id",
        element: <UpdateCategory />
      },
      {
        path: "/mealList",
        element: <MealsList />
      },
      {
        path: '/mealDetail/:id',
        element: <MealDetail />
      },
      {
        path: '/addMeal',
        element: <AddMeal />
      },
      {
        path: '/updateMeal/:id',
        element: <UpdateMeal />
      },
      {
        path: '/customerOrderList',
        element: <CustomerOrderList />
      },
      {
        path: '/customerOrderDetailList/:id',
        element: <CustomerOrderDetailList />
      },
      {
        path: '/customers',
        element: <CustomersList />
      },
      {
        path: '/addCustomer',
        element: <AddCustomer />
      },
      {
        path: '/deliveryList',
        element: <Deliverylist />
      },
      {
        path: '/realTimeDeliveryTracking/:id',
        element: <RealTimeDeliveryTracking />

      },
      {
        path: '/completedDeliveryList',
        element: <CompletedDeliveryList />
      },
      {
        path: '/customerList',
        element: <CustomersList />

      },
      {
        path: '/ratingList',
        element: <RatingList />
      },
      {
        path: '/ratingForm/:id',
        element: <RatingForm />
      },
      {
        path: '/activateCustomer',
        element: <ActivateCustomer />
      },{
        path: '/staffProfile',
        element: <StaffProfile />
      },
      //protected router, required login from user
      {
        path: '/',
        element: <AdminLayout />,
        children: [
          {
            path: '/customerReport',
            element: <Profile />
          }, {
            path: '/addStaff',
            element: <AddStaff />
          }, {
            path: '/staffList',
            element: <StaffList />
          },{
            path: '/mealRevenueReport',
            element :<MealTotalRevenueReport/>
          },{
            path: '/salesReport',
            element :<SalesAnalyticReport/>
          } 
        ]
      }

    ]
  },
  {
    path: "*",
    element: <NotFound />
  },
  {
    path: "/accessRestricted",
    element: <NonAdmin />
  },
  {
    path: "/index",
    element: <Index />
  },
  {
    path: "/authRequired",
    element: <RequireAuth />
  },
  {
    path: "/accessProhibited",
    element: <NonStaff />
  },




])
export default router;