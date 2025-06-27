import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const TutorCard = ({ tutor }) => {
  const handleConnect = () => {
    alert(`You clicked Connect for ${tutor.name}`);
    // Optional: navigate to a chat, or open a connect modal
  };

  return (
    <div className="bg-white/20 backdrop-blur-md rounded-lg p-5 shadow-md text-white border border-white/10 hover:shadow-lg transition">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-semibold">{tutor.name}</h2>
        {tutor.isVerifiedTutor && (
          <FaCheckCircle className="text-green-400" title="Verified Tutor" />
        )}
      </div>

      <p className="mb-2 font-medium">Skills:</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {tutor.knownSkills?.map((skill, idx) => (
          <span
            key={idx}
            className="px-3 py-1 bg-violet-600 rounded-full text-sm"
          >
            {skill}
          </span>
        ))}
      </div>

      <button
        onClick={handleConnect}
        className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg font-medium transition"
      >
        Connect
      </button>
    </div>
  );
};

export default TutorCard;
