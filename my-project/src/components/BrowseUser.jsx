import React, { useEffect, useState } from 'react';
import api from './api';
import UserCard from './UserCard';

function BrowseUsers() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [connectedUserIds, setConnectedUserIds] = useState([]);
  const [searchSkill, setSearchSkill] = useState('');
  const [loading, setLoading] = useState(true);

  const currentUserId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');

        const [allUsersRes, connectionsRes] = await Promise.all([
          api.get('/users/all', { headers: { Authorization: `Bearer ${token}` } }),
          api.get('/connections', { headers: { Authorization: `Bearer ${token}` } })
        ]);

      
        const connections = connectionsRes.data?.connections || [];

        const connectedIds = connections.map(conn => conn._id);



        console.log("Current User ID:", currentUserId);

const otherUsers = allUsersRes.data.filter(
  user => String(user._id) !== String(currentUserId)
);
console.log("Other Users:", otherUsers);


        

        setUsers(otherUsers)
        console.log("response all uusers",allUsersRes.data);
      
        setFilteredUsers(otherUsers);
        setConnectedUserIds(connectedIds);
      } catch (err) {
        console.error('Error loading users or connections:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

 console.log("allusers to print after use",users);
 console.log("connected user before connection",connectedUserIds);

  const handleConnect = async (userId) => {
    try {
      const token = localStorage.getItem('token');

      // Connect with the user
      await api.post('/connections', { userId }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Update UI state for this connection
      setConnectedUserIds(prev => [...prev, userId]);

      console.log("after connecting",connectedUserIds);

      // Optional: Display a message
      alert('Connection established! You can now chat, video call, and view enrolled classes.');
    } catch (err) {
      console.error('Failed to connect:', err);
      alert('Connection failed');
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchSkill(value);

    if (!value) {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(user =>
        Array.isArray(user.skills) &&
        user.skills.some(skill => skill.toLowerCase().includes(value))
      );
      setFilteredUsers(filtered);
    }
  };

  if (loading) {
    return <p className="text-white text-center mt-20">Loading users...</p>;
  }

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
        {users.length === 0 ? (
          <p className="text-white text-center col-span-full">No users found.</p>
        ) : (
          users.map(user => (
            <UserCard
              key={user._id}
              user={user}
              isConnected={connectedUserIds.includes(user._id)}
              onConnect={() => handleConnect(user._id)}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default BrowseUsers;
