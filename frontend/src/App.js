import React from 'react'
import './App.css'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { LoginPage, RegisterPage } from './Routes.js'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes> 
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>

  )
}

export default App