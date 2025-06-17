import React from 'react';

const mockMatches = [
  { name: 'React Developer Path', overlap: '85%' },
  { name: 'Full Stack Track', overlap: '78%' },
  { name: 'Frontend UI Designer', overlap: '72%' },
];

function Matches() {
  return (
    <div className="min-h-screen bg-cover bg-center py-12 px-6 text-white"
      style={{ backgroundImage: "url('/images/857de75c-26e3-4770-becf-70a76c8cd6f0.png')" }}>
      <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20">
        <h1 className="text-3xl font-bold mb-6">📘 Your Matches</h1>
        <ul className="space-y-4">
          {mockMatches.map((match, i) => (
            <li key={i} className="bg-white/10 p-4 rounded-xl border border-white/20 shadow">
              <h2 className="text-xl font-semibold">{match.name}</h2>
              <p className="text-white/70">Skill Match: {match.overlap}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Matches;
