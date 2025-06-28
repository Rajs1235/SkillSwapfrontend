import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './api';

export default function Matches() {
  const navigate = useNavigate();
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  const currentUserId = localStorage.getItem('userId');
  const currentUser = JSON.parse(localStorage.getItem('userProfile')); // contains .skills

  const generateRoomId = (u1, u2) => {
    return [u1, u2].sort().join('-');
  };

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await api.get('/users/all');

        const allUsers = res.data;
        const currentSkills = currentUser?.skills || [];

        const filteredMatches = allUsers
          .filter(user => user._id !== currentUserId) // exclude self
          .map(user => {
            const overlapSkills = user.skills?.filter(skill => currentSkills.includes(skill)) || [];
            const overlapPercentage = currentSkills.length > 0
              ? Math.round((overlapSkills.length / currentSkills.length) * 100)
              : 0;

            return {
              id: user._id,
              name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.username,
              overlap: overlapPercentage,
            };
          })
          .filter(user => user.overlap > 0) // only show users with some skill overlap
          .sort((a, b) => b.overlap - a.overlap); // sort by best match first

        setMatches(filteredMatches);
      } catch (err) {
        console.error('Error fetching matches:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  return (
    <div
      className="min-h-screen bg-cover bg-center py-12 px-6 text-white"
      style={{ backgroundImage: "url('/images/857de75c-26e3-4770-becf-70a76c8cd6f0.png')" }}
    >
      <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20">
        <h1 className="text-3xl font-bold mb-6">📘 Your Matches</h1>

        {loading ? (
          <p className="text-white">Loading matches...</p>
        ) : matches.length === 0 ? (
          <p className="text-white/80">No skill matches found. Try updating your profile or skills.</p>
        ) : (
          <ul className="space-y-4">
            {matches.map((match) => {
              const roomId = generateRoomId(currentUserId, match.id);
              return (
                <li
                  key={match.id}
                  className="bg-white/10 p-4 rounded-xl border border-white/20 shadow"
                >
                  <h2 className="text-xl font-semibold">{match.name}</h2>
                  <div className="flex items-center gap-4 mt-2 text-white/70">
                    Skill Match: {match.overlap}%
                    <button
                      onClick={() => navigate(`/chat/${roomId}`)}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded"
                    >
                      💬 Chat
                    </button>
                    <button
                      onClick={() => navigate(`/video-call/${match.id}`)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded"
                    >
                      🎥 Call
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
