import React from 'react';
import { useNavigate } from 'react-router-dom';

const dummyMatches = [
  {
    id: 'user123',
    name: 'Alice Johnson',
    overlap: 78,
  },
  {
    id: 'user456',
    name: 'Bob Smith',
    overlap: 65,
  },
  {
    id: 'user789',
    name: 'Charlie Brown',
    overlap: 90,
  },
];

export default function Matches() {
  const navigate = useNavigate();
  const currentUserId = localStorage.getItem('userId') || 'currentUser';

  const generateRoomId = (u1, u2) => {
    return [u1, u2].sort().join('-');
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center py-12 px-6 text-white"
      style={{ backgroundImage: "url('/images/857de75c-26e3-4770-becf-70a76c8cd6f0.png')" }}
    >
      <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20">
        <h1 className="text-3xl font-bold mb-6">📘 Your Matches</h1>
        <ul className="space-y-4">
          {dummyMatches.map((match) => {
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
      </div>
    </div>
  );
}
