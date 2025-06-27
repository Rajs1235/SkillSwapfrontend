import React, { useEffect, useState } from 'react';
import api from './api';
import TutorCard from './TutorCard';

const sampleTutors = [
  {
    _id: '1',
    name: 'Alice Johnson',
    knownSkills: ['React', 'JavaScript', 'UI/UX'],
    isVerifiedTutor: true,
  },
  {
    _id: '2',
    name: 'David Smith',
    knownSkills: ['Python', 'Machine Learning'],
    isVerifiedTutor: true,
  },
  {
    _id: '3',
    name: 'Ravi Kumar',
    knownSkills: ['Java', 'Data Structures'],
    isVerifiedTutor: true,
  },
];

function BrowseTutors() {
  const [tutors, setTutors] = useState([]);
  const [filteredTutors, setFilteredTutors] = useState([]);
  const [searchSkill, setSearchSkill] = useState('');

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const res = await api.get('/v1/users/verified-tutors');
        setTutors(res.data);
        setFilteredTutors(res.data);
      } catch (err) {
        console.warn('Failed to load from API, using sample tutors.');
        setTutors(sampleTutors);
        setFilteredTutors(sampleTutors);
      }
    };

    fetchTutors();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchSkill(value);
    if (value === '') {
      setFilteredTutors(tutors);
    } else {
      const filtered = tutors.filter(tutor =>
        tutor.knownSkills?.some(skill => skill.toLowerCase().includes(value))
      );
      setFilteredTutors(filtered);
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-16 p-6">
      <h1 className="text-4xl font-bold text-center mb-8 text-white">Browse Verified Tutors</h1>

      <input
        type="text"
        placeholder="Search by skill..."
        value={searchSkill}
        onChange={handleSearch}
        className="w-full px-4 py-3 mb-8 text-black rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-500"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredTutors.length === 0 ? (
          <p className="text-white text-center col-span-full">No tutors found.</p>
        ) : (
          filteredTutors.map((tutor) => (
            <TutorCard key={tutor._id} tutor={tutor} />
          ))
        )}
      </div>
    </div>
  );
}

export default BrowseTutors;
