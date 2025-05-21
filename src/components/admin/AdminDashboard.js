import React from 'react';
import Sidebar from './const/sidebar';
import Header from './const/Header';
import './const/css/dashboard.css';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from 'recharts';

const data = [
  { name: 'Mon', users: 30 },
  { name: 'Tue', users: 45 },
  { name: 'Wed', users: 60 },
  { name: 'Thu', users: 40 },
  { name: 'Fri', users: 75 },
  { name: 'Sat', users: 20 },
  { name: 'Sun', users: 50 },
];

const AdminDashboard = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-content">
        <Header />
        <div className="main-content">
          <h2 className="dashboard-title">📊 Dashboard</h2>
          
          <div className="widgets-grid">
            <div className="widget">
              <h3>🌦️ Weather</h3>
              <p>Cape Town: 18°C, Cloudy</p>
            </div>
            <div className="widget">
              <h3>🍽️ Nearby Food</h3>
              <p>5 places found nearby</p>
            </div>
            <div className="widget">
              <h3>📍 Location</h3>
              <p>Current: Bellville, Cape Town</p>
            </div>
          </div>

          <div className="chart-container">
            <h3>📈 User Activity (This Week)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="users" fill="#246071" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
