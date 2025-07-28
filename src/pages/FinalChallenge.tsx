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
    <div className="h-screen overflow-hidden flex flex-col px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto flex-1 flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-4 flex-shrink-0"
        >
          <h1 className="text-3xl font-bold mb-2">
            Final Challenge
          </h1>
          <p className="text-lg text-white/60">
            Can you get a date at the coffee shop? Chat with Sarah and show off your smoothness!
          </p>
        </motion.div>

        <div className="flex-1 relative overflow-visible">
          <div className="relative h-full">
            <FinalBoss />
          </div>
          
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