import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from './api';

function Signup() {
  const [fullName, setfullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    
    try {
      const res = await api.post('/users/register', {
        fullName,
        username,
        email,
        password,
      });

      console.log('Signup successful:', res.data);
      // It's a good practice to automatically log the user in or direct them to login after signup
      navigate('/login'); 
    } catch (err) {
      console.error('Signup error:', err);
      setError(err.response?.data?.message || 'Signup failed. Try again.');
    }
  };

  return (
    // --- THIS IS THE LINE THAT WAS CHANGED ---
    <div className="min-h-screen flex items-center justify-center bg-transparent">
      <div className="container">
        <div className="form_area">
          <p className="title">SIGN UP</p>

          <form onSubmit={handleSignup}>
            <div className="form_group">
              <label className="sub_title" htmlFor="name">Full Name</label>
              <input
                placeholder="Enter your full name"
                id="name"
                className="form_style"
                type="text"
                value={fullName}
                onChange={(e) => setfullName(e.target.value)}
                required
              />
            </div>
            <div className="form_group">
              <label className="sub_title" htmlFor="username">Username</label>
              <input
                placeholder="Enter your Username"
                id="username"
                className="form_style"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form_group">
              <label className="sub_title" htmlFor="email">Email</label>
              <input
                placeholder="Enter your email"
                id="email"
                className="form_style"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form_group">
              <label className="sub_title" htmlFor="password">Password</label>
              <input
                placeholder="Enter your password"
                id="password"
                className="form_style"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
            )}

            <div>
              <button type="submit" className="btn">SIGN UP</button>
              <p>
                Have an Account?{' '}
                <Link className="link" to="/login">Login Here!</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
