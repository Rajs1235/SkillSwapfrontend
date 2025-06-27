import React, { useState } from "react";

const ProfileDetails = ({ onNext }) => {
  const [bio, setBio] = useState("");

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Tell us about yourself</h2>
      <textarea
        className="w-full border p-3 rounded-xl"
        rows="5"
        placeholder="Write a short bio..."
        value={bio}
        onChange={(e) => setBio(e.target.value)}
      />
      <button
        className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-xl"
        onClick={() => onNext({ bio })}
      >
        Next
      </button>
    </div>
  );
};

export default ProfileDetails;
