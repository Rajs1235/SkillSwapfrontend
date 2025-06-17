import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
 import bgImage from '../assets/trial.png';// adjust path if needed

const COLORS = ['#4ade80', '#f87171'];

const dataSet = [
  {
    title: 'React Basics',
    data: [
      { name: 'Completed', value: 70 },
      { name: 'Remaining', value: 30 },
    ],
    colors: ['#4ade80', '#f87171'],
  },
  {
    title: 'JavaScript Mastery',
    data: [
      { name: 'Completed', value: 40 },
      { name: 'Remaining', value: 60 },
    ],
    colors: ['#60a5fa', '#f87171'],
  },
];

function Progress() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center p-8"

    >
      

      <div className="bg-white/20 backdrop-blur-md p-10 rounded-2xl shadow-2xl border border-white/30 max-w-5xl w-full text-center space-y-10">
        <h2 className="text-4xl font-bold text-white flex items-center justify-center gap-2 drop-shadow-sm">
          📊 Progress Tracker
        </h2>
        <p className="text-white/90 text-base md:text-lg">
          Visualize your course completion status.
        </p>

        <div className="grid md:grid-cols-2 gap-10">
          {dataSet.map((chart, idx) => (
            <div key={idx} className="w-full flex flex-col items-center">
              <div className="w-64 h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chart.data}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {chart.data.map((entry, i) => (
                        <Cell key={`cell-${i}`} fill={chart.colors[i % chart.colors.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <p className="mt-4 text-lg font-semibold text-white drop-shadow">{chart.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Progress;
