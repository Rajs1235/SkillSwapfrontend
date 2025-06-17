import React from 'react';

const savedCourses = [
  {
    id: 1,
    title: 'React for Beginners',
    instructor: 'John Doe',
    image: 'https://source.unsplash.com/400x200/?react,code',
    progress: 70,
  },
  {
    id: 2,
    title: 'UI/UX Design Fundamentals',
    instructor: 'Jane Smith',
    image: 'https://source.unsplash.com/400x200/?design,ux',
    progress: 45,
  },
  {
    id: 3,
    title: 'Fullstack with MERN',
    instructor: 'Alex Johnson',
    image: 'https://source.unsplash.com/400x200/?coding,webdev',
    progress: 85,
  },
];

function SavedCourse() {
  return (
    <div className="min-h-screen bg-cover bg-center text-white p-8"
         style={{ backgroundImage: "url('/images/857de75c-26e3-4770-becf-70a76c8cd6f0.png')" }}>
      <h2 className="text-3xl font-bold mb-8 text-white">📚 Saved Courses</h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {savedCourses.map((course) => (
          <div key={course.id} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden shadow-xl hover:bg-white/20 transition cursor-pointer">
            <img src={course.image} alt={course.title} className="w-full h-40 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-white">{course.title}</h3>
              <p className="text-white/80 text-sm mb-3">Instructor: {course.instructor}</p>
              <div className="w-full bg-white/20 rounded-full h-3">
                <div
                  className="bg-green-400 h-3 rounded-full"
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
              <p className="text-right text-xs text-white/70 mt-1">{course.progress}% Completed</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SavedCourse;
