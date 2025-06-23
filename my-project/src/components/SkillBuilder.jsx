import React, { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from 'recharts';
import api from '../api'; // make sure this points to your axios instance

const levelMap = {
  Beginner: 1,
  Intermediate: 2,
  Expert: 3
};

const suggestions = [
  {
    title: 'Boost Your React Skills',
    condition: (skills) => (skills.find(s => s.skill === 'React')?.Teaching || 0) < 2,
    tip: 'Try building small projects like a Todo app or a weather app to practice React hooks and state management.',
  },
  {
    title: 'Solidify JavaScript Fundamentals',
    condition: (skills) => (skills.find(s => s.skill === 'JavaScript')?.Teaching || 0) < 2,
    tip: 'Focus on closures, callbacks, promises, and ES6+ syntax with short coding challenges.',
  },
];

function SkillBuilder() {
  const [skillsData, setSkillsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await api.get(`/v1/users/profile/${userId}`);
        const { teachSkills = [], learnSkills = [], ...rest } = res.data || {};

        const teachSet = new Set(teachSkills);
        const learnSet = new Set(learnSkills);
        const allSkills = Array.from(new Set([...teachSet, ...learnSet]));

        const formatted = allSkills.map(skill => ({
          skill,
          Teaching: teachSet.has(skill) ? (levelMap[rest[`teachLevel-${skill}`]] || 0) : 0,
          Learning: learnSet.has(skill) ? 1 : 0,
        }));

        setSkillsData(formatted);
      } catch (err) {
        console.error('Failed to fetch profile:', err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchSkills();
  }, [userId]);

  return (
    <div
      className="min-h-screen bg-cover bg-center text-white py-16 px-6"
      style={{
        backgroundImage: "url('/images/857de75c-26e3-4770-becf-70a76c8cd6f0.png')",
      }}
    >
      <div className="max-w-6xl mx-auto bg-white/10 backdrop-blur-lg p-10 rounded-3xl shadow-2xl">
        <h1 className="text-4xl font-bold text-center mb-10">🧱 Skill Builder</h1>

        {/* Chart */}
        {loading ? (
          <p className="text-center text-white/70">Loading skill data...</p>
        ) : skillsData.length === 0 ? (
          <p className="text-center text-white/70">No skills found in your profile.</p>
        ) : (
          <>
            <div className="h-[300px] w-full mb-10">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={skillsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff33" />
                  <XAxis dataKey="skill" stroke="#fff" />
                  <YAxis stroke="#fff" allowDecimals={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#333', color: '#fff' }} />
                  <Bar dataKey="Teaching" fill="#10b981" barSize={40} radius={[10, 10, 0, 0]} />
                  <Bar dataKey="Learning" fill="#6366f1" barSize={40} radius={[10, 10, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Suggestions */}
            <div className="grid md:grid-cols-2 gap-6">
              {suggestions
                .filter(s => s.condition(skillsData))
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
          </>
        )}
      </div>
    </div>
  );
}

export default SkillBuilder;
