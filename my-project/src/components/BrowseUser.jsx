import React, { useEffect, useState } from 'react';
import api from './api';
import UserCard from './UserCard';


const sampleUsers = [
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
    isVerifiedTutor: false,
  },
  {
    _id: '3',
    name: 'Ravi Kumar',
    knownSkills: ['Java', 'Data Structures'],
    isVerifiedTutor: true,
  },
];

function BrowseUsers() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchSkill, setSearchSkill] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await api.get('/v1/users/all', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUsers(res.data);
        setFilteredUsers(res.data);
      } catch (err) {
        console.warn('Failed to load from API, using sample data.');
        setUsers(sampleUsers);
        setFilteredUsers(sampleUsers);
      }
    };

    fetchUsers();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchSkill(value);
    if (!value) {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(user =>
        user.knownSkills?.some(skill => skill.toLowerCase().includes(value))
      );
      setFilteredUsers(filtered);
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-16 p-6">
      <h1 className="text-4xl font-bold text-center mb-8 text-white">Explore Users & Connect</h1>

      <input
        type="text"
        placeholder="Search by skill..."
        value={searchSkill}
        onChange={handleSearch}
        className="w-full px-4 py-3 mb-8 text-black rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredUsers.length === 0 ? (
          <p className="text-white text-center col-span-full">No users found.</p>
        ) : (
          filteredUsers.map((user) => (
            <UserCard key={user._id} user={user} />
          ))
        )}
      </div>
    </div>
  );
}

export default BrowseUsers;
