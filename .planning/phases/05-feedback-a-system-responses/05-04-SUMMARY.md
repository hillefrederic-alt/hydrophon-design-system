---
phase: 05-feedback-a-system-responses
plan: 04
type: execute
wave: 1
status: complete
subsystem: design-tokens
tags: [feedback, tooltip, toast, tokens, style-dictionary, gap-closure]

# Dependency tracking
requires:
  - 05-01  # Modal tokens (established feedback.json structure)
  - 05-02  # Tooltip and Toast documentation (defines token requirements)
  - 05-03  # Loading states (completed feedback component set)
provides:
  - tooltip-tokens  # 12 tooltip token groups in feedback.json
  - toast-tokens  # 4 toast variant color sets + layout/timing tokens
  - feedback-css-variables  # Generated CSS custom properties for tooltips and toasts
affects:
  - frontend-implementation  # Developers can now use --tooltip-* and --toast-* variables

# Tech evolution
tech-stack:
  added: []
  patterns:
    - Direct hex color values for toast variants (no semantic color scales in token system)
    - W3C DTCG format with proper token aliases for tooltip tokens

# File tracking
key-files:
  created: []
  modified:
    - path: design-system/tokens/feedback.json
      change: Added tooltip and toast token sections
      lines-added: 282
    - path: design-system/build/css/variables.css
      change: Generated CSS custom properties for tooltips and toasts
      lines-added: 132
    - path: design-system/build/json/tokens.json
      change: Updated token output with new feedback tokens

# Key decisions
decisions:
  - id: tooltip-token-aliases
    question: Should tooltip tokens use token aliases or direct values?
    chosen: Token aliases ({neutral.900}, {fontSize.sm}, {borderRadius.sm}, {spacing.1}, {spacing.2})
    rationale: Maintains consistency with existing token system, ensures updates propagate
    impact: Tooltip tokens stay synchronized with base token changes
    alternatives:
      - Direct values: Simpler but breaks on base token updates

  - id: toast-variant-colors
    question: How to define toast variant colors given lack of semantic color scales?
    chosen: Direct hex values based on Tailwind color scales (green-50/200/600/800, etc.)
    rationale: Token system has no color.success.50 scales, only single semantic colors
    impact: Toast colors are static and don't reference semantic tokens
    alternatives:
      - Create semantic color scales: Would require restructuring entire color token system
      - Use neutral colors: Would lose semantic color-coding for toast variants

# Metrics
metrics:
  duration: 2.4 min
  tasks-completed: 3
  files-modified: 3
  lines-added: 414
  commits: 3
  completed: 2026-01-29

---

# Phase 5 Plan 4: Tooltip and Toast Tokens Summary

**One-liner:** Added 12 tooltip token groups and 4 toast variant color sets to feedback.json, generating CSS variables that documentation already references.

## What Was Built

This gap closure plan resolved broken CSS variable references in tooltip.md and toast.md documentation by adding the missing tokens to the token system.

**Tooltip tokens added (12 groups):**
- Timing: delay (300ms), animation duration (150ms)
- Colors: background (neutral.900), color (neutral.white)
- Typography: font-size (fontSize.sm = 14px)
- Spacing: padding-x/y (spacing.2/spacing.1), offset (5px), max-width (200px)
- Styling: border-radius (borderRadius.sm = 2px), arrow-size (6px)
- Layout: z-index (1100 - above modals)

