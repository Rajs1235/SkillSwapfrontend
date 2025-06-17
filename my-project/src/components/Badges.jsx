import React from 'react';

const badges = [
  { title: 'Beginner Badge', description: 'Completed first course' },
  { title: 'Streak Star', description: 'Logged in 7 days in a row' },
  { title: 'Project Champ', description: 'Submitted your first project' },
];

function Badges() {
  return (
    <div className="min-h-screen bg-cover bg-center py-12 px-6 text-white"
      style={{ backgroundImage: "url('/images/857de75c-26e3-4770-becf-70a76c8cd6f0.png')" }}>
      <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20">
        <h1 className="text-3xl font-bold mb-6">🏅 Badges Earned</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {badges.map((badge, i) => (
            <div key={i} className="bg-white/10 p-6 rounded-xl border border-white/20 shadow">
              <h3 className="text-xl font-semibold">{badge.title}</h3>
              <p className="text-white/70">{badge.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Badges;
