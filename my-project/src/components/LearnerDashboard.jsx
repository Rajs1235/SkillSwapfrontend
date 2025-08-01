import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FaBookOpen, FaChartBar, FaCertificate, FaFileDownload } from 'react-icons/fa';
import { generateCertificate } from '../utils/generateCertificate.js';
import api from '../components/api';

const LearnerDashboard = () => {
  const location = useLocation();
  const { 
    username = 'Learner', 
    skills = [], 
  } = location.state?.userData || {};

  const [showCertificate, setShowCertificate] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState(null);
  const [loadingEval, setLoadingEval] = useState(false);

  const progress = 80;
  const certificatesEarned = 1;
  const evaluationStatus = 'Not Evaluated';

  const certificateData = {
    name: username,
    skill: skills[0] || 'Full Stack Development',
    date: new Date().toLocaleDateString(),
  };

  const handleDownloadCertificate = () => {
    generateCertificate(certificateData);
  };

  const handleEvaluate = async () => {
    setLoadingEval(true);
    try {
      const res = await api.post('/users/evaluation/run', {
        userId: localStorage.getItem('userId'),
        role: 'learner',
        skills: skills,
      });
      setEvaluationResult(res.data);
    } catch (error) {
      console.error('Evaluation failed', error);
      setEvaluationResult({ status: 'Error', score: 0, feedback: 'Evaluation failed.' });
    } finally {
      setLoadingEval(false);
    }
  };

  return (
    <div className="max-w-8xl mx-auto p-6 mt-0 bg-white/30 backdrop-blur-md rounded-xl shadow-xl text-white space-y-8 overflow-y-auto">
      <h2 className="text-4xl font-bold mb-4">Learner Dashboard</h2>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="p-6 bg-blue-600 rounded-lg shadow text-center">
          <FaChartBar size={32} className="mx-auto mb-2" />
          <p className="text-xl font-semibold">Progress</p>
          <p className="text-3xl">{progress}%</p>
        </div>

        <div className="p-6 bg-purple-600 rounded-lg shadow text-center">
          <FaBookOpen size={32} className="mx-auto mb-2" />
          <p className="text-xl font-semibold">Skills Being Learned</p>
          <p className="text-3xl">{skills.length}</p>
        </div>

        <div className="p-6 bg-teal-500 rounded-lg shadow text-center">
          <FaCertificate size={32} className="mx-auto mb-2" />
          <p className="text-xl font-semibold">Certificates Earned</p>
          <p className="text-3xl">{certificatesEarned}</p>
          <button
            className="mt-2 text-sm underline hover:text-gray-100"
            onClick={() => setShowCertificate(!showCertificate)}
          >
            {showCertificate ? 'Hide Certificate' : 'View Certificate'}
          </button>
        </div>
      </div>

      {showCertificate && (
        <div className="mt-8 bg-white text-black p-6 rounded-lg shadow-lg space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-3xl font-bold flex items-center gap-2">
              <FaCertificate className="text-green-600" /> Certificate of Completion
            </h3>
            <button
              className="text-sm text-blue-600 underline hover:text-blue-800"
              onClick={handleDownloadCertificate}
            >
              <FaFileDownload className="inline-block mr-1" /> Download
            </button>
          </div>
          <p className="text-lg">Awarded to: <strong>{certificateData.name}</strong></p>
          <p>For successfully completing the skill: <strong>{certificateData.skill}</strong></p>
          <p>Date of Completion: {certificateData.date}</p>
        </div>
      )}

      <div>
        <h3 className="text-2xl font-semibold mt-8 mb-3">Skills in Progress</h3>
        <div className="flex flex-wrap gap-3">
          {skills.length > 0 ? (
            skills.map((skill, i) => (
              <span key={i} className="px-4 py-2 bg-violet-500 rounded-full">{skill}</span>
            ))
          ) : (
            <p className="text-gray-300">No skills selected yet. Go to your profile to add some!</p>
          )}
        </div>
      </div>

   

    </div>
  );
};

export default LearnerDashboard;