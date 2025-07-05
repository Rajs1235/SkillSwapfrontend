import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaPython, FaReact, FaJava, FaNodeJs, FaChartBar, FaPaintBrush, FaMusic,
  FaCamera, FaLanguage, FaPenNib, FaBrain, FaProjectDiagram, FaChartPie,
  FaCodeBranch, FaGuitar
} from 'react-icons/fa';
import {
  SiTableau, SiJavascript, SiDjango, SiR, SiGoogleanalytics, SiPhp,
  SiMysql, SiTypescript
} from 'react-icons/si';
import { GiMicrophone, GiDrum } from 'react-icons/gi';
import api from "./api";
// Skill categories
const skillCategories = {
  programming: [
    { name: 'Python', icon: <FaPython /> },
    { name: 'JavaScript', icon: <SiJavascript /> },
    { name: 'Java', icon: <FaJava /> },
    { name: 'React', icon: <FaReact /> },
    { name: 'Node.js', icon: <FaNodeJs /> },
    { name: 'TypeScript', icon: <SiTypescript /> },
    { name: 'Django', icon: <SiDjango /> },
    { name: 'PHP', icon: <SiPhp /> },
    { name: 'MySQL', icon: <SiMysql /> }
  ],
  analytics: [
    { name: 'Data Analysis', icon: <FaChartBar /> },
    { name: 'Tableau', icon: <SiTableau /> },
    { name: 'R', icon: <SiR /> },
    { name: 'Google Analytics', icon: <SiGoogleanalytics /> }
  ],
  creative: [
    { name: 'Graphic Design', icon: <FaPaintBrush /> },
    { name: 'Photography', icon: <FaCamera /> },
    { name: 'Music Composition', icon: <FaMusic /> },
    { name: 'Singing', icon: <GiMicrophone /> },
    { name: 'Drums', icon: <GiDrum /> },
    { name: 'Guitar', icon: <FaGuitar /> }
  ],
  language: [
    { name: 'Spanish', icon: <FaLanguage /> },
    { name: 'French', icon: <FaLanguage /> },
    { name: 'German', icon: <FaLanguage /> }
  ],
  writing: [
    { name: 'Creative Writing', icon: <FaPenNib /> },
    { name: 'Technical Writing', icon: <FaPenNib /> }
  ],
  other: [
    { name: 'Public Speaking', icon: <FaBrain /> },
    { name: 'Project Management', icon: <FaProjectDiagram /> },
    { name: 'Data Visualization', icon: <FaChartPie /> },
    { name: 'Git', icon: <FaCodeBranch /> }
  ]
};

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    role: 'Learner',
    skills: []
  });
  const [selectedCategories, setSelectedCategories] = useState([]);
  const navigate = useNavigate();

  const toggleCategory = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const toggleSkill = (skillName) => {
    setFormData(prev => {
      const updatedSkills = prev.skills.includes(skillName)
        ? prev.skills.filter(skill => skill !== skillName)
        : [...prev.skills, skillName];
      return { ...prev, skills: updatedSkills };
    });
  };

  const getSkillsForView = () => {
    const allSkills = new Map();
    selectedCategories.forEach(category => {
      skillCategories[category]?.forEach(skill => allSkills.set(skill.name, skill));
    });
    formData.skills.forEach(skillName => {
      if (!allSkills.has(skillName)) {
        for (const category of Object.values(skillCategories)) {
          const match = category.find(skill => skill.name === skillName);
          if (match) {
            allSkills.set(skillName, match);
            break;
          }
        }
      }
    });
    return Array.from(allSkills.values());
  };

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);
const handleComplete = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("User not authenticated. Please log in again.");

    // 1. Update user profile
    const profileRes = await api.put(
      "/users/profile",
      {
        firstName: formData.firstName,
        lastName: formData.lastName,
        role: formData.role,
        skills: formData.skills,
        onboardingComplete: true
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    // 2. Create match listing
    await api.post(
      "/matchlistings",
      {
        role: formData.role,
        skills: formData.skills
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    // 3. Save updated profile in localStorage and redirect
    localStorage.setItem("userProfile", JSON.stringify(profileRes.data.user));
    navigate("/dashboard", { state: { onboardingSuccess: true } });

  } catch (err) {
    console.error("Onboarding failed:", err);
    alert("Onboarding failed: " + (err.response?.data?.message || err.message));
  }
};

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
      {step === 1 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-center">Personal Information</h2>
          <div className="grid gap-4">
            <div>
              <label className="block mb-2 font-semibold">First Name</label>
              <input
                value={formData.firstName}
                onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                className="w-full px-4 py-2 bg-gray-100 rounded-lg border"
                placeholder="Enter your first name"
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold">Last Name</label>
              <input
                value={formData.lastName}
                onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                className="w-full px-4 py-2 bg-gray-100 rounded-lg border"
                placeholder="Enter your last name"
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold">Select Role</label>
              <select
                value={formData.role}
                onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                className="w-full px-4 py-2 rounded bg-white border border-gray-300"
              >
                <option value="Learner">Learner</option>
                <option value="Tutor">Tutor</option>
              </select>
            </div>
          </div>
          <button
            onClick={handleNext}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Next
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-center">
            {formData.role === 'Tutor' ? 'Skills You Can Teach' : 'Skills You Want to Learn'}
          </h2>
          <label className="block mb-2 font-semibold">Select Categories</label>
          <div className="flex flex-wrap gap-2 mb-4">
            {Object.keys(skillCategories).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => toggleCategory(cat)}
                className={`px-3 py-1 rounded-full border text-sm ${
                  selectedCategories.includes(cat)
                    ? 'bg-purple-600 text-white'
                    : 'bg-white text-black'
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {getSkillsForView().map(({ name, icon }) => (
              <button
                key={name}
                type="button"
                onClick={() => toggleSkill(name)}
                className={`px-3 py-1 rounded-full border flex items-center gap-1 ${
                  formData.skills.includes(name)
                    ? formData.role === 'Tutor'
                      ? 'bg-green-600 text-white'
                      : 'bg-purple-500 text-white'
                    : 'bg-white text-black'
                }`}
              >
                {icon} {name}
              </button>
            ))}
          </div>

          <div className="flex justify-between">
            <button
              onClick={handleBack}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
            >
              Back
            </button>
            <button
              onClick={handleNext}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-center">Review Your Information</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Name:</h3>
              <p>{formData.firstName} {formData.lastName}</p>
            </div>
            <div>
              <h3 className="font-semibold">Role:</h3>
              <p>{formData.role}</p>
            </div>
            <div>
              <h3 className="font-semibold">{formData.role === 'Tutor' ? 'Teaching Skills:' : 'Learning Goals:'}</h3>
              <div className="flex flex-wrap gap-2">
                {formData.skills.map((skill, idx) => (
                  <span key={idx} className="px-2 py-1 bg-gray-200 rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <button
              onClick={handleBack}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
            >
              Back
            </button>
            <button
              onClick={handleComplete}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              Complete Onboarding
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Onboarding;
