import React, { useState } from "react";

const allSkills = ["React", "Node.js", "UI Design", "Python", "Data Analysis"];

const SkillSelector = ({ onNext }) => {
  const [selectedSkills, setSelectedSkills] = useState([]);

  const toggleSkill = (skill) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Select your skills</h2>
      <div className="flex flex-wrap gap-2">
        {allSkills.map((skill) => (
          <button
            key={skill}
            className={`px-4 py-2 rounded-xl border ${
              selectedSkills.includes(skill)
                ? "bg-blue-600 text-white"
                : "bg-gray-100"
            }`}
            onClick={() => toggleSkill(skill)}
          >
            {skill}
          </button>
        ))}
      </div>
      <button
        className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-xl"
        onClick={() => onNext({ skills: selectedSkills })}
      >
        Next
      </button>
    </div>
  );
};

export default SkillSelector;
