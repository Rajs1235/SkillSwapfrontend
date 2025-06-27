import React from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

function ReviewCard({ review }) {
  const renderStars = (rating) => {
    return (
      <div className="flex text-yellow-400">
        {[...Array(5)].map((_, i) =>
          i < rating ? <AiFillStar key={i} /> : <AiOutlineStar key={i} />
        )}
      </div>
    );
  };

  return (
    <div className="bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-xl p-5 shadow-lg hover:shadow-xl transition w-full">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">{review.reviewerName}</h3>
        <span className="text-sm text-gray-300">{new Date(review.date).toLocaleDateString()}</span>
      </div>
      <p className="text-white/80 mb-3 italic">“{review.comment}”</p>
      {renderStars(review.rating)}
    </div>
  );
}

export default ReviewCard;
