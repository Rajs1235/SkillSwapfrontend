import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import api from './api';
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

function Profile() {
  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      learnSkills: []
    }
  });

  const [Role, setRole] = useState('Learner');
  const [submittedData, setSubmittedData] = useState({ learnSkills: [] });
  const [isEditing, setIsEditing] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const selectedLearnSkills = watch('learnSkills') || [];

  // Get all skills based on selected categories
  const getSkillDetails = (skillName) => {
    for (const category of Object.values(skillCategories)) {
      const found = category.find(s => s.name === skillName);
      if (found) return found;
    }
    return { name: skillName, icon: null };
  };

  const skillsForEditingView = (() => {
    const skills = new Map();
    selectedCategories.forEach(category => {
      skillCategories[category]?.forEach(skill => skills.set(skill.name, skill));
    });
    selectedLearnSkills.forEach(skillName => {
      if (!skills.has(skillName)) skills.set(skillName, getSkillDetails(skillName));
    });
    return Array.from(skills.values());
  })();

  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await api.get('/v1/users/profile');
        const user = res.data;

        setValue('FirstName', user.firstName || '');
        setValue('LastName', user.lastName || '');
        setValue('learnSkills', user.learnSkills || []);
        setRole(user.role || 'Learner');

        const matchedCategories = Object.entries(skillCategories).filter(([_, skills]) =>
          skills.some(skill => (user.learnSkills || []).includes(skill.name))
        ).map(([cat]) => cat);

        setSelectedCategories(matchedCategories);
        setSubmittedData({
          FirstName: user.firstName || '',
          LastName: user.lastName || '',
          role: user.role || 'Learner',
          learnSkills: user.learnSkills || []
        });

        setIsEditing(false);
      } catch (err) {
        console.error('Failed to fetch profile:', err);
      }
    }

    loadProfile();
  }, []);

  const toggleCategory = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  const handleSkillToggle = (skillName) => {
    const currentValues = watch('learnSkills') || [];
    if (currentValues.includes(skillName)) {
      setValue('learnSkills', currentValues.filter(skill => skill !== skillName));
    } else {
      setValue('learnSkills', [...currentValues, skillName]);
    }
  };

