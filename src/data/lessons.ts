import type { Lesson } from '../types/lesson';

// Helper function to generate stable IDs
const generateId = (prefix: string, index: number): string => {
  return `${prefix}_${index.toString().padStart(3, '0')}`;
};

export const LESSONS: Lesson[] = [
  {
    id: generateId('lesson', 1),
    title: 'Breaking the Ice',
    description: 'Learn how to start conversations naturally and confidently',
    icon: '🌟',
    metadata: {
      xpReward: 100,
      estimatedMinutes: 15,
      difficulty: 'Beginner',
      requiredLevel: 1,
      backgroundColor: '#FF69B4',
      borderColor: '#FF1493',
      completionEmoji: '🎉'
    },
    questions: [
      {
        type: 'multiple-choice',
        id: generateId('q1', 1),
        question: 'What\'s the best way to start a conversation in a casual setting?',
        options: [
          'Hey, nice weather we\'re having!',
          'I noticed you like [something they\'re wearing/doing]. That\'s really cool!',
          'Do you come here often?',
          'What\'s your sign?'
        ],
        correctAnswer: 'I noticed you like [something they\'re wearing/doing]. That\'s really cool!',
        explanation: 'Personal observations show genuine interest and create a natural conversation opener.',
        emoji: '👋'
      },
      {
        type: 'drag-drop',
        id: generateId('q1', 2),
        question: 'Arrange these words to create a natural conversation starter:',
        words: ['that', 'book', 'interesting', 'looks', 'you\'re', 'reading'],
        correctOrder: ['that', 'book', 'you\'re', 'reading', 'looks', 'interesting'],
        explanation: 'This opener shows genuine interest in their activity and invites further discussion.',
        emoji: '📚'
      }
    ]
  },
  {
    id: generateId('lesson', 2),
    title: 'Active Listening',
    description: 'Master the art of engaging and attentive conversation',
    icon: '👂',
    metadata: {
      xpReward: 120,
      estimatedMinutes: 20,
      difficulty: 'Beginner',
      requiredLevel: 2,
      backgroundColor: '#FFB6C1',
      borderColor: '#FF69B4',
      completionEmoji: '🎯'
    },
    questions: [
      {
        type: 'multiple-choice',
        id: generateId('q2', 1),
        question: 'Which response shows the best active listening?',
        options: [
          'That\'s cool.',
          'Oh yeah, that reminds me of something that happened to me...',
          'That sounds challenging. How did you handle that situation?',
          'Interesting.'
        ],
        correctAnswer: 'That sounds challenging. How did you handle that situation?',
        explanation: 'This response acknowledges their feelings and encourages them to share more.',
        emoji: '🎯'
      },
      {
        type: 'drag-drop',
        id: generateId('q2', 2),
        question: 'Arrange these words to form an empathetic response:',
        words: ['must', 'that', 'been', 'have', 'difficult', 'for', 'you'],
        correctOrder: ['that', 'must', 'have', 'been', 'difficult', 'for', 'you'],
        explanation: 'This response shows empathy and understanding of their experience.',
        emoji: '💭'
      }
    ]
  },
  {
    id: generateId('lesson', 3),
    title: 'Reading Body Language',
    description: 'Learn to interpret and use non-verbal communication',
    icon: '🤸‍♀️',
    metadata: {
      xpReward: 150,
      estimatedMinutes: 25,
      difficulty: 'Intermediate',
      requiredLevel: 3,
      backgroundColor: '#DDA0DD',
      borderColor: '#BA55D3',
      completionEmoji: '✨'
    },
    questions: [
      {
        type: 'multiple-choice',
        id: generateId('q3', 1),
        question: 'What does it typically mean when someone mirrors your body position?',
        options: [
          'They\'re mocking you',
          'They\'re comfortable and engaged with you',
          'They\'re tired',
          'They\'re not interested'
        ],
        correctAnswer: 'They\'re comfortable and engaged with you',
        explanation: 'Mirroring is a natural sign of rapport and connection.',
        emoji: '🪞'
      },
      {
        type: 'drag-drop',
        id: generateId('q3', 2),
        question: 'Arrange these body language cues from most to least positive:',
        words: ['crossed arms', 'eye contact', 'genuine smile', 'facing away', 'leaning in'],
        correctOrder: ['genuine smile', 'eye contact', 'leaning in', 'crossed arms', 'facing away'],
        explanation: 'Open and engaged body language signals interest and comfort.',
        emoji: '👥'
      }
    ]
  }
];

// Add more lessons here...

export const getLesson = (id: string): Lesson | undefined => {
  return LESSONS.find(lesson => lesson.id === id);
};

export const getLessonProgress = (id: string): number => {
  const lesson = getLesson(id);
  if (!lesson) return 0;
  return lesson.completed ? 100 : 0;
}; 