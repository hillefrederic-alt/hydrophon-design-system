---
phase: 05-feedback-a-system-responses
plan: 02
subsystem: ui
tags: [tooltip, toast, notification, feedback, radix-ui, sonner, floating-ui, wcag, accessibility]

# Dependency graph
requires:
  - phase: 01-foundation-brand-identity
    provides: Color tokens (success, info, warning, error), typography tokens, spacing, radius, shadow
  - phase: 02-icons-basic-interactions
    provides: Icon system (Lucide) for toast icons
  - phase: 03-forms-data-input
    provides: Form validation patterns (inline errors vs. toast anti-pattern)
provides:
  - Tooltip token system with 300ms delay, smart positioning, WCAG 1.4.13 compliance
  - Toast token system with severity-based timing (3s/4s/5s/infinity)
  - Semantic color scales (success/info/warning/error) with 50/100/200/600/800 shades
  - German documentation for tooltip and toast patterns
  - Radix UI and Sonner library recommendations
affects: [06-modals-dialogs, 07-data-visualization, future-components]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "WCAG 1.4.13 compliance for tooltips (hoverable, dismissible, persistent)"
    - "Severity-based auto-dismiss timing for toasts"
    - "ARIA live regions (role=status for success/info, role=alert for warning/error)"
    - "Pause-on-hover for toast auto-dismiss timers"
    - "Smart positioning with Floating UI for viewport collision detection"
    - "German error message tone: clear, actionable, friendly (Sie-form)"

key-files:
  created:
    - design-system/tokens/feedback.json (tooltip and toast tokens)
    - design-system/docs/feedback/tooltip.md (532 lines)
    - design-system/docs/feedback/toast.md (796 lines)
  modified:
    - design-system/build/css/variables.css (20+ new CSS variables)
    - design-system/build/json/tokens.json (semantic color scales, tooltip/toast tokens)

key-decisions:
  - "300ms tooltip delay: Industry standard, prevents flicker on quick mouse movement"
  - "Error toasts never auto-dismiss (duration: 0ms): Critical info requires explicit acknowledgment"
  - "Max 4 visible toasts: Balance between notification visibility and UI clutter"
  - "Semantic color scales (50/100/200/600/800): Enables toast variant backgrounds, borders, icons, text with proper contrast"
  - "Top-right toast position: Industry standard, doesn't block main content"
  - "Radix UI for tooltips: WCAG 1.4.13 compliant out-of-box, handles smart positioning and keyboard access"
  - "Sonner for toasts: Modern standard (8M+ weekly downloads), minimal API, pause-on-hover built-in"

patterns-established:
  - "Tooltip content: 1-5 words maximum (labels only, not explanations)"
  - "Toast message style: Clear, actionable, friendly German (Sie-form), avoid technical jargon"
  - "Action buttons in toasts: Undo (destructive actions), Retry (failures), View Details (complex events)"
  - "FIFO dismissal: Oldest toast dismissed when max visible (4) exceeded"
  - "Keyboard navigation: ESC closes tooltips/toasts, Tab reaches action buttons, Focus triggers tooltip"

# Metrics
duration: 7min
completed: 2026-01-29
---

# Phase 05 Plan 02: Tooltips & Toasts Summary

**Tooltip and toast notification systems with 300ms hover delay, severity-based timing (3s/4s/5s/∞), WCAG 1.4.13 compliance, and comprehensive German documentation for Radix UI and Sonner implementations**

## Performance

- **Duration:** 7 minutes
- **Started:** 2026-01-29T09:15:34Z
- **Completed:** 2026-01-29T09:23:18Z
- **Tasks:** 2
- **Files modified:** 5

## Accomplishments

- Tooltip token system with 300ms delay, smart positioning (Floating UI), WCAG 1.4.13 compliance (hoverable, dismissible, persistent)
- Toast token system with severity-based auto-dismiss (3s success, 4s info, 5s warning, error stays), max 4 stacking, top-right position
- Semantic color scales (success/info/warning/error) with 50/100/200/600/800 shades for toast variant backgrounds, borders, icons, text
- German documentation (1328 lines total) covering Radix UI tooltips and Sonner toasts with accessibility patterns, anti-patterns, message examples

## Task Commits

Each task was committed atomically:

1. **Task 1: Add tooltip and toast tokens to feedback.json** - `4abdd5e` (feat)
2. **Task 2: Create tooltip and toast documentation in German** - `8c70331` (docs)

