import React, { useState } from 'react';
import { auth, db } from './firebase/firebase';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import './css/auth.css';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      // Create user with email and password
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      const fullName = `${firstName} ${surname}`;

      // Update Firebase Auth profile
      await updateProfile(userCred.user, { displayName: fullName });

      // Send verification email
      await sendEmailVerification(userCred.user);

      // Save user info including role to Firestore
      await setDoc(doc(db, "users", userCred.user.uid), {
        uid: userCred.user.uid,
        firstName,
        surname,
        fullName,
        email,
        role: "user", // ✅ Role field added
        createdAt: new Date()
      });

      setMessage('Registration successful! Check your email for verification.');
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Surname"
          value={surname}
          onChange={e => setSurname(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>

        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}

        <p>Already have an account? <a href="/login">Login</a></p>
      </form>
    </div>
  );
};

export default Register;
