# Styles

This directory contains global styles and Tailwind CSS configuration.

## Files

### `globals.css`
Global styles and Tailwind imports:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom base styles */
@layer base {
  body {
    @apply bg-huzz-dark text-white;
  }
}

/* Custom components */
@layer components {
  .btn { ... }
  .card { ... }
  .input { ... }
}
```

### `tailwind.config.ts`
Tailwind configuration including:
- Custom colors
- Font families
- Animations
- Plugins
- Theme extensions

## Usage

Custom utility classes:
```tsx
<div className="bg-gradient-huzz shadow-glow-pink" />
```

Custom components:
```tsx
<button className="btn btn-primary" />
<div className="card card-glow" />
``` 