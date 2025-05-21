import React from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkedAlt, FaCloudSun, FaUtensils, FaMoneyBillWave, FaHeartbeat } from 'react-icons/fa';
import '../css/sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h3>Dashboard</h3>
      <ul>
        <li>
          <Link to="/dashboard/trip-planner">
            <FaMapMarkedAlt className="icon" /> Trip Planner
          </Link>
        </li>
        <li>
          <Link to="/dashboard/weather">
            <FaCloudSun className="icon" /> Check Weather
          </Link>
        </li>
        <li>
          <Link to="/dashboard/food-finder">
            <FaUtensils className="icon" /> Food Finder
          </Link>
        </li>
        <li>
          <Link to="/dashboard/expenses">
            <FaMoneyBillWave className="icon" /> Expenses
          </Link>
        </li>
        <li>
          <Link to="/dashboard/health-tips">
            <FaHeartbeat className="icon" /> Health Tips
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
