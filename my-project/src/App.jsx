import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import Home from './components/Home';
import About from './components/About';
function App() {
  return (
    <>
  <div className="app-container min-h-screen flex flex-col">
        {/* Header section with increased margin-bottom */}
        <header className="mb-12 pt-8 px-4"> {/* Added padding-top and increased margin-bottom */}
          <h1 className="site-title text-4xl font-bold text-left text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
            SkillShare
          </h1>
        </header>

        {/* Main content area */}
        <main className="flex-grow">
          <BrowserRouter>
            <Routes>
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<Signup />} />
              <Route path='/Dashboard' element={<Dashboard />} />
              <Route path='/' element={<Home />} />
              <Route path='/Profile' element={<Profile />} />
               <Route path='/About' element={<About />} />
            </Routes>
          </BrowserRouter>
        </main>
      </div>
    </>
  );
}

export default App;