import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { MultipleChoiceQuestion } from '../../../components/Question';
import { DragDropQuestion } from '../../../components/Question';
import { getLesson } from '../../../data/lessons';
import type { Question } from '../../../lib/types/lesson';
import { useLessonProgress } from '../../../hooks/useLessonProgress';
import { completeLesson } from '../../../features/learning/learningSlice';
import { completePractice } from '../../../features/streak/streakSlice';

export default function Lesson() {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [lesson, setLesson] = useState<ReturnType<typeof getLesson>>();
  const { updateQuestionProgress, getLessonProgress, resetLessonProgress } = useLessonProgress();

  useEffect(() => {
    if (lessonId) {
      const foundLesson = getLesson(lessonId);
      if (!foundLesson) {
        navigate('/courses');
        return;
      }
      setLesson(foundLesson);
    }
  }, [lessonId, navigate]);

  if (!lesson || !lessonId) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  const { progress, correctAnswers, totalQuestions, isComplete } = getLessonProgress(lessonId);

  const handleAnswer = (isCorrect: boolean) => {
    const currentQuestion = lesson.questions[currentQuestionIndex];
    updateQuestionProgress(lessonId, currentQuestion.id, isCorrect);

    // Move to next question or complete lesson
    if (currentQuestionIndex < lesson.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // For the final question, we need to calculate the score manually
      // because the state update from updateQuestionProgress hasn't been applied yet
      
      // Get current progress before the last answer
      const currentProgress = getLessonProgress(lessonId);
      
      // Calculate what the final score will be after including this last answer
      const finalCorrectAnswers = currentProgress.correctAnswers + (isCorrect ? 1 : 0);
      const finalScore = Math.round((finalCorrectAnswers / lesson.questions.length) * 100);
      
      // Dispatch lesson completion to update XP and streak
      dispatch(completeLesson({ 
        lessonId, 
        score: finalScore
      }));
      dispatch(completePractice());

      navigate(`/lesson/${lessonId}/complete`, {
        state: {
          score: finalScore,
          totalQuestions: lesson.questions.length,
          correctAnswers: finalCorrectAnswers,
          xpEarned: lesson.metadata.xpReward
        },
      });
    }
  };

  const handleRetry = () => {
    if (lessonId) {
      resetLessonProgress(lessonId);
    }
    setCurrentQuestionIndex(0);
  };

  const currentQuestion = lesson.questions[currentQuestionIndex];

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      {/* Lesson Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{lesson.icon}</span>
            <h1 className="text-2xl font-bold">{lesson.title}</h1>
          </div>
          {isComplete && (
            <motion.button
              onClick={handleRetry}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl font-medium transition-colors"
            >
              Retry Lesson
            </motion.button>
          )}
        </div>
        <p className="text-white/60">{lesson.description}</p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm text-white/60">
            Question {currentQuestionIndex + 1} of {lesson.questions.length}
          </p>
          <p className="text-sm text-white/60">
            {correctAnswers} correct of {totalQuestions} ({Math.round(progress)}%)
          </p>
        </div>
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-huzz"
            initial={{ width: '0%' }}
            animate={{
              width: `${((currentQuestionIndex + 1) / lesson.questions.length) * 100}%`,
            }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          {currentQuestion.type === 'multiple-choice' ? (
            <MultipleChoiceQuestion
              question={currentQuestion}
              onAnswer={handleAnswer}
              lessonEmoji={currentQuestion.emoji}
            />
          ) : (
            <DragDropQuestion
              question={currentQuestion}
              onAnswer={handleAnswer}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
} 