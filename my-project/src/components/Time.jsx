import React, { useState, useEffect } from 'react';
import api from './api';

// Helper function to format seconds into HH:MM:SS
const formatDuration = (totalSeconds) => {
  if (totalSeconds < 0) totalSeconds = 0;
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

function TimeTracker() {
  const [currentSessionDuration, setCurrentSessionDuration] = useState(0); // in seconds
  const [sessionHistory, setSessionHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Effect for the live timer of the CURRENT session
  useEffect(() => {
    const sessionStartTime = localStorage.getItem('sessionStartTime');
    if (!sessionStartTime) return;

    const intervalId = setInterval(() => {
      const durationMs = new Date() - new Date(sessionStartTime);
      setCurrentSessionDuration(durationMs / 1000);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  // Effect to fetch PAST session history on component load
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await api.get('/users/profile');
        const user = response.data?.data?.user;
        if (user && user.sessionHistory) {
          // Reverse the array to show the most recent session on top
          setSessionHistory(user.sessionHistory.slice().reverse());
        }
      } catch (error) {
        console.error("Failed to fetch session history:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="min-h-screen bg-cover bg-center py-12 px-6 text-white"
         style={{ backgroundImage: "url('/images/857de75c-26e3-4770-becf-70a76c8cd6f0.png')" }}>
      <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20">
        <h1 className="text-3xl font-bold mb-6">⏱ Time Tracker</h1>

        {/* Current Session Timer */}
        <div className="bg-white/10 p-8 rounded-xl border border-white/20 shadow text-center mb-8">
          <h3 className="text-xl font-semibold text-white/80 mb-2">Current Session Duration</h3>
          <p className="text-6xl font-mono tracking-widest">{formatDuration(currentSessionDuration)}</p>
        </div>

        {/* Past Session History */}
        <div>
            <h2 className="text-2xl font-bold mb-4">Session History</h2>
            {isLoading ? (
                <p>Loading history...</p>
            ) : sessionHistory.length > 0 ? (
                <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                    {sessionHistory.map((session) => (
                        <div key={session._id} className="flex justify-between items-center bg-white/5 p-3 rounded-lg">
                            <p className="text-white/80">
                                Session ended on: {new Date(session.endedAt).toLocaleDateString()}
                            </p>
                            <p className="font-mono text-lg bg-white/10 px-3 py-1 rounded">
                                {formatDuration(session.duration)}
                            </p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-white/60">No past session data found.</p>
            )}
        </div>
      </div>
    </div>
  );
}

export default TimeTracker;