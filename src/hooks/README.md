# Hooks

This directory contains custom React hooks that encapsulate reusable stateful logic.

## Available Hooks

### `useLesson`
Manages lesson state and progress:
```tsx
const { currentQuestion, progress, score, handleAnswer } = useLesson(lessonId);
```

### `useStreak`
Handles user streak tracking:
```tsx
const { currentStreak, updateStreak } = useStreak();
```

### `useStats`
Manages user statistics:
```tsx
const { xp, timeSpent, skillLevel } = useStats();
```

### `useLocalStorage`
Wrapper for localStorage with type safety:
```tsx
const [value, setValue] = useLocalStorage('key', defaultValue);
```

## Creating New Hooks

When creating a new hook:
1. Keep it focused on one concern
2. Use TypeScript for type safety
3. Include error handling
4. Add JSDoc comments for documentation 