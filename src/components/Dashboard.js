import React, { useEffect } from 'react';
import Sidebar from './const/sidebar';
import Header from './const/Header';
import { Outlet } from 'react-router-dom';
import './css/dashboard.css';
import { auth } from './firebase/firebase';
import { logAudit } from './admin/LogAudit';

const Dashboard = ({ userName = 'Mkhuseli Mditshwa' }) => {
  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      logAudit(user, 'Visited Dashboard Page');
    }
  }, []);

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-content">
        <Header userName={userName} />
        <div className="content">
          {/* Dashboard Widgets */}
          <div className="widget-container">
            <div className="widget">
              <h3>Total Trips</h3>
              <p>12</p>
            </div>
            <div className="widget">
              <h3>Expenses</h3>
              <p>R3,250</p>
            </div>
            <div className="widget">
              <h3>Health Tips</h3>
              <p>5 unread</p>
            </div>
            <div className="widget">
              <h3>Food Suggestions</h3>
              <p>8 new</p>
            </div>
          </div>

          {/* Render nested routes */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
