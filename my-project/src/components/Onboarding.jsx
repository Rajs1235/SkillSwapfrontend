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

// Skill categories data
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
    learnSkills: []
  });
  const [selectedCategories, setSelectedCategories] = useState([]);
  const navigate = useNavigate();

  const handleNext = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setStep(step + 1);
  };

  const toggleCategory = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };

  const toggleSkill = (skillName) => {
    setFormData(prev => {
      const newSkills = prev.learnSkills.includes(skillName)
        ? prev.learnSkills.filter(skill => skill !== skillName)
        : [...prev.learnSkills, skillName];
      return { ...prev, learnSkills: newSkills };
    });
  };
const handleComplete = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/users/profile`, // ✅ correct endpoint
      {
        method: "PUT", // ✅ correct method
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          role: formData.role,
          learnSkills: formData.learnSkills, // ✅ must match backend expected key
          onboardingComplete: true,
        }),
      }
    );

    const contentType = response.headers.get("content-type");
    let responseData;

    if (contentType && contentType.includes("application/json")) {
      responseData = await response.json();
    } else {
      const text = await response.text();
      throw new Error(`Server returned: ${text.substring(0, 100)}...`);
    }

    if (!response.ok) {
      throw new Error(responseData.message || `HTTP error! status: ${response.status}`);
    }

    localStorage.setItem("userProfile", JSON.stringify(responseData.user));
    navigate("/dashboard", { state: { onboardingSuccess: true } });
  } catch (err) {
    console.error("Onboarding failed:", err);
    alert(`Onboarding failed: ${err.message}`);
  }
};

  // Get skills based on selected categories
  const getSkillsForView = () => {
    const skills = new Map();
    selectedCategories.forEach(category => {
      skillCategories[category]?.forEach(skill => skills.set(skill.name, skill));
    });
    formData.learnSkills.forEach(skillName => {
      if (!skills.has(skillName)) {
        // Find the skill in any category
        for (const category of Object.values(skillCategories)) {
          const found = category.find(s => s.name === skillName);
          if (found) {
            skills.set(skillName, found);
            break;
          }
        }
      }
    });
    return Array.from(skills.values());
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
                onChange={(e) => setFormData(prev => ({...prev, firstName: e.target.value}))}
                placeholder="Enter your first name"
                className="w-full px-4 py-2 bg-gray-100 rounded-lg border"
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold">Last Name</label>
              <input
                value={formData.lastName}
                onChange={(e) => setFormData(prev => ({...prev, lastName: e.target.value}))}
                placeholder="Enter your last name"
                className="w-full px-4 py-2 bg-gray-100 rounded-lg border"
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold">Select Role</label>
              <select
                value={formData.role}
                onChange={(e) => setFormData(prev => ({...prev, role: e.target.value}))}
                className="w-full px-4 py-2 rounded bg-white border border-gray-300"
              >
                <option value="Learner">Learner</option>
                <option value="Tutor">Tutor</option>
              </select>
            </div>
          </div>
          <button
            onClick={() => handleNext({})}
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
          
          <div>
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
                  {cat.charAt(0).toUpperCase() + cat.slice(1).replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {getSkillsForView().map(({ name, icon }) => (
              <button
                key={name}
                type="button"
                onClick={() => toggleSkill(name)}
                className={`px-3 py-1 rounded-full border flex items-center gap-1 ${
                  formData.learnSkills.includes(name)
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
              onClick={() => setStep(step - 1)}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
            >
              Back
            </button>
            <button
              onClick={() => handleNext({})}
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
              <h3 className="font-semibold">
                {formData.role === 'Tutor' ? 'Teaching Skills:' : 'Learning Goals:'}
              </h3>
              <div className="flex flex-wrap gap-2">
                {formData.learnSkills.map((skill, i) => (
                  <span key={i} className="px-2 py-1 bg-gray-200 rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => setStep(step - 1)}
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