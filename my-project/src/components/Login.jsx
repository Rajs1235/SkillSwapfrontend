import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from './api';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await api.post("/users/login", { username, password });
      console.log("Token received:", response.data);

      // ✅ Save the access token correctly
      localStorage.setItem("token", response.data.data.accesstoken);

      // Optionally save user info or refresh token if needed
      // localStorage.setItem("user", JSON.stringify(response.data.data.user));
      // localStorage.setItem("refreshToken", response.data.data.refreshtoken);

      navigate('/Onboarding');
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
              <label className="sub_title" htmlFor="email">Username</label>
              <input
                id="username"
                className="form_style"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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

