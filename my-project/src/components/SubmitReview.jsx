import React, { useState, useEffect } from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import api from './api'; // ✅ Adjust this path as needed

const SubmitReviewCard = ({ tutorId, onSuccess }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => setSubmitted(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [submitted]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!rating || !comment.trim()) {
      setError('⚠️ Please provide both a rating and feedback.');
      return;
    }

    const reviewerId = localStorage.getItem('userId');
    if (!reviewerId) {
      setError('⚠️ You must be logged in to submit a review.');
      return;
    }

    try {
      await api.post('/api/v1/users/reviews', {
        tutorId,
        reviewerId,
        rating,
        comment,
      });

      setSubmitted(true);
      setComment('');
      setRating(0);
      setError('');
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error('Review submission failed:', err);
      setError('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white p-6 rounded-xl shadow-lg max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Leave a Review</h2>

      {submitted ? (
        <div className="text-green-400 font-medium text-center">✅ Thank you! Your review was submitted.</div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Rating */}
          <div>
            <label className="block mb-1 font-semibold">Your Rating</label>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => {
                const starValue = i + 1;
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setRating(starValue)}
                    onMouseEnter={() => setHover(starValue)}
                    onMouseLeave={() => setHover(null)}
                    className="text-2xl text-yellow-400 transition-transform hover:scale-110"
                  >
                    {starValue <= (hover || rating) ? <AiFillStar /> : <AiOutlineStar />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Comment */}
          <div>
            <label className="block mb-1 font-semibold">Your Feedback</label>
            <textarea
              className="w-full p-3 bg-sky-100 text-black rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-400"
              rows="4"
              placeholder="What did you like or dislike?"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-400 text-sm font-medium">{error}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-2 rounded-lg shadow transition duration-200"
          >
            Submit Review
          </button>
        </form>
      )}
    </div>
  );
};

export default SubmitReviewCard;
