// ...other imports
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './api';

function Dashboard() {
  const navigate = useNavigate();

  const [matchCount, setMatchCount] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [badgeCount, setBadgeCount] = useState(0);
  const [reviews, setReviews] = useState([]);

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [matchesRes, timeRes, badgesRes, reviewRes] = await Promise.all([
          api.get(`/v1/matches/${userId}`),
          api.get(`/v1/timetracker/${userId}`),
          api.get(`/v1/badges/${userId}`),
          api.get(`/v1/reviews/tutor/${userId}`), // Adjust endpoint as needed
        ]);

        setMatchCount(matchesRes.data?.length || 0);
        setTotalTime(timeRes.data?.totalHours || 0);
        setBadgeCount(badgesRes.data?.badges?.length || 0);
        setReviews(reviewRes.data?.reviews || []);
      } catch (err) {
        console.error('Dashboard load error:', err);
      }
    };

    if (userId) fetchData();
  }, [userId]);

  const navItems = [
    { name: 'Home', slug: '/', icon: '🏠', active: true },
    { name: 'Login', slug: '/login', icon: '🔐', active: true },
    { name: 'Signup', slug: '/signup', icon: '✍️', active: true },
    { name: 'Profile', slug: '/profile', icon: '🙍‍♂️', active: true },
  ];

  const sidebarItems = [
    { name: 'Enrolled Classes', slug: '/enrolled', icon: '🧑‍🏫', active: true },
    { name: 'Browse Tutors', slug: '/BrowseTutor', icon: '🗂', active: true },
    { name: 'Learner Dashboard', slug: '/learner-dashboard', icon: '📚', active: true },
    { name: 'Tutor Dashboard', slug: '/tutor-dashboard', icon: '👨‍🏫', active: true },
  ];

  return (
    <div
      className="min-h-screen bg-cover bg-center text-white"
      style={{
        backgroundImage: "url('/images/857de75c-26e3-4770-becf-70a76c8cd6f0.png')",
      }}
    >
      {/* Navbar */}
      <nav className="mt-6 flex justify-center">
        <ul className="flex items-center justify-center space-x-6 text-white text-lg font-medium">
          {navItems.map(
            (item) =>
              item.active && (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="group inline-block px-6 py-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition duration-200 border border-white/20 relative"
                  >
                    {item.name}
                    <span className="ml-2 hidden group-hover:inline">
                      {item.icon}
                    </span>
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
              <div onClick={() => navigate('/matches')} className="dashboard-card">
                <h3 className="font-semibold text-lg">📘 Matches</h3>
                <p className="text-white/70">{matchCount} Found</p>
              </div>
              <div onClick={() => navigate('/time-tracker')} className="dashboard-card">
                <h3 className="font-semibold text-lg">⏱ Time</h3>
                <p className="text-white/70">{totalTime} Hours</p>
              </div>

            </div>

            {/* Role-based Dashboard Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              <button
                onClick={() => navigate('/learner-dashboard')}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition"
              >
                📚 Go to Learner Dashboard
              </button>
              <button
                onClick={() => navigate('/tutor-dashboard')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition"
              >
                👨‍🏫 Go to Tutor Dashboard
              </button>
            </div>

            {/* Reviews Section */}
            <div className="mt-10">
              <h2 className="text-2xl font-semibold mb-4">Recent Reviews</h2>
              {reviews.length === 0 ? (
                <p className="text-white/70">No reviews yet.</p>
              ) : (
                <div className="space-y-4">
                  {reviews.slice(0, 3).map((review, idx) => (
                    <div
                      key={idx}
                      className="bg-white/10 p-4 rounded-lg border border-white/20"
                    >
                      <p className="font-semibold text-yellow-400">
                        {'⭐'.repeat(review.rating)}{' '}
                        <span className="text-white/70 ml-2">
                          {review.reviewerName || 'Anonymous'}
                        </span>
                      </p>
                      <p className="text-white/80 mt-1">{review.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
