import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import { formatTimeSpent } from '../lib/helpers';

interface Stats {
  currentStreak: number;
  streakChange: number;
  timeSpent: string;
  timeSpentChange: number;
  xp: number;
  xpChange: number;
  skillLevel: number;
  skillLevelChange: number;
}

export function useStats(): Stats {
  const { 
    currentStreak, 
    percentageChange: streakChange 
  } = useSelector((state: RootState) => state.streak);

  const { 
    totalXP, 
    xpPercentageChange,
    timeSpentMinutes,
    timeSpentPercentageChange,
    skillLevel,
    skillLevelPercentageChange,
  } = useSelector((state: RootState) => state.learning);

  return {
    currentStreak,
    streakChange,
    timeSpent: formatTimeSpent(timeSpentMinutes),
    timeSpentChange: timeSpentPercentageChange,
    xp: totalXP,
    xpChange: xpPercentageChange,
    skillLevel,
    skillLevelChange: skillLevelPercentageChange,
  };
} 