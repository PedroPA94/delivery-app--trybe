import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
// import rockGlass from './images/rockGlass.svg';
import Register from './pages/register';

function App() {
  return (
    <Routes>
      <Route path="/cadastro" element={ <Register /> } />
    </Routes>
  );
}

export default App;
