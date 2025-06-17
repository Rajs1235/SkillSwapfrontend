import React from 'react';

const timeStats = [
  { label: 'This Week', hours: 12 },
  { label: 'Total', hours: 58 },
  { label: 'Avg per Day', hours: 2.4 },
];

function TimeTracker() {
  return (
    <div className="min-h-screen bg-cover bg-center py-12 px-6 text-white"
      style={{ backgroundImage: "url('/images/857de75c-26e3-4770-becf-70a76c8cd6f0.png')" }}>
      <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20">
        <h1 className="text-3xl font-bold mb-6">⏱ Time Tracker</h1>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {timeStats.map((stat, i) => (
            <div key={i} className="bg-white/10 p-6 rounded-xl border border-white/20 shadow">
              <h3 className="text-xl font-semibold">{stat.label}</h3>
              <p className="text-white/80">{stat.hours} hrs</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TimeTracker;

