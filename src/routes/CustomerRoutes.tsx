import React from "react";
import { Route, Routes } from "react-router-dom";
import CustomerLayout from "../components/CustomerLayout/CustomerLayout";
import Home from "../pages/customer/Home/Home";
import Book from "../pages/customer/Book/Book";
import Checkout from "../pages/customer/Checkout/Checkout";

const CustomerRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<CustomerLayout />}>
        <Route index element={<Home />} />
        <Route path="books" element={<Book />} />
        <Route path="checkout" element={<Checkout />} />
        {/* <Route path="register" element={<Register />} /> */}
        {/* <Route path="login" element={<Login />} /> */}
      </Route>
    </Routes>
  );
};

export default CustomerRoutes;
