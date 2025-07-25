import { useState } from 'react';
import { motion } from 'framer-motion';
import FinalBoss from '../components/FinalBoss';
import ScoreSpeedometer from '../components/ScoreSpeedometer';

export default function FinalChallenge() {
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);

  const handleComplete = (finalScore: number) => {
    setScore(finalScore);
    setShowScore(true);
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold mb-4">
            Final Challenge
          </h1>
          <p className="text-xl text-white/60">
            Can you get a date at the coffee shop? Chat with Sarah and show off your smoothness!
          </p>
        </motion.div>

        <div className="space-y-8">
          <FinalBoss />
          
          {showScore && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-8 bg-huzz-dark-purple rounded-xl text-center"
            >
              <h2 className="text-2xl font-bold mb-6">Your Huzzlingo Score</h2>
              <div className="max-w-xs mx-auto">
                <ScoreSpeedometer score={score} />
              </div>
              <p className="mt-6 text-lg">
                {score >= 80 ? (
                  "Impressive! You've got some serious game! 🔥"
                ) : score >= 60 ? (
                  "Not bad! You're getting there! 👍"
                ) : (
                  "Keep practicing! You'll get better! 💪"
                )}
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
} 