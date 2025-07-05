import React from 'react'
import { Link } from 'react-router-dom'
import Dashboard from './Dashboard'
import Login from './Login'
import peer from '../assets/peer.jpg'
function Home() {
  return (
    <div className="">
      <div className="w-full max-w-6xl mx-auto bg-white/10 backdrop-blur-md rounded-xl shadow-2xl overflow-hidden">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Left side - Hero content */}
          <div className="p-12 flex flex-col justify-center">
            <h1 className="text-5xl font-bold mb-6 text-white">
              Connect, Learn & Grow Together
            </h1>
            <p className="text-xl mb-8 text-white/80">
              Find your perfect skill exchange partner in our community of lifelong learners.
              Teach what you know, learn what you don't - all in one place.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/Login" 
                className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-all shadow-lg hover:shadow-xl"
              >
                Get Started
              </Link>
              <Link 
                to="/about" 
                className="border-2 border-white hover:bg-white/20 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-all shadow-lg hover:shadow-xl"
              >
                Learn More
              </Link>
            </div>
          </div>
          
          {/* Right side - Visual element (placeholder for an illustration) */}
          <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-blue-800/30 to-purple-800/30 p-8">
            <div className="relative w-full h-full flex items-center justify-center">
              <div className="absolute inset-0 flex items-center justify-center opacity-20">
                <div className="w-64 h-64 rounded-full bg-teal-400 mix-blend-screen filter blur-3xl"></div>
                <div className="w-64 h-64 rounded-full bg-purple-400 mix-blend-screen filter blur-3xl ml-20"></div>
              </div>
              <div className="relative z-10 text-center p-8">
              
                <img src={peer} className="text-8xl mb-4 text-white/50 rounded-6xl" />
                <h3 className="text-2xl font-semibold text-white/80">
                  Skill Exchange Network
                </h3>
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home