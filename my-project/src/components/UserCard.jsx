import React from 'react';
import { FaCheckCircle, FaComments, FaVideo } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const UserCard = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg shadow-md p-5 flex flex-col justify-between h-full">
      <div>
        <h2 className="text-xl font-semibold flex items-center gap-2">
          {user.name}
          {user.isVerifiedTutor && (
            <FaCheckCircle className="text-green-500" title="Verified Tutor" />
          )}
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          {user.knownSkills?.length > 0
            ? user.knownSkills.join(', ')
            : 'No skills listed.'}
        </p>
      </div>
      <div className="mt-4 flex gap-3">
        <button
          onClick={() => navigate(`/chat/${user._id}`)}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center gap-2"
        >
          <FaComments /> Chat
        </button>
        <button
          onClick={() => navigate(`/videocall/${user._id}`)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <FaVideo /> Call
        </button>
      </div>
    </div>
  );
};

export default UserCard;
