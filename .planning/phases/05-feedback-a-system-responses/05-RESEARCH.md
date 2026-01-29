# Phase 5: Feedback & System Responses - Research

**Researched:** 2026-01-29
**Domain:** React UI feedback components (modals, tooltips, toasts, loading states)
**Confidence:** HIGH

## Summary

Phase 5 focuses on implementing feedback components that confirm user actions, provide contextual help, communicate system states, and handle loading/error conditions. The standard approach in 2026 centers on headless UI primitives (particularly Radix UI) for modals and tooltips, combined with specialized toast libraries (Sonner or react-hot-toast) and skeleton screens for loading states.

The CONTEXT.md decisions have locked in key implementation details: modals with ESC key + close button (no backdrop click), hover-only tooltips with smart positioning, top-right toasts with severity-based timing, and context-specific loading indicators (spinners/progress bars/skeletons). These decisions align well with current best practices and accessibility standards.

The React ecosystem has matured significantly in this domain. Radix UI primitives (actively maintained, last release May 2025) provide accessible, unstyled foundations for modals and tooltips. Sonner has emerged as the modern toast standard (8M+ weekly downloads, default in shadcn/ui). React's new useOptimistic hook (React 18+) standardizes optimistic UI patterns. The native HTML `<dialog>` element with built-in focus management represents a significant shift from manual focus trap implementations.

**Primary recommendation:** Use Radix UI primitives (@radix-ui/react-dialog v1.1.15, @radix-ui/react-tooltip v1.2.8) for modals and tooltips, Sonner (v2.0.7) for toasts, react-loading-skeleton for skeleton screens, and React's built-in useOptimistic hook for optimistic updates.

## Standard Stack

The established libraries/tools for this domain:

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| @radix-ui/react-dialog | 1.1.15 | Modal/dialog primitives | Actively maintained (May 2025), full accessibility (WAI-ARIA), focus management, portal rendering, 4.7K+ projects use it |
| @radix-ui/react-tooltip | 1.2.8 | Tooltip primitives | Smart positioning, accessibility built-in, 8M+ weekly downloads, 4.5K+ projects use it |
| sonner | 2.0.7 | Toast notifications | Modern standard (8M+ weekly downloads), default in shadcn/ui, minimal API, no setup hooks needed |
| react-loading-skeleton | 3.x | Skeleton screens | Auto-sizes to content, built-in shimmer, most popular skeleton library, simple API |
| Floating UI | 1.x | Tooltip positioning engine | Successor to Popper.js, 3KB, platform-agnostic, intelligent flip/shift positioning |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| react-hot-toast | 2.x | Toast notifications alternative | Prefer for minimalist needs (5KB), promise-based API, battle-tested |
| focus-trap-react | 10.x | Focus management | Only if NOT using native `<dialog>` element or Radix primitives (they handle it) |
| @radix-ui/react-alert-dialog | 1.1.x | Alert/confirm dialogs | For confirmation dialogs (destructive actions) - variant of Dialog |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Radix UI | Headless UI | Fewer components (16 vs 30+), Tailwind-specific, less active |
| Radix UI | Base UI | Newer, less mature, but actively maintained by Material UI team |
| Radix UI | React Aria | More verbose API, better for Adobe ecosystem projects |
| Sonner | react-hot-toast | Choose for smaller bundle (5KB vs Sonner's default), more control over positioning |

**Installation:**
```bash
npm install @radix-ui/react-dialog @radix-ui/react-tooltip sonner react-loading-skeleton @floating-ui/react
```

## Architecture Patterns

### Recommended Project Structure
```
src/
├── components/
│   ├── feedback/
│   │   ├── Modal.tsx           # Styled wrapper around Radix Dialog
│   │   ├── Tooltip.tsx         # Styled wrapper around Radix Tooltip
│   │   ├── Toast.tsx           # Toast setup/configuration (if needed)
│   │   ├── Spinner.tsx         # Loading spinner component
│   │   ├── ProgressBar.tsx     # Progress indicator
│   │   └── SkeletonCard.tsx    # Skeleton patterns for cards/tables
│   └── [other components]/
├── hooks/
│   └── useOptimistic.ts       # Re-export React's useOptimistic with utilities
└── utils/
    └── toast.ts               # Toast helper functions (if needed)
```

### Pattern 1: Modal/Dialog with Accessibility
**What:** Modal dialog with focus trap, ESC key handling, portal rendering, and ARIA attributes
**When to use:** Confirmations, forms, complex content overlays
**Example:**
```typescript
// Source: Radix UI Dialog documentation + WAI-ARIA patterns
import * as Dialog from '@radix-ui/react-dialog';

export function Modal({
  open,
  onOpenChange,
  title,
  description,
  children,
  size = 'medium' // small | medium | large
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="modal-overlay" />
        <Dialog.Content
          className={`modal-content modal-${size}`}
          aria-describedby={description ? "modal-description" : undefined}
        >
          <Dialog.Title>{title}</Dialog.Title>
          {description && (
            <Dialog.Description id="modal-description">
              {description}
            </Dialog.Description>
          )}

          {children}

          <Dialog.Close asChild>
            <button aria-label="Schließen">×</button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
```

### Pattern 2: Tooltip with Smart Positioning
**What:** Hover-triggered tooltip with delay, smart positioning, and arrow pointer
**When to use:** Icon button labels, supplemental (non-critical) information
**Example:**
```typescript
// Source: Radix UI Tooltip documentation
import * as Tooltip from '@radix-ui/react-tooltip';

export function TooltipProvider({ children }) {
  return (
    <Tooltip.Provider delayDuration={300}>
      {children}
    </Tooltip.Provider>
  );
}

export function IconWithTooltip({ icon, label }) {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <button className="icon-button" aria-label={label}>
          {icon}
        </button>
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content
          className="tooltip-content"
          sideOffset={5}
          side="top"
          collisionPadding={10}
        >
          {label}
          <Tooltip.Arrow className="tooltip-arrow" />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}
```

### Pattern 3: Toast Notifications
**What:** Non-blocking notifications with auto-dismiss, action buttons, and stacking
**When to use:** Success confirmations, info messages, warnings, errors
**Example:**
```typescript
// Source: Sonner documentation
import { Toaster, toast } from 'sonner';

// In app root
export function App() {
  return (
    <>
      <Toaster
        position="top-right"
        visibleToasts={4}
        duration={3000} // default, overridden per type
      />
      {/* rest of app */}
    </>
  );
}

// Usage in components
function handleDelete() {
  toast.success('Element gelöscht', {
    duration: 3000,
    action: {
      label: 'Rückgängig',
      onClick: () => undoDelete(),
    },
  });
}

function handleError() {
  toast.error('Fehler beim Laden', {
    duration: Infinity, // stays until dismissed
    action: {
      label: 'Erneut versuchen',
      onClick: () => retry(),
    },
  });
}
```

### Pattern 4: Optimistic UI with Rollback
**What:** Immediately show success state, rollback if server action fails
**When to use:** Lightweight actions (like, save, favorite), NOT destructive actions
**Example:**
```typescript
// Source: React documentation - useOptimistic hook
import { useOptimistic } from 'react';

function LikeButton({ postId, initialLikes }) {
  const [optimisticLikes, addOptimisticLike] = useOptimistic(
    initialLikes,
    (current, amount) => current + amount
  );

  async function handleLike() {
    // Immediate UI update
    addOptimisticLike(1);

    try {
      // Server action
      await updateLikes(postId, optimisticLikes + 1);
    } catch (error) {
      // Automatic rollback on error
      toast.error('Fehler beim Speichern');
    }
  }

  return (
    <button onClick={handleLike}>
      ❤️ {optimisticLikes}
    </button>
  );
}
```

### Pattern 5: Skeleton Loading States
**What:** Content placeholder that mimics final layout during loading
**When to use:** Card grids, tables, lists - anything with predictable layout
**Example:**
```typescript
// Source: react-loading-skeleton documentation
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function ProductCardSkeleton() {
  return (
    <div className="product-card">
      <Skeleton height={200} /> {/* Image */}
      <Skeleton count={1} style={{ marginTop: 10 }} /> {/* Title */}
      <Skeleton count={2} style={{ marginTop: 5 }} /> {/* Description */}
      <Skeleton width={100} style={{ marginTop: 10 }} /> {/* Price */}
    </div>
  );
}

function ProductList({ loading, products }) {
  if (loading) {
    return (
      <div className="product-grid">
        {Array(6).fill(0).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return <div className="product-grid">{/* actual products */}</div>;
}
```

### Pattern 6: Loading States by Context
**What:** Choose appropriate loading indicator based on expected duration and context
**When to use:** Different contexts require different loading patterns
**Example:**
```typescript
// Source: UX loading pattern research
function LoadingStrategy({ type, progress, children }) {
  // Quick actions (<3 seconds): Spinner with 200-300ms delay
  if (type === 'quick') {
    return <DelayedSpinner delay={200} />;
  }

  // Long actions with known duration: Progress bar
  if (type === 'progress' && progress !== undefined) {
    return <ProgressBar value={progress} max={100} />;
  }

  // Content loading: Skeleton screens
  if (type === 'skeleton') {
    return <SkeletonContent />;
  }

  // Indeterminate long action: Spinner immediately
  return <Spinner />;
}

function DelayedSpinner({ delay = 200 }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return show ? <Spinner /> : null;
}
```

### Anti-Patterns to Avoid
- **Backdrop-click dismissal:** Easy to accidentally close modal, especially on mobile scrolling - CONTEXT.md correctly specifies NO backdrop click
- **Tooltips for critical info:** Tooltips are easily missed, inaccessible on touch devices - use inline text or dedicated help sections
- **Auto-dismissing error toasts:** Users need time to read and act on errors - CONTEXT.md correctly specifies errors stay until dismissed
- **Focus trap without ESC key:** Keyboard users need escape mechanism - always provide ESC + visible close button
- **Tooltip on disabled elements:** Disabled elements don't receive focus/hover - wrap in a div or show inline message
- **Hand-rolling focus management:** Use Radix primitives or native `<dialog>` - focus management is complex with many edge cases
- **Toast for user input errors:** Errors should be inline next to the problematic field, not in a corner toast
- **Overusing modals:** Modals interrupt flow - prefer inline expansion or dedicated pages when possible

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Tooltip positioning | Custom absolute positioning logic | Floating UI or Radix Tooltip | Handles viewport edges, scroll containers, overflow, collision detection, 16+ edge cases |
| Modal focus trap | Manual tabindex manipulation | Radix Dialog or native `<dialog>` | Must handle: initial focus, tab cycling, shift+tab, return focus, ESC key, screen readers, focus restoration |
| Toast stacking | Custom queue + animation | Sonner or react-hot-toast | Manages: Z-index stacking, queue limits, timing conflicts, pause-on-hover, dismiss animations, entrance/exit choreography |
| Skeleton auto-sizing | Hardcoded width/height | react-loading-skeleton | Automatically matches font size, line height, margins - prevents layout shift |
| Portal rendering | document.body.appendChild | Radix Portal or React.createPortal | Handles: SSR hydration, cleanup, multiple portals, z-index context, event bubbling through portal boundaries |
| Optimistic updates | Manual state tracking | React's useOptimistic hook | Manages: rollback on error, race conditions, multiple concurrent updates, state synchronization |
| Progress bar accessibility | Custom div with width | Native `<progress>` element | Built-in ARIA roles, screen reader support, semantic meaning, keyboard navigation |

**Key insight:** Feedback components have extensive accessibility requirements (WAI-ARIA patterns, focus management, keyboard navigation, screen reader support) that take years to perfect. Libraries like Radix UI have solved these problems and are battle-tested across thousands of projects. Custom implementations inevitably miss edge cases that frustrate users with disabilities.

## Common Pitfalls

### Pitfall 1: Modal Overuse
**What goes wrong:** Designers treat modals as default UI pattern for any interaction - login, tooltips, onboarding, messages. Users become frustrated with constant interruptions.
**Why it happens:** Modals are visually prominent and easy to implement, making them tempting for any content that needs emphasis.
**How to avoid:** Use modals only for: (1) confirmations of destructive actions, (2) time-sensitive decisions that require focus, (3) forms that don't fit inline. Prefer inline expansion, dedicated pages, or slide-out panels for other cases.
**Warning signs:** User complaints about "too many popups", high modal abandonment rates, users completing actions but missing modal confirmations.

### Pitfall 2: Toast Accessibility Failures
**What goes wrong:** Toasts appear/disappear too quickly, aren't announced to screen readers, lack keyboard navigation, force user to find them in corner of screen.
**Why it happens:** Toasts are designed for sighted users who can spot motion in peripheral vision. Developers forget about users who can't see the toast or need more time.
**How to avoid:** (1) Use ARIA live regions (`role="status"` or `role="alert"`), (2) Timing based on content length (3s minimum for short messages), (3) Pause auto-dismiss on hover/focus, (4) Error toasts never auto-dismiss, (5) Don't use toasts for critical errors - use inline messages instead.
**Warning signs:** Screen reader users reporting missed notifications, users complaining "errors disappear before I can read them", accessibility audits failing on toast components.

### Pitfall 3: Tooltip WCAG 1.4.13 Violations
**What goes wrong:** Tooltip disappears when user tries to hover over it, can't be dismissed without moving mouse, inaccessible via keyboard, fails on touch devices.
**Why it happens:** Developers implement hover-only tooltips without considering the full WCAG 1.4.13 requirements (dismissible, hoverable, persistent).
**How to avoid:** (1) Use Radix Tooltip (handles all WCAG requirements), (2) Ensure tooltip content itself is hoverable, (3) Provide keyboard access via focus, (4) Add visible close mechanism, (5) Keep tooltips short - CONTEXT.md correctly specifies 1-5 words.
**Warning signs:** Accessibility audit failures for WCAG 1.4.13, user complaints about tooltips "disappearing too fast", tooltip content gets cut off at viewport edges.

### Pitfall 4: Focus Management State Synchronization
**What goes wrong:** Modal opens with ESC key but React state doesn't update, causing modal to not open again. Or focus returns to wrong element after close.
**Why it happens:** Native `<dialog>` element and keyboard events have their own state separate from React state. Developers forget to sync them.
**How to avoid:** When using Radix Dialog, state is automatically synchronized via `open` and `onOpenChange` props. If using native `<dialog>`, watch for `close` event and update React state. Always store the trigger element reference before opening modal to restore focus correctly.
**Warning signs:** Modal won't reopen after ESC close, focus jumps to top of page after modal closes, multiple modals can be open simultaneously, focus gets "stuck" in closed modal.

### Pitfall 5: Loading Indicator Flashing
**What goes wrong:** Spinner appears and immediately disappears for fast operations, creating jarring flash that's more distracting than helpful.
**Why it happens:** Developers show spinner immediately for all async operations, including those that complete in <200ms.
**How to avoid:** (1) Add 200-300ms delay before showing spinner for expected-quick operations, (2) Use skeleton screens for content loading (no delay needed), (3) Show progress bar only for operations >10 seconds, (4) Consider optimistic UI for very fast operations.
**Warning signs:** User reports of "flickering" or "jumpy UI", perceived performance worse than actual performance, animations feel janky.

### Pitfall 6: Skeleton Screen Layout Shift
**What goes wrong:** Skeleton placeholders have different dimensions than actual content, causing visible layout shift when content loads.
**Why it happens:** Hardcoded skeleton dimensions don't match actual content, especially with responsive typography or dynamic content.
**How to avoid:** (1) Use react-loading-skeleton which auto-sizes to font metrics, (2) Match skeleton structure exactly to final content structure (same grid, same spacing), (3) Use same CSS classes for skeleton and content, (4) Test skeleton layouts at multiple viewport sizes.
**Warning signs:** Content "jumps" when loading completes, Cumulative Layout Shift (CLS) metric increases, users lose reading position when content loads.

### Pitfall 7: Optimistic UI for Destructive Actions
**What goes wrong:** UI optimistically shows "deleted" state, but deletion fails on server - now item is gone from UI but still exists. Confusing and data-inconsistent.
**Why it happens:** Developers apply optimistic UI pattern universally without considering action severity and rollback complexity.
**How to avoid:** ONLY use optimistic UI for: (1) lightweight actions (like, favorite, save), (2) actions where rollback is simple and obvious. NEVER use for: (1) destructive actions (delete, discard), (2) critical operations (payment, submission), (3) actions with complex side effects.
**Warning signs:** Users report "deleted items coming back", confusion when optimistic update fails, data consistency issues, support tickets about "ghost" items.

### Pitfall 8: Toast Distance from Action
**What goes wrong:** User performs action in main content area, toast appears in top-right corner. User doesn't notice feedback because it's far from their attention focus.
**Why it happens:** Top-right is industry standard for toasts, but it's 1000+ pixels from where user is looking. Motion in peripheral vision isn't always noticed.
**How to avoid:** (1) Prefer inline feedback when possible (green checkmark next to saved item), (2) For toasts, use animation that draws attention (slide + fade, not just fade), (3) For critical actions, use modal confirmation instead of toast, (4) Consider temporary inline banner for important messages.
**Warning signs:** Users perform action twice because they "didn't see confirmation", users ask "did that work?", analytics show actions immediately repeated.

## Code Examples

Verified patterns from official sources:

### Modal with Size Variants
```typescript
// Source: Radix UI Dialog + CONTEXT.md size system
import * as Dialog from '@radix-ui/react-dialog';
import { cva, type VariantProps } from 'class-variance-authority';

const modalStyles = cva('modal-content', {
  variants: {
    size: {
      small: 'modal-sm',    // Confirmations
      medium: 'modal-md',   // Forms
      large: 'modal-lg',    // Complex content
    },
  },
  defaultVariants: {
    size: 'medium',
  },
});

interface ModalProps extends VariantProps<typeof modalStyles> {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: React.ReactNode;
}

export function Modal({
  open,
  onOpenChange,
  title,
  description,
  size,
  children
}: ModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="modal-overlay" />
        <Dialog.Content
          className={modalStyles({ size })}
          // Prevent ESC key from closing if there's unsaved data
          onEscapeKeyDown={(e) => {
            // Custom logic can go here
            // By default, ESC closes (CONTEXT.md requirement)
          }}
        >
          <div className="modal-header">
            <Dialog.Title>{title}</Dialog.Title>
            <Dialog.Close asChild>
              <button
                className="modal-close-button"
                aria-label="Schließen"
              >
                ×
              </button>
            </Dialog.Close>
          </div>

          {description && (
            <Dialog.Description className="modal-description">
              {description}
            </Dialog.Description>
          )}

          <div className="modal-body">
            {children}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
```

### Toast with Severity-Based Timing
```typescript
// Source: Sonner documentation + CONTEXT.md timing specifications
import { toast } from 'sonner';

export const showToast = {
  success: (message: string, options?: { action?: { label: string; onClick: () => void } }) => {
    toast.success(message, {
      duration: 3000, // CONTEXT.md: 3s for success
      ...options,
    });
  },

  info: (message: string) => {
    toast.info(message, {
      duration: 4000, // CONTEXT.md: 4s for info
    });
  },

  warning: (message: string) => {
    toast.warning(message, {
      duration: 5000, // CONTEXT.md: 5s for warning
    });
  },

  error: (message: string, options?: { onRetry?: () => void }) => {
    toast.error(message, {
      duration: Infinity, // CONTEXT.md: errors stay until dismissed
      action: options?.onRetry ? {
        label: 'Erneut versuchen',
        onClick: options.onRetry,
      } : undefined,
    });
  },
};

// Usage examples
showToast.success('Änderungen gespeichert');

showToast.success('Element gelöscht', {
  action: {
    label: 'Rückgängig',
    onClick: () => undoDelete(),
  },
});

showToast.error('Verbindungsfehler', {
  onRetry: () => retryConnection(),
});
```

### Tooltip with Smart Positioning
```typescript
// Source: Radix UI Tooltip documentation + CONTEXT.md positioning requirements
import * as Tooltip from '@radix-ui/react-tooltip';

export function SmartTooltip({
  children,
  content,
  side = 'top' // CONTEXT.md: prefer top
}: {
  children: React.ReactElement;
  content: string;
  side?: 'top' | 'right' | 'bottom' | 'left';
}) {
  return (
    <Tooltip.Root delayDuration={300}> {/* CONTEXT.md: ~300ms delay */}
      <Tooltip.Trigger asChild>
        {children}
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content
          className="tooltip-content"
          side={side}
          sideOffset={5}
          collisionPadding={10} // CONTEXT.md: prevent cutoff at edges
          avoidCollisions={true}  // Smart positioning: flip if needed
          aria-live="polite"
        >
          {content}
          <Tooltip.Arrow className="tooltip-arrow" /> {/* CONTEXT.md: arrow indicator */}
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}

// Usage
<SmartTooltip content="Löschen">
  <button aria-label="Löschen">
    <TrashIcon />
  </button>
</SmartTooltip>
```

### Progress Bar - Determinate vs Indeterminate
```typescript
// Source: UX loading patterns research + HTML5 progress element
interface ProgressBarProps {
  value?: number; // If provided: determinate, if undefined: indeterminate
  max?: number;
  label?: string;
}

export function ProgressBar({ value, max = 100, label }: ProgressBarProps) {
  const isDeterminate = value !== undefined;

  return (
    <div className="progress-container">
      {label && (
        <label className="progress-label">
          {label}
          {isDeterminate && ` (${Math.round((value / max) * 100)}%)`}
        </label>
      )}
      <progress
        className={isDeterminate ? 'progress-determinate' : 'progress-indeterminate'}
        value={isDeterminate ? value : undefined}
        max={isDeterminate ? max : undefined}
        aria-label={label || 'Lädt...'}
      >
        {isDeterminate ? `${Math.round((value / max) * 100)}%` : 'Lädt...'}
      </progress>
    </div>
  );
}

// Usage
<ProgressBar value={uploadProgress} max={100} label="Datei wird hochgeladen" />
<ProgressBar label="Wird verarbeitet" /> {/* Indeterminate */}
```

### Skeleton Screen Patterns
```typescript
// Source: react-loading-skeleton documentation
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

// Card skeleton matching CONTEXT.md Phase 4 card structure
export function CardSkeleton() {
  return (
    <div className="card">
      <Skeleton height={180} /> {/* Image */}
      <div className="card-content">
        <Skeleton width="80%" height={24} /> {/* Title */}
        <Skeleton count={2} style={{ marginTop: 8 }} /> {/* Description */}
        <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
          <Skeleton width={60} height={32} /> {/* Button */}
          <Skeleton width={60} height={32} /> {/* Button */}
        </div>
      </div>
    </div>
  );
}

// Table skeleton matching CONTEXT.md Phase 4 table structure
export function TableSkeleton({ rows = 5, columns = 4 }) {
  return (
    <table className="table">
      <thead>
        <tr>
          {Array(columns).fill(0).map((_, i) => (
            <th key={i}>
              <Skeleton width="80%" />
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array(rows).fill(0).map((_, rowIndex) => (
          <tr key={rowIndex}>
            {Array(columns).fill(0).map((_, colIndex) => (
              <td key={colIndex}>
                <Skeleton />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// Custom theme to match design system tokens
export function AppSkeletonTheme({ children }) {
  return (
    <SkeletonTheme
      baseColor="var(--color-neutral-200)"
      highlightColor="var(--color-neutral-100)"
    >
      {children}
    </SkeletonTheme>
  );
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Manual focus traps with tabindex | Native `<dialog>` element or Radix primitives | 2024-2025 | Focus management now handled automatically, reducing bugs |
| Popper.js for positioning | Floating UI | 2022-2023 | Smaller bundle (3KB), platform-agnostic, modern API |
| Custom toast queues | Sonner or react-hot-toast | 2023-2024 | Simpler API, no setup hooks, better DX |
| Manual optimistic state | React's useOptimistic hook | React 18 (2024) | Standardized pattern, automatic rollback, less boilerplate |
| Hand-rolled skeleton screens | react-loading-skeleton | 2020-2021 | Auto-sizing eliminates layout shift issues |
| focus-trap-react library | Native dialog or Radix Dialog | 2024-2025 | Libraries now include focus management, no need for separate focus-trap |

**Deprecated/outdated:**
- **Popper.js v2**: Official site states "The future of Popper is here! Floating UI is now available." Migration recommended.
- **Manual focus trap implementations**: With native `<dialog>` (supported in all modern browsers as of 2023) and Radix primitives, manual focus trapping is no longer needed and introduces bugs.
- **react-modal library**: While still maintained, newer projects prefer Radix Dialog or native `<dialog>` for better accessibility and smaller bundle.
- **class-based modal state**: Function components with hooks (useState, useOptimistic) are now standard, class-based modal managers are outdated.

## Open Questions

Things that couldn't be fully resolved:

1. **Animation library recommendation**
   - What we know: CONTEXT.md leaves animation style to Claude's discretion. Common approaches are CSS transitions, Framer Motion, or CSS-in-JS solutions. Radix Dialog provides built-in animation hooks.
   - What's unclear: Which approach best matches Phase 1-4 patterns? Need to check existing animation patterns in prior phases.
   - Recommendation: Default to CSS transitions with `prefers-reduced-motion` support unless Phase 1-4 established different pattern. Fade + scale is most common for modals, slide + fade for toasts (Sonner default).

2. **Exact toast stacking limit**
   - What we know: CONTEXT.md specifies 3-4 visible toasts maximum, oldest dismissed first when limit reached. Sonner supports `visibleToasts` prop.
   - What's unclear: Should it be exactly 3, exactly 4, or dynamically based on viewport height?
   - Recommendation: Start with 4 (good balance), make configurable, test with real content at different viewport sizes.

3. **Skeleton screen loading delay**
   - What we know: Skeleton screens should appear quickly (no delay) since they don't cause jarring flash like spinners. Best practice is immediate show for skeleton, delayed show for spinners.
   - What's unclear: Is there ever a case where skeleton screen should be delayed (e.g., very fast loading)?
   - Recommendation: Show skeleton screens immediately, always. Only delay spinners (200-300ms). If loading is so fast skeleton would flash, use optimistic UI instead.

4. **Modal size breakpoints**
   - What we know: CONTEXT.md specifies small/medium/large sizes, should align with Phase 4 card/container sizes
   - What's unclear: Exact pixel/rem dimensions for each size, responsive behavior
   - Recommendation: Check Phase 4 documentation for established container sizes. Common pattern: small=400px, medium=600px, large=900px, with responsive scaling below 768px breakpoint.

5. **Error message tone/wording guidelines**
   - What we know: CONTEXT.md specifies errors should be "friendly and helpful in German (like form validation from Phase 3)"
   - What's unclear: Specific tone guidelines, error message templates
   - Recommendation: Review Phase 3 form validation patterns for established error message style. Generally: avoid technical jargon, explain what happened and how to fix it, use "Sie" form in German.

## Sources

### Primary (HIGH confidence)
- Radix UI Primitives Releases - https://www.radix-ui.com/primitives/docs/overview/releases (verified active maintenance, May 2025 latest release)
- Radix UI Dialog Documentation - https://www.radix-ui.com/primitives/docs/components/dialog
- Radix UI Tooltip Documentation - https://www.radix-ui.com/primitives/docs/components/tooltip
- W3C WAI-ARIA Dialog Pattern - https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/
- W3C WAI-ARIA Tooltip Pattern - https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/
- W3C WCAG 1.4.13 (Content on Hover or Focus) - https://www.w3.org/WAI/WCAG21/Understanding/content-on-hover-or-focus.html
- React useOptimistic Hook - https://react.dev/reference/react/useOptimistic
- React createPortal - https://react.dev/reference/react-dom/createPortal
- GitHub: Radix UI Primitives - https://github.com/radix-ui/primitives (626 open issues, 129 PRs, 18.5K stars, maintained by @workos)
- GitHub: Sonner - https://github.com/emilkowalski/sonner
- Floating UI Official Documentation - https://floating-ui.com/

### Secondary (MEDIUM confidence)
- LogRocket: Popper vs. Floating UI (2025) - https://blog.logrocket.com/popper-vs-floating-ui/
- LogRocket: React Toast Libraries Compared (2025) - https://blog.logrocket.com/react-toast-libraries-compared-2025/
- LogRocket: Understanding Optimistic UI (2025) - https://blog.logrocket.com/understanding-optimistic-ui-react-useoptimistic-hook/
- Knock: Top 9 React Notification Libraries (2026) - https://knock.app/blog/the-top-notification-libraries-for-react
- Smashing Magazine: Implementing Skeleton Screens in React (2020, still relevant) - https://www.smashingmagazine.com/2020/04/skeleton-screens-react/
- UXPin: How to Build Accessible Modals with Focus Traps - https://www.uxpin.com/studio/blog/how-to-build-accessible-modals-with-focus-traps/
- LogRocket: Toast Notifications Best Practices - https://blog.logrocket.com/ux-design/toast-notifications/
- Sarah Higley: Tooltips in the time of WCAG 2.1 - https://sarahmhigley.com/writing/tooltips-in-wcag-21/
- Frontend Masters: Animating the Dialog Element - https://frontendmasters.com/blog/animating-dialog/
- UserGuiding: Progress Trackers and Indicators (2026) - https://userguiding.com/blog/progress-trackers-and-indicators

### Tertiary (LOW confidence - community discussions)
- DEV Community: Replacing Toasts with Accessible User Feedback Patterns - https://dev.to/miasalazar/replacing-toasts-with-accessible-user-feedback-patterns-1p8l
- Medium: Toasts are Bad UX - https://maxschmitt.me/posts/toasts-bad-ux (opinion piece, but raises valid accessibility concerns)
- Subframe: Headless UI vs Radix (2025) - https://www.subframe.com/tips/headless-ui-vs-radix

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - All libraries verified via npm, GitHub, and official docs. Version numbers confirmed, maintenance status verified (Radix UI actively maintained contrary to some outdated community claims).
- Architecture: HIGH - Patterns based on official documentation (Radix UI, React, W3C WAI-ARIA) and verified community best practices from 2025-2026.
- Pitfalls: HIGH - Based on W3C WCAG requirements, official accessibility guidance, and multiple consistent sources. Specific pitfalls (modal state sync, toast timing, tooltip WCAG 1.4.13) verified across multiple authoritative sources.
- Code examples: HIGH - All examples sourced from official documentation (Radix UI, React, Sonner) or verified patterns from established sources.

**Research date:** 2026-01-29
**Valid until:** 2026-02-28 (30 days) - This is a stable domain. React 19 release could affect useOptimistic hook API, but current patterns are well-established. Radix UI release cadence suggests no breaking changes imminent.
