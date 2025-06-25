import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import api from './api'; 
import axios from 'axios';// Adjust path if needed
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
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

function Profile() {
  const { register, handleSubmit, watch, setValue, getValues } = useForm({
    defaultValues: {
      learnSkills: [],
      teachSkills: []
    }
  });

  const [submittedData, setSubmittedData] = useState({
    learnSkills: [],
    teachSkills: []
  });

  const [isEditing, setIsEditing] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const selectedLearnSkills = watch('learnSkills') || [];
  const selectedTeachSkills = watch('teachSkills') || [];

  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await api.get('/v1/users/profile');
        const user = res.data;

        setValue('FirstName', user.firstName || '');
        setValue('LastName', user.lastName || '');
        setValue('learnSkills', user.learnSkills || []);
        setValue('teachSkills', user.teachSkills || []);

        (user.teachLevels || []).forEach(({ skill, level }) => {
          setValue(`teachLevel-${skill}`, level);
        });

        const allSkills = [...(user.learnSkills || []), ...(user.teachSkills || [])];
        const matchedCategories = Object.entries(skillCategories).filter(([_, skills]) =>
          skills.some(skill => allSkills.includes(skill.name))
        ).map(([cat]) => cat);

        setSelectedCategories(matchedCategories);

        setSubmittedData({
          FirstName: user.firstName || '',
          LastName: user.lastName || '',
          learnSkills: user.learnSkills || [],
          teachSkills: user.teachSkills || [],
          ...Object.fromEntries((user.teachLevels || []).map(({ skill, level }) => [`teachLevel-${skill}`, level]))
        });

        setIsEditing(false);
      } catch (err) {
        console.error('Failed to fetch profile:', err);
      }
    }

    loadProfile();
  }, []);

  const onSubmit = async (data) => {
    try {
      const teachLevels = data.teachSkills.map(skill => ({
        skill,
        level: data[`teachLevel-${skill}`] || 'Beginner'
      }));

      const payload = {
        firstName: data.FirstName,
        lastName: data.LastName,
        learnSkills: data.learnSkills,
        teachSkills: data.teachSkills,
        teachLevels
      };

      await api.put('/v1/users/update', payload);

      setSubmittedData({
        ...data,
        ...Object.fromEntries(teachLevels.map(({ skill, level }) => [`teachLevel-${skill}`, level]))
      });

      setIsEditing(false);
    } catch (err) {
      console.error('Profile update failed:', err);
    }
  };

  const toggleCategory = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const getStarRating = (level) => {
    const levels = {
      Beginner: 2,
      Intermediate: 3,
      Expert: 5
    };
    const count = levels[level] || 0;
    return (
      <span className="flex text-yellow-400 text-lg">
        {[...Array(5)].map((_, i) =>
          i < count ? <AiFillStar key={i} /> : <AiOutlineStar key={i} />
        )}
      </span>
    );
  };

  const getSkillDetails = (skillName) => {
    for (const category of Object.values(skillCategories)) {
      const foundSkill = category.find(s => s.name === skillName);
      if (foundSkill) return foundSkill;
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
    selectedTeachSkills.forEach(skillName => {
      if (!skills.has(skillName)) skills.set(skillName, getSkillDetails(skillName));
    });
    return Array.from(skills.values());
  })();

  const learnSkillsToShow = skillsForEditingView.filter(
    ({ name }) => !selectedTeachSkills.includes(name)
  );

  const teachSkillsToShow = skillsForEditingView.filter(
    ({ name }) => !selectedLearnSkills.includes(name)
  );

  const handleSkillToggle = (skillName, listName) => {
    const currentValues = getValues(listName) || [];
    if (currentValues.includes(skillName)) {
      setValue(listName, currentValues.filter(skill => skill !== skillName));
      if (listName === 'teachSkills') {
        setValue(`teachLevel-${skillName}`, '');
      }
    } else {
      setValue(listName, [...currentValues, skillName]);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto mt-20 bg-white/30 backdrop-blur-md p-14 rounded-xl shadow-2xl text-white space-y-10">
      <h2 className="text-5xl font-bold text-center drop-shadow-xl mb-8">My Profile</h2>

      {isEditing ? (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 font-semibold">First Name</label>
              <input {...register('FirstName', { required: true })}
                placeholder="Enter your first name"
                className="w-full px-4 py-2 bg-sky-100 text-black rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-400"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">Last Name</label>
              <input {...register('LastName', { required: true })}
                placeholder="Enter your last name"
                className="w-full px-4 py-2 bg-sky-100 text-black rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-400"
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 font-semibold">Select Categories</label>
            <div className="flex flex-wrap gap-3">
              {Object.keys(skillCategories).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => toggleCategory(cat)}
                  className={`px-4 py-2 rounded-full border shadow-sm flex items-center gap-2 ${
                    selectedCategories.includes(cat)
                      ? 'bg-violet-600 text-white'
                      : 'bg-white text-black'
                  }`}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1).replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>

          {(selectedCategories.length > 0 || selectedLearnSkills.length > 0 || selectedTeachSkills.length > 0) && (
            <>
              <div>
                <p className="font-semibold text-xl mb-2">Skills You Want to Learn</p>
                <div className="flex flex-wrap gap-3">
                  {learnSkillsToShow.map(({ name, icon }) => (
                    <label key={`learn-${name}`}
                      className={`px-4 py-2 rounded-full border shadow-sm cursor-pointer flex items-center gap-2 ${
                        selectedLearnSkills.includes(name)
                          ? 'bg-violet-500 text-white'
                          : 'bg-white text-black'
                      }`}
                    >
                      <input
                        type="checkbox"
                        value={name}
                        {...register('learnSkills')}
                        className="hidden"
                        checked={selectedLearnSkills.includes(name)}
                        onChange={() => handleSkillToggle(name, 'learnSkills')}
                      />
                      {icon}<span>{name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <p className="font-semibold text-xl mb-2">Skills You Can Teach</p>
                <div className="flex flex-wrap gap-3">
                  {teachSkillsToShow.map(({ name, icon }) => (
                    <label key={`teach-${name}`}
                      className={`px-4 py-2 rounded-full border shadow-sm cursor-pointer flex items-center gap-2 ${
                        selectedTeachSkills.includes(name)
                          ? 'bg-violet-500 text-white'
                          : 'bg-white text-black'
                      }`}
                    >
                      <input
                        type="checkbox"
                        value={name}
                        {...register('teachSkills')}
                        className="hidden"
                        checked={selectedTeachSkills.includes(name)}
                        onChange={() => handleSkillToggle(name, 'teachSkills')}
                      />
                      {icon}<span>{name}</span>
                      {selectedTeachSkills.includes(name) && (
                        <select
                          {...register(`teachLevel-${name}`)}
                          className="ml-2 bg-sky-100 text-black rounded px-2 py-1 text-sm"
                          defaultValue=""
                        >
                          <option value="">Level</option>
                          <option value="Beginner">Beginner</option>
                          <option value="Intermediate">Intermediate</option>
                          <option value="Expert">Expert</option>
                        </select>
                      )}
                    </label>
                  ))}
                </div>
              </div>
            </>
          )}

          <div className="text-center">
            <button type="submit" className="bg-violet-600 text-white px-10 py-3 rounded-lg hover:bg-violet-700 transition-all shadow-lg">
              SAVE PROFILE
            </button>
          </div>
        </form>
      ) : (
        <div>
          <h3 className="text-3xl font-semibold mb-4">Hi, {submittedData?.FirstName} {submittedData?.LastName}</h3>

          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-xl mb-2">Skills You Can Teach</h4>
              <div className="flex flex-wrap gap-3">
                {Array.isArray(submittedData?.teachSkills) && submittedData.teachSkills.map((skill, i) => (
                  <div key={i} className="px-4 py-2 bg-white text-black rounded-full flex items-center gap-2">
                    {getSkillDetails(skill).icon} {skill} {getStarRating(submittedData[`teachLevel-${skill}`])}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-xl mb-2">Skills You Want to Learn</h4>
              <div className="flex flex-wrap gap-3">
                {Array.isArray(submittedData?.learnSkills) && submittedData.learnSkills.map((skill, i) => (
                  <div key={i} className="px-4 py-2 bg-white text-black rounded-full flex items-center gap-2">
                    {getSkillDetails(skill).icon} {skill}
                  </div>
                ))}
              </div>
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
