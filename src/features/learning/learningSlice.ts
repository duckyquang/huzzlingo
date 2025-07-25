import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { calculateLevel } from '../../lib/levelSystem';
import { getLesson } from '../../data/lessons';
import { LESSONS } from '../../data/lessons';

interface LessonState {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  score: number;
}

interface LearningState {
  lessons: LessonState[];
  currentLessonId: string | null;
  totalXP: number;
  xpPercentageChange: number;
  timeSpentMinutes: number;
  timeSpentPercentageChange: number;
  level: number;
  skillLevelLabel: string;
  levelProgress: number;
  xpForNextLevel: number;
  lastActivityTime: string | null;
  lastHuzzlingoScore: number | null;
  lastHuzzlingoDate: string | null;
}

// Load initial state from localStorage
const loadInitialState = (): LearningState => {
  const saved = localStorage.getItem('huzzlingo_learning');
  if (saved) {
    const parsed = JSON.parse(saved);
    
    // Migration: Check if we have old lesson IDs and migrate to new ones
    const hasOldLessonIds = parsed.lessons?.some((lesson: any) => 
      typeof lesson.id === 'string' && /^\d+$/.test(lesson.id)
    );
    
    if (hasOldLessonIds) {
      // Clear the old data and restart with current XP preserved
      console.log('Migrating lesson data to new format...');
      const levelInfo = calculateLevel(parsed.totalXP || 0);
      return {
        lessons: LESSONS.map(lesson => ({
          id: lesson.id,
          title: lesson.title,
          description: lesson.description,
          completed: false,
          score: 0,
        })),
        currentLessonId: LESSONS[0]?.id || null,
        totalXP: parsed.totalXP || 0,
        xpPercentageChange: parsed.xpPercentageChange || 0,
        timeSpentMinutes: parsed.timeSpentMinutes || 0,
        timeSpentPercentageChange: parsed.timeSpentPercentageChange || 0,
        level: levelInfo.level,
        skillLevelLabel: levelInfo.skillLevelLabel,
        levelProgress: levelInfo.progress,
        xpForNextLevel: levelInfo.xpForNextLevel,
        lastActivityTime: parsed.lastActivityTime || null,
        lastHuzzlingoScore: parsed.lastHuzzlingoScore || null,
        lastHuzzlingoDate: parsed.lastHuzzlingoDate || null,
      };
    }
    
    const levelInfo = calculateLevel(parsed.totalXP || 0);
    return {
      ...parsed,
      level: levelInfo.level,
      skillLevelLabel: levelInfo.skillLevelLabel,
      levelProgress: levelInfo.progress,
      xpForNextLevel: levelInfo.xpForNextLevel,
      lastHuzzlingoScore: parsed.lastHuzzlingoScore || null,
      lastHuzzlingoDate: parsed.lastHuzzlingoDate || null,
      // Ensure lessons are initialized with correct IDs if missing
      lessons: parsed.lessons?.length ? parsed.lessons : LESSONS.map(lesson => ({
        id: lesson.id,
        title: lesson.title,
        description: lesson.description,
        completed: false,
        score: 0,
      })),
    };
  }
  return {
    lessons: LESSONS.map(lesson => ({
      id: lesson.id,
      title: lesson.title,
      description: lesson.description,
      completed: false,
      score: 0,
    })),
    currentLessonId: LESSONS[0]?.id || null,
    totalXP: 0,
    xpPercentageChange: 0,
    timeSpentMinutes: 0,
    timeSpentPercentageChange: 0,
    level: 0,
    skillLevelLabel: 'Novice',
    levelProgress: 0,
    xpForNextLevel: 100,
    lastActivityTime: null,
    lastHuzzlingoScore: null,
    lastHuzzlingoDate: null,
  };
};

const initialState: LearningState = loadInitialState();

const learningSlice = createSlice({
  name: 'learning',
  initialState,
  reducers: {
    setCurrentLesson: (state, action: PayloadAction<string>) => {
      state.currentLessonId = action.payload;
      state.lastActivityTime = new Date().toISOString();
      localStorage.setItem('huzzlingo_learning', JSON.stringify(state));
    },

    completeLesson: (state, action: PayloadAction<{ lessonId: string; score: number }>) => {
      const lessonData = getLesson(action.payload.lessonId);
      
      if (lessonData) {
        const oldXP = state.totalXP;
        
        // Find or create lesson in state
        let lesson = state.lessons.find(l => l.id === action.payload.lessonId);
        if (!lesson) {
          // If lesson doesn't exist in state, add it
          lesson = {
            id: lessonData.id,
            title: lessonData.title,
            description: lessonData.description,
            completed: false,
            score: 0,
          };
          state.lessons.push(lesson);
        }
        
        // Mark lesson as completed and set score
        lesson.completed = true;
        lesson.score = action.payload.score;

        // Calculate XP gained based on score percentage
        const baseXP = lessonData.metadata.xpReward;
        const xpGained = Math.round(baseXP * (action.payload.score / 100));
        
        // Update total XP
        state.totalXP += xpGained;

        // Calculate percentage change in XP
        state.xpPercentageChange = oldXP > 0 ? ((xpGained / oldXP) * 100) : 100;

        // Update level info
        const levelInfo = calculateLevel(state.totalXP);
        state.level = levelInfo.level;
        state.skillLevelLabel = levelInfo.skillLevelLabel;
        state.levelProgress = levelInfo.progress;
        state.xpForNextLevel = levelInfo.xpForNextLevel;

        // Debug logging for development
        if (typeof window !== 'undefined' && window.location?.hostname === 'localhost') {
          console.log('Redux Lesson Completion Debug:', {
            lessonId: action.payload.lessonId,
            score: action.payload.score,
            oldXP,
            xpGained,
            newTotalXP: state.totalXP,
            levelInfo,
            updatedState: {
              level: state.level,
              skillLevelLabel: state.skillLevelLabel,
              levelProgress: state.levelProgress,
              xpForNextLevel: state.xpForNextLevel
            }
          });
        }

        // Update last activity time
        state.lastActivityTime = new Date().toISOString();

        localStorage.setItem('huzzlingo_learning', JSON.stringify(state));
      }
    },

    updateTimeSpent: (state, action: PayloadAction<number>) => {
      const oldTime = state.timeSpentMinutes;
      state.timeSpentMinutes += action.payload;
      
      // Calculate percentage change in time spent
      state.timeSpentPercentageChange = oldTime > 0 
        ? ((state.timeSpentMinutes - oldTime) / oldTime) * 100 
        : 0;

      state.lastActivityTime = new Date().toISOString();
      localStorage.setItem('huzzlingo_learning', JSON.stringify(state));
    },

    updateHuzzlingoScore: (state, action: PayloadAction<number>) => {
      state.lastHuzzlingoScore = action.payload;
      state.lastHuzzlingoDate = new Date().toISOString();
      localStorage.setItem('huzzlingo_learning', JSON.stringify(state));
    },
  },
});

export const { setCurrentLesson, completeLesson, updateTimeSpent, updateHuzzlingoScore } = learningSlice.actions;
export default learningSlice.reducer; 