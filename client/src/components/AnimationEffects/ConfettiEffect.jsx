// CelebrationBadge.js
import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";

const CelebrationBadge = ({ text }) => {
  const [showConfetti, setShowConfetti] = useState(true);

  // Set a timer to hide the confetti after a certain duration
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000); // Show confetti for 5 seconds

    return () => clearTimeout(timer); // Clean up the timer
  }, []);

  return (
    <div className="relative flex items-center justify-center">
      {showConfetti && <Confetti />}
      <span className="top-2 left-2 max-w-max text-white bg-gray-900 px-3 py-[0.7px] rounded-md text-xs font-bold shadow-lg uppercase tracking-wide flex items-center drop-shadow-xl mb-1 z-10">
        🎁 {text}
      </span>
    </div>
  );
};

export default CelebrationBadge;
