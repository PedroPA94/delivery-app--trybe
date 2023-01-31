import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Admin from './pages/Admin';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import OrderDetails from './pages/OrderDetails';
import Orders from './pages/Orders';
import Products from './pages/Products';
import Register from './pages/Register';

function App() {
  return (
    <Routes>
      <Route exact path="/" element={ <Navigate to="/login" /> } />
      <Route path="/login" element={ <Login /> } exact />
      <Route path="/register" element={ <Register /> } />
      <Route path="/customer/checkout" element={ <Checkout /> } />
      <Route path="/customer/products" element={ <Products /> } />
      <Route path="/customer/orders" element={ <Orders /> } />
      <Route path="/customer/orders/:id" element={ <OrderDetails /> } />
      <Route path="/admin/manage" element={ <Admin /> } />
    </Routes>
  );
}

export default App;
