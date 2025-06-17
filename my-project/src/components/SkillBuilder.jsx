import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from 'recharts';

const skillData = [
  { name: 'HTML', progress: 85 },
  { name: 'CSS', progress: 75 },
  { name: 'JavaScript', progress: 60 },
  { name: 'React', progress: 40 },
  { name: 'Node.js', progress: 30 },
];

const suggestions = [
  {
    title: 'Boost Your React Skills',
    condition: (progress) => progress.React < 50,
    tip: 'Try building small projects like a Todo app or a weather app to practice React hooks and state management.',
  },
  {
    title: 'Solidify JavaScript Fundamentals',
    condition: (progress) => progress.JavaScript < 70,
    tip: 'Focus on closures, callbacks, promises, and ES6+ syntax with short coding challenges.',
  },
];

function SkillBuilder() {
  const progressMap = skillData.reduce((acc, cur) => {
    acc[cur.name] = cur.progress;
    return acc;
  }, {});

  return (
    <div
      className="min-h-screen bg-cover bg-center text-white py-16 px-6"
      style={{
        backgroundImage: "url('/images/857de75c-26e3-4770-becf-70a76c8cd6f0.png')",
      }}
    >
      <div className="max-w-6xl mx-auto bg-white/10 backdrop-blur-lg p-10 rounded-3xl shadow-2xl">
        <h1 className="text-4xl font-bold text-center mb-10">🧱 Skill Builder</h1>

        {/* Bar Chart */}
        <div className="h-[300px] w-full mb-10">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={skillData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff33" />
              <XAxis dataKey="name" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip contentStyle={{ backgroundColor: '#333', color: '#fff' }} />
              <Bar dataKey="progress" fill="#10b981" barSize={40} radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Suggestions */}
        <div className="grid md:grid-cols-2 gap-6">
          {suggestions
            .filter((s) => s.condition(progressMap))
            .map((s, index) => (
              <div
                key={index}
                className="bg-white/20 backdrop-blur-md p-6 rounded-xl shadow-lg"
              >
                <h3 className="text-xl font-bold text-green-300">{s.title}</h3>
                <p className="text-white/80 mt-2">{s.tip}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default SkillBuilder;
