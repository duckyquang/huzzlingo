import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface StreakState {
  currentStreak: number;
  longestStreak: number;
  lastPracticeDate: string | null;
  streakFreezeCount: number;
  percentageChange: number;
}

// Load initial state from localStorage
const loadInitialState = (): StreakState => {
  const saved = localStorage.getItem('huzzlingo_streak');
  if (saved) {
    return JSON.parse(saved);
  }
  return {
    currentStreak: 0,
    longestStreak: 0,
    lastPracticeDate: null,
    streakFreezeCount: 0,
    percentageChange: 0,
  };
};

const initialState: StreakState = loadInitialState();

const streakSlice = createSlice({
  name: 'streak',
  initialState,
  reducers: {
    completePractice: (state) => {
      const today = new Date().toISOString().split('T')[0];
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      
      console.log('Streak Debug:', {
        today,
        yesterday,
        lastPracticeDate: state.lastPracticeDate,
        currentStreak: state.currentStreak
      });
      
      if (state.lastPracticeDate !== today) {
        // Calculate percentage change
        const oldStreak = state.currentStreak;
        
        if (state.lastPracticeDate === yesterday) {
          // Continued streak
          state.currentStreak += 1;
          console.log('Continued streak:', state.currentStreak);
        } else if (state.lastPracticeDate === null) {
          // First day
          state.currentStreak = 1;
          console.log('Starting first streak:', state.currentStreak);
        } else if (state.streakFreezeCount > 0) {
          // Used streak freeze
          state.streakFreezeCount -= 1;
          state.currentStreak += 1;
          console.log('Used streak freeze:', state.currentStreak);
        } else {
          // Broke streak - reset to 1 (today counts as day 1)
          state.currentStreak = 1;
          console.log('Broke streak, restarting:', state.currentStreak);
        }

        // Update percentage change
        state.percentageChange = oldStreak > 0 
          ? ((state.currentStreak - oldStreak) / oldStreak) * 100 
          : 100;

        state.longestStreak = Math.max(state.currentStreak, state.longestStreak);
        state.lastPracticeDate = today;

        // Save to localStorage
        localStorage.setItem('huzzlingo_streak', JSON.stringify(state));
        
        console.log('Streak updated:', {
          newStreak: state.currentStreak,
          longestStreak: state.longestStreak,
          percentageChange: state.percentageChange
        });
      } else {
        console.log('Already practiced today, no streak update needed');
      }
    },
    resetStreak: (state) => {
      state.currentStreak = 0;
      state.lastPracticeDate = null;
      state.percentageChange = 0;
      localStorage.setItem('huzzlingo_streak', JSON.stringify(state));
    },
    useStreakFreeze: (state) => {
      if (state.streakFreezeCount > 0) {
        state.streakFreezeCount -= 1;
        localStorage.setItem('huzzlingo_streak', JSON.stringify(state));
      }
    },
    addStreakFreeze: (state) => {
      state.streakFreezeCount += 1;
      localStorage.setItem('huzzlingo_streak', JSON.stringify(state));
    },
  },
});

export const {
  completePractice,
  resetStreak,
  useStreakFreeze,
  addStreakFreeze,
} = streakSlice.actions;

export default streakSlice.reducer; 