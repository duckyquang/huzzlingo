# Pages

This directory contains top-level page components that correspond to different routes in the application.

## Structure

Each page should:
- Be a standalone component
- Handle its own data fetching and state management
- Use components from `/components` and `/layouts`
- Have a clear, focused purpose

## Pages

- `Dashboard.tsx` - Main landing page with stats and progress
- `Courses.tsx` - Course listing and selection
- `Lesson/` - Individual lesson view with exercises (organized in subdirectory)
- `FinalChallenge.tsx` - Final boss chat simulation

## Organization

For complex pages, create a subdirectory:

```
pages/
  Dashboard/
    Dashboard.tsx
    DashboardStats.tsx
    ActivityFeed.tsx
    index.ts
  Lesson/
    Lesson.tsx
    LessonProgress.tsx
    LessonComplete.tsx
    index.ts
``` 