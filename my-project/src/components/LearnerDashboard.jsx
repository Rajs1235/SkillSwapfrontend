import React, { useState } from 'react';
import { FaBookOpen, FaChartBar, FaCertificate, FaFileDownload } from 'react-icons/fa';
import { generateCertificate } from '../utils/generateCertificate.js';
import api from '../components/api'; // Make sure api.js is correctly imported

const LearnerDashboard = ({
  progress = 80,
  skillsLearning = ['JavaScript', 'React'],
  evaluationStatus = 'Not Evaluated',
  certificatesEarned = 1,
  name = 'John Doe',
}) => {
  const [showCertificate, setShowCertificate] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState(null);
  const [loadingEval, setLoadingEval] = useState(false);

  const certificateData = {
    name,
    skill: skillsLearning[0] || 'Full Stack Development',
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
        skills: skillsLearning,
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

      {/* Top Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="p-6 bg-blue-600 rounded-lg shadow text-center">
          <FaChartBar size={32} className="mx-auto mb-2" />
          <p className="text-xl font-semibold">Progress</p>
          <p className="text-3xl">{progress}%</p>
        </div>

        <div className="p-6 bg-purple-600 rounded-lg shadow text-center">
          <FaBookOpen size={32} className="mx-auto mb-2" />
          <p className="text-xl font-semibold">Skills Being Learned</p>
          <p className="text-3xl">{skillsLearning.length}</p>
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

      {/* Certificate Viewer */}
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

      {/* Skills In Progress */}
      <div>
        <h3 className="text-2xl font-semibold mt-8 mb-3">Skills in Progress</h3>
        <div className="flex flex-wrap gap-3">
          {skillsLearning.length > 0 ? (
            skillsLearning.map((skill, i) => (
              <span key={i} className="px-4 py-2 bg-violet-500 rounded-full">{skill}</span>
            ))
          ) : (
            <p className="text-gray-300">No skills selected yet.</p>
          )}
        </div>
      </div>

      {/* AI Evaluation */}
      <div className="mt-6">
        <h3 className="text-2xl font-semibold mb-2">AI Skill Evaluation</h3>
        <button
          className="mb-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={handleEvaluate}
          disabled={loadingEval}
        >
          {loadingEval ? 'Evaluating...' : 'Run AI Evaluation'}
        </button>
        {evaluationResult && (
          <div className="bg-white/10 p-4 rounded text-white border border-white/20">
            <p><strong>Status:</strong> {evaluationResult.status}</p>
            <p><strong>Score:</strong> {evaluationResult.score}/100</p>
            <p><strong>Feedback:</strong> {evaluationResult.feedback}</p>
          </div>
        )}
      </div>

      {/* Previous Status */}
      <div className="mt-6">
        <h3 className="text-2xl font-semibold mb-2">Previous Evaluation Status</h3>
        <p className="text-lg bg-white/10 p-4 rounded border border-white/20">
          {evaluationStatus}
        </p>
      </div>
    </div>
  );
};

export default LearnerDashboard;
