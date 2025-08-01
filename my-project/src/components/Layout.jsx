
import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import api from './api';
import Navbar from './Navbar';

export function Layout() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      api.get('/users/profile')
        .then(res => {
          setUserData(res.data?.data?.user);
        })
        .catch(err => {
          console.error("Failed to fetch user for layout", err);
          logoutHandler(); // Log out if token is invalid
        })
        .finally(() => setLoading(false));
    } else {
      setIsLoggedIn(false);
      setLoading(false);
    }
  }, []);

  const logoutHandler = async () => {
    // Session time logic can be added here
    localStorage.clear();
    setIsLoggedIn(false);
    setUserData(null);
    navigate('/login');
  };

  // Optional: Show a loading state while checking auth status
  if (loading) {
    return <div className="flex items-center justify-center h-screen bg-gray-900 text-white">Loading...</div>;
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/images/857de75c-26e3-4770-becf-70a76c8cd6f0.png')" }}
    >
      <Navbar
        isLoggedIn={isLoggedIn}
        userData={userData}
        logoutHandler={logoutHandler}
      />
      <main className="pt-4 px-4 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
