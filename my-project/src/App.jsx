// src/App.jsx
// Main application entry point with routing and route protection.

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// --- Import Layout and Protection Components ---
// Layout will contain the shared UI elements like the full-width Navbar
import Layout from './components/Layout'; 
// ProtectedRoute will guard routes that require a user to be logged in
import ProtectedRoute from './components/ProtectedRoutes'; 

// --- Import Page Components ---
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import About from './components/About';
import ContactUs from './components/Contact';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import LearnerDashboard from './components/LearnerDashboard';
import TutorDashboard from './components/TutorDashboard';
import BrowseUser from './components/BrowseUser';
import Matches from './components/Matches';
import Enrolled from './components/Enrolled';
import Progress from './components/Progress';
import SavedCourse from './components/SavedCourse';
import Skillbuilder from './components/SkillBuilder';
import Postings from './components/Postings';
import TimeTracker from './components/Time';
import Badges from './components/Badges';
import ChatWindow from './components/ChatWindow';
import VideoCall from './components/Videocall';

// --- Import Global CSS ---
// This file contains the corrected styles for the body and #root
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* --- Standalone Routes --- */}
        {/* These routes render without the main Navbar and footer from the Layout component. */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* --- Main Application Routes with Shared Layout --- */}
        {/* All routes nested within this <Route> will render inside the Layout component, */}
        {/* which includes the Navbar. The specific page component will replace the <Outlet />. */}
        <Route path="/" element={<Layout />}>
          
          {/* Publicly accessible routes */}
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<ContactUs />} />

          {/* --- Protected Routes --- */}
          {/* The ProtectedRoute component wraps all routes that require authentication. */}
          {/* If the user is not authenticated, it will redirect them to the /login page. */}
          <Route element={<ProtectedRoute />}>
            <Route path="onboarding" element={<Onboarding />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="learner-dashboard" element={<LearnerDashboard />} />
            <Route path="tutor-dashboard" element={<TutorDashboard />} />
            <Route path="browse" element={<BrowseUser />} />
            <Route path="matches" element={<Matches />} />
            <Route path="enrolled" element={<Enrolled />} />
            <Route path="progress" element={<Progress />} />
            <Route path="saved-courses" element={<SavedCourse />} />
            <Route path="skill-builder" element={<Skillbuilder />} />
            <Route path="postings" element={<Postings />} />
            <Route path="time-tracker" element={<TimeTracker />} />
            <Route path="badges" element={<Badges />} />
            <Route path="chat/:roomId" element={<ChatWindow />} />
            <Route path="video-call/:roomId" element={<VideoCall />} />
          </Route>
        </Route>
        
        {/* --- Catch-all 404 Route --- */}
        {/* This route will be matched if no other routes are matched. */}
        <Route path="*" element={
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: 'white' }}>
            <h2>404 Page Not Found</h2>
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
