import React from 'react';
import { motion } from 'framer-motion';

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
  return (
    <div
      className="min-h-screen bg-cover bg-center text-white py-16 px-6"
      style={{
        backgroundImage: "url('/images/857de75c-26e3-4770-becf-70a76c8cd6f0.png')",
      }}
    >
      <div className="max-w-7xl mx-auto w-full relative">


        {/* Snake Animation Path Line */}
        <div className="absolute w-full top-[135px] left-0 z-0 flex justify-center">
          <svg
            viewBox="0 0 1200 100"
            className="w-full max-w-6xl h-[100px]"
            preserveAspectRatio="none"
          >
            <path
              id="snakePath"
              d="M0,50 C300,0 900,100 1200,50"
              stroke="#10b98155"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="10 20"
            />
            <motion.circle
              r="10"
              fill="#10b981"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              <animateMotion
                dur="10s"
                repeatCount="indefinite"
                rotate="auto"
                keyPoints="0;1"
                keyTimes="0;1"
              >
                <mpath xlinkHref="#snakePath" />
              </animateMotion>
            </motion.circle>
          </svg>
        </div>

        {/* Responsive Horizontal-then-Vertical Cards */}
        <div className="relative z-10 flex flex-wrap justify-center gap-10 mt-12">
          {learningPath.map((step) => (
            <div
              key={step.id}
              className="bg-white/20 backdrop-blur-xl p-6 w-[280px] rounded-2xl shadow-lg text-white"
            >
              <h3 className="text-xl font-bold">{step.title}</h3>
              <p className="text-sm mt-1 text-white/80">{step.description}</p>
              <p className="text-xs mt-2 text-white/60">{step.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Paths;
