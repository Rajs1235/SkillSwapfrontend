import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './api';
import sha256 from 'crypto-js/sha256';
import Hex from 'crypto-js/enc-hex';

export default function Matches() {
  const navigate = useNavigate();
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  const currentUserId = localStorage.getItem('userId');

  /**
   * Generates a stable, unique room ID for any two user IDs.
   * Sorting ensures the ID is the same regardless of order (e.g., userA-userB is the same as userB-userA).
   * @param {string} u1 - ID of the first user.
   * @param {string} u2 - ID of the second user.
   * @returns {string} A 16-character unique room ID.
   */
  const generateRoomId = (u1, u2) => {
    // Sort IDs to ensure consistency, then hash the result.
    return sha256([u1, u2].sort().join('-')).toString(Hex).slice(0, 16);
  };

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const res = await api.get('/connections');
        setMatches(res.data?.connections || []);
      } catch (err) {
        console.error('Error fetching matches:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchConnections();
  }, []);

  const handleRemove = async (userIdToRemove) => {
    try {
      await api.delete(`/connections/${userIdToRemove}`);
      // Filter out the removed user from the state
      setMatches(prev => prev.filter(m => m._id !== userIdToRemove));
      alert('Connection removed successfully.');
    } catch (err) {
      console.error('Failed to remove connection:', err);
      alert('Failed to remove connection. Please try again.');
    }
  };

  return (
    <div 
        className="min-h-screen bg-cover bg-center py-12 px-6 text-white"
        style={{ backgroundImage: "url('/images/857de75c-26e3-4770-becf-70a76c8cd6f0.png')" }}
    >
      <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20">
        <h1 className="text-3xl font-bold mb-6">🤝 Your Connections</h1>

        {loading ? (
          <p className="text-white">Loading matches...</p>
        ) : matches.length === 0 ? (
          <p className="text-white/80">No connections found. Browse and connect with users first.</p>
        ) : (
          <ul className="space-y-4">
            {matches.map((match) => {
              // ✅ ADDED: Generate a unique video call room ID for each match pair.
              const videoRoomId = generateRoomId(currentUserId, match._id);

              return (
                <li key={match._id} className="bg-white/10 p-4 rounded-xl border border-white/20 shadow">
                  <h2 className="text-xl font-semibold">{match.username}</h2>
                  <p className="text-sm text-white/70">{match.fullName}</p>
                  <p className="text-sm text-white/70">Skills: {match.skills.join(', ')}</p>
                  <div className="flex flex-wrap items-center gap-3 mt-3">
                    <button
                      onClick={() => navigate(`/video-call/${videoRoomId}`)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded transition"
                    >
                      🎥 Call
                    </button>
                    <button
                      onClick={() => handleRemove(match._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded transition"
                    >
                      ❌ Remove
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