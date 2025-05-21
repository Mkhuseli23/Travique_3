// src/components/admin/ReportPage.js

import React, { useEffect, useState } from 'react';
import Sidebar from './const/sidebar.js';
import Header from './const/Header.js';
import './const/css/report.css';

import SignupsChart from './SignupsChart'; // Ensure this exists
import { db } from '../firebase/firebase'; // Adjust path if needed
import { collection, getDocs } from 'firebase/firestore';

const ReportPage = () => {
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    const fetchTotalUsers = async () => {
      try {
        const usersSnapshot = await getDocs(collection(db, 'users'));
        setTotalUsers(usersSnapshot.size); // Number of documents in users collection
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchTotalUsers();
  }, []);

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-content">
        <Header />
        <div className="main-content">
          <h2 className="page-title">📈 Reports</h2>

          <div className="report-widgets">
            <div className="widget">
              <h3>Total Users</h3>
              <p>{totalUsers}</p>
            </div>
            <div className="widget">
              <h3>Total Trips</h3>
              <p>78</p>
            </div>
            <div className="widget">
              <h3>Total Expenses</h3>
              <p>R45,200</p>
            </div>
          </div>

          <div className="report-chart">
            <h3>Monthly Signups</h3>
            <SignupsChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportPage;
