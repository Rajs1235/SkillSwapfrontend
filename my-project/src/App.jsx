// src/App.jsx
// Main application entry point with protected routing.

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import Layout and Protection Components
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoutes'; // <-- The new protection component

// Import all your page components
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

// Import your global CSS
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* --- Standalone routes that don't need the main navbar --- */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* --- Routes that share the main Layout (Navbar, background, etc.) --- */}
        <Route path="/" element={<Layout />}>
          {/* Publicly accessible routes */}
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<ContactUs />} />

          {/* --- Protected Routes --- */}
          {/* This wrapper will check for a token. If it exists, it will render the nested route. */}
          {/* If not, it will redirect to /login. */}
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
        
        {/* A "catch-all" route for 404 Not Found pages */}
        <Route path="*" element={<div><h2>404 Page Not Found</h2></div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
