import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';

function Progress() {
  const [progressData, setProgressData] = useState([]);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/v1/progress`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const formatted = res.data?.progress?.map((item) => ({
          title: item.courseName,
          data: [
            { name: 'Completed', value: item.completed },
            { name: 'Remaining', value: 100 - item.completed }
          ],
          colors: ['#4ade80', '#f87171']
        })) || [];

        setProgressData(formatted);
      } catch (err) {
        console.error('Failed to fetch progress', err);
      }
    };
    fetchProgress();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center p-8">
      <div className="bg-white/20 backdrop-blur-md p-10 rounded-2xl shadow-2xl border border-white/30 max-w-5xl w-full text-center space-y-10">
        <h2 className="text-4xl font-bold text-white">📊 Progress Tracker</h2>
        <div className="grid md:grid-cols-2 gap-10">
          {progressData.map((chart, idx) => (
            <div key={idx} className="w-full flex flex-col items-center">
              <div className="w-64 h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chart.data}
                      innerRadius={60}
                      outerRadius={80}
                      dataKey="value"
                      paddingAngle={5}
                    >
                      {chart.data.map((entry, i) => (
                        <Cell key={i} fill={chart.colors[i]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <p className="mt-4 text-lg font-semibold text-white">{chart.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Progress;
