import React from 'react';

const UserCard = ({ user }) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-md">
      <div className="text-xl font-semibold mb-1">{user.name}</div>
      <div className="text-sm text-gray-600 mb-2">Role: {user.role}</div>
      <div className="flex flex-wrap gap-2 mb-2">
        {user.skills?.map((skill, i) => (
          <span key={i} className="bg-gray-100 text-sm px-2 py-1 rounded-full">
            {skill}
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <button
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => window.location.href = `/chat?user=${user.user}`}
        >
          Chat
        </button>
        <button
          className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
          onClick={() => window.location.href = `/videocall?user=${user.user}`}
        >
          Call
        </button>
      </div>
    </div>
  );
};

export default UserCard;
