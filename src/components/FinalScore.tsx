import { motion } from 'framer-motion';

interface FinalScoreProps {
  interestLevel: number;
  smoothnessScore: number;
  onPlayAgain: () => void;
}

export default function FinalScore({ interestLevel, smoothnessScore, onPlayAgain }: FinalScoreProps) {
  // Calculate final Huzzlingo score
  const huzzlingoScore = Math.round(
    (interestLevel * 0.6) + // 60% weight
    (smoothnessScore * 0.4) // 40% weight
  );

  // Get message based on score
  const getMessage = () => {
    if (huzzlingoScore >= 90) return "Amazing! You're a natural conversationalist! 🌟";
    if (huzzlingoScore >= 70) return "Great job! Your conversation skills are impressive! 🎉";
    if (huzzlingoScore >= 50) return "Good effort! Keep practicing to improve! 👍";
    return "Don't worry, conversation is a skill that improves with practice! 💪";
  };

  // Format number to have at most 2 decimal places
  const formatNumber = (num: number) => {
    return Math.round(num).toString();
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="text-6xl mb-8"
      >
        🎯
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-4"
      >
        Final Score
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-huzz-dark-accent rounded-xl p-6 mb-8"
      >
        <div className="grid grid-cols-3 gap-4 text-center mb-6">
          <div>
            <p className="text-white/60 text-sm">Interest Level</p>
            <p className="text-2xl font-bold">{formatNumber(interestLevel)}%</p>
          </div>
          <div>
            <p className="text-white/60 text-sm">Smoothness</p>
            <p className="text-2xl font-bold">{formatNumber(smoothnessScore)}%</p>
          </div>
          <div>
            <p className="text-white/60 text-sm">Huzzlingo Score</p>
            <p className="text-2xl font-bold text-yellow-400">{formatNumber(huzzlingoScore)}</p>
          </div>
        </div>
        <p className="text-lg">{getMessage()}</p>
      </motion.div>

      <div className="space-y-4">
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          onClick={onPlayAgain}
          className="w-full p-3 rounded-xl bg-gradient-huzz text-white font-medium shadow-glow-pink hover:opacity-90 transition-opacity"
        >
          Try Again
        </motion.button>
      </div>
    </div>
  );
} 