# Layouts

This directory contains layout components that wrap pages and provide consistent structure across the application.

## Purpose

Layout components:
- Define the overall page structure
- Handle responsive behavior
- Manage navigation elements
- Control content positioning

## Components

- `MainLayout.tsx` - Primary layout with sidebar and mobile navigation
- `Sidebar.tsx` - Desktop navigation sidebar
- `MobileNav.tsx` - Bottom navigation for mobile
- `MobileHeader.tsx` - Top header for mobile view

## Usage

```tsx
// Example usage in App.tsx
<MainLayout>
  <Outlet /> {/* Page content */}
</MainLayout>
``` 