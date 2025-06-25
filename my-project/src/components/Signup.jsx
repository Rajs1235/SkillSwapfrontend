import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from './api'; // Adjust path if needed
import axios from 'axios';
function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await api.post('/users/register', {
        username,
        email,
        password,
      });

      console.log('Signup successful:', res.data);
      navigate('/login');
    } catch (err) {
      console.error('Signup error:', err);
      setError(err.response?.data?.message || 'Signup failed. Try again.');
    }
  };

  return (
    <form
      onSubmit={handleSignup}
      className="w-full max-w-2xl mx-auto mt-20 bg-blue-900/80 backdrop-blur-md p-14 rounded-xl shadow-2xl text-white"
    >
      <h2 className="text-5xl font-bold text-center mb-12 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-transparent bg-clip-text">
        SignUp
      </h2>

      <div className="space-y-8 min-h-[400px] flex flex-col justify-between">
        <div className="space-y-8">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your Username"
            className="w-full px-6 py-4 bg-white text-black rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:outline-none hover:ring-2 hover:ring-purple-500 hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-200"
            required
          />

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-6 py-4 bg-white text-black rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:outline-none hover:ring-2 hover:ring-purple-500 hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-200"
            required
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-6 py-4 bg-white text-black rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:outline-none hover:ring-2 hover:ring-purple-500 hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-200"
            required
          />

          {error && (
            <p className="text-red-300 text-center text-sm mt-2">{error}</p>
          )}
        </div>

        <div className="mt-8">
          <button
            type="submit"
            className="w-full bg-teal-500 text-white px-6 py-4 rounded-xl hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-lg"
          >
            Signup
          </button>

          <p className="text-center text-white mt-8">
            Already a user?{' '}
            <Link to="/login" className="text-indigo-300 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </form>
  );
}

export default Signup;
