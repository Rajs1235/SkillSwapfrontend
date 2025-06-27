import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from './api';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await api.post('/v1/users/login', { email, password });
      console.log('Login success:', response.data);

      // Store token if needed
      localStorage.setItem('token', response.data.token);

      navigate('/dashboard');
    } catch (err) {
      console.error('Login failed:', err);
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="space-y-8 min-h-[400px] flex flex-col justify-between">
      <div className="container">
        <div className="form_area">
          <p className="title">LOGIN</p>

          <form onSubmit={handleLogin}>
            <div className="form_group">
              <label className="sub_title" htmlFor="email">Email</label>
              <input
                id="email"
                className="form_style"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form_group">
              <label className="sub_title" htmlFor="password">Password</label>
              <input
                id="password"
                className="form_style"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
            )}

            <div>
              <button type="submit" className="btn">LOGIN</button>
              <p>
                Don’t have an account?{' '}
                <Link className="link" to="/signup">Sign Up Here!</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
