import React, { useState, useEffect } from 'react';
import { auth, db } from '../../firebase/firebase';
import './css/header.css';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [profilePicURL, setProfilePicURL] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUserEmail(user.email);

        try {
          const userDocRef = doc(db, 'users', user.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const data = userDocSnap.data();
            setDisplayName(data.fullName || 'User');
            setProfilePicURL(data.profilePicURL || '');
          }
        } catch (error) {
          console.error('Failed to fetch user data:', error);
        }
      } else {
        setUserEmail('');
        setDisplayName('');
        setProfilePicURL('');
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <header className="header">
      <div
        className="header-profile"
        onClick={() => setShowDropdown((prev) => !prev)}
        style={{ cursor: 'pointer', position: 'relative' }}
      >
        <img
          src={profilePicURL || 'https://i.pravatar.cc/40'}
          alt="Profile"
          className="profile-icon"
          style={{ borderRadius: '50%' }}
        />
        <span>{displayName || 'Guest'}</span>

        {showDropdown && (
          <div className="dropdown">
            <p><strong>Name:</strong> {displayName || 'Guest'}</p>
            <p><strong>Email:</strong> {userEmail}</p>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
