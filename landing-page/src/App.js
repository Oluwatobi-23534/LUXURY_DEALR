import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProductList from "./components/ProductList";
import OrderDetails from "./components/OrderDetails";
import Home from "./components/Hero";
import ProductDetails from "./components/ProductDetails";
import BucketList from "./pages/BucketList";
import SignIn from "./pages/SignIn";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import Shipping from "./pages/Shipping";
import Payment from "./pages/Payment";
import PrivateRoute from "./components/PrivateRoute";
import PlaceOrder from "./pages/PlaceOrder";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import ProfilePage from "./pages/ProfilePage";
import SuccessPage from "./pages/SuccessPage";
import AdminRoute from "./components/AdminRoute";
// import UserListingPage from "./pages/admin/UserListingPage";
import CategoryListPage from "./pages/admin/CategoryListPage";
import ProductListPage from "./pages/admin/ProductListPage";
import OrderListPage from "./pages/admin/OrderListPage";

import ProductEditPage from "./pages/admin/ProductEditPage";
import UsersListPage from "./pages/admin/UsersListPage";
import UserEditPage from "./pages/admin/UserEditPage";
import SearchProducts from "./components/SearchProducts";
import SingleProductDetails from "./components/SingleProductDetails";


const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search/:keyword" element={<SearchProducts />} />
            <Route path="/page/:currentPage" element={<SearchProducts />} />
            <Route
              path="search/:keyword/page/:currentPage"
              element={<SearchProducts />}
            />
            <Route path="/products" element={<ProductList />} />
            <Route
              path="/products/subcategory/:subcategoryId"
              element={<ProductDetails />}
            />
            <Route
              path="/products/:productId"
              element={<SingleProductDetails />}
            />
            {/* <Route
              path="/category/vr-products/virtual-reality-headsets"
              element={<VRProductDetails />}
            />
            <Route
              path="/category/electronics/home-electronics"
              element={<HomeElectronicsDetails />}
            /> */}
            <Route path="/order" element={<OrderDetails />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/register" element={<Register />} />
            <Route path="/bucketlist" element={<BucketList />} />
            {/* private routes */}
            <Route
              path="/shipping"
              element={
                <PrivateRoute>
                  <Shipping />
                </PrivateRoute>
              }
            />
            <Route
              path="/place-order"
              element={
                <PrivateRoute>
                  <PlaceOrder />
                </PrivateRoute>
              }
            />
            <Route
              path="/order/:id"
              element={
                <PrivateRoute>
                  <OrderDetailsPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/payment"
              element={
                <PrivateRoute>
                  <Payment />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <ProfilePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/success-page"
              element={
                <PrivateRoute>
                  <SuccessPage />
                </PrivateRoute>
              }
            />
            {/* admin routes */}
            <Route path="/" element={<AdminRoute />}>
              {/* <Route path="/admin/users" element={<UserListingPage />} /> */}
              <Route path="/admin/categories" element={<CategoryListPage />} />
              <Route path="/admin/products" element={<ProductListPage />} />
              <Route path="/admin/products/:currentPage" element={<ProductListPage />} />
              <Route path="/admin/orders" element={<OrderListPage />} />
              <Route path="/admin/users" element={<UsersListPage />} />
              <Route path="/admin/users/:id/edit" element={<UserEditPage />} />
              <Route
                path="/admin/product/:id/edit"
                element={<ProductEditPage />}
              />
            </Route>
            <Route
              path="/reset-password/:resetToken"
              element={<ResetPassword />}
            />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            {/* Add more routes as needed */}
          </Routes>
          <ToastContainer />
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
