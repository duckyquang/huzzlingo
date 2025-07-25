export type LessonDifficulty = 'easy' | 'medium' | 'hard';

export interface Question {
  id: string;
  type: 'multiple-choice' | 'drag-drop';
  question: string;
  explanation: string;
  emoji: string;
}

export interface MultipleChoiceQuestion extends Question {
  type: 'multiple-choice';
  options: string[];
  correctAnswer: string;
}

export interface DragDropQuestion extends Question {
  type: 'drag-drop';
  words: string[];
  correctOrder: string[];
}

export interface QuestionProgress {
  isCorrect: boolean;
  attempted: boolean;
  timestamp?: string;
}

export interface LessonProgress {
  currentQuestionIndex: number;
  totalQuestions: number;
  completed: boolean;
  score: number;
  lastAttemptDate?: string;
  questionProgress: Record<string, QuestionProgress>; // questionId -> progress
  correctAnswers: number;
  totalAttempts: number;
}

export interface LessonMetadata {
  xpReward: number;
  estimatedMinutes: number;
  difficulty: string;
  requiredLevel: number;
  backgroundColor: string;
  borderColor: string;
  completionEmoji: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  icon: string;
  metadata: LessonMetadata;
  questions: (MultipleChoiceQuestion | DragDropQuestion)[];
  prerequisites?: string[]; // IDs of lessons that must be completed first
}

export interface UserLessonState {
  lessons: Record<string, LessonProgress>;
  lastActiveLessonId: string | null;
  completedLessons: string[];
} 