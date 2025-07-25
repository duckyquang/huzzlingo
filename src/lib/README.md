# Lib

This directory contains utility functions, constants, and helper code used throughout the application.

## Contents

### `constants.ts`
Application-wide constants including:
- Color values
- Configuration options
- Magic strings
- Route paths

### `helpers.ts`
Utility functions for:
- Data formatting
- Calculations
- Type checking
- Common operations

### `types/`
TypeScript type definitions:
- Component props
- Data structures
- API responses

### `data/`
Static data and mock data:
- Lesson content
- Exercise templates
- Test data

## Usage

```tsx
import { formatTimeSpent, generateId } from '../lib/helpers';
import { ROUTES, COLORS } from '../lib/constants';
import type { Lesson } from '../lib/types';
``` 