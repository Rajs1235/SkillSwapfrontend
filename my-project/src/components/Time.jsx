import React, { useState, useEffect } from 'react';

function TimeTracker() {
  const [stats, setStats] = useState([]);
  const [dailyLog, setDailyLog] = useState({});
  const [lastActive, setLastActive] = useState(null);

  useEffect(() => {
    // Mocked static data
    const mockData = {
      thisWeek: 9.5,
      total: 42,
      avgPerDay: 1.8,
      lastActive: '2025-06-27T13:40:00Z',
      dailyLog: {
        Monday: 2.5,
        Tuesday: 1.5,
        Wednesday: 3.0,
        Thursday: 1.0,
        Friday: 1.5,
        Saturday: 0,
        Sunday: 0,
      },
    };

    const { thisWeek, total, avgPerDay, lastActive, dailyLog } = mockData;
    setStats([
      { label: 'This Week', hours: thisWeek },
      { label: 'Total', hours: total },
      { label: 'Avg per Day', hours: avgPerDay },
    ]);
    setDailyLog(dailyLog);
    setLastActive(lastActive);
  }, []);

  const formatDateTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <div className="min-h-screen bg-cover bg-center py-12 px-6 text-white"
         style={{ backgroundImage: "url('/images/857de75c-26e3-4770-becf-70a76c8cd6f0.png')" }}>
      <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20">
        <h1 className="text-3xl font-bold mb-6">⏱ Time Tracker</h1>

        {/* Key Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white/10 p-6 rounded-xl border border-white/20 shadow">
              <h3 className="text-xl font-semibold">{stat.label}</h3>
              <p className="text-white/80">{stat.hours} hrs</p>
            </div>
          ))}
        </div>

        {/* Daily Breakdown */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">📅 Daily Activity</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {Object.entries(dailyLog).map(([day, hours]) => (
              <div key={day} className="bg-white/10 p-4 rounded-lg border border-white/20">
                <p className="font-semibold">{day}</p>
                <p className="text-white/80">{hours} hrs</p>
              </div>
            ))}
          </div>
        </div>

        {/* Last Active */}
        {lastActive && (
          <div className="text-white/80 italic mt-4">
            🔄 Last active: {formatDateTime(lastActive)}
          </div>
        )}
      </div>
    </div>
  );
}

export default TimeTracker;
