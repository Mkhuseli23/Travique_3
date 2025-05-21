// src/pages/AuditTrail.js
import React, { useEffect, useState } from 'react';
import Sidebar from './const/sidebar.js';
import Header from './const/Header.js';
import './const/css/audit.css'; // custom styles for audit table

import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';

const AuditTrail = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const q = query(collection(db, 'audit_logs'), orderBy('timestamp', 'desc'));
        const querySnapshot = await getDocs(q);
        const logList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setLogs(logList);
      } catch (error) {
        console.error('Error fetching audit logs:', error);
      }
    };

    fetchLogs();
  }, []);

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-content">
        <Header />
        <div className="main-content">
          <h2 className="page-title">📜 Audit Trail</h2>
          <div className="audit-table-container">
            <table className="audit-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Action</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {logs.length === 0 ? (
                  <tr>
                    <td colSpan="3">No audit logs found.</td>
                  </tr>
                ) : (
                  logs.map(log => (
                    <tr key={log.id}>
                      <td>{log.displayName} ({log.email})</td>
                      <td>{log.action}</td>
                      <td>{log.timestamp?.toDate().toLocaleString()}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditTrail;
