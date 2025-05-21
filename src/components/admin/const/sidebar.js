import React from 'react';
import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaUsers, FaChartBar, FaCog, FaHistory } from 'react-icons/fa'; // <-- Import FaHistory
import './css/sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Admin Panel</h2>
      </div>
      <ul className="sidebar-links">
        <li>
          <Link to="/admin">
            <FaTachometerAlt className="icon" /> Dashboard
          </Link>
        </li>
        <li>
          <Link to="/users">
            <FaUsers className="icon" /> Users
          </Link>
        </li>
        <li>
          <Link to="/audit">
            <FaHistory className="icon" /> Audit Trail
          </Link>
        </li>
        <li>
          <Link to="/report">
            <FaChartBar className="icon" /> Reports
          </Link>
        </li>
        <li>
          <Link to="/settings">
            <FaCog className="icon" /> Settings
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
