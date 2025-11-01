import React from 'react'
import  './Sidebar.css'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className="sidebar-options">
        <NavLink to='/dashboard' className="sidebar-option">
            <img src={assets.order_icon} alt="" />
            <p>Dashboard</p>
        </NavLink>
        <NavLink to='/users' className="sidebar-option">
            <img src={assets.order_icon} alt="" />
            <p>Users</p>
        </NavLink>
        <NavLink to='/categories' className="sidebar-option">
            <img src={assets.add_icon} alt="" />
            <p>Categories</p>
        </NavLink>
        <NavLink to='/products' className="sidebar-option">
            <img src={assets.order_icon} alt="" />
            <p>Products</p>
        </NavLink>
        <NavLink to='/orders' className="sidebar-option">
            <img src={assets.order_icon} alt="" />
            <p>Create Order</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar
