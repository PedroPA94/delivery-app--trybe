import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
// import rockGlass from './images/rockGlass.svg';
import Register from './pages/register';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } exact />
      <Route path="/cadastro" element={ <Register /> } />
    </Routes>
  );
}

export default App;
