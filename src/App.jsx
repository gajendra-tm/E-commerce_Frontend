import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProductFilterPage from "./pages/ProductFilterPage";
import AdminProductFilterPage from "./pages/AdminProductFilterPage";
import Login from "./pages/LoginPage";
import Signup from "./pages/SignupPage";
import SignOut from "./features/auth/component/SignOut";
import Cart from "./pages/CartPage";
import CheckOut from "./features/cart/component/CheckOut";
import ProductDetails from "./pages/ProductDetailsPage";
import Protected from "./features/auth/component/Protected";
import AdminProtected from "./features/auth/component/AdminProtected";
import ResetPassword from "./pages/ResetPasswordPage";
import PageNotFound from "./pages/404";
import { useDispatch, useSelector } from "react-redux";
import {
  checkUserAsync,
  selectLoggedInUser,
  selectUserChecked,
} from "./features/auth/authSlice";
import { fetchCartItemsByUserIdAsync } from "./features/cart/cartSlice";
import OrderSuccessfulCash from "./pages/OrderSuccessfulCash";
import OrderSuccessfulOnline from "./pages/OrderSuccessfulOnline";
import MyOrdersPage from "./pages/MyOrdersPage";
import MyProfilePage from "./pages/MyProfilePage";
import ForgotPassword from "./pages/PasswordResetPage";
import { fetchLoggedInUserInfoAsync } from "./features/user/userSlice";
import AdminProductFormPage from "./pages/AdminProductFormPage";
import AdminOrderPage from "./pages/AdminOrderPage";
import StripeCheckout from "./pages/StripeCheckout";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <ProductFilterPage />
      </Protected>
    ),
  },
  {
    path: "/admin",
    element: (
      <AdminProtected>
        <AdminProductFilterPage />
      </AdminProtected>
    ),
  },
  {
    path: "/admin/admin-product-form",
    element: (
      <AdminProtected>
        <AdminProductFormPage />
      </AdminProtected>
    ),
  },
  {
    path: "/admin/admin-product-form/edit/:id",
    element: (
      <AdminProtected>
        <AdminProductFormPage />
      </AdminProtected>
    ),
  },
  {
    path: "/admin/admin-order",
    element: (
      <AdminProtected>
        <AdminOrderPage />
      </AdminProtected>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/cart",
    element: (
      <Protected>
        <Cart />
      </Protected>
    ),
  },
  {
    path: "/checkout",
    element: (
      <Protected>
        <CheckOut />
      </Protected>
    ),
  },
  {
    path: "/product-details/:id",
    element: (
      <Protected>
        <ProductDetails />
      </Protected>
    ),
  },
  {
    path: "/my-orders",
    element: (
      <Protected>
        <MyOrdersPage />
      </Protected>
    ),
  },
  {
    path: "/my-profile",
    element: (
      <Protected>
        <MyProfilePage />
      </Protected>
    ),
  },
  {
    path: "/order-successful-cash",
    element: (
      <Protected>
        <OrderSuccessfulCash />
      </Protected>
    ),
  },
  {
    path: "/order-successful-online",
    element: (
      <Protected>
        <OrderSuccessfulOnline />
      </Protected>
    ),
  },
  {
    path: "/stripe-checkout",
    element: (
      <Protected>
        <StripeCheckout />
      </Protected>
    ),
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/reset-password",
    element: < ResetPassword />,
  },
  {
    path: "/signout",
    element: <SignOut />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const userChecked = useSelector(selectUserChecked);

  useEffect(() => {
    dispatch(checkUserAsync());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      dispatch(fetchCartItemsByUserIdAsync());
      dispatch(fetchLoggedInUserInfoAsync());
    }
  }, [dispatch, user]);

  return (
    <>
      {userChecked && <RouterProvider router={router} />}
      <ToastContainer />
    </>
  );
}

export default App;
