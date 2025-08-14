import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './api'; // Your configured axios instance
import sha256 from 'crypto-js/sha256';
import Hex from 'crypto-js/enc-hex';

export default function Matches() {
  const navigate = useNavigate();
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [callingUser, setCallingUser] = useState(null); // Shows a loading state on the specific button being clicked

  // Retrieve the current user's ID from local storage
  const currentUserId = localStorage.getItem('userId');

  /**
   * Generates a stable, unique room ID for any two user IDs.
   * It sorts the IDs before hashing to ensure that the room ID is the
   * same regardless of who initiates the call.
   * @param {string} u1 - ID of the first user.
   * @param {string} u2 - ID of the second user.
   * @returns {string} A 16-character unique room ID.
   */
  const generateRoomId = (u1, u2) => {
    return sha256([u1, u2].sort().join('-')).toString(Hex).slice(0, 16);
  };

  // Fetch the user's connections when the component mounts
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

  /**
   * Handles the video call initiation process.
   * @param {string} targetUserId - The ID of the user to call.
   * @param {string} roomId - The unique room ID for the call.
   */
  const handleStartCall = async (targetUserId, roomId) => {
    setCallingUser(targetUserId); // Set loading state for the button
    try {
      // Step 1: Request a secure token from your backend.
      // Your backend will generate a token valid ONLY for this user and this room.
      const response = await api.post('/users/video/get-token', {
        identity: currentUserId, 
        roomName: roomId,
      });

      const { token } = response.data;

      if (!token) {
        throw new Error("Token was not received from the server.");
      }

      // Step 2: Navigate to the video call component, passing the token securely in the state.
      navigate(`/video-call/${roomId}`, { state: { token } });

    } catch (error) {
      console.error("Failed to get video call token:", error);
      alert("Could not start the video call. Please ensure your server is running and try again.");
    } finally {
      setCallingUser(null); // Reset loading state
    }
  };
  
  const handleRemove = async (userIdToRemove) => {
    try {
   // New, corrected line
await api.delete(`/users/connections/${userIdToRemove}`);
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
              const videoRoomId = generateRoomId(currentUserId, match._id);
              const isCalling = callingUser === match._id;

              return (
                <li key={match._id} className="bg-white/10 p-4 rounded-xl border border-white/20 shadow-lg flex flex-col sm:flex-row justify-between items-start sm:items-center">
                  <div>
                    <h2 className="text-xl font-semibold">{match.username}</h2>
                    <p className="text-sm text-white/70">{match.fullName}</p>
                    <p className="text-sm text-white/70">Skills: {match.skills.join(', ')}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 mt-3 sm:mt-0">
                    <button
                      onClick={() => handleStartCall(match._id, videoRoomId)}
                      disabled={isCalling}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition disabled:bg-gray-500 disabled:cursor-not-allowed"
                    >
                      {isCalling ? 'Starting...' : '🎥 Call'}
                    </button>
                    <button
                      onClick={() => handleRemove(match._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
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
