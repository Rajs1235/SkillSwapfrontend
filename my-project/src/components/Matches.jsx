import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Matches() {
  const [matches, setMatches] = useState([]);
  const navigate = useNavigate();
  const currentUserId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/v1/match`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setMatches(res.data.matches || []);
      } catch (err) {
        console.error("Error fetching matches", err);
      }
    };

    fetchMatches();
  }, []);

  // Utility: consistent room ID for both users
  const generateRoomId = (user1, user2) => {
    return [user1, user2].sort().join('-'); // alphabetical order = consistent room
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center py-12 px-6 text-white"
      style={{ backgroundImage: "url('/images/857de75c-26e3-4770-becf-70a76c8cd6f0.png')" }}
    >
      <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20">
        <h1 className="text-3xl font-bold mb-6">📘 Your Matches</h1>
        <ul className="space-y-4">
          {matches.map((match, i) => {
            const roomId = generateRoomId(currentUserId, match.userId); // <- match.userId must exist in backend
            return (
              <li
                key={i}
                className="bg-white/10 p-4 rounded-xl border border-white/20 shadow"
              >
                <h2 className="text-xl font-semibold">{match.name}</h2>
                <div className="flex items-center gap-4 mt-2 text-white/70">
                  Skill Match: {match.overlap || 'N/A'}%
                  <button
                    onClick={() => navigate(`/chat/${roomId}`)}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded"
                  >
                    💬 Chat
                  </button>
                  <button
                    onClick={() => navigate(`/video-call/${roomId}`)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded"
                  >
                    🎥 Call
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
