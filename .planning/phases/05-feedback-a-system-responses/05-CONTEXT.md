# Phase 5: Feedback & System Responses - Context

**Gathered:** 2026-01-29
**Status:** Ready for planning

<domain>
## Phase Boundary

System feedback components that confirm user actions, provide contextual help, communicate state changes, and handle loading/error states. This phase delivers the feedback mechanisms themselves - the actions being confirmed (forms, navigation) already exist from previous phases.

</domain>

<decisions>
## Implementation Decisions

### Modal Dialogs
- **Use cases**: All three - confirmations (destructive actions), information dialogs, and form containers
- **Size variants**: Small / Medium / Large system
  - Small for confirmations
  - Medium for forms
  - Large for complex content
- **Close mechanisms**: ESC key + Close button (X)
  - ESC key for WCAG keyboard accessibility
  - Visual close button in top-right corner
  - NO backdrop click (prevents accidental dismissal)
  - Confirmation modals should have explicit Cancel button
- **Animation**: Claude's discretion - choose animation that matches established design system patterns

### Tooltips
- **Trigger method**: Hover only (~300ms delay)
  - Standard desktop pattern
  - Show on mouse hover after short delay
- **Content**: Short labels only (1-5 words)
  - Just label the icon/button
  - Examples: "Delete item", "Export as PDF"
  - NOT descriptions or help text
- **Positioning**: Smart positioning logic
  - Prefer top placement
  - Flip to bottom/left/right if near viewport edge
  - Prevents cutoff at screen boundaries
- **Visual indicator**: Yes, with arrow/pointer
  - Small arrow triangle points to trigger element
  - Makes relationship clear

### Notifications/Toasts
- **Position**: Top-right corner
  - Industry standard
  - Doesn't block main content
  - Consistent with desktop apps
- **Duration**: Severity-based timing
  - Success: 3 seconds auto-dismiss
  - Info: 4 seconds auto-dismiss
  - Warning: 5 seconds auto-dismiss
  - Error: stays until manually dismissed
- **Action buttons**: Yes, optional 1-2 action buttons when appropriate
  - Undo (for delete/destructive actions)
  - View details
  - Retry (for failed operations)
- **Stacking behavior**: Stack vertically
  - New toasts push older ones down
  - All visible simultaneously
  - Maximum 3-4 visible at once
  - Oldest dismissed first when limit reached

### Loading & Progress
- **Indicator types**: Context-specific approach
  - Spinner for quick actions (<3 seconds expected)
  - Progress bar for long tasks with known duration (uploads, file processing)
  - Skeleton screens for content loading (cards, tables, lists)
- **Appearance timing**: Claude's discretion
  - Choose appropriate delay/immediate show based on UX best practices
  - Consider 200-300ms delay to avoid flashing for fast operations
- **Optimistic UI**: Yes, document and support
  - Show success state immediately for instant feel
  - Rollback if operation fails
  - Appropriate for lightweight actions (like, save, favorite)
  - NOT appropriate for destructive or critical actions
- **Error handling**: Error toast + retry action
  - Show error toast with clear message
  - Include Retry button for failed operations
  - Non-blocking - user can continue working

### Claude's Discretion
- Modal animation style (fade+scale, slide, or fade only)
- Loading indicator appearance timing (immediate vs delayed)
- Exact toast animation and enter/exit transitions
- Skeleton screen layout patterns
- Spinner size and styling
- Progress bar styling and animation
- Error message wording and tone
- Accessibility enhancements (ARIA labels, focus management beyond basic requirements)

</decisions>

<specifics>
## Specific Ideas

- Modal sizes should align with existing card/container sizing patterns from Phase 4
- Toasts should use same color semantic tokens established in Phase 1 (success/error/warning/info)
- Focus-trap pattern from Phase 4 mobile drawer applies to modals
- Tooltips should NOT be used for critical information - only supplemental labels
- Error states should be friendly and helpful in German (like form validation from Phase 3)

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 05-feedback-a-system-responses*
*Context gathered: 2026-01-29*
