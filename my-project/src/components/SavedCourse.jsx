import React, { useEffect, useState } from 'react';
import axios from 'axios';

function SavedCourse() {
  const [savedCourses, setSavedCourses] = useState([]);

  useEffect(() => {
    const fetchSaved = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/v1/courses/saved`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSavedCourses(res.data.saved || []);
      } catch (err) {
        console.error('Failed to fetch saved courses', err);
      }
    };
    fetchSaved();
  }, []);

  return (
    <div className="min-h-screen bg-cover bg-center text-white p-8"
         style={{ backgroundImage: "url('/images/857de75c-26e3-4770-becf-70a76c8cd6f0.png')" }}>
      <h2 className="text-3xl font-bold mb-8 text-white">📚 Saved Courses</h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {savedCourses.map((course) => (
          <div key={course._id} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden shadow-xl hover:bg-white/20 transition cursor-pointer">
            <img src={course.image || 'https://source.unsplash.com/400x200/?learning'} alt={course.title} className="w-full h-40 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-white">{course.title}</h3>
              <p className="text-white/80 text-sm mb-3">Instructor: {course.instructor}</p>
              <div className="w-full bg-white/20 rounded-full h-3">
                <div
                  className="bg-green-400 h-3 rounded-full"
                  style={{ width: `${course.progress || 0}%` }}
                ></div>
              </div>
              <p className="text-right text-xs text-white/70 mt-1">{course.progress || 0}% Completed</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SavedCourse;

