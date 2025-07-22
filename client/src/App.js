import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage.js";
import About from "./pages/About/About.js";
import Contact from "./pages/Contact/Contact.js";
import Pagenotfound from "./pages/PageNotFound/Pagenotfound.js";
import Policy from "./pages/Policy.js";
import Register from "./pages/auth/Register/Register.js";
import Signin from "./pages/auth/SignIn/Signin.js";
import Dashboard from "./pages/user/Dashboard/Dashboard.js";
import PrivateRoute from "../src/components/Routes/Private.js";
import ForgotPassword from "./pages/auth/ForgotPassword/ForgotPassword.js";
import AdminRoute from "./components/Routes/AdminRoute.js";
import AdminDashboard from "./pages/Admin/AdminDashboard/AdminDashboard.js";
import CreateCategory from "./pages/Admin/CreateCategory/CreateCategory.js";
import CreateProducts from "./pages/Admin/CreateProducts/CreateProducts.js";
import Users from "./pages/Admin/Users/Users.js";
import "./App.css";
import Orders from "./pages/user/Orders/Orders.js";
import Profile from "./pages/user/Profile/EditProfile.js";
import Products from "./pages/Admin/Products/Products.js";
import UpdateProduct from "./pages/Admin/UpdateProduct/UpdateProduct.js";
import AllProducts from "./pages/AllProducts/AllProducts.js";
import Search from "./pages/Search.js";
import ProductDetails from "./pages/ProductDetails.js";
import Categories from "./pages/Categories.js";
import ProductCategory from "./pages/ProductCategory.js";
import CartPage from "./pages/CartPage";
import AdminOrders from "./pages/Admin/AdminOrders.js";
import LanguageWrapper from "./components/LanguageWrapper/index.jsx";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import i18n from "./i18n/index.js";
import { Suspense, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { NetworkError } from "./pages/NetworkError.jsx";
import { EditAddress } from "./pages/user/Profile/EditAddress.jsx";
import { Coupons, MyCoupons } from "./pages/user/MyCoupons.jsx";
import { LikedProducts } from "./pages/LikedProducts.jsx";

function App() {
  //configure  env

  const { i18n } = useTranslation();
  useEffect(() => {
    if (["ar", "ur"].includes(i18n.language)) {
      document.body.dir = "rtl";
    } else {
      document.body.dir = "ltr";
    }
    const body = document.querySelector("body");
    if (["fil", "bd", "hi", "ml"].includes(i18n.language)) {
      body.style.fontSize = "12px";
    } else {
      body.style.fontSize = "16px";
    }
  }, [i18n.language]);
  const bodyClass = clsx({
    "text-lg": !["fil", "bd", "hi", "ml"].includes(i18n.language),
    "text-xs": ["fil", "bd", "hi", "ml"].includes(i18n.language),
  });
  useEffect(() => {
    document.body.className = bodyClass;
  }, [bodyClass]);

  return (
    <>
      <Routes>
        <Route path="/!/" element={<Navigate to="/en" replace />} />
        <Route path="/:lang" element={<LanguageWrapper />} />
        <Route path=" /*/" element={<Navigate to="/en" replace />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:slug/:pid" element={<ProductDetails />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/category/:slug" element={<ProductCategory />} />
        <Route path="/search" element={<Search />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/orders" element={<Orders />} />
          <Route path="user/edit-profile" element={<Profile />} />
          <Route path="user/edit-address" element={<EditAddress />} />
          <Route path="user/coupons" element={<MyCoupons />} />
          <Route path="user/liked-products" element={<LikedProducts />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProducts />} />
          <Route path="admin/product/:slug/:pid" element={<UpdateProduct />} />

          <Route path="admin/products" element={<Products />} />
          <Route path="admin/users" element={<Users />} />
          <Route path="admin/orders" element={<AdminOrders />} />
        </Route>
        <Route path="register" element={<Register />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/about" element={<About />} />
        <Route path="/allproducts" element={<AllProducts />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="*" element={<Pagenotfound />} />
        <Route path="/network-error" element={<NetworkError />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
