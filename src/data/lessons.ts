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
  },
  {
    id: generateId('lesson', 4),
    title: 'Confident Storytelling',
    description: 'Learn to tell engaging stories that captivate your audience',
    icon: '📖',
    metadata: {
      xpReward: 130,
      estimatedMinutes: 18,
      difficulty: 'Beginner',
      requiredLevel: 4,
      backgroundColor: '#98FB98',
      borderColor: '#90EE90',
      completionEmoji: '📚'
    },
    questions: [
      {
        type: 'multiple-choice',
        id: generateId('q4', 1),
        question: 'What makes a story more engaging?',
        options: [
          'Including every detail',
          'Using emotions and vivid descriptions',
          'Making it as long as possible',
          'Only stating facts'
        ],
        correctAnswer: 'Using emotions and vivid descriptions',
        explanation: 'Emotional connection and vivid imagery help listeners visualize and connect with your story.',
        emoji: '🎭'
      },
      {
        type: 'drag-drop',
        id: generateId('q4', 2),
        question: 'Arrange these story elements in the correct order:',
        words: ['conclusion', 'setting', 'conflict', 'resolution', 'characters'],
        correctOrder: ['setting', 'characters', 'conflict', 'resolution', 'conclusion'],
        explanation: 'A well-structured story follows a logical progression that keeps listeners engaged.',
        emoji: '📝'
      }
    ]
  },
  {
    id: generateId('lesson', 5),
    title: 'Handling Rejection',
    description: 'Turn rejection into opportunity and maintain confidence',
    icon: '💪',
    metadata: {
      xpReward: 160,
      estimatedMinutes: 22,
      difficulty: 'Intermediate',
      requiredLevel: 5,
      backgroundColor: '#FFD700',
      borderColor: '#FFA500',
      completionEmoji: '🏆'
    },
    questions: [
      {
        type: 'multiple-choice',
        id: generateId('q5', 1),
        question: 'How should you respond to polite rejection?',
        options: [
          'Keep trying to convince them',
          'Thank them for their honesty and move on gracefully',
          'Ask why they rejected you',
          'Get upset and leave immediately'
        ],
        correctAnswer: 'Thank them for their honesty and move on gracefully',
        explanation: 'Graceful acceptance shows maturity and leaves the door open for future interactions.',
        emoji: '🙏'
      },
      {
        type: 'drag-drop',
        id: generateId('q5', 2),
        question: 'Arrange these words to form a graceful response to rejection:',
        words: ['understand', 'I', 'thanks', 'for', 'being', 'honest'],
        correctOrder: ['thanks', 'for', 'being', 'honest', 'I', 'understand'],
        explanation: 'This response shows appreciation for their honesty and demonstrates emotional maturity.',
        emoji: '✨'
      }
    ]
  },
  {
    id: generateId('lesson', 6),
    title: 'Making Compliments',
    description: 'Give genuine compliments that make people feel valued',
    icon: '🌹',
    metadata: {
      xpReward: 110,
      estimatedMinutes: 16,
      difficulty: 'Beginner',
      requiredLevel: 3,
      backgroundColor: '#FF6347',
      borderColor: '#FF4500',
      completionEmoji: '💖'
    },
    questions: [
      {
        type: 'multiple-choice',
        id: generateId('q6', 1),
        question: 'What makes a compliment more meaningful?',
        options: [
          'Being very general',
          'Being specific and genuine',
          'Comparing them to others',
          'Focusing only on appearance'
        ],
        correctAnswer: 'Being specific and genuine',
        explanation: 'Specific compliments show you actually noticed something unique about them.',
        emoji: '💎'
      },
      {
        type: 'drag-drop',
        id: generateId('q6', 2),
        question: 'Create a genuine compliment by arranging these words:',
        words: ['love', 'how', 'I', 'passionate', 'you', 'are', 'about', 'this'],
        correctOrder: ['I', 'love', 'how', 'passionate', 'you', 'are', 'about', 'this'],
        explanation: 'This compliment focuses on their character and enthusiasm rather than just appearance.',
        emoji: '🔥'
      }
    ]
  },
  {
    id: generateId('lesson', 7),
    title: 'Small Talk Mastery',
    description: 'Transform boring small talk into meaningful connections',
    icon: '☕',
    metadata: {
      xpReward: 125,
      estimatedMinutes: 20,
      difficulty: 'Beginner',
      requiredLevel: 2,
      backgroundColor: '#8A2BE2',
      borderColor: '#9370DB',
      completionEmoji: '🗣️'
    },
    questions: [
      {
        type: 'multiple-choice',
        id: generateId('q7', 1),
        question: 'How can you make small talk more interesting?',
        options: [
          'Stick to weather and work topics',
          'Ask follow-up questions about their interests',
          'Talk only about yourself',
          'Keep responses very short'
        ],
        correctAnswer: 'Ask follow-up questions about their interests',
        explanation: 'Follow-up questions show genuine interest and help deepen the conversation.',
        emoji: '❓'
      },
      {
        type: 'drag-drop',
        id: generateId('q7', 2),
        question: 'Turn small talk into deeper conversation by arranging these words:',
        words: ['what', 'got', 'you', 'into', 'that', 'hobby'],
        correctOrder: ['what', 'got', 'you', 'into', 'that', 'hobby'],
        explanation: 'This question invites them to share personal stories and motivations.',
        emoji: '🎯'
      }
    ]
  },
  {
    id: generateId('lesson', 8),
    title: 'Digital Communication',
    description: 'Master texting and online dating conversation skills',
    icon: '📱',
    metadata: {
      xpReward: 140,
      estimatedMinutes: 25,
      difficulty: 'Intermediate',
      requiredLevel: 6,
      backgroundColor: '#00CED1',
      borderColor: '#008B8B',
      completionEmoji: '💬'
    },
    questions: [
      {
        type: 'multiple-choice',
        id: generateId('q8', 1),
        question: 'What\'s the best approach for first messages online?',
        options: [
          'Send a generic "Hey"',
          'Write a long paragraph about yourself',
          'Reference something specific from their profile',
          'Use pick-up lines'
        ],
        correctAnswer: 'Reference something specific from their profile',
        explanation: 'Personalized messages show you actually read their profile and are genuinely interested.',
        emoji: '🎯'
      },
      {
        type: 'drag-drop',
        id: generateId('q8', 2),
        question: 'Create an engaging opening message:',
        words: ['I', 'noticed', 'you', 'love', 'hiking', 'what\'s', 'your', 'favorite', 'trail'],
        correctOrder: ['I', 'noticed', 'you', 'love', 'hiking', 'what\'s', 'your', 'favorite', 'trail'],
        explanation: 'This message shows you read their profile and asks an engaging question.',
        emoji: '🏔️'
      }
    ]
  },
  {
    id: generateId('lesson', 9),
    title: 'Group Dynamics',
    description: 'Navigate conversations in group settings with confidence',
    icon: '👥',
    metadata: {
      xpReward: 155,
      estimatedMinutes: 30,
      difficulty: 'Advanced',
      requiredLevel: 7,
      backgroundColor: '#FF69B4',
      borderColor: '#FF1493',
      completionEmoji: '🎊'
    },
    questions: [
      {
        type: 'multiple-choice',
        id: generateId('q9', 1),
        question: 'How do you join an ongoing group conversation?',
        options: [
          'Interrupt and change the topic',
          'Listen first, then add relevant input when appropriate',
          'Wait for someone to invite you',
          'Start talking about yourself immediately'
        ],
        correctAnswer: 'Listen first, then add relevant input when appropriate',
        explanation: 'Understanding the conversation flow before contributing shows social awareness.',
        emoji: '👂'
      },
      {
        type: 'drag-drop',
        id: generateId('q9', 2),
        question: 'Politely enter a group conversation:',
        words: ['sorry', 'to', 'jump', 'in', 'but', 'I', 'couldn\'t', 'help', 'overhearing'],
        correctOrder: ['sorry', 'to', 'jump', 'in', 'but', 'I', 'couldn\'t', 'help', 'overhearing'],
        explanation: 'This phrase politely acknowledges you\'re joining and shows respect for the ongoing conversation.',
        emoji: '🚪'
      }
    ]
  },
  {
    id: generateId('lesson', 10),
    title: 'Building Rapport',
    description: 'Create instant connections and build trust quickly',
    icon: '🤝',
    metadata: {
      xpReward: 145,
      estimatedMinutes: 22,
      difficulty: 'Intermediate',
      requiredLevel: 5,
      backgroundColor: '#32CD32',
      borderColor: '#228B22',
      completionEmoji: '🌟'
    },
    questions: [
      {
        type: 'multiple-choice',
        id: generateId('q10', 1),
        question: 'What\'s the fastest way to build rapport?',
        options: [
          'Agree with everything they say',
          'Find genuine common interests or experiences',
          'Try to impress them with achievements',
          'Mirror every movement they make'
        ],
        correctAnswer: 'Find genuine common interests or experiences',
        explanation: 'Shared experiences create an instant bond and natural conversation flow.',
        emoji: '🔗'
      },
      {
        type: 'drag-drop',
        id: generateId('q10', 2),
        question: 'Express shared experience:',
        words: ['I', 'totally', 'get', 'that', 'I\'ve', 'been', 'there', 'too'],
        correctOrder: ['I', 'totally', 'get', 'that', 'I\'ve', 'been', 'there', 'too'],
        explanation: 'This phrase shows understanding and shared experience, building immediate connection.',
        emoji: '🎯'
      }
    ]
  },
  {
    id: generateId('lesson', 11),
    title: 'Flirting Fundamentals',
    description: 'Learn the art of playful and respectful flirting',
    icon: '😉',
    metadata: {
      xpReward: 170,
      estimatedMinutes: 28,
      difficulty: 'Advanced',
      requiredLevel: 8,
      backgroundColor: '#FF1493',
      borderColor: '#DC143C',
      completionEmoji: '💕'
    },
    questions: [
      {
        type: 'multiple-choice',
        id: generateId('q11', 1),
        question: 'What\'s the key to good flirting?',
        options: [
          'Being overly aggressive',
          'Playful teasing with genuine interest',
          'Using cheesy pick-up lines',
          'Constant physical touching'
        ],
        correctAnswer: 'Playful teasing with genuine interest',
        explanation: 'Light, playful interaction shows confidence while maintaining respect and interest.',
        emoji: '😄'
      },
      {
        type: 'drag-drop',
        id: generateId('q11', 2),
        question: 'Create a playful tease:',
        words: ['you', 'seem', 'like', 'trouble', 'but', 'the', 'good', 'kind'],
        correctOrder: ['you', 'seem', 'like', 'trouble', 'but', 'the', 'good', 'kind'],
        explanation: 'This playful comment is flirtatious while being light-hearted and fun.',
        emoji: '😈'
      }
    ]
  },
  {
    id: generateId('lesson', 12),
    title: 'Date Planning',
    description: 'Plan memorable first dates that create lasting impressions',
    icon: '🍽️',
    metadata: {
      xpReward: 135,
      estimatedMinutes: 26,
      difficulty: 'Intermediate',
      requiredLevel: 6,
      backgroundColor: '#FF8C00',
      borderColor: '#FF6347',
      completionEmoji: '🎭'
    },
    questions: [
      {
        type: 'multiple-choice',
        id: generateId('q12', 1),
        question: 'What makes a great first date?',
        options: [
          'The most expensive restaurant',
          'An activity that allows for conversation',
          'A movie theater',
          'A loud party or club'
        ],
        correctAnswer: 'An activity that allows for conversation',
        explanation: 'First dates should focus on getting to know each other through meaningful conversation.',
        emoji: '💭'
      },
      {
        type: 'drag-drop',
        id: generateId('q12', 2),
        question: 'Suggest a creative date idea:',
        words: ['how', 'about', 'we', 'check', 'out', 'that', 'art', 'gallery'],
        correctOrder: ['how', 'about', 'we', 'check', 'out', 'that', 'art', 'gallery'],
        explanation: 'Art galleries provide conversation starters and a relaxed atmosphere for getting to know each other.',
        emoji: '🎨'
      }
    ]
  },
  {
    id: generateId('lesson', 13),
    title: 'Emotional Intelligence',
    description: 'Understand and respond to emotions in social situations',
    icon: '❤️',
    metadata: {
      xpReward: 180,
      estimatedMinutes: 32,
      difficulty: 'Advanced',
      requiredLevel: 9,
      backgroundColor: '#9932CC',
      borderColor: '#8B008B',
      completionEmoji: '🧠'
    },
    questions: [
      {
        type: 'multiple-choice',
        id: generateId('q13', 1),
        question: 'How do you respond when someone shares something personal?',
        options: [
          'Change the subject immediately',
          'Share something equally personal about yourself',
          'Acknowledge their trust and respond with empathy',
          'Give advice right away'
        ],
        correctAnswer: 'Acknowledge their trust and respond with empathy',
        explanation: 'Recognizing the trust they\'ve placed in you and responding empathetically deepens the connection.',
        emoji: '🤗'
      },
      {
        type: 'drag-drop',
        id: generateId('q13', 2),
        question: 'Show emotional support:',
        words: ['thank', 'you', 'for', 'trusting', 'me', 'with', 'that'],
        correctOrder: ['thank', 'you', 'for', 'trusting', 'me', 'with', 'that'],
        explanation: 'This response acknowledges the vulnerability they\'ve shown and validates their trust.',
        emoji: '🛡️'
      }
    ]
  },
  {
    id: generateId('lesson', 14),
    title: 'Long-term Relationships',
    description: 'Maintain and deepen connections over time',
    icon: '💑',
    metadata: {
      xpReward: 165,
      estimatedMinutes: 30,
      difficulty: 'Advanced',
      requiredLevel: 10,
      backgroundColor: '#4169E1',
      borderColor: '#0000FF',
      completionEmoji: '👫'
    },
    questions: [
      {
        type: 'multiple-choice',
        id: generateId('q14', 1),
        question: 'What\'s most important for maintaining long-term relationships?',
        options: [
          'Always agreeing with your partner',
          'Consistent communication and mutual respect',
          'Expensive gifts and gestures',
          'Spending every moment together'
        ],
        correctAnswer: 'Consistent communication and mutual respect',
        explanation: 'Open communication and mutual respect form the foundation of lasting relationships.',
        emoji: '💬'
      },
      {
        type: 'drag-drop',
        id: generateId('q14', 2),
        question: 'Express appreciation in a relationship:',
        words: ['I', 'really', 'appreciate', 'how', 'you', 'always', 'listen', 'to', 'me'],
        correctOrder: ['I', 'really', 'appreciate', 'how', 'you', 'always', 'listen', 'to', 'me'],
        explanation: 'Expressing specific appreciation strengthens the bond and shows you notice their efforts.',
        emoji: '🙏'
      }
    ]
  },
  {
    id: generateId('lesson', 15),
    title: 'Advanced Charm',
    description: 'Master the subtle art of charisma and magnetic presence',
    icon: '✨',
    metadata: {
      xpReward: 200,
      estimatedMinutes: 35,
      difficulty: 'Expert',
      requiredLevel: 12,
      backgroundColor: '#FFD700',
      borderColor: '#FF8C00',
      completionEmoji: '👑'
    },
    questions: [
      {
        type: 'multiple-choice',
        id: generateId('q15', 1),
        question: 'What\'s the secret to true charisma?',
        options: [
          'Always being the center of attention',
          'Making others feel interesting and valued',
          'Having perfect looks',
          'Knowing everything about every topic'
        ],
        correctAnswer: 'Making others feel interesting and valued',
        explanation: 'True charisma comes from making others feel special and heard, not from showcasing yourself.',
        emoji: '🌟'
      },
      {
        type: 'drag-drop',
        id: generateId('q15', 2),
        question: 'Show genuine interest in someone:',
        words: ['tell', 'me', 'more', 'about', 'that', 'it', 'sounds', 'fascinating'],
        correctOrder: ['tell', 'me', 'more', 'about', 'that', 'it', 'sounds', 'fascinating'],
        explanation: 'This phrase shows genuine curiosity and makes the other person feel heard and interesting.',
        emoji: '🎯'
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