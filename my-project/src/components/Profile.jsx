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

const defaultAvatarUrl = 'https://i.ibb.co/sRL4Nrb/default-avatar.png';

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
       const response = await api.get('/api/v1/users/profile');

        console.log('API Response:', JSON.stringify(response.data, null, 2));

        const userData = response.data?.data?.user;

        if (!userData || !userData.username) {
          throw new Error("Invalid profile data structure");
        }

        setProfileData({
          ...userData,
          avatar: userData.avatar || defaultAvatarUrl,
          skills: userData.skills || [],
          matches: userData.matches || [],
          role: userData.role || 'Learner'
        });

        setIsLoading(false);
      } catch (error) {
        console.error("Profile load error:", error);
        setError(error.message);
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

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
{profileData.skills.map(skill => {
  const skillDetail = getSkillDetails(skill);
  return (
    <div key={skill} className="...">
      {skillDetail.icon}
      <span>{skillDetail.name}</span>
    </div>
  );
})}

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-700">My Profile</h2>
        <button
          onClick={() => setIsEditing(true)}
          className="flex items-center px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
        >
          <FaUserEdit className="mr-2" /> Edit
        </button>
      </div>

      {/* Avatar and Basic Info */}
      <div className="flex items-center space-x-6 mb-6">
     
        <div>
          <p className="text-xl font-semibold">{profileData.username}</p>
          <p className="text-gray-600">{profileData.email}</p>
          <p className="text-sm text-blue-600 font-medium">Role: {profileData.role}</p>
        </div>
      </div>

      {/* Skills */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Skills</h3>
        {profileData.skills.length > 0 ? (
          <div className="flex flex-wrap gap-3">
            {profileData.skills.map(skill => {
              const skillDetail = getSkillDetails(skill);
              return (
                <div key={skill} className="flex items-center space-x-1 bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                  {skillDetail.icon}
                  <span>{skillDetail.name}</span>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-500">No skills added.</p>
        )}
      </div>

      {/* Matches */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Matches</h3>
        {profileData.matches.length > 0 ? (
          <ul className="list-disc list-inside text-gray-600">
            {profileData.matches.map((matchId, idx) => (
              <li key={idx}>{matchId}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No matches yet.</p>
        )}
      </div>
    </div>
  );
}

export default Profile;
