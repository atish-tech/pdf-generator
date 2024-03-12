// import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AddProduct } from './pages/AddProduct';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Home } from './pages/Home';
import { Toaster } from './components/ui/sonner';
import { GenerateInvoice } from './pages/GenerateInvoice';

function App() {

  return (
    <>
    <Toaster duration={3000} />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/add/product' element={<AddProduct />} />
          <Route path="/invoice" element={<GenerateInvoice />} />

          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
