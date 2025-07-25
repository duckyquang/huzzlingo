import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { completeLesson } from '../features/learning/learningSlice';
import { completePractice } from '../features/streak/streakSlice';
import { getLesson } from '../lib/data/lessons';
import type { Question } from '../lib/types/lesson';

interface UseLessonReturn {
  currentQuestion: Question | null;
  progress: number;
  score: number;
  isComplete: boolean;
  handleAnswer: (isCorrect: boolean) => void;
  handleFinish: () => void;
}

export function useLesson(lessonId: string): UseLessonReturn {
  const dispatch = useDispatch();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const lesson = getLesson(lessonId);
  const questions = lesson?.questions || [];
  const currentQuestion = questions[currentQuestionIndex] || null;
  const progress = (currentQuestionIndex / questions.length) * 100;

  useEffect(() => {
    // Reset state when lesson changes
    setCurrentQuestionIndex(0);
    setScore(0);
    setIsComplete(false);
  }, [lessonId]);

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const finalScore = isCorrect ? score + 1 : score;
      const scorePercentage = (finalScore / questions.length) * 100;
      
      // Update Redux state
      dispatch(completeLesson({ 
        lessonId, 
        score: scorePercentage 
      }));
      dispatch(completePractice());
      
      setIsComplete(true);
    }
  };

  const handleFinish = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setIsComplete(false);
  };

  return {
    currentQuestion,
    progress,
    score,
    isComplete,
    handleAnswer,
    handleFinish,
  };
} 