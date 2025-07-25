import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import type { UserLessonState, Lesson, LessonProgress, QuestionProgress } from '../lib/types/lesson';
import { LESSONS } from '../data/lessons';

const STORAGE_KEY = 'huzzlingo_lesson_progress';

export function useLessonProgress() {
  const dispatch = useDispatch();
  const [lessonState, setLessonState] = useState<UserLessonState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
    return {
      lessons: {},
      lastActiveLessonId: null,
      completedLessons: [],
    };
  });

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lessonState));
  }, [lessonState]);

  const updateQuestionProgress = (
    lessonId: string,
    questionId: string,
    isCorrect: boolean
  ) => {
    setLessonState(prevState => {
      const lesson = LESSONS.find(l => l.id === lessonId);
      if (!lesson) return prevState;

      const currentProgress = prevState.lessons[lessonId] || {
        currentQuestionIndex: 0,
        totalQuestions: lesson.questions.length,
        completed: false,
        score: 0,
        questionProgress: {},
        correctAnswers: 0,
        totalAttempts: 0,
      };

      // Update question progress
      const updatedQuestionProgress = {
        ...currentProgress.questionProgress,
        [questionId]: {
          isCorrect,
          attempted: true,
          timestamp: new Date().toISOString(),
        },
      };

      // Count correct answers (only counting the most recent attempt for each question)
      const correctAnswers = Object.values(updatedQuestionProgress).filter(p => p.isCorrect).length;
      const totalAttempts = Object.keys(updatedQuestionProgress).length;
      
      // Calculate score based on correct answers vs total questions
      const score = Math.round((correctAnswers / lesson.questions.length) * 100);
      
      // A lesson is complete when all questions have been attempted
      const allQuestionsAttempted = lesson.questions.every(q => 
        updatedQuestionProgress[q.id]?.attempted
      );
      
      const updatedProgress: LessonProgress = {
        ...currentProgress,
        questionProgress: updatedQuestionProgress,
        correctAnswers,
        totalAttempts,
        score,
        completed: allQuestionsAttempted,
        lastAttemptDate: new Date().toISOString(),
      };

      // Update completed lessons list if needed
      const completedLessons = allQuestionsAttempted && !prevState.completedLessons.includes(lessonId)
        ? [...prevState.completedLessons, lessonId]
        : prevState.completedLessons;

      return {
        ...prevState,
        lessons: {
          ...prevState.lessons,
          [lessonId]: updatedProgress,
        },
        lastActiveLessonId: lessonId,
        completedLessons,
      };
    });
  };

  const getLessonProgress = (lessonId: string): {
    progress: number;
    isComplete: boolean;
    correctAnswers: number;
    totalQuestions: number;
    score: number;
  } => {
    const lesson = LESSONS.find(l => l.id === lessonId);
    if (!lesson) {
      return {
        progress: 0,
        isComplete: false,
        correctAnswers: 0,
        totalQuestions: 0,
        score: 0,
      };
    }

    const progress = lessonState.lessons[lessonId];
    if (!progress) {
      return {
        progress: 0,
        isComplete: false,
        correctAnswers: 0,
        totalQuestions: lesson.questions.length,
        score: 0,
      };
    }

    // Calculate progress based on correct answers
    const correctAnswers = Object.values(progress.questionProgress).filter(p => p.isCorrect).length;
    const score = Math.round((correctAnswers / lesson.questions.length) * 100);

    return {
      progress: score, // Progress is the same as score
      isComplete: progress.completed,
      correctAnswers,
      totalQuestions: lesson.questions.length,
      score,
    };
  };

  const getCurrentLesson = (): {
    lesson: Lesson | null;
    progress: number;
    isComplete: boolean;
    correctAnswers: number;
    totalQuestions: number;
    score: number;
  } => {
    if (!lessonState.lastActiveLessonId) {
      const nextLesson = getNextAvailableLesson();
      return {
        lesson: nextLesson,
        progress: 0,
        isComplete: false,
        correctAnswers: 0,
        totalQuestions: nextLesson?.questions.length || 0,
        score: 0,
      };
    }

    const lesson = LESSONS.find(l => l.id === lessonState.lastActiveLessonId);
    if (!lesson) {
      return {
        lesson: null,
        progress: 0,
        isComplete: false,
        correctAnswers: 0,
        totalQuestions: 0,
        score: 0,
      };
    }

    return {
      lesson,
      ...getLessonProgress(lesson.id),
    };
  };

  const getNextAvailableLesson = (): Lesson | null => {
    // Get all lessons that are not completed
    const incompleteLessons = LESSONS.filter(lesson => 
      !lessonState.completedLessons.includes(lesson.id)
    );

    if (incompleteLessons.length === 0) {
      return null;
    }

    // First, try to find lessons with no prerequisites
    const availableLessons = incompleteLessons.filter(lesson =>
      !lesson.prerequisites?.length || 
      lesson.prerequisites.every(preReqId => 
        lessonState.completedLessons.includes(preReqId)
      )
    );

    if (availableLessons.length === 0) {
      return null;
    }

    // Return the first available lesson
    return availableLessons[0];
  };

  const hasCompletedAllLessons = (): boolean => {
    return lessonState.completedLessons.length === LESSONS.length;
  };

  return {
    updateQuestionProgress,
    getCurrentLesson,
    getNextAvailableLesson,
    hasCompletedAllLessons,
    getLessonProgress,
    lessonState,
  };
} 