import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from './api';

function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    username: '',
    role: '',
    skills: [],
    matches: [],
  });
  const [matchCount, setMatchCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sessionMinutes, setSessionMinutes] = useState(0);

  useEffect(() => {
    const sessionStartTime = localStorage.getItem('sessionStartTime');
    if (!sessionStartTime) return;

    const intervalId = setInterval(() => {
      const startTime = new Date(sessionStartTime);
      const currentTime = new Date();
      const durationMs = currentTime - startTime;
      const totalMinutes = Math.floor(durationMs / (1000 * 60));
      setSessionMinutes(totalMinutes);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setIsLoggedIn(true);

    const fetchData = async () => {
      try {
        const [profileRes, connectionsRes] = await Promise.all([
          api.get('/users/profile'),
          api.get('/connections')
        ]);

        const userProfile = profileRes.data?.data?.user;
        if (userProfile) {
          setUserData({
            username: userProfile.username || '',
            role: userProfile.role || 'Learner',
            skills: userProfile.skills || [],
            matches: userProfile.matches || [],
          });
        }
        
        const connectedIds = connectionsRes.data;
        const count = connectedIds.connections.length;
        setMatchCount(count);
      } catch (err) {
        console.error('Error loading dashboard data:', err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (location.state?.onboardingSuccess) {
      alert("Welcome! Your profile has been successfully created.");
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const logoutHandler = async () => {
    try {
      const sessionStartTime = localStorage.getItem('sessionStartTime');
      if (sessionStartTime) {
        const startTime = new Date(sessionStartTime);
        const endTime = new Date();
        const durationSeconds = Math.round((endTime - startTime) / 1000);

        if (durationSeconds > 0) {
          await api.post('/users/update-time', { duration: durationSeconds });
        }
      }
    } catch (error) {
      console.error("Failed to save session time:", error);
    } finally {
      localStorage.clear();
      setIsLoggedIn(false);
      navigate('/login');
    }
  };

  // ADDED: A single, consolidated array for all navbar items

  return (
    <div
      className="min-h-screen bg-cover bg-center text-white"
      style={{
        backgroundImage: "url('/images/857de75c-26e3-4770-becf-70a76c8cd6f0.png')",
      }}
    >
      {/* MODIFIED: Navbar now contains all navigation links */}
     
      {/* MODIFIED: Main layout is now a single column */}
      <main className="flex flex-col items-center justify-center px-6 pt-12">
        <div className="w-full max-w-2xl mt-10">
          <section className="p-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl text-white space-y-4">
            <h1 className="text-3xl font-bold text-center">
              Hi {userData.username ? userData.username.split(" ")[0] : "User"}! Welcome back.
            </h1>
            <p className="text-white/80 text-center">Here’s your current progress snapshot:</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div onClick={() => navigate('/matches')} className="dashboard-card text-center p-6">
                <h3 className="font-semibold text-xl">📘 Matches</h3>
                <p className="text-3xl font-bold mt-2">{matchCount}</p>
                <p className="text-white/70">Connections Found</p>
              </div>
              <div onClick={() => navigate('/time-tracker')} className="dashboard-card text-center p-6">
                <h3 className="font-semibold text-xl">⏱ Time</h3>
                <p className="text-3xl font-bold mt-2">{sessionMinutes}</p>
                <p className="text-white/70">Mins This Session</p>
              </div>
            </div>

            {/* REMOVED: The large dashboard buttons are no longer needed */}
          </section>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;