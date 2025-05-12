import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from './firebase/firebase';
import './css/Navbar.css';

function Navbar() {
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setUserEmail(user.email);
      } else {
        setUserEmail(null);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-logo">Travique 3</div>
      {userEmail && <div className="navbar-user">Logged in as: {userEmail}</div>}
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/itinerary">Itinerary</Link>
      </div>
    </nav>
  );
}

export default Navbar;
