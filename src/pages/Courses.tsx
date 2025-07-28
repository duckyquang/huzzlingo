import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LESSONS } from '../data/lessons';
import { useLessonProgress } from '../hooks/useLessonProgress';

export default function Courses() {
  const { getLessonProgress } = useLessonProgress();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Available Lessons</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {LESSONS.map((lesson, index) => {
          const { progress, isComplete, correctAnswers, totalQuestions } = getLessonProgress(lesson.id);
          
          return (
            <Link key={lesson.id} to={`/lesson/${lesson.id}`} className="flex">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`
                  relative rounded-xl p-6 border transition-all flex-1 flex flex-col
                  ${isComplete 
                    ? 'bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20' 
                    : 'bg-huzz-dark-purple border-white/5 hover:border-white/10'
                  }
                `}
              >
                {/* Lesson Header */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">{lesson.icon}</span>
                      <h2 className="text-xl font-semibold">{lesson.title}</h2>
                    </div>
                    <p className="text-white/60">{lesson.description}</p>
                  </div>
                </div>

                {/* Progress Section */}
                <div className="flex-1 flex flex-col">
                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-white/60">Progress</span>
                      <span className="text-sm text-white/60">
                        {correctAnswers} of {totalQuestions} correct
                      </span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full ${
                          isComplete ? 'bg-green-500' : 'bg-gradient-huzz'
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                      />
                    </div>
                  </div>

                  {/* Stats & Action */}
                  <div className="flex items-center justify-between mt-auto pt-2">
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-white/5 rounded-full text-xs font-medium">
                        {lesson.metadata.difficulty}
                      </span>
                      <span className="px-2 py-1 bg-white/5 rounded-full text-xs font-medium">
                        {lesson.questions.length} questions
                      </span>
                    </div>
                    <button className={`
                      px-3 py-1.5 rounded-lg font-medium text-sm transition-colors flex-shrink-0 ml-2
                      ${isComplete 
                        ? 'bg-green-500/20 text-green-500' 
                        : progress > 0 
                        ? 'bg-gradient-huzz text-white' 
                        : 'bg-white/5 text-white hover:bg-white/10'
                      }
                    `}>
                      {isComplete 
                        ? 'Completed' 
                        : progress > 0 
                        ? 'Continue' 
                        : 'Start'
                      }
                    </button>
                  </div>
                </div>

                {/* Completion Badge */}
                {isComplete && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                    className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg"
                  >
                    <span className="text-white text-lg">✓</span>
                  </motion.div>
                )}
              </motion.div>
            </Link>
          );
        })}
      </div>
    </div>
  );
} 