**Toast tokens added (extensive structure):**
- Position: top/right (spacing.4 = 16px)
- Sizing: width (360px), max-width (calc(100vw - 32px)), padding-x/y (spacing.4/spacing.3)
- Styling: border-radius (borderRadius.lg = 8px), shadow (shadow.lg)
- Layout: gap (spacing.3 = 12px), stack-gap (spacing.2 = 8px), max-visible (4), z-index (1200)
- Timing: duration variants (success 3s, info 4s, warning 5s, error 0ms), animation (enter 200ms, exit 150ms)
- **Four variant color sets** (success/info/warning/error):
  - Each with: background (50 shade), border (200 shade), icon-color (600 shade), text-color (800 shade)
  - Success: green (#f0fdf4, #bbf7d0, #16a34a, #166534)
  - Info: blue (#eff6ff, #bfdbfe, #2563eb, #1e40af)
  - Warning: amber (#fffbeb, #fde68a, #d97706, #92400e)
  - Error: red (#fef2f2, #fecaca, #dc2626, #991b1b)
- Action buttons: font-size (fontSize.sm), font-weight (fontWeight.medium)
- Close button: size (24px), icon-size (16px)

**Style Dictionary build output:**
- Generated 132+ CSS custom properties (--tooltip-*, --toast-*)
- All documentation references now resolve correctly
- Variables use proper token resolution (tooltip) or direct values (toast variants)

## Tasks Completed

| Task | Status | Commit | Files |
|------|--------|--------|-------|
| 1. Add tooltip tokens | ✅ Complete | 69caa6a | design-system/tokens/feedback.json |
| 2. Add toast tokens | ✅ Complete | 23a3d20 | design-system/tokens/feedback.json |
| 3. Rebuild CSS variables | ✅ Complete | ed63919 | design-system/build/css/variables.css, design-system/build/json/tokens.json |

## Deviations from Plan

None - plan executed exactly as written.

All token aliases pre-verified before implementation. Toast variant colors implemented with direct hex values as planned (token system limitation documented).

## Verification Results

All verification criteria met:

**Tooltip verification (5/5 passed):**
- ✅ "tooltip" section exists in feedback.json
- ✅ tooltip.background property with {neutral.900} alias
- ✅ {fontSize.sm} alias resolves to typography tokens
- ✅ {borderRadius.sm} alias resolves to effects tokens
- ✅ All 12 token groups present and valid JSON

**Toast verification (6/6 passed):**
- ✅ "toast" section exists in feedback.json
- ✅ "variant" subsection with all four variants
- ✅ Success variant colors (#f0fdf4 background verified)
- ✅ Info variant colors (#eff6ff background verified)
- ✅ Warning variant colors (#fffbeb background verified)
- ✅ Error variant colors (#fef2f2 background verified)

**CSS variable generation (11/11 passed):**
- ✅ --tooltip-background generated
- ✅ --tooltip-color generated
- ✅ --tooltip-font-size generated
- ✅ --tooltip-delay generated
- ✅ --tooltip-border-radius generated
- ✅ --toast-width generated
- ✅ --toast-z-index generated
- ✅ --toast-variant-success-background generated
- ✅ --toast-variant-info-background generated
- ✅ --toast-variant-warning-background generated
- ✅ --toast-variant-error-background generated

**Overall result:** All 22 verification checks passed. Documentation CSS variable references now resolve to actual build output.

## Technical Notes

### Token Architecture Insight

This plan revealed a token system limitation: no semantic color scales exist (e.g., color.success.50, color.info.200). Only single semantic colors are defined (color.success = #22c55e).

**Impact on toast implementation:**
- Tooltip tokens use aliases cleanly: `{neutral.900}`, `{fontSize.sm}`, `{borderRadius.sm}`
- Toast variant colors must use direct hex values: `#f0fdf4` (green-50), `#bbf7d0` (green-200)

**Why not create semantic color scales?**
Creating color.success.50 through color.success.900 scales would require:
1. Restructuring colors.json token architecture
2. Defining 9 shades × 4 semantic colors = 36 new tokens
3. Potential breaking changes to existing token references
4. Scope exceeds gap closure plan

**Decision:** Use direct Tailwind-based hex values for toast variants. Document limitation for future token system enhancement.

### Style Dictionary Output

Build succeeded with expected warnings:
- Token collisions (2): Known issue with existing token structure
- Unknown CSS Font Shorthand (12): Typography tokens using shorthand format (expected)

Generated output:
- 132 new CSS variables in variables.css
- Updated JSON token output in tokens.json
- All variables properly namespaced (--tooltip-*, --toast-*)

## Next Phase Readiness

**Documentation now accurate:**
- tooltip.md CSS variable references → ✅ resolve to build output
- toast.md CSS variable references → ✅ resolve to build output

**Developer implementation ready:**
- Frontend developers can now use `var(--tooltip-background)`, `var(--toast-variant-success-background)`, etc.
- Token references in documentation match actual CSS custom properties
- All four toast variants have complete color sets for backgrounds, borders, icons, text

**Phase 5 feedback token system complete:**
- 6 feedback components documented: modal, tooltip, toast, spinner, progress, skeleton
- All 6 components have complete token definitions in feedback.json
- All CSS variables generated and verified

**Gaps closed:**
- ✅ Tooltip token gap (Plan 05-04)
- ✅ Toast token gap (Plan 05-04)
- ✅ Remaining gaps: none identified in Phase 5

**Phase 5 status:** COMPLETE (all verification failures resolved)

## Commits

```
69caa6a feat(05-04): add tooltip tokens to feedback.json
23a3d20 feat(05-04): add toast tokens to feedback.json
ed63919 feat(05-04): rebuild CSS variables with tooltip and toast tokens
```

---

**Plan duration:** 2.4 minutes
**Tasks completed:** 3/3
**Files modified:** 3 (+414 lines)
**Verification:** 22/22 checks passed

*Completed: 2026-01-29*
