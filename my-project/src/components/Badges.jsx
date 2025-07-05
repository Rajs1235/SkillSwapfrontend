import React, { useEffect, useState } from 'react';
import api from './api'; // axios instance with base URL

function Badges() {
  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchBadges = async () => {
      try {
        const res = await api.get(`/users/badges/${userId}`);
        setBadges(res.data.badges || []);
      } catch (err) {
        console.error('Failed to fetch badges:', err);
        setBadges([]);
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchBadges();
  }, [userId]);

  return (
    <div
      className="min-h-screen bg-cover bg-center py-12 px-6 text-white"
      style={{ backgroundImage: "url('/images/857de75c-26e3-4770-becf-70a76c8cd6f0.png')" }}
    >
      <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20">
        <h1 className="text-3xl font-bold mb-6">🏅 Badges Earned</h1>

        {loading ? (
          <p className="text-white/70">Loading badges...</p>
        ) : badges.length === 0 ? (
          <p className="text-white/60">No badges earned yet. Keep learning!</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {badges.map((badge, i) => (
              <div
                key={i}
                className="bg-white/10 p-6 rounded-xl border border-white/20 shadow"
              >
                <h3 className="text-xl font-semibold text-green-300">{badge.title}</h3>
                <p className="text-white/70">{badge.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Badges;

