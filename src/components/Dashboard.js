import React, { useEffect, useState } from 'react';
import Sidebar from './const/sidebar';
import Header from './const/Header';
import { Outlet, useLocation } from 'react-router-dom';
import './css/dashboard.css';
import { auth, db } from './firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { logAudit } from './admin/LogAudit';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer,
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Dashboard = ({ userName = 'Mkhuseli Mditshwa' }) => {
  const location = useLocation();

  const [dataCounts, setDataCounts] = useState({
    trips: 0,
    expenses: 0,
    healthTips: 0,
    foodSuggestions: 0,
  });

  const [tripStats, setTripStats] = useState([]);
  const [expenseStats, setExpenseStats] = useState([]);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      logAudit(user, 'Visited Dashboard Page');
    }

    const fetchData = async () => {
      try {
        const tripsSnap = await getDocs(collection(db, 'trips'));
        const expensesSnap = await getDocs(collection(db, 'expenses'));
        const healthTipsSnap = await getDocs(collection(db, 'health_tips'));
        const foodSuggestionsSnap = await getDocs(collection(db, 'food_suggestions'));

        // Widget counts
        setDataCounts({
          trips: tripsSnap.size,
          expenses: expensesSnap.docs.reduce((acc, doc) => acc + (doc.data().amount || 0), 0),
          healthTips: healthTipsSnap.size,
          foodSuggestions: foodSuggestionsSnap.size,
        });

        // Bar Chart: Trips per destination
        const tripMap = {};
        tripsSnap.docs.forEach(doc => {
          const dest = doc.data().destination || 'Unknown';
          tripMap[dest] = (tripMap[dest] || 0) + 1;
        });
        const tripData = Object.entries(tripMap).map(([name, value]) => ({ name, value }));
        setTripStats(tripData);

        // Pie Chart: Expenses by category
        const categoryMap = {};
        expensesSnap.docs.forEach(doc => {
          const cat = doc.data().category || 'Other';
          categoryMap[cat] = (categoryMap[cat] || 0) + (doc.data().amount || 0);
        });
        const pieData = Object.entries(categoryMap).map(([name, value]) => ({ name, value }));
        setExpenseStats(pieData);

      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-content">
        <Header userName={userName} />
        <div className="content">

          {/* Widgets */}
          <div className="widget-container">
            <div className="widget">
              <h3>Total Trips</h3>
              <p>{dataCounts.trips}</p>
            </div>
            <div className="widget">
              <h3>Expenses</h3>
              <p>R{dataCounts.expenses.toFixed(2)}</p>
            </div>
            <div className="widget">
              <h3>Health Tips</h3>
              <p>{dataCounts.healthTips}</p>
            </div>
            <div className="widget">
              <h3>Food Suggestions</h3>
              <p>{dataCounts.foodSuggestions}</p>
            </div>
          </div>

          {/* Charts Section - Only visible on /dashboard */}
          {location.pathname === '/dashboard' && (
            <div className="charts-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', marginTop: '2rem' }}>
              
              {/* Bar Chart */}
              <div style={{ flex: 1, minWidth: '300px' }}>
                <h3>Trips by Destination</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={tripStats}>
                    <XAxis dataKey="name" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#8884d8" name="Trips" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Pie Chart */}
              <div style={{ flex: 1, minWidth: '300px' }}>
                <h3>Expenses by Category</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={expenseStats}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label
                    >
                      {expenseStats.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>

            </div>
          )}

          {/* Nested Route Content */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
