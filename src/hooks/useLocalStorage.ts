import { useState, useEffect } from 'react';
import { safeParseJSON, safeSaveJSON } from '../lib/helpers';

export function useLocalStorage<T>(key: string, initialValue: T) {
  // Get initial value from localStorage or use provided initialValue
  const [storedValue, setStoredValue] = useState<T>(() => {
    return safeParseJSON(key, initialValue);
  });

  // Update localStorage when value changes
  useEffect(() => {
    safeSaveJSON(key, storedValue);
  }, [key, storedValue]);

  // Return tuple like useState
  return [storedValue, setStoredValue] as const;
} 