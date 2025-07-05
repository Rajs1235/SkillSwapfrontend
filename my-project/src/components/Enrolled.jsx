import React, { useEffect, useState } from 'react';
import { FaBook, FaClock, FaCheckCircle } from 'react-icons/fa';
import api from './api';

const Enrolled = () => {
  const [enrolledData, setEnrolledData] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        // Step 1: Get connected users
        const connectionsRes = await api.get('/connections', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const connectedUsers = connectionsRes.data?.connections || [];

        if (!Array.isArray(connectedUsers) || connectedUsers.length === 0) {
          setEnrolledData([]);
          return;
        }

        // Step 2: Fetch enrolled courses for each connected user
        const courseResponses = await Promise.all(
          connectedUsers.map(user =>
            api.get(`/enrollments/${user._id}`, {
              headers: { Authorization: `Bearer ${token}` },
            })
          )
        );

        // Step 3: Merge data with user info
        const enrichedData = courseResponses.map((res, index) => ({
          user: connectedUsers[index],
          courses: res.data?.courses || [],
        }));

        setEnrolledData(enrichedData);
      } catch (err) {
        console.error('Failed to load enrolled classes:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrolledCourses();
  }, [token]);

  if (loading) {
    return <p className="text-white text-center mt-20">Loading enrolled classes...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white/30 backdrop-blur-md rounded-xl shadow-xl text-white space-y-8">
      <h2 className="text-4xl font-bold mb-4">📚 Enrolled Classes from Connections</h2>

      {enrolledData.length > 0 ? (
        enrolledData.map(({ user, courses }) => (
          <div key={user._id}>
            <h3 className="text-2xl font-semibold mb-2">{user.firstName || user.username}'s Classes</h3>
            {courses.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {courses.map((course, i) => (
                  <div
                    key={i}
                    className="bg-white/10 rounded-lg p-4 shadow border border-white/20 space-y-2"
                  >
                    <h4 className="text-xl font-semibold flex items-center gap-2">
                      <FaBook className="text-yellow-400" />
                      {course.title}
                    </h4>
                    <p className="text-sm text-gray-200">{course.description}</p>
                    <div className="flex justify-between items-center text-sm mt-2">
                      <div className="flex items-center gap-1">
                        <FaClock className="text-blue-300" />
                        <span>{course.duration || '1 hour'}</span>
                      </div>
                      <div className="flex items-center gap-1 text-green-300">
                        <FaCheckCircle />
                        <span>{course.status || 'In Progress'}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-300">No enrolled courses found for this user.</p>
            )}
          </div>
        ))
      ) : (
        <p className="text-center text-gray-200">You haven't connected with any users who are enrolled in classes yet.</p>
      )}
    </div>
  );
};

export default Enrolled;
