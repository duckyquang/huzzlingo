export interface MultipleChoiceQuestion {
  type: 'multiple-choice';
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  emoji: string;
}

export interface DragDropQuestion {
  type: 'drag-drop';
  id: string;
  question: string;
  words: string[];
  correctOrder: string[];
  explanation: string;
  emoji: string;
}

export type Question = MultipleChoiceQuestion | DragDropQuestion;

export interface LessonMetadata {
  xpReward: number;
  estimatedMinutes: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
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
  questions: Question[];
  metadata: LessonMetadata;
  completed?: boolean;
  score?: number;
} 