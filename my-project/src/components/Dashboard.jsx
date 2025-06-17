// src/pages/Dashboard.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();

  // Top navigation bar items
  const navItems = [
    { name: 'Home', slug: '/', active: true },
    { name: 'Login', slug: '/login', active: true },
    { name: 'Signup', slug: '/signup', active: true },
    { name: 'Profile', slug: '/profile', active: true },
  ];

  // Sidebar menu items
  const sidebarItems = [
    { name: 'Enrolled Classes', slug: '/enrolled', icon: '🧑‍🏫', active: true },

    { name: 'Progress Tracker', slug: '/Progress', icon: '✅', active: true },
    { name: 'Saved Courses', slug: '/SavedCourse', icon: '🗂', active: true },
    { name: 'Skill Builder', slug: '/Skillbuilder', icon: '🛠', active: true },
   
  ];

  return (
    <div
      className="max-h-screen bg-cover bg-center text-white"
      style={{
        backgroundImage: "url('/images/857de75c-26e3-4770-becf-70a76c8cd6f0.png')",
      }}
    >
      {/* Title */}
      <header className="text-center pt-12" />

      {/* Navbar */}
      <nav className="mt-6 flex justify-center">
        <ul className="flex items-center justify-center space-x-6 text-white text-lg font-medium">
          {navItems.map(
            (item) =>
              item.active && (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="inline-block px-6 py-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition duration-200 border border-white/20"
                  >
                    {item.name}
                  </button>
                </li>
              )
          )}
        </ul>
      </nav>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center px-6 pt-12">
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          
          {/* Sidebar */}
          <aside className="col-span-1 p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl">
            <h2 className="text-2xl font-semibold mb-4">Menu</h2>
            <ul className="space-y-3 text-white/90">
              {sidebarItems.map(
                (item) =>
                  item.active && (
                    <li
                      key={item.name}
                      onClick={() => navigate(item.slug)}
                      className="cursor-pointer hover:text-white"
                    >
                      {item.icon} {item.name}
                    </li>
                  )
              )}
            </ul>
          </aside>

          {/* Main Section */}
          <section className="col-span-2 p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl text-white space-y-4">
            <h1 className="text-3xl font-bold">Welcome Back!</h1>
            <p className="text-white/80">Here’s your current progress snapshot:</p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div
                onClick={() => navigate('/matches')}
                className="bg-white/10 p-4 rounded-xl shadow border border-white/20 cursor-pointer hover:bg-white/20 transition"
              >
                <h3 className="font-semibold text-lg">📘 Matches</h3>
                <p className="text-white/70">5 Found</p>
              </div>

              <div
                onClick={() => navigate('/time-tracker')}
                className="bg-white/10 p-4 rounded-xl shadow border border-white/20 cursor-pointer hover:bg-white/20 transition"
              >
                <h3 className="font-semibold text-lg">⏱ Time</h3>
                <p className="text-white/70">12 Hours</p>
              </div>

              <div
                onClick={() => navigate('/badges')}
                className="bg-white/10 p-4 rounded-xl shadow border border-white/20 cursor-pointer hover:bg-white/20 transition"
              >
                <h3 className="font-semibold text-lg">🏅 Badges</h3>
                <p className="text-white/70">3 Earned</p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
