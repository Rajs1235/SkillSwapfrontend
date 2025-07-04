// components/EvaluationForm.jsx
import React, { useState } from 'react';
import api from './api';

const EvaluationForm = ({ role = 'learner' }) => {
  const [skill, setSkill] = useState('');
  const [answer, setAnswer] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/api/v1/users/evaluation/submit', {
        role,
        skill,
        answer
      });
      setResult(res.data);
    } catch (err) {
      console.error(err);
      setResult({ error: 'Evaluation failed. Try again.' });
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow mt-8">
      <h2 className="text-xl font-bold mb-4">
        AI Evaluation for {role === 'tutor' ? 'Tutor Verification' : 'Learner Progress'}
      </h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">
          Skill:
          <input
            className="w-full p-2 border rounded mt-1"
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
            placeholder="e.g., JavaScript"
          />
        </label>
        <label className="block mb-4 mt-4">
          Answer or Explanation:
          <textarea
            className="w-full p-2 border rounded mt-1"
            rows={5}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Explain a concept or solve a problem here..."
          />
        </label>
        <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">
          Submit for Evaluation
        </button>
      </form>

      {result && (
        <div className="mt-4 p-4 rounded bg-gray-100 text-sm text-black">
          <strong>Result:</strong>
          <pre className="whitespace-pre-wrap">{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default EvaluationForm;
