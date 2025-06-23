import React from 'react';

const timeStats = [
  { label: 'This Week', hours: 12 },
  { label: 'Total', hours: 58 },
  { label: 'Avg per Day', hours: 2.4 },
];

function TimeTracker() {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const fetchTimeStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/v1/timetracker`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const { thisWeek, total, avgPerDay } = res.data;
        setStats([
          { label: 'This Week', hours: thisWeek },
          { label: 'Total', hours: total },
          { label: 'Avg per Day', hours: avgPerDay }
        ]);
      } catch (err) {
        console.error('Error fetching time stats', err);
      }
    };

    fetchTimeStats();
  }, []);

  return (
    <div className="min-h-screen bg-cover bg-center py-12 px-6 text-white"
         style={{ backgroundImage: "url('/images/857de75c-26e3-4770-becf-70a76c8cd6f0.png')" }}>
      <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20">
        <h1 className="text-3xl font-bold mb-6">⏱ Time Tracker</h1>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
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


