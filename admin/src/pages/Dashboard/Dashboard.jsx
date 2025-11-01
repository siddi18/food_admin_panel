import { useEffect, useState } from 'react';
import './Dashboard.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const Dashboard = ({ url }) => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0
  });

  const fetchDashboardStats = async () => {
    try {
      const response = await axios.get(`${url}/api/dashboard`);
      if (response.data.success) {
        setStats(response.data.data);
      } else {
        toast.error("Error fetching dashboard stats");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error fetching dashboard stats");
    }
  };

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  return (
    <div className='dashboard'>
      <h2>Dashboard Overview</h2>
      <div className="dashboard-cards">
        <div className="dashboard-card">
          <div className="card-icon">👥</div>
          <div className="card-info">
            <h3>{stats.totalUsers}</h3>
            <p>Total Users</p>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-icon">📦</div>
          <div className="card-info">
            <h3>{stats.totalProducts}</h3>
            <p>Total Products</p>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-icon">🛒</div>
          <div className="card-info">
            <h3>{stats.totalOrders}</h3>
            <p>Total Orders</p>
          </div>
        </div>

        <div className="dashboard-card revenue">
          <div className="card-icon">💰</div>
          <div className="card-info">
            <h3>₹{stats.totalRevenue}</h3>
            <p>Total Revenue</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
