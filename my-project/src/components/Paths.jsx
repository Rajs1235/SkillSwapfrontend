import React from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
const learningPath = [
  {
    id: 1,
    title: 'HTML & CSS Basics',
    description: 'Start with the foundational web technologies.',
    date: 'Week 1',
  },
  {
    id: 2,
    title: 'JavaScript Essentials',
    description: 'Learn core JS concepts and syntax.',
    date: 'Week 2',
  },
  {
    id: 3,
    title: 'React Fundamentals',
    description: 'Build interactive UIs using React.',
    date: 'Week 3',
  },
  {
    id: 4,
    title: 'Backend with Node.js',
    description: 'Understand how servers and APIs work.',
    date: 'Week 4',
  },
  {
    id: 5,
    title: 'Final Project',
    description: 'Apply all skills in a full-stack project.',
    date: 'Week 5',
  },
];

function Paths() {
  
  useEffect(() => {
    async function fetchPaths() {
      try {
        const res = await api.get('/paths');
        setPaths(res.data.paths || []);
      } catch (err) {
        console.error('Error fetching learning paths', err);
      }
    }
    fetchPaths();
  }, []);

  return (
    <div className="min-h-screen bg-cover bg-center py-12 px-6 text-white" style={{ backgroundImage: "url('/images/857de75c-26e3-4770-becf-70a76c8cd6f0.png')" }}>
      <div className="max-w-5xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20">
        <h1 className="text-3xl font-bold mb-6">🛠 Learning Paths</h1>
        {paths.length === 0 ? (
          <p className="text-white/80">No learning paths found.</p>
        ) : (
          <ul className="space-y-4">
            {paths.map(path => (
              <li key={path.id} className="bg-white/10 p-4 rounded-xl border border-white/20 shadow">
                <h2 className="text-xl font-semibold text-white">{path.title}</h2>
                <p className="text-white/80 mt-1">{path.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Paths;
