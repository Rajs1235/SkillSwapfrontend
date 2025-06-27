import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import api from './api';

function GoalsPicker() {
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: { goals: [] },
  });

  const [selectedGoals, setSelectedGoals] = useState([]);

  const goalList = [
    'Improve communication skills',
    'Master new programming languages',
    'Become a verified tutor',
    'Get certified in my skills',
    'Find a mentor',
    'Build a professional network',
    'Teach others',
    'Learn soft skills',
    'Earn recognition',
    'Explore new hobbies'
  ];

  const handleGoalToggle = (goal) => {
    const currentGoals = watch('goals') || [];
    if (currentGoals.includes(goal)) {
      setValue('goals', currentGoals.filter((g) => g !== goal));
    } else {
      setValue('goals', [...currentGoals, goal]);
    }
    setSelectedGoals((prev) =>
      prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]
    );
  };

  const onSubmit = async (data) => {
    try {
      const payload = {
        goals: data.goals,
        onboardingComplete: true,
      };
      console.log("Sending token:", localStorage.getItem("token")); // 🔍 Debug

      await api.put('/users/profile', payload);
      navigate('/dashboard');
    } catch (err) {
      console.error('Failed to submit goals:', err);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6 mt-20 bg-white/30 backdrop-blur-lg rounded-xl shadow-lg text-white">
      <h2 className="text-3xl font-bold text-black mb-6 text-center">Pick Your Goals 🎯</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {goalList.map((goal, index) => (
            <label
              key={index}
              className={`p-4 rounded-lg border shadow-sm cursor-pointer transition-all flex items-center gap-2 ${selectedGoals.includes(goal)
                ? 'bg-violet-600 text-white'
                : 'bg-white text-black'}`}
            >
              <input
                type="checkbox"
                value={goal}
                {...register('goals')}
                checked={selectedGoals.includes(goal)}
                onChange={() => handleGoalToggle(goal)}
                className="hidden"
              />
              {goal}
            </label>
          ))}
        </div>
        <div className="text-center">
          <button
            type="submit"
            
            className="bg-violet-600 text-white px-10 py-3 rounded-lg hover:bg-violet-700 transition-all shadow-lg"
          >
            Continue to Dashboard →
          </button>
        </div>
      </form>
    </div>
  );
}

export default GoalsPicker;
