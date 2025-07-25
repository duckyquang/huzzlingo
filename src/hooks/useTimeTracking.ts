import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store';

const STORAGE_KEY = 'huzzlingo_last_active';
const UPDATE_INTERVAL = 60000; // Update every minute

export function useTimeTracking() {
  const dispatch = useDispatch();
  const { timeSpentMinutes } = useSelector((state: RootState) => state.learning);

  useEffect(() => {
    // Get last active timestamp
    const lastActive = localStorage.getItem(STORAGE_KEY);
    const now = Date.now();

    if (lastActive) {
      // Calculate minutes passed since last active
      const minutesPassed = Math.floor((now - parseInt(lastActive)) / 60000);
      if (minutesPassed > 0) {
        dispatch({ 
          type: 'learning/updateTimeSpent', 
          payload: minutesPassed 
        });
      }
    }

    // Update last active time
    localStorage.setItem(STORAGE_KEY, now.toString());

    // Set up interval to update time spent
    const interval = setInterval(() => {
      dispatch({ 
        type: 'learning/updateTimeSpent', 
        payload: 1 
      });
      localStorage.setItem(STORAGE_KEY, Date.now().toString());
    }, UPDATE_INTERVAL);

    // Clean up
    return () => {
      clearInterval(interval);
      localStorage.setItem(STORAGE_KEY, Date.now().toString());
    };
  }, [dispatch]);

  return timeSpentMinutes;
} 