## Files Created/Modified

### Created
- `design-system/tokens/feedback.json` - Tooltip and toast tokens with semantic color scales (success/info/warning/error 50/100/200/600/800), timing tokens (300ms tooltip delay, 3s/4s/5s/∞ toast durations), positioning tokens (top-right, z-index 1100/1200), variant tokens (backgrounds, borders, icon colors, text colors)
- `design-system/docs/feedback/tooltip.md` - 532-line German documentation covering tooltip patterns, WCAG 1.4.13 requirements (hoverable, dismissible, persistent), Radix UI implementation with smart positioning (Floating UI), keyboard navigation, anti-patterns (disabled elements, critical info, long text)
- `design-system/docs/feedback/toast.md` - 796-line German documentation covering toast variants (success/info/warning/error), severity-based timing, top-right positioning with max 4 stacking, action buttons (Undo/Retry/View Details), Sonner library integration, ARIA live regions, German message examples (32+ examples), anti-patterns (form validation, auto-dismissing errors, toast spam)

### Modified
- `design-system/build/css/variables.css` - Generated 20+ new CSS variables (--tooltip-*, --toast-*, --color-success-*, --color-info-*, --color-warning-*, --color-error-*)
- `design-system/build/json/tokens.json` - Updated with tooltip, toast, and semantic color scale tokens

## Decisions Made

**Tooltip delay timing (300ms):**
Industry standard that prevents flickering on quick mouse movement while feeling responsive. Research shows <200ms causes unwanted flicker, >500ms feels sluggish.

**Error toasts never auto-dismiss:**
Critical errors require explicit user acknowledgment. Auto-dismissing errors could lead to missed critical information. Duration set to 0ms (Infinity in Sonner) forces manual close.

**Max 4 visible toasts:**
Balance between notification visibility and UI clutter. More than 4 toasts overwhelm users and cover significant screen space. FIFO dismissal (oldest removed first) when limit exceeded.

**Semantic color scales (50/100/200/600/800):**
Enables proper contrast for toast variants: 50 for backgrounds (light), 200 for borders (medium), 600 for icons (saturated), 800 for text (dark). Follows WCAG AA contrast requirements.

**Radix UI for tooltips:**
Out-of-box WCAG 1.4.13 compliance (hoverable, dismissible, persistent), automatic smart positioning with collision detection, portal rendering to avoid z-index issues, keyboard navigation built-in.

**Sonner for toasts:**
Modern React standard (8M+ weekly downloads), minimal API (no setup hooks), pause-on-hover automatic, ARIA live regions automatic, action button support built-in, stacking with max visible configurable.

## Deviations from Plan

None - plan executed exactly as written.

Plan specified tooltip and toast tokens with timing, positioning, and variant structures. All tokens implemented as specified. Documentation requirements (250+ lines tooltip, 350+ lines toast, German language, accessibility requirements, library recommendations) exceeded (532 and 796 lines respectively).

## Issues Encountered

**Token reference discovery:**
feedback.json already existed from plan 05-01 with modal/spinner/progress/skeleton tokens. Integrated tooltip and toast tokens into existing file structure while fixing token references (removed incorrect `color.` prefix that caused Style Dictionary build failures).

**Resolution:** Read existing feedback.json, verified token reference patterns from effects.json and colors.json, extended file with tooltip/toast tokens and semantic color scales. Style Dictionary build succeeded with 20+ new CSS variables generated.

## Next Phase Readiness

**Ready for next phases:**
- Tooltip system complete: Ready for use in icon buttons, navigation, data tables (Phase 4 cards/tables can now add tooltips)
- Toast system complete: Ready for use in forms (success confirmations), authentication (error handling), file uploads (progress notifications)
- Semantic color scales: Reusable across other feedback components (modals, progress indicators, status badges)
- ARIA patterns established: role="status" vs role="alert" distinction clarified for future components

**Dependencies satisfied:**
- Phase 1 color/typography/spacing/radius/shadow tokens: Used extensively in feedback.json
- Phase 2 icon system: Referenced for toast icon rendering
- Phase 3 form patterns: Documented anti-pattern (form validation in toasts vs. inline)

**No blockers or concerns.**

---
*Phase: 05-feedback-a-system-responses*
*Completed: 2026-01-29*
