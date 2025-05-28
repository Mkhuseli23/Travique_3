import React, { useState } from 'react';
import Sidebar from './const/sidebar.js';
import Header from './const/Header.js';
import './const/css/HealthTipsForm.css';

import { db, auth } from '../firebase/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const HealthTipsForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: ''
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [lastSubmittedTip, setLastSubmittedTip] = useState(null); // 🔹 new state

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMessage('');
    setSuccessMessage('');

    try {
      const user = auth.currentUser;
      const newTip = {
        title: formData.title,
        category: formData.category,
        description: formData.description,
        timestamp: serverTimestamp(),
        userId: user ? user.uid : null,
        userEmail: user ? user.email : null,
      };

      await addDoc(collection(db, 'health_tips'), newTip);

      setSuccessMessage('Health & Wellness Tip added successfully!');
      setLastSubmittedTip({
        ...newTip,
        userEmail: user ? user.email : "Anonymous",
        timestamp: new Date().toLocaleString() // Just for display
      });
      setFormData({ title: '', category: '', description: '' });
    } catch (error) {
      console.error('Error adding document: ', error);
      setErrorMessage('Failed to add health tip. Please try again.');
    }
  };

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-content">
        <Header />
        <div className="tip-form-container">
          <h2>Create Health & Wellness Tip</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Tip Title"
              value={formData.title}
              onChange={handleChange}
              required
            />

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              <option value="Fitness">Fitness</option>
              <option value="Nutrition">Nutrition</option>
              <option value="Mental Health">Mental Health</option>
              <option value="Lifestyle">Lifestyle</option>
            </select>

            <textarea
              name="description"
              placeholder="Write the health tip here..."
              value={formData.description}
              onChange={handleChange}
              required
            />

            <button type="submit">Submit Tip</button>
            {successMessage && <p className="success-message">{successMessage}</p>}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </form>

          {/* 🔹 Display last submitted tip */}
          {lastSubmittedTip && (
            <div className="submitted-tip-preview">
              <h3>📝 Submitted Tip Preview</h3>
              <p><strong>Title:</strong> {lastSubmittedTip.title}</p>
              <p><strong>Category:</strong> {lastSubmittedTip.category}</p>
              <p><strong>Description:</strong> {lastSubmittedTip.description}</p>
              <p><strong>Submitted by:</strong> {lastSubmittedTip.userEmail}</p>
              <p><strong>Submitted on:</strong> {lastSubmittedTip.timestamp}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HealthTipsForm;
