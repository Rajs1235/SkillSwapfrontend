import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  FaStar,
  FaFileDownload,
  FaChalkboardTeacher,
  FaChartLine,
  FaCertificate,
} from 'react-icons/fa';
import { generateCertificate } from '../utils/generateCertificate';
import api from '../components/api';
import SubmitReviewCard from './SubmitReview';

const TutorDashboard = () => {
  const location = useLocation();
  const { 
    username = 'Tutor', 
    skills = [], 
  } = location.state?.userData || {};
  const userRole = localStorage.getItem('role');
  
  const [evaluationResult, setEvaluationResult] = useState(null);
  const [loadingEval, setLoadingEval] = useState(false);
  const [tutorReviews, setTutorReviews] = useState([]); // Use a separate state for reviews

  const totalSessions = 12;
  const averageRating = 4.9;
  const certificateCount = 2;
  const isVerifiedTutor = true;
  const evaluationStatus = 'Not Evaluated';

  const handleDownloadCertificate = () => {
    const certData = {
      name: username,
      skill: 'Verified SkillSwap Tutor',
      date: new Date().toLocaleDateString(),
      type: 'tutor',
      skills,
    };
    generateCertificate(certData);
  };

  const handleEvaluate = async () => {
    setLoadingEval(true);
    try {
      const res = await api.post('/api/v1/users/evaluation/run', {
        userId: localStorage.getItem('userId'),
        role: 'tutor',
        skills,
      });
      setEvaluationResult(res.data);
    } catch (error) {
      console.error('Evaluation failed', error);
      setEvaluationResult({ status: 'Error', feedback: 'Could not evaluate.' });
    } finally {
      setLoadingEval(false);
    }
  };

  return (
    <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-4 mt-6 bg-white/30 backdrop-blur-md rounded-xl shadow-xl text-white space-y-6 min-h-fit">
      {isVerifiedTutor && (
        <div className="absolute top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-md">
          <FaCertificate />
          <span>Verified Tutor</span>
          <button
            className="ml-2 bg-white text-green-700 px-2 py-1 rounded hover:bg-green-100 transition text-sm"
            onClick={handleDownloadCertificate}
          >
            <FaFileDownload className="inline-block mr-1" />
            Download
          </button>
        </div>
      )}

      <h2 className="text-4xl font-bold">Tutor Dashboard</h2>

      <section className="bg-white/10 p-6 rounded-xl shadow-md">
        <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <FaChartLine />
          Tutor Stats
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-4 bg-indigo-600 rounded-lg text-center">
            <FaChalkboardTeacher size={28} className="mx-auto mb-2" />
            <p className="text-lg">Total Sessions</p>
            <p className="text-3xl font-bold">{totalSessions}</p>
          </div>
          <div className="p-4 bg-yellow-500 rounded-lg text-center">
            <FaStar size={28} className="mx-auto mb-2" />
            <p className="text-lg">Average Rating</p>
            <p className="text-3xl font-bold">{averageRating.toFixed(1)} ⭐</p>
          </div>
          <div className="p-4 bg-green-500 rounded-lg text-center">
            <FaFileDownload size={28} className="mx-auto mb-2" />
            <p className="text-lg">Certificates Issued</p>
            <p className="text-3xl font-bold">{certificateCount}</p>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-2xl font-semibold mb-3">Known Skills</h3>
        <div className="flex flex-wrap gap-3">
          {skills.length > 0 ? (
            skills.map((skill, i) => (
              <span key={i} className="px-4 py-2 bg-violet-500 rounded-full">
                {skill}
              </span>
            ))
          ) : (
            <p className="text-gray-300">No skills listed. Go to your profile to add some!</p>
          )}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-bold text-white mb-4">Student Reviews</h2>
        <div className="space-y-4 mb-6">
          {tutorReviews.length > 0 ? (
            tutorReviews.map((review, i) => (
              <div key={i} className="bg-white/10 p-4 rounded-lg border border-white/20 text-white">
                <p className="italic mb-1">"{review.comment}"</p>
                <p className="text-yellow-300 text-sm">Rating: {review.rating}/5</p>
              </div>
            ))
          ) : (
            <p className="text-gray-300">No reviews yet for this tutor.</p>
          )}
        </div>
      </section>


    </div>
  );
};

export default TutorDashboard;