import React from 'react';

const enrolledCourses = [
  {
    id: 1,
    title: 'Advanced JavaScript',
    instructor: 'Sarah Lee',
    image: 'https://source.unsplash.com/400x200/?javascript,code',
    progress: 60,
  },
  {
    id: 2,
    title: 'Responsive Web Design',
    instructor: 'Mark Evans',
    image: 'https://source.unsplash.com/400x200/?web,design',
    progress: 35,
  },
  {
    id: 3,
    title: 'Backend with Node.js',
    instructor: 'Emily Carter',
    image: 'https://source.unsplash.com/400x200/?nodejs,server',
    progress: 90,
  },
];

function Enrolled() {
  return (
    <div
      className="min-h-screen bg-cover bg-center text-white py-16 px-6"
      style={{
        backgroundImage: "url('/images/857de75c-26e3-4770-becf-70a76c8cd6f0.png')"
      }}
    >
      <div className="w-full max-w-6xl mx-auto bg-white/30 backdrop-blur-md p-14 rounded-xl shadow-2xl text-white space-y-10">
        <h1 className="text-5xl font-bold text-center drop-shadow-xl mb-6">🎓 Enrolled Courses</h1>
        <p className="text-white/90 text-lg text-center">
          All the courses you are currently enrolled in will be displayed here.
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {enrolledCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden shadow-xl hover:bg-white/20 transition cursor-pointer"
            >
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-white">
                  {course.title}
                </h3>
                <p className="text-white/80 text-sm mb-3">
                  Instructor: {course.instructor}
                </p>
                <div className="w-full bg-white/20 rounded-full h-3">
                  <div
                    className="bg-green-400 h-3 rounded-full"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
                <p className="text-right text-xs text-white/70 mt-1">
                  {course.progress}% Completed
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Enrolled;
