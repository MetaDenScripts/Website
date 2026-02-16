# Accessibility

This documentation site is designed for keyboard and assistive technology users.

## Keyboard Support

- Use `Tab` and `Shift+Tab` to move through links and controls.
- Use the **Skip to main content** link at the top of each page.
- Focus rings are always visible for interactive elements.

## Structure and Semantics

- Pages use heading hierarchy for predictable reading order.
- Navigation and content areas are separated clearly.
- Required script sections are grouped consistently.

## Testing Approach

Accessibility checks run through end-to-end smoke coverage in `tests/e2e/accessibility.spec.ts`.
Manual checks should include screen-reader walkthrough on script pages.
