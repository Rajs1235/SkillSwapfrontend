import React, { useEffect, useState } from "react";
import api from "./api";
import { useNavigate } from "react-router-dom";

const Postings = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const res = await api.get("/users/all"); // replace with actual route
      const currentUserId = localStorage.getItem("userId"); // assuming you saved it at login
      const filtered = res.data.filter(user => user._id !== currentUserId);
      setUsers(filtered);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const startChat = (userId) => {
    navigate("/chat", { state: { recipientId: userId } });
  };

  const startVideoCall = (userId) => {
    navigate("/videocall", { state: { peerId: userId } });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Explore Users</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {users.map((user) => (
          <div
            key={user._id}
            className="bg-white rounded-lg shadow-md p-4 border border-gray-200"
          >
            <h3 className="text-xl font-semibold">
              {user.firstName} {user.lastName}
            </h3>
            <p className="text-sm text-gray-600 mb-1">
              Role: {user.role}
            </p>
            <div className="flex flex-wrap gap-2 mb-3">
              {user.skills.map((skill, i) => (
                <span key={i} className="px-2 py-1 text-sm bg-gray-100 border rounded-full">
                  {skill}
                </span>
              ))}
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => startChat(user._id)}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Chat
              </button>
              <button
                onClick={() => startVideoCall(user._id)}
                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Video Call
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Postings;
