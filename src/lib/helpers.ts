/**
 * Formats time spent in minutes to a human-readable string
 */
export const formatTimeSpent = (minutes: number): string => {
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
};

/**
 * Generates a stable ID for a given prefix and index
 */
export const generateId = (prefix: string, index: number): string => {
  return `${prefix}_${index.toString().padStart(3, '0')}`;
};

/**
 * Calculates percentage change between two numbers
 */
export const calculatePercentageChange = (oldValue: number, newValue: number): number => {
  if (oldValue === 0) return newValue > 0 ? 100 : 0;
  return ((newValue - oldValue) / oldValue) * 100;
};

/**
 * Gets today's date in YYYY-MM-DD format
 */
export const getTodayDate = (): string => {
  return new Date().toISOString().split('T')[0];
};

/**
 * Gets yesterday's date in YYYY-MM-DD format
 */
export const getYesterdayDate = (): string => {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  return date.toISOString().split('T')[0];
};

/**
 * Calculates skill level based on XP
 */
export const calculateSkillLevel = (xp: number): number => {
  return Math.floor(xp / 100) + 1;
};

/**
 * Safely parses JSON from localStorage with a fallback value
 */
export const safeParseJSON = <T>(key: string, fallback: T): T => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
};

/**
 * Safely stringifies and saves JSON to localStorage
 */
export const safeSaveJSON = (key: string, value: unknown): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
  }
}; 