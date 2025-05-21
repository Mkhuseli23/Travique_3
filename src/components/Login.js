import React, { useState } from 'react';
import { auth, db, googleProvider } from './firebase/firebase';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';

import './css/auth.css';
import { logAudit } from './admin/LogAudit';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const redirectBasedOnRole = (role) => {
    if (role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/dashboard');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const user = userCred.user;

      if (!user.emailVerified) {
        setError('Please verify your email before logging in.');
        return;
      }

      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        await logAudit(user, 'Logged in with email');
        redirectBasedOnRole(userData.role);
      } else {
        setError('User record not found in database.');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          fullName: user.displayName || '',
          email: user.email,
          role: 'user',
          createdAt: new Date()
        });
        await logAudit(user, 'Logged in with Google');
        redirectBasedOnRole('user');
      } else {
        const userData = userSnap.data();
        await logAudit(user, 'Logged in with Google');
        redirectBasedOnRole(userData.role);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Login</button>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="google-button"
          aria-label="Login with Google"
          style={{
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
            marginTop: '10px'
          }}
        >
          <FcGoogle size={28} />
        </button>

        {error && <p className="error-message">{error}</p>}
      </form>

      <p><a href="/forgot-password">Forgot Password?</a></p>
      <p>Don't have an account? <a href="/register">Register</a></p>
    </div>
  );
};

export default Login;
