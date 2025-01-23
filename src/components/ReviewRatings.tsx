'use client';
import React, { useState } from "react";

// Define the prop type for the component
interface ReviewRatingsProps {
  ratings?: number[]; // Optional array of ratings
}

const ReviewRatings: React.FC<ReviewRatingsProps> = ({ ratings = [5, 4, 3, 5, 4] }) => {
  const [userRating, setUserRating] = useState<number>(0); // Type the state as number
  const totalRatings = ratings.length;
  const averageRating =
    totalRatings > 0 ? ratings.reduce((acc, curr) => acc + curr, 0) / totalRatings : 0;

  // Handle star click to set user rating
  const handleStarClick = (rating: number) => {
    setUserRating(rating); // Update the user rating
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Product Reviews</h2>
      <div className="flex mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`cursor-pointer text-2xl ${userRating >= star ? "text-yellow-400" : "text-gray-400"}`}
            onClick={() => handleStarClick(star)} // Add click handler to set user rating
          >
            ★
          </span>
        ))}
      </div>
      <p className="text-lg">Your Rating: {userRating}</p>
      <p className="mt-2 text-lg">Average Rating: {averageRating.toFixed(1)} ({totalRatings} ratings)</p>
    </div>
  );
};

export default ReviewRatings;
