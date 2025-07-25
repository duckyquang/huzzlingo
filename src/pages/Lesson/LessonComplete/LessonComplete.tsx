import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface LessonCompleteState {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  xpEarned?: number;
}

export default function LessonComplete() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LessonCompleteState;

  if (!state) {
    navigate('/courses');
    return null;
  }

  const { score, totalQuestions, correctAnswers, xpEarned = 100 } = state;

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="text-6xl mb-8"
      >
        🎉
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-4"
      >
        Lesson Complete!
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-huzz-dark-accent rounded-xl p-6 mb-8"
      >
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-white/60 text-sm">Score</p>
            <p className="text-2xl font-bold">{score}%</p>
          </div>
          <div>
            <p className="text-white/60 text-sm">Correct</p>
            <p className="text-2xl font-bold">
              {correctAnswers}/{totalQuestions}
            </p>
          </div>
          <div>
            <p className="text-white/60 text-sm">XP Earned</p>
            <p className="text-2xl font-bold text-yellow-400">
              +{Math.round(xpEarned * (score / 100))}
            </p>
          </div>
        </div>
      </motion.div>

      <div className="space-y-4">
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          onClick={() => navigate('/courses')}
          className="w-full p-3 rounded-xl bg-gradient-huzz text-white font-medium shadow-glow-pink hover:opacity-90 transition-opacity"
        >
          Continue Learning
        </motion.button>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          onClick={() => navigate('/dashboard')}
          className="w-full p-3 rounded-xl border-2 border-white/10 hover:border-white/20 transition-colors"
        >
          Back to Dashboard
        </motion.button>
      </div>
    </div>
  );
} 