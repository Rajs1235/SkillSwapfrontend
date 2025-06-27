import React from 'react';
import { FaBook, FaClock, FaCheckCircle } from 'react-icons/fa';

const Enrolled = ({ enrolledCourses = [ {
    title: "React for Beginners",
    description: "Learn the basics of React, components, and hooks.",
    duration: "3 hours",
    status: "In Progress",
  },
  {
    title: "Advanced JavaScript",
    description: "Deep dive into JS ES6+, closures, async/await.",
    duration: "2.5 hours",
    status: "Completed",
  },] }) => {
  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white/30 backdrop-blur-md rounded-xl shadow-xl text-white space-y-8">
      <h2 className="text-4xl font-bold mb-4">📚 Enrolled Classes</h2>

      {enrolledCourses.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-6">
          {enrolledCourses.map((course, i) => (
            <div
              key={i}
              className="bg-white/10 rounded-lg p-4 shadow border border-white/20 space-y-2"
            >
              <h3 className="text-2xl font-semibold flex items-center gap-2">
                <FaBook className="text-yellow-400" />
                {course.title}
              </h3>

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
        <p className="text-center text-gray-200">You haven't enrolled in any classes yet.</p>
      )}
    </div>
  );
};

export default Enrolled;
