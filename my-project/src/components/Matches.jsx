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
  const currentUser = JSON.parse(localStorage.getItem('userProfile'));

  // Generate hashed roomId
  const generateRoomId = (u1, u2) => {
    return sha256([u1, u2].sort().join('-')).toString(Hex).slice(0, 16);
  };

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const token = localStorage.getItem('token');

        // ✅ Fetch connected users only
        const res = await api.get('/connections', {
          headers: { Authorization: `Bearer ${token}` },
        });


         console.log("response",res)
        const connectedUsers = res.data?.connections || [];
         console.log("response after",connectedUsers)

         setMatches(connectedUsers);

    

        
      } catch (err) {
        console.error('Error fetching matches:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchConnections();
  }, []);

  console.log("matches",matches);

  const handleRemove = async (userIdToRemove) => {
    try {
      const token = localStorage.getItem('token');
      await api.delete(`/connections/${userIdToRemove}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMatches(prev => prev.filter(m => m.id !== userIdToRemove));
    } catch (err) {
      console.error('Failed to remove connection  ||| working.....:', err);
      alert('Failed to remove connection ||| working......');
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center py-12 px-6 text-white"
         style={{ backgroundImage: "url('/images/857de75c-26e3-4770-becf-70a76c8cd6f0.png')" }}>
      <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20">
        <h1 className="text-3xl font-bold mb-6">🤝 Your Connections</h1>

        {loading ? (
          <p className="text-white">Loading matches...</p>
        ) : matches.length === 0 ? (
          <p className="text-white/80">No connections found. Browse and connect with users first.</p>
        ) : (
          <ul className="space-y-4">
            {matches.map((match) => {
              const videoRoomId = generateRoomId(currentUserId, match.id);

              return (
                <li key={match._id} className="bg-white/10 p-4 rounded-xl border border-white/20 shadow">
                  <h2 className="text-xl font-semibold">{match.username}</h2>
                   <p className="text-sm text-white/70">{match.fullName}</p>
                  <p className="text-sm text-white/70">Skills: {match.skills.join(', ')}</p>
                  <div className="flex flex-wrap items-center gap-3 mt-3 text-white/70">
                    Skill Match: {match.overlap}%
                    <button
                      onClick={() => navigate(`/video-call/${videoRoomId}`)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded"
                    >
                      🎥 Call
                    </button>
                    <button
                      onClick={() => handleRemove(match.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded"
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
