import { configureStore } from '@reduxjs/toolkit';
import streakReducer from '../features/streak/streakSlice';
import learningReducer from '../features/learning/learningSlice';

export const store = configureStore({
  reducer: {
    streak: streakReducer,
    learning: learningReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 