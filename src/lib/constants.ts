// Routes
export const ROUTES = {
  DASHBOARD: '/dashboard',
  COURSES: '/courses',
  LESSON: '/lesson/:lessonId',
  FINAL_CHALLENGE: '/final-challenge',
} as const;

// Colors
export const COLORS = {
  PINK: '#ff00cc',
  PURPLE: '#8000ff',
  DARK: '#0A0A0F',
  DARK_PURPLE: '#13111C',
  DARK_ACCENT: '#1F1932',
} as const;

// Animations
export const ANIMATIONS = {
  SPRING: {
    type: 'spring',
    stiffness: 400,
    damping: 30,
    mass: 0.8,
  },
  FADE_IN: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },
  SCALE_IN: {
    initial: { scale: 0 },
    animate: { scale: 1 },
    exit: { scale: 0 },
  },
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  STREAK: 'huzzlingo_streak',
  LEARNING: 'huzzlingo_learning',
} as const;

// Question Types
export const QUESTION_TYPES = {
  MULTIPLE_CHOICE: 'multiple-choice',
  DRAG_DROP: 'drag-drop',
} as const;

// Difficulty Levels
export const DIFFICULTY = {
  BEGINNER: 'Beginner',
  INTERMEDIATE: 'Intermediate',
  ADVANCED: 'Advanced',
} as const;

// Feedback Delays
export const DELAYS = {
  FEEDBACK: 2000, // 2 seconds
  ANIMATION: 100, // 0.1 seconds
} as const; 