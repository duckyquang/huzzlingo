// XP required for each level (0-based index)
export const LEVEL_THRESHOLDS = [
  0,      // Level 0: 0 XP
  100,    // Level 1: 100 XP
  250,    // Level 2: 250 XP
  500,    // Level 3: 500 XP
  1000,   // Level 4: 1000 XP
  2000,   // Level 5: 2000 XP
  3500,   // Level 6: 3500 XP
  5500,   // Level 7: 5500 XP
  8000,   // Level 8: 8000 XP
  11000,  // Level 9: 11000 XP
  15000,  // Level 10: 15000 XP
  20000,  // Level 11: 20000 XP
  26000,  // Level 12: 26000 XP
  33000,  // Level 13: 33000 XP
  41000,  // Level 14: 41000 XP
];

export const MAX_LEVEL = LEVEL_THRESHOLDS.length - 1;

export interface LevelInfo {
  level: number;
  currentXP: number;
  xpForNextLevel: number;
  progress: number;
  totalXPForNextLevel: number;
  skillLevelLabel: string;
}

export function calculateLevel(totalXP: number): LevelInfo {
  // Handle zero XP case
  if (totalXP === 0) {
    return {
      level: 0,
      currentXP: 0,
      xpForNextLevel: LEVEL_THRESHOLDS[1],
      progress: 0,
      totalXPForNextLevel: LEVEL_THRESHOLDS[1],
      skillLevelLabel: 'Novice'
    };
  }

  // Find the current level
  let level = 0;
  for (let i = 1; i < LEVEL_THRESHOLDS.length; i++) {
    if (totalXP >= LEVEL_THRESHOLDS[i]) {
      level = i;
    } else {
      break;
    }
  }

  // Get skill level label based on level
  const skillLevelLabel = getSkillLevelLabel(level);

  // Calculate XP progress towards next level
  const currentLevelXP = LEVEL_THRESHOLDS[level];
  const nextLevelXP = level < MAX_LEVEL ? LEVEL_THRESHOLDS[level + 1] : LEVEL_THRESHOLDS[level];
  const xpForNextLevel = nextLevelXP - totalXP;
  const totalXPForNextLevel = nextLevelXP - currentLevelXP;
  
  // Calculate progress percentage - ensure it's never negative and rounds properly
  let progress = 0;
  if (level < MAX_LEVEL && totalXPForNextLevel > 0) {
    progress = ((totalXP - currentLevelXP) / totalXPForNextLevel) * 100;
    progress = Math.max(0, Math.min(100, Math.round(progress * 100) / 100)); // Round to 2 decimal places
  } else if (level >= MAX_LEVEL) {
    progress = 100;
  }

  // Debug logging for development
  if (typeof window !== 'undefined' && window.location?.hostname === 'localhost') {
    console.log('Level Calculation Debug:', {
      totalXP,
      level,
      currentLevelXP,
      nextLevelXP,
      xpForNextLevel,
      totalXPForNextLevel,
      progress,
      skillLevelLabel
    });
  }

  return {
    level,
    currentXP: totalXP,
    xpForNextLevel,
    progress,
    totalXPForNextLevel,
    skillLevelLabel
  };
}

function getSkillLevelLabel(level: number): string {
  switch (level) {
    case 0:
      return 'Novice';
    case 1:
      return 'Rookie';
    case 2:
      return 'Apprentice';
    case 3:
      return 'Student';
    case 4:
      return 'Adept';
    case 5:
      return 'Skilled';
    case 6:
      return 'Expert';
    case 7:
      return 'Master';
    case 8:
      return 'Elite';
    case 9:
      return 'Champion';
    case 10:
      return 'Legend';
    case 11:
      return 'Grandmaster';
    case 12:
      return 'Sage';
    case 13:
      return 'Virtuoso';
    case 14:
      return 'Supreme';
    default:
      return 'Supreme';
  }
}

export function getXPForLesson(lessonDifficulty: 'easy' | 'medium' | 'hard', score: number): number {
  const baseXP = {
    easy: 50,
    medium: 100,
    hard: 150,
  }[lessonDifficulty];

  // Score multiplier (0.5 to 1.5 based on score 0-100)
  const multiplier = 0.5 + (score / 100);

  return Math.round(baseXP * multiplier);
}

export function formatXP(xp: number): string {
  return xp >= 1000 ? `${(xp / 1000).toFixed(1)}k` : xp.toString();
} 