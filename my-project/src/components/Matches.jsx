<<<<<<< HEAD
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
=======
// src/components/Matches.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Mock data for matched learning paths
const mockMatches = [
  { name: 'React Developer Path', overlap: '85%' },
  { name: 'Full Stack Track', overlap: '78%' },
  { name: 'Frontend UI Designer', overlap: '72%' },
];

// Utility: create a simple slugified room name from the match
function generateRoomId(name) {
  return `skillshare-${name.toLowerCase().replace(/\s+/g, '-')}`;
}

// Reusable action button with hover effect (icon appears on hover)
function ActionButton({ to, label, icon }) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={() => navigate(to)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="
        h-10 px-5 flex items-center justify-center rounded-full border border-white/20
        bg-white/10 hover:bg-white/20 transition-all duration-300
      "
      title={label}
    >
      <span className="text-lg">{isHovered ? icon : label}</span>
    </button>
  );
}

export default function Matches() {
  return (
    <div
      className="min-h-screen bg-cover bg-center py-12 px-6 text-white"
      style={{
        backgroundImage: "url('/images/857de75c-26e3-4770-becf-70a76c8cd6f0.png')",
      }}
>>>>>>> 15540af (commit)
    >
      <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20">
        <h1 className="text-3xl font-bold mb-6">📘 Your Matches</h1>

        <ul className="space-y-4">
<<<<<<< HEAD
          {matches.map((match, i) => {
            const roomId = generateRoomId(currentUserId, match.userId); // <- match.userId must exist in backend
=======
          {mockMatches.map((match, i) => {
            const roomId = generateRoomId(match.name);

>>>>>>> 15540af (commit)
            return (
              <li
                key={i}
                className="bg-white/10 p-4 rounded-xl border border-white/20 shadow"
              >
                <h2 className="text-xl font-semibold">{match.name}</h2>
<<<<<<< HEAD
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
=======

                <div className="flex items-center gap-4 mt-2 text-white/70">
                  Skill Match: {match.overlap}

                  {/* Action buttons */}
                  <ActionButton to={`/chat/${roomId}`} label="Chat" icon="💬" />
                  <ActionButton to={`/video-call/${roomId}`} label="Call" icon="🎥" />
>>>>>>> 15540af (commit)
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