const onSubmit = async (data) => {
  try {
    const payload = {
      firstName: data.FirstName,
      lastName: data.LastName,
      learnSkills: data.learnSkills,
      role: Role
    };

    const res = await api.put('/v1/users/profile', payload);  // Save to backend
    const updatedUser = res.data; // ⬅️ Get data returned from backend

    setSubmittedData({
      FirstName: updatedUser.firstName,
      LastName: updatedUser.lastName,
      role: updatedUser.role,
      learnSkills: updatedUser.learnSkills || []
    });

    setIsEditing(false);  // Show preview
  } catch (err) {
    console.error('Profile update failed:', err);
  }
};

  return (
<div className="w-full max-w-5xl  mt-0 bg-white/30 backdrop-blur-md p-6 rounded-xl shadow-xl text-white space-y-4">
  <h2 className="text-3xl font-bold text-center drop-shadow mb-4">My Profile</h2>
      {isEditing ? (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div>

              <label className="block mb-2 font-semibold">First Name</label>
              <input {...register('FirstName', { required: true })}
                placeholder="Enter your first name"
                className="w-full px-4 py-2 bg-sky-100 text-black rounded-lg border"
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold">Last Name</label>
              <input {...register('LastName', { required: true })}
                placeholder="Enter your last name"
                className="w-full px-4 py-2 bg-sky-100 text-black rounded-lg border"
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 font-semibold">Select Role</label>
            <select
              value={Role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2 rounded bg-white text-black border border-gray-300"
            >
              <option value="Learner">Learner</option>
              <option value="Tutor">Tutor</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-semibold">Select Categories</label>
            <div className="flex flex-wrap gap-3">
              {Object.keys(skillCategories).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => toggleCategory(cat)}
                  className={`px-4 py-2 rounded-full border shadow-sm flex items-center gap-2 ${selectedCategories.includes(cat) ? 'bg-violet-600 text-white' : 'bg-white text-black'}`}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1).replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="font-semibold text-xl mb-2">
              {Role === 'Tutor' ? 'Skills You Can Teach' : 'Skills You Want to Learn'}
            </p>
            <div className="flex flex-wrap gap-3">
              {skillsForEditingView.map(({ name, icon }) => (
                <label key={name}
                  className={`px-4 py-2 rounded-full border shadow-sm cursor-pointer flex items-center gap-2 ${selectedLearnSkills.includes(name)
                    ? Role === 'Tutor' ? 'bg-green-600 text-white' : 'bg-violet-500 text-white'
                    : 'bg-white text-black'
                  }`}
                >
                  <input
                    type="checkbox"
                    value={name}
                    {...register('learnSkills')}
                    className="hidden"
                    checked={selectedLearnSkills.includes(name)}
                    onChange={() => handleSkillToggle(name)}
                  />
                  {icon}<span>{name}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="text-center">
            <button type="submit" className="bg-violet-600 text-white px-10 py-3 rounded-lg hover:bg-violet-700 transition-all shadow-lg">
              SAVE PROFILE
            </button>
          </div>
        </form>
      ) : (
        <div>
          <h3 className="text-3xl font-semibold mb-4">Hi, {submittedData?.FirstName} {submittedData?.LastName}</h3>
          <p className="text-xl mb-4">Role: <strong>{submittedData?.role}</strong></p>

          <div>
            <h4 className="font-semibold text-xl mb-2">
              {submittedData.role === 'Tutor' ? 'Skills You Can Teach' : 'Skills You Want to Learn'}
            </h4>
            <div className="flex flex-wrap gap-3">
              {submittedData.learnSkills.map((skill, i) => (
                <div key={i} className="px-4 py-2 bg-white text-black rounded-full flex items-center gap-2">
                  {getSkillDetails(skill).icon} {skill}
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-8">
            <button
              onClick={() => setIsEditing(true)}
              className="bg-yellow-500 text-black px-6 py-3 rounded hover:bg-yellow-600 shadow-lg"
            >
              Edit Profile
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
// Define your skillCategories below or import if it's already defined in another file
const skillCategories = {
  programming: [
    { name: 'Python', icon: <FaPython /> }, { name: 'JavaScript', icon: <SiJavascript /> },
    { name: 'TypeScript', icon: <SiTypescript /> }, { name: 'C++', icon: <FaBrain /> },
    { name: 'Java', icon: <FaJava /> }, { name: 'Node.js', icon: <FaNodeJs /> },
    { name: 'React', icon: <FaReact /> }, { name: 'PHP', icon: <SiPhp /> },
    { name: 'Django', icon: <SiDjango /> }, { name: 'MySQL', icon: <SiMysql /> },
    { name: 'Rust', icon: <FaProjectDiagram /> }, { name: 'Go', icon: <FaCodeBranch /> },
  ],
  'data-analysis': [
    { name: 'Excel', icon: <FaChartBar /> }, { name: 'Power BI', icon: <FaChartPie /> },
    { name: 'SQL', icon: <FaProjectDiagram /> }, { name: 'Tableau', icon: <SiTableau /> },
    { name: 'Python (Pandas)', icon: <FaPython /> }, { name: 'R', icon: <SiR /> },
    { name: 'Data Visualization', icon: <FaChartBar /> }, { name: 'Google Analytics', icon: <SiGoogleanalytics /> },
  ],
  creative: [
    { name: 'Graphic Design', icon: <FaPaintBrush /> }, { name: 'Music Production', icon: <FaMusic /> },
    { name: 'Photography', icon: <FaCamera /> }, { name: 'Video Editing', icon: <FaCamera /> },
    { name: '3D Animation', icon: <FaCamera /> }, { name: 'UI/UX Design', icon: <FaPaintBrush /> },
  ],
  marketing: [
    { name: 'SEO', icon: <SiGoogleanalytics /> }, { name: 'Social Media', icon: <FaLanguage /> },
    { name: 'Email Marketing', icon: <FaLanguage /> }, { name: 'Branding', icon: <FaLanguage /> },
    { name: 'Google Ads', icon: <SiGoogleanalytics /> }, { name: 'Content Strategy', icon: <FaPenNib /> },
    { name: 'Market Research', icon: <FaChartBar /> },
  ],
  business: [
    { name: 'Project Management', icon: <FaProjectDiagram /> }, { name: 'Business Analysis', icon: <FaChartBar /> },
    { name: 'Finance', icon: <FaChartBar /> }, { name: 'Entrepreneurship', icon: <FaProjectDiagram /> },
    { name: 'Negotiation', icon: <FaLanguage /> }, { name: 'Leadership', icon: <FaBrain /> },
  ],
  writing: [
    { name: 'Content Writing', icon: <FaPenNib /> }, { name: 'Copywriting', icon: <FaPenNib /> },
    { name: 'Technical Writing', icon: <FaPenNib /> }, { name: 'Blogging', icon: <FaPenNib /> },
    { name: 'Scriptwriting', icon: <FaPenNib /> }, { name: 'Editing', icon: <FaPenNib /> },
  ],
  languages: [
    { name: 'English', icon: <FaLanguage /> }, { name: 'Spanish', icon: <FaLanguage /> },
    { name: 'French', icon: <FaLanguage /> }, { name: 'German', icon: <FaLanguage /> },
    { name: 'Japanese', icon: <FaLanguage /> }, { name: 'Mandarin', icon: <FaLanguage /> },
    { name: 'Arabic', icon: <FaLanguage /> },
  ],
  'music-instruments': [
    { name: 'Guitar', icon: <FaGuitar /> }, { name: 'Piano', icon: <FaMusic /> },
    { name: 'Tabla', icon: <GiDrum /> }, { name: 'Rapping', icon: <GiMicrophone /> },
    { name: 'Beatboxing', icon: <GiMicrophone /> },
  ]
};
