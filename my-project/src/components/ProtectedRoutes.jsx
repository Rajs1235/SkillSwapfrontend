
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  // Check if the authentication token exists in local storage.
  const token = localStorage.getItem('token');

  // If the user is authenticated (token exists), render the child component.
  // The <Outlet /> component from react-router-dom renders the matched nested route.
  // If the user is not authenticated, redirect them to the /login page.
  // The 'replace' prop prevents the user from going back to the protected route via the browser's back button.
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
