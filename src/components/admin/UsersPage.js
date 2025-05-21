import React, { useEffect, useState } from 'react';
import Sidebar from './const/sidebar.js';
import Header from './const/Header.js';
import './const/css/users.css';

import { db } from '../firebase/firebase'; // Adjust the path as needed
import { collection, getDocs } from 'firebase/firestore';

const UsersPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersRef = collection(db, 'users');
        const snapshot = await getDocs(usersRef);
        const usersList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(usersList);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-content">
        <Header />
        <div className="main-content">
          <h2 className="page-title">👥 Users</h2>
          <div className="users-table-container">
            <table className="users-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>First Name</th>
                  <th>Surname</th>
                  <th>Email</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan="5">No users found.</td>
                  </tr>
                ) : (
                  users.map((user, index) => (
                    <tr key={user.id}>
                      <td>{index + 1}</td>
                      <td>{user.firstName}</td>
                      <td>{user.surname}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
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

export default UsersPage;
