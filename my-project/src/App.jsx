// src/App.jsx

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Onboarding from './components/Onboarding.jsx';
// Auth Pages
import Signup from './components/Signup';
import Login from './components/Login';
import Postings from './components/Postings.jsx';
// Core Pages
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import About from './components/About';
import ContactUs from './components/Contact';
import LearnerDashboard from './components/LearnerDashboard.jsx';
import TutorDashboard from './components/TutorDashboard.jsx';
// Dashboard Features
import Enrolled from './components/Enrolled';

import Progress from './components/Progress';
import SavedCourse from './components/SavedCourse';
import Skillbuilder from './components/SkillBuilder';

import Matches from './components/Matches';
import TimeTracker from './components/Time.jsx'; // renamed to match route name
import Badges from './components/Badges';
import ChatWindow from './components/ChatWindow.jsx';
import VideoCall from './components/Videocall.jsx';
import BrowseUser from './components/BrowseUser.jsx';
import UserCard from './components/UserCard.jsx';
import CertificateCard from './components/CertificateCard.jsx';
import ReviewCard from './components/ReviewCard.jsx';
import SubmitReview from './components/SubmitReview.jsx';
  
function App() { 

    console.log(import.meta.env.VITE_API_BASE_URL);
  return (
   
    <div className="app-container min-h-screen flex flex-col mt-80">
      {/* Header */}
      <header className="mt-50 pt-8 px-4">
        <h1 className="site-title text-4xl font-bold text-left text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
          SkillShare
        </h1>
      </header>

      {/* Routing */}
      <main className="flex-grow">
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<ContactUs />} />
 <Route path="/Tutor-Dashboard" element={<TutorDashboard />} />
 <Route path="/Learner-Dashboard" element={<LearnerDashboard />} />
  <Route path="/BrowseUser" element={<BrowseUser />} />
           <Route path="/UserCard" element={<UserCard />} />
            {/* Authenticated Routes */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
  <Route path="/CertificateCard" element={<CertificateCard />} />
 <Route path="/Reviews" element={<ReviewCard.jsx />} />
 <Route path="/SubmitReview" element={<SubmitReview.jsx />} />
  <Route path="/onboarding" element={<Onboarding />} />
            {/* Dashboard Subsections */}
            <Route path="/enrolled" element={<Enrolled />} />
   <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/savedCourse" element={<SavedCourse />} />
            <Route path="/skillbuilder" element={<Skillbuilder />} />
        <Route path="/postings" element={<Postings />} />
            <Route path="/matches" element={<Matches />} />
            <Route path="/time-tracker" element={<TimeTracker />} />
            <Route path="/badges" element={<Badges />} />
          <Route path="/chat/:roomId" element={<ChatWindow />} />
<Route path="/video-call" element={<VideoCall />} />


          </Routes>
        </BrowserRouter>
      </main>
    </div>
  );
}

export default App;

