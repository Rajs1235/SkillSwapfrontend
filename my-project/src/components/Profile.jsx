import React, { useState, useEffect } from 'react';
import api from './api';
import ProfileEditForm from './ProfileEditForm';
import {
  FaPython, FaReact, FaJava, FaNodeJs, FaChartBar, FaPaintBrush, FaMusic,
  FaCamera, FaLanguage, FaPenNib, FaBrain, FaProjectDiagram, FaChartPie,
  FaCodeBranch, FaGuitar, FaUserEdit, FaUsers, FaClock // Icon for time
} from 'react-icons/fa';
import {
  SiTableau, SiJavascript, SiDjango, SiR, SiGoogleanalytics, SiPhp,
  SiMysql, SiTypescript
} from 'react-icons/si';
import { GiMicrophone, GiDrum } from 'react-icons/gi';

const defaultAvatarUrl = 'https://placehold.co/256x256/E9D5FF/3730A3/png?text=User';

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
  const [profileData, setProfileData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      setIsLoading(true);
      try {
        const [profileRes, connectionsRes] = await Promise.all([
            api.get('/users/profile'),
            api.get('/connections')
        ]);

        const userData = profileRes.data?.data?.user;
        if (!userData || !userData.username) {
          throw new Error("Invalid profile data structure on initial load");
        }

        const matchCount = connectionsRes.data?.connections?.length || 0;

        setProfileData({
          ...userData,
          avatar: userData.avatar || defaultAvatarUrl,
          skills: userData.skills || [],
          role: userData.role || 'Learner',
          matchCount: matchCount,
          totalTimeSpent: userData.totalTimeSpent || 0 
        });

      } catch (error) {
        console.error("Profile load error:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleSaveProfile = async (updatedData) => {
    try {
        const response = await api.put('/users/profile', updatedData);
        const updatedUser = response.data?.user;

        if (!updatedUser || !updatedUser.username) {
            throw new Error("Could not find 'user' object in the server response.");
        }

        setProfileData(prev => ({
            ...prev,
            ...updatedUser,
        }));
        
        alert("Profile updated successfully!");
        setIsEditing(false); 
    } catch (err) {
        console.error("Failed to update profile:", err);
        alert("Error: " + err.message);
    }
  };

  // ADDED: Helper function to format seconds into a readable string
  const formatTotalTime = (totalSeconds) => {
    if (!totalSeconds || totalSeconds <= 0) return "0 sec";
    
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = Math.floor(totalSeconds % 60);

    const parts = [];
    if (h > 0) parts.push(`${h}hr`);
    if (m > 0) parts.push(`${m}min`);
    if (s > 0 || parts.length === 0) parts.push(`${s}sec`);
    
    return parts.join(':');
  };

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
  
  if (!profileData) return null;

  return (
    <>
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-700">My Profile</h2>
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <FaUserEdit className="mr-2" /> Edit
          </button>
        </div>

        <div className="flex items-center space-x-6 mb-6">
          <img src={profileData.avatar} alt="User Avatar" className="w-24 h-24 rounded-full object-cover border-4 border-purple-200" />
          <div>
            <p className="text-xl font-semibold">{profileData.username}</p>
            <p className="text-gray-600">{profileData.email}</p>
            <p className="text-sm text-blue-600 font-medium">Role: {profileData.role}</p>
          </div>
        </div>

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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Connections</h3>
                <div className="flex items-center space-x-2 bg-blue-100 text-blue-800 px-3 py-2 rounded-lg">
                    <FaUsers />
                    <span>You have <strong>{profileData.matchCount}</strong> match(es).</span>
                </div>
            </div>
            
            {/* ADDED: Total Time Spent Display */}
            <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Time Spent</h3>
                <div className="flex items-center space-x-2 bg-green-100 text-green-800 px-3 py-2 rounded-lg">
                    <FaClock />
                    <span>
                        <strong>{formatTotalTime(profileData.totalTimeSpent)}</strong> spent learning.
                    </span>
                </div>
            </div>
        </div>
      </div>
  
      {isEditing && (
        <ProfileEditForm 
          user={profileData}
          onSave={handleSaveProfile}
          onClose={() => setIsEditing(false)}
        />
      )}
    </>
  );
}

export default Profile;