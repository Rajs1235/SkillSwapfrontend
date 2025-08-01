import React, { useState } from "react";
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

// Re-using the skill categories from your other components
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
        { name: 'R', icon: <SiR /> }, { name: 'Google Analytics', icon: <SiGoogleanalytics /> }
    ],
    creative: [
        { name: 'Graphic Design', icon: <FaPaintBrush /> }, { name: 'Photography', icon: <FaCamera /> },
        { name: 'Music Composition', icon: <FaMusic /> }, { name: 'Singing', icon: <GiMicrophone /> },
        { name: 'Drums', icon: <GiDrum /> }, { name: 'Guitar', icon: <FaGuitar /> }
    ],
    // Add other categories as needed
};

const ProfileEditForm = ({ user, onSave, onClose }) => {
    const [formData, setFormData] = useState({
        username: user.username || '',
        skills: user.skills || []
    });
    const [selectedCategories, setSelectedCategories] = useState([]);

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
        return Array.from(allSkills.values());
    };

    const handleSaveChanges = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-2xl space-y-6">
                <h2 className="text-2xl font-bold text-gray-800">Edit Profile</h2>

                <form onSubmit={handleSaveChanges}>
                    <div>
                        <label className="block mb-2 font-semibold text-gray-700">Username</label>
                        <input
                            value={formData.username}
                            onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                            className="w-full px-4 py-2 bg-gray-100 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Enter your username"
                        />
                    </div>

                    <div className="mt-6">
                        <label className="block mb-2 font-semibold text-gray-700">Update Your Skills</label>
                        <div className="flex flex-wrap gap-2 mb-4 p-2 bg-gray-50 rounded-lg">
                            {Object.keys(skillCategories).map((cat) => (
                                <button
                                    key={cat}
                                    type="button"
                                    onClick={() => toggleCategory(cat)}
                                    className={`px-3 py-1 rounded-full border text-sm transition-transform transform hover:scale-105 ${
                                        selectedCategories.includes(cat)
                                            ? 'bg-purple-600 text-white'
                                            : 'bg-white text-gray-700'
                                    }`}
                                >
                                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2 p-2 h-40 overflow-y-auto border rounded-lg">
                         {getSkillsForView().map(({ name, icon }) => (
                            <button
                                key={name}
                                type="button"
                                onClick={() => toggleSkill(name)}
                                className={`h-fit px-3 py-1 rounded-full border flex items-center gap-1 transition-colors ${
                                    formData.skills.includes(name)
                                        ? 'bg-purple-500 text-white'
                                        : 'bg-white text-gray-800'
                                }`}
                            >
                                {icon} {name}
                            </button>
                         ))}
                    </div>

                    <div className="flex justify-end gap-4 mt-8">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProfileEditForm;