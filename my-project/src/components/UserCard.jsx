import React from 'react';

function UserCard({ user, isConnected, onConnect }) {
  return (
    <div className="bg-white/10 border border-white/20 p-4 rounded-xl text-white shadow">
      <h2 className="text-xl font-semibold mb-2">{user.firstName} {user.lastName}</h2>
      <p className="text-sm text-white/80 mb-2">Role: {user.role}</p>
      <p className="text-sm text-white/70 mb-2">Skills: {user.skills?.join(', ') || 'None'}</p>

      {isConnected ? (
        <span className="inline-block bg-green-600 text-white px-3 py-1 rounded mt-2">✔ Connected</span>
      ) : (
        <button
          onClick={onConnect}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded mt-2"
        >
          🤝 Connect
        </button>
      )}
    </div>
  );
}

export default UserCard;
