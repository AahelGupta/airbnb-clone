# Project Style Guidelines

Follow these rules for all development within this workspace:

1. **Error Handling & Boundaries**: Use Error Boundaries to prevent entire app crashes. Handle API errors gracefully with fallback UI/loading states.
2. **Keep Components Small & Focused**: Follow Single Responsibility Principle (SRP): one component = one purpose. Break down large UIs into smaller reusable components.
3. **Use Proper State Management**: Use local state only where needed. For global/shared state, use Context API, Redux Toolkit, or Zustand instead of prop drilling.
4. **Memoization & Performance Optimization**: Use `React.memo` to prevent unnecessary re-renders. Use `useMemo` and `useCallback` for expensive calculations or stable function references.
5. **Consistent Styling & Theming**: Use CSS modules, styled-components, or Tailwind for consistent styling. Implement a theme system to manage colors, fonts, and spacing globally.
6. **Proper Component Lifecycle Management**: Clean up subscriptions, timers, or listeners in `useEffect`. Avoid memory leaks by properly handling unmounted components.
7. **Accessibility (A11y)**: Ensure semantic HTML for screen readers. Use proper ARIA attributes and focus management for interactive elements.
8. **Routing & Navigation Best Practices**: Use React Router or similar libraries for SPA navigation. Keep route structure clear and nested routes manageable.
9. **Optimize Asset Loading**: Lazy load images, components, and routes for faster initial load. Use code splitting to reduce bundle size.
10. **Testing & Debugging**: Use dev tools and console logs smartly to debug without cluttering production.
