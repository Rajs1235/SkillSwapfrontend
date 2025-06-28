import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import api from './api';
import {
  FaPython, FaReact, FaJava, FaNodeJs, FaChartBar, FaPaintBrush, FaMusic,
  FaCamera, FaLanguage, FaPenNib, FaBrain, FaProjectDiagram, FaChartPie,
  FaCodeBranch, FaGuitar, FaUserEdit
} from 'react-icons/fa';
import {
  SiTableau, SiJavascript, SiDjango, SiR, SiGoogleanalytics, SiPhp,
  SiMysql, SiTypescript
} from 'react-icons/si';
import { GiMicrophone, GiDrum } from 'react-icons/gi';
import { toast } from 'react-toastify';
async function getProfile() {
  try {
    const response = await fetch('https://skillswapbackend.onrender.com/api/v1/user/profile', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Profile data:', data);
    return data;
  } catch (error) {
    console.error('Failed to fetch profile:', error);
    // Handle error (e.g., redirect to login)
  }
}
const skillCategories = {
  programming: [
    { name: 'Python', icon: <FaPython /> }, { name: 'JavaScript', icon: <SiJavascript /> },
    { name: 'TypeScript', icon: <SiTypescript /> }, { name: 'Java', icon: <FaJava /> },
    { name: 'Node.js', icon: <FaNodeJs /> }, { name: 'React', icon: <FaReact /> },
    { name: 'PHP', icon: <SiPhp /> }, { name: 'Django', icon: <SiDjango /> },
    { name: 'MySQL', icon: <SiMysql /> }
  ],
  analytics: [
    { name: 'Data Analysis', icon: <FaChartBar /> }, { name: 'Tableau', icon: <SiTableau /> },
    { name: 'R', icon: <SiR /> }, { name: 'Google Analytics', icon: <SiGoogleanalytics /> },
    { name: 'Data Visualization', icon: <FaChartPie /> }
  ],
  creative: [
    { name: 'Graphic Design', icon: <FaPaintBrush /> }, { name: 'Photography', icon: <FaCamera /> },
    { name: 'Music Composition', icon: <FaMusic /> }, { name: 'UI/UX Design', icon: <FaPaintBrush /> }
  ],
  language: [
    { name: 'Spanish', icon: <FaLanguage /> }, { name: 'French', icon: <FaLanguage /> },
    { name: 'German', icon: <FaLanguage /> }, { name: 'Japanese', icon: <FaLanguage /> }
  ],
  writing: [
    { name: 'Creative Writing', icon: <FaPenNib /> }, { name: 'Technical Writing', icon: <FaPenNib /> },
    { name: 'Content Writing', icon: <FaPenNib /> }
  ],
  other: [
    { name: 'Public Speaking', icon: <FaBrain /> }, { name: 'Project Management', icon: <FaProjectDiagram /> },
    { name: 'Git', icon: <FaCodeBranch /> }, { name: 'Leadership', icon: <FaBrain /> }
  ],
  music: [
    { name: 'Guitar', icon: <FaGuitar /> }, { name: 'Singing', icon: <GiMicrophone /> },
    { name: 'Drums', icon: <GiDrum /> }
  ]
};

function Profile() {
  const { register, handleSubmit, watch, setValue, reset } = useForm();
  const [role, setRole] = useState('Learner');
  const [profileData, setProfileData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const selectedSkills = watch('skills') || [];

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setIsLoading(true);
        const response = await api.get('/users/profile');
        const userData =response.data;

        if (!userData || !userData.firstName) throw new Error("Invalid profile data received");

        setProfileData(userData);
        setRole(userData.role || 'Learner');

        reset({
          firstName: userData.firstName || '',
          lastName: userData.lastName || '',
          bio: userData.bio || '',
          skills: userData.skills || [],
        });

        const userCategories = Object.keys(skillCategories).filter(category =>
          skillCategories[category].some(skill =>
            (userData.skills || []).includes(skill.name)
          )
        );
        setSelectedCategories(userCategories);
        setIsLoading(false);
      } catch (err) {
        console.error('Profile load error:', err.message || err);
        setError('Failed to load profile');
        setIsLoading(false);
      }
    };

    loadProfile();
  }, [reset]);

  const getSkillDetails = (skillName) => {
    for (const category of Object.values(skillCategories)) {
      const found = category.find(s => s.name === skillName);
      if (found) return found;
    }
    return { name: skillName, icon: <FaBrain /> };
  };

  const filteredSkills = () => {
    const skillsMap = new Map();
    selectedCategories.forEach(category => {
      skillCategories[category]?.forEach(skill => {
        skillsMap.set(skill.name, skill);
      });
    });
    selectedSkills.forEach(skillName => {
      if (!skillsMap.has(skillName)) {
        skillsMap.set(skillName, getSkillDetails(skillName));
      }
    });
    return Array.from(skillsMap.values());
  };

  const toggleCategory = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const toggleSkill = (skillName) => {
    const currentSkills = watch('skills') || [];
    if (currentSkills.includes(skillName)) {
      setValue('skills', currentSkills.filter(s => s !== skillName));
    } else {
      setValue('skills', [...currentSkills, skillName]);
    }
  };

  const onSubmit = async (data) => {
    try {
      const payload = {
        firstName: data.firstName,
        lastName: data.lastName,
        bio: data.bio,
        role,
        skills: data.skills
      };
      const response = await api.put('/users/profile', payload);
      const updatedUser = response.data.user || response.data;
      setProfileData(updatedUser);
      setIsEditing(false);
      toast.success('Profile updated successfully!');
    } catch (err) {
      console.error('Profile update error:', err);
      toast.error('Failed to update profile');
    }
  };

  // ✅ Loading UI
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  // ❌ Error UI
  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500 text-lg">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  // ✅ Main JSX return
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md">
      {/* Your JSX from before continues unchanged here */}
      {/* ... you already wrote this part completely */}
    </div>
  );
}

export default Profile;
