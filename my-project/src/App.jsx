// src/App.jsx

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

// Auth Pages
import Signup from './components/Signup';
import Login from './components/Login';

// Core Pages
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import About from './components/About';
import ContactUs from './components/Contact';

// Dashboard Features
import Enrolled from './components/Enrolled';

import Progress from './components/Progress';
import SavedCourse from './components/SavedCourse';
import Skillbuilder from './components/SkillBuilder';

import Matches from './components/Matches';
import TimeTracker from './components/Time'; // renamed to match route name
import Badges from './components/Badges';
import Chat from './components/Chat';
import Videocall from './components/Videocall.jsx';
function App() {
  return (
    <div className="app-container min-h-screen flex flex-col">
      {/* Header */}
      <header className="mb-20 pt-8 px-4">
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

            {/* Authenticated Routes */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />

            {/* Dashboard Subsections */}
            <Route path="/enrolled" element={<Enrolled />} />

            <Route path="/progress" element={<Progress />} />
            <Route path="/savedCourse" element={<SavedCourse />} />
            <Route path="/skillbuilder" element={<Skillbuilder />} />
        
            <Route path="/matches" element={<Matches />} />
            <Route path="/time-tracker" element={<TimeTracker />} />
            <Route path="/badges" element={<Badges />} />
            <Route path="/chat/:roomId" element={<Chat />} />
  <Route path="/video-call/:roomId" element={<Videocall />} />
          </Routes>
        </BrowserRouter>
      </main>
    </div>
  );
}

export default App;

