import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store';
import StatsCard from '../components/ui/StatsCard';
import HuzzlingoScoreCard from '../components/ui/HuzzlingoScoreCard';
import { formatXP } from '../lib/levelSystem';
import { useLessonProgress } from '../hooks/useLessonProgress';
import { completeLesson } from '../features/learning/learningSlice';

export default function Dashboard() {
  const dispatch = useDispatch();
  const { currentStreak, percentageChange: streakChange } = useSelector((state: RootState) => state.streak);
  const { 
    totalXP, 
    xpPercentageChange, 
    timeSpentMinutes,
    timeSpentPercentageChange,
    level,
    skillLevelLabel,
    levelProgress,
  } = useSelector((state: RootState) => state.learning);





  const {
    getCurrentLesson,
    hasCompletedAllLessons,
  } = useLessonProgress();

  const { lesson, progress, isComplete } = getCurrentLesson();
  const allLessonsCompleted = hasCompletedAllLessons();

  // Format time spent
  const formatTimeSpent = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
  };

  const renderLearningSection = () => {
    if (allLessonsCompleted) {
      return (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold mb-4">All Lessons Completed! 🎉</h2>
          <div className="bg-huzz-dark-purple rounded-xl p-6 border border-white/5">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-xl font-semibold">Master Conversationalist</h3>
                <p className="text-white/60">You've completed all available lessons. Time to test your skills!</p>
              </div>
              <div className="text-5xl">🎓</div>
            </div>
          </div>
        </div>
      );
    }

    if (!lesson) {
      return (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold mb-4">Start Learning</h2>
          <Link to="/courses">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-huzz-dark-purple rounded-xl p-6 border border-white/5 hover:border-white/10 transition-colors"
            >
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-xl font-semibold">Begin Your Journey</h3>
                  <p className="text-white/60">Start learning conversation skills and build your confidence</p>
                </div>
                <div className="text-5xl">🎯</div>
              </div>
              <div className="flex items-center gap-4 mt-6">
                <span className="px-4 py-2 bg-gradient-huzz rounded-xl font-medium">
                  Start First Lesson
                </span>
              </div>
            </motion.div>
          </Link>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold mb-4">Continue Learning</h2>
        <Link to={`/lesson/${lesson.id}`}>
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-huzz-dark-purple rounded-xl p-6 border border-white/5 hover:border-white/10 transition-colors"
          >
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-xl font-semibold">{lesson.title}</h3>
                <p className="text-white/60">{lesson.description}</p>
              </div>
              <div className="text-5xl">{lesson.icon}</div>
            </div>
            <div className="space-y-4">
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                  className="h-full bg-gradient-huzz"
                />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/40">{Math.round(progress)}% Complete</span>
                <span className="px-4 py-2 bg-gradient-huzz rounded-xl font-medium">
                  {progress === 0 ? 'Start' : 'Continue'}
                </span>
              </div>
            </div>
          </motion.div>
        </Link>
      </div>
    );
  };

  return (
    <div className="p-6 space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatsCard
          title="Current Streak"
          value={`${currentStreak} ${currentStreak === 1 ? 'Day' : 'Days'}`}
          icon="🔥"
          trend={streakChange !== 0 ? {
            value: Math.abs(Math.round(streakChange)),
            isPositive: streakChange >= 0
          } : undefined}
          glowColor="pink"
        />

        <StatsCard
          title="Time Spent"
          value={formatTimeSpent(timeSpentMinutes)}
          icon="⏰"
          trend={timeSpentPercentageChange !== 0 ? {
            value: Math.abs(Math.round(timeSpentPercentageChange)),
            isPositive: timeSpentPercentageChange >= 0
          } : undefined}
          glowColor={undefined}
        />

        <StatsCard
          title="XP Earned"
          value={formatXP(totalXP)}
          icon="⭐"
          trend={xpPercentageChange !== 0 ? {
            value: Math.abs(Math.round(xpPercentageChange)),
            isPositive: xpPercentageChange >= 0
          } : undefined}
          glowColor={undefined}
        />

        <StatsCard
          title="Skill Level"
          value={skillLevelLabel}
          subtitle={level > 0 ? `Level ${level}` : undefined}
          icon="📈"
          progress={levelProgress}
          glowColor="purple"
        />

        <HuzzlingoScoreCard />
      </div>

      {/* Learning Section */}
      {renderLearningSection()}

      {/* Final Boss Challenge */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold mb-4">Final Challenge</h2>
        <Link to="/final-challenge">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-huzz-dark-purple rounded-xl p-6 border border-pink-500/20 shadow-glow-pink hover:border-white/10 transition-colors"
          >
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-xl font-semibold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                  Final Boss Challenge 🏆
                </h3>
                <p className="text-white/60">Put your skills to the test! Can you get a date at the coffee shop?</p>
              </div>
              <div className="text-5xl">☕</div>
            </div>
            <div className="flex items-center gap-4 mt-6">
              <span className="px-3 py-1 bg-white/5 rounded-full text-sm">10 messages</span>
              <span className="px-3 py-1 bg-gradient-huzz rounded-full text-sm">Ready to Challenge!</span>
              <div className="ml-auto">
                <span className="px-4 py-2 bg-gradient-huzz rounded-xl font-medium cursor-pointer">
                  Take Challenge
                </span>
              </div>
            </div>
          </motion.div>
        </Link>
      </div>

      {/* Activity Feed */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Activity Feed</h2>
        <div className="space-y-2">
          <div className="bg-huzz-dark-purple rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-500" />
              <div className="flex-1">
                <span className="font-medium">Alex</span>
                <span className="text-white/60"> completed </span>
                <span className="font-medium">Basic Greetings</span>
                <div className="text-sm text-white/40">2m ago</div>
              </div>
              <div className="text-right">
                <span className="px-2 py-1 bg-white/5 rounded-lg text-sm">50 XP</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 