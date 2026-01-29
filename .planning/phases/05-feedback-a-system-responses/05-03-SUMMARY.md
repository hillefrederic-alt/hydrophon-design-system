---
phase: 05-feedback-a-system-responses
plan: 03
subsystem: ui
tags: [loading, spinner, progress, skeleton, feedback, tokens]

# Dependency graph
requires:
  - phase: 01-foundation-brand-identity
    provides: Color tokens, spacing system, typography primitives
  - phase: 02-icons-basic-interactions
    provides: Icon sizes for spinner alignment
  - phase: 04-navigation-content-structure
    provides: Card and table patterns for skeleton screens
provides:
  - Loading state token system (spinner, progress bar, skeleton)
  - German documentation for all three loading indicator types
  - Optimistic UI pattern documentation
  - Feedback section navigation hub (index.md)
affects:
  - All future components requiring loading states
  - Component libraries needing loading indicators

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Delayed spinner pattern (200ms) to avoid flash"
    - "Native <progress> element for accessibility"
    - "react-loading-skeleton for auto-sizing skeleton screens"
    - "Optimistic UI with React useOptimistic hook"
    - "prefers-reduced-motion support for all loading animations"

key-files:
  created:
    - design-system/docs/feedback/loading.md
    - design-system/docs/feedback/index.md
  modified:
    - design-system/tokens/feedback.json
    - design-system/build/css/variables.css
    - design-system/build/json/tokens.json

key-decisions:
  - "Spinner delay at 200ms to prevent flash on fast operations"
  - "Native <progress> element recommended over custom implementations"
  - "react-loading-skeleton for auto-sizing vs hardcoded dimensions"
  - "Optimistic UI only for lightweight actions, never for destructive operations"
  - "Three distinct loading indicators based on context and duration"

patterns-established:
  - "Delayed spinner: 200ms delay before showing to avoid jarring flash"
  - "Determinate vs indeterminate progress: Based on whether duration is known"
  - "Skeleton screen layout-match: Must exactly match final content structure"
  - "Error handling: Toast with retry action for failed loading operations"

# Metrics
duration: 9 min
completed: 2026-01-29
---

# Phase 05 Plan 03: Loading States & Index Summary

**Loading state token system (spinner, progress, skeleton) with comprehensive German documentation and feedback section navigation hub**

## Performance

- **Duration:** 9 min
- **Started:** 2026-01-29T08:29:00Z
- **Completed:** 2026-01-29T08:38:00Z
- **Tasks:** 2/2
- **Files modified:** 5 (3 created, 2 modified)

## Accomplishments

- **Loading tokens complete:** Spinner (4 sizes, colors, animation, delay), Progress Bar (height, colors, animation), Skeleton (colors, animation, spacing)
- **Comprehensive loading documentation:** 1040-line loading.md covering all three indicator types with German explanations
- **Optimistic UI patterns:** React useOptimistic hook integration with rollback on error
- **Feedback section index:** 425-line navigation hub linking all Phase 5 components
- **Accessibility documentation:** prefers-reduced-motion, ARIA attributes, live regions

## Task Commits

Each task was committed atomically:

1. **Task 1: Add loading state tokens to feedback.json** - `eb9582f` (feat)
2. **Task 2: Create loading documentation and feedback index** - `c804667` (docs)

**Plan metadata:** Will be committed after SUMMARY creation

## Files Created/Modified

**Created:**

- `design-system/docs/feedback/loading.md` - Complete loading states documentation (1040 lines)
- `design-system/docs/feedback/index.md` - Feedback section navigation hub (425 lines)

**Modified:**

- `design-system/tokens/feedback.json` - Added spinner, progress, and skeleton tokens (150+ tokens total)
- `design-system/build/css/variables.css` - Generated 29+ loading-related CSS variables
- `design-system/build/json/tokens.json` - Updated token build output

## Decisions Made

**1. Spinner delay at 200ms**

- **Rationale:** Prevents jarring flash for operations completing in <200ms (UX research shows flash is more disruptive than brief delay)
- **Alternative considered:** No delay (shows immediately)
- **Why rejected:** Creates visual flash on fast operations, perceived as janky

**2. Native `<progress>` element recommended**

- **Rationale:** Built-in accessibility (ARIA roles, screen reader support), semantic HTML, browser-optimized rendering
- **Alternative considered:** Custom div-based progress bar
- **Why rejected:** Requires manual ARIA implementation, more CSS complexity, reinvents wheel

**3. react-loading-skeleton for skeleton screens**

- **Rationale:** Auto-sizes to content, prevents layout shift, built-in shimmer animation, minimal API
- **Alternative considered:** Hardcoded skeleton dimensions
- **Why rejected:** Layout shift risk, doesn't adapt to responsive typography, maintenance burden

**4. Optimistic UI restrictions**

- **Decision:** Only for lightweight actions (like, save, favorite), NEVER for destructive actions (delete, discard)
- **Rationale:** Destructive actions have high user anxiety - rollback is confusing. Lightweight actions have low consequence.
- **Implementation:** Documented in loading.md with clear use case matrix

**5. Three loading indicator types**

- **Decision:** Spinner (<3s), Progress Bar (>3s or known duration), Skeleton (content loading)
- **Rationale:** Context-specific indicators provide appropriate feedback for different loading scenarios
- **Documented:** Complete decision matrix in loading.md "Wann welchen Indikator verwenden" section

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None

## Next Phase Readiness

**Ready for next plan:**

- Loading state system is complete and integrated
- Feedback section index provides navigation for all Phase 5 components
- Documentation follows established German language patterns from previous phases
- Token system fully integrated with Style Dictionary build process

**Completed Phase 5 components:**

1. Modal (05-01) ✓
2. Tooltip & Toast (05-02) ✓
3. Loading States & Index (05-03) ✓ — **This plan**

**Phase 5 complete:** All planned feedback components documented with tokens, examples, and accessibility guidance.

---

*Phase: 05-feedback-a-system-responses*
*Completed: 2026-01-29*
