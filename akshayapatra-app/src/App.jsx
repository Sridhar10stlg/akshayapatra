import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import './App.css';
import CategoryPage from './pages/category/categorypage';
import CookHomePage from './pages/cook/CookDashBoard';
import AddToCartPage from './pages/AddToCartPage';
import PaymentGateway from './pages/PaymentGateway';

function App() {

  return (
    <Routes>
      <Route path="/categorypage" element={<CategoryPage />} />
      <Route path="/cookdashboard" element={<CookHomePage />} />
      <Route path="/checkout" element={<AddToCartPage />} />
      <Route path="/paymentgateway" element={<PaymentGateway />} />
      <Route path="*" element={<CategoryPage />} />
    </Routes>
  )
}

export default App
