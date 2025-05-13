import React from 'react';
import Sidebar from './const/sidebar';
import Header from './const/Header';
import { Outlet } from 'react-router-dom';
import './css/dashboard.css'; // Import styles

const Dashboard = ({ userName = 'Mkhuseli Mditshwa' }) => {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-content">
        <Header userName={userName} />
        <div className="content">
          {/* Removed widgets for testing */}
          {/* Child route outlet */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
