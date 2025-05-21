import React, { useEffect, useState } from 'react';
import { auth } from '../firebase/firebase';
import '../css/Header.css';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [displayName, setDisplayName] = useState('Guest');
  const [userEmail, setUserEmail] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setDisplayName(user.displayName || 'No Name');
        setUserEmail(user.email);
      } else {
        setDisplayName('Guest');
        setUserEmail('');
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login'); // Redirect to login page after logout
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <header className="header">
      <div
        className="header-profile"
        onClick={() => setShowDropdown(prev => !prev)}
        style={{ cursor: 'pointer', position: 'relative' }}
      >
        <img
          src="https://i.pravatar.cc/40"
          alt="Profile"
          className="profile-icon"
        />
        <span>{displayName}</span>

        {showDropdown && (
          <div className="dropdown">
            <p><strong>Name:</strong> {displayName}</p>
            <p><strong>Email:</strong> {userEmail}</p>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
