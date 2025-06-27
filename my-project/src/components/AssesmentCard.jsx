import React from 'react';

function AssessmentCard({ assessment }) {
  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition w-full">
      <div className="flex justify-between mb-2">
        <h2 className="text-lg font-bold">{assessment.skill}</h2>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            assessment.status === 'Passed'
              ? 'bg-green-600 text-white'
              : assessment.status === 'In Progress'
              ? 'bg-yellow-500 text-black'
              : 'bg-red-600 text-white'
          }`}
        >
          {assessment.status}
        </span>
      </div>
      <p className="text-white/80">Evaluator: {assessment.evaluator}</p>
      <p className="text-white/60 text-sm mt-2">
        Score: {assessment.score}/100 • {new Date(assessment.date).toLocaleDateString()}
      </p>
    </div>
  );
}

export default AssessmentCard;
