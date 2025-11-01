// import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard/Dashboard'
import Users from './pages/Users/Users'
import Categories from './pages/Categories/Categories'
import Products from './pages/Products/Products'
import OrderCreate from './pages/OrderCreate/OrderCreate'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
   const url = import.meta.env.VITE_API_URL || "http://localhost:4000"
   const currency = '₹';
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Dashboard url={url} currency={currency} />} />
          <Route path="/dashboard" element={<Dashboard url={url} currency={currency} />} />
          <Route path="/users" element={<Users url={url} currency={currency} />} />
          <Route path="/categories" element={<Categories url={url} currency={currency} />} />
          <Route path="/products" element={<Products url={url} currency={currency} />} />
          <Route path="/orders" element={<OrderCreate url={url} currency={currency} />} />
        </Routes>
      </div>
    </div>
  )
}

export default App