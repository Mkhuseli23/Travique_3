import React, { useState, useEffect } from 'react';
import Sidebar from './const/sidebar';
import Header from './const/Header';
import './const/css/settings.css';

import { auth, db, storage } from '../firebase/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const SettingsPage = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [theme, setTheme] = useState('light');
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState('en');
  const [profilePic, setProfilePic] = useState(null);
  const [profilePicURL, setProfilePicURL] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      if (!auth.currentUser) return;
      setEmail(auth.currentUser.email);

      const userDocRef = doc(db, 'users', auth.currentUser.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const data = userDoc.data();
        setFullName(data.fullName || '');
        setTheme(data.theme || 'light');
        setNotifications(data.notifications ?? true);
        setLanguage(data.language || 'en');
        setProfilePicURL(data.profilePicURL || '');
      }
    };

    fetchUserData();
  }, []);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setProfilePic(e.target.files[0]);
    }
  };

  const handleSave = async () => {
    if (!auth.currentUser) {
      alert('No user logged in');
      return;
    }

    try {
      let uploadedPicURL = profilePicURL;

      if (profilePic) {
        const storageRef = ref(storage, `profilePics/${auth.currentUser.uid}`);
        await uploadBytes(storageRef, profilePic);
        uploadedPicURL = await getDownloadURL(storageRef);
        setProfilePicURL(uploadedPicURL);
      }

      const userDocRef = doc(db, 'users', auth.currentUser.uid);
      await setDoc(
        userDocRef,
        {
          fullName,
          email,
          theme,
          notifications,
          language,
          profilePicURL: uploadedPicURL,
        },
        { merge: true }
      );

      alert('Settings saved successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Failed to save settings');
    }
  };

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-content">
        <Header profilePicURL={profilePicURL} displayName={fullName} />
        <div className="main-content">
          <h2 className="page-title">⚙️ Settings</h2>

          <div className="settings-section">
            <h3>Profile Settings</h3>

            <label>
              Full Name:
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </label>

            <label>
              Email:
              <input
                type="email"
                value={email}
                disabled
              />
            </label>

            <label>
              Password:
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="New password"
              />
            </label>

            <label>
              Profile Picture:
              <input type="file" accept="image/*" onChange={handleFileChange} />
            </label>

            {profilePicURL && (
              <img
                src={profilePicURL}
                alt="Profile"
                style={{ width: 100, height: 100, borderRadius: '50%', marginTop: 10 }}
              />
            )}
          </div>

          <div className="settings-section">
            <h3>Preferences</h3>

            <label>
              Theme:
              <select value={theme} onChange={(e) => setTheme(e.target.value)}>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </label>

            <label>
              Notifications:
              <input
                type="checkbox"
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
              />
              Enable Email Notifications
            </label>

            <label>
              Language:
              <select value={language} onChange={(e) => setLanguage(e.target.value)}>
                <option value="en">English</option>
                <option value="xh">Xhosa</option>
                <option value="af">Afrikaans</option>
              </select>
            </label>
          </div>

          <button className="save-button" onClick={handleSave}>
            💾 Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
