import React, { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Admin from './pages/Admin';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import OrderDetails from './pages/OrderDetails';
import Orders from './pages/Orders';
import Products from './pages/Products';
import Register from './pages/Register';
import { GlobalStyles } from './styles/GlobalStyles';

function App() {
  const location = useLocation();

  useEffect(() => {
    // Google Analytics
    // ga('send', 'pageview');
  }, [location]);

  return (
    <GlobalStyles>
      <Routes>
        <Route exact path="/" element={ <Navigate to="/login" /> } />
        <Route path="/login" element={ <Login /> } exact />
        <Route path="/register" element={ <Register /> } />
        <Route path="/customer/checkout" element={ <Checkout /> } />
        <Route path="/customer/products" element={ <Products /> } />
        <Route path="/customer/orders" element={ <Orders /> } />
        <Route path="/customer/orders/:id" element={ <OrderDetails /> } />
        <Route path="/seller/orders" element={ <Orders /> } />
        <Route path="/seller/orders/:id" element={ <OrderDetails /> } />
        <Route path="/admin/manage" element={ <Admin /> } />
      </Routes>
    </GlobalStyles>
  );
}

export default App;
