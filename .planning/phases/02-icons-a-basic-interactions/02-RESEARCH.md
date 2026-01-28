# Phase 2: Icons & Basic Interactions - Research

**Researched:** 2026-01-28
**Domain:** Icon systems and button component patterns for design systems
**Confidence:** HIGH

## Summary

Icon systems and button components form the interaction foundation of modern design systems. Based on current research (2025-2026), the industry standard for professional B2B design systems involves:

**Icon approach:** Hybrid strategy combining an established open-source library (2px stroke weight, MIT/ISC license) for common UI patterns with custom-designed product-specific icons. The three leading contenders are Lucide (1,668 icons, 2px default), Tabler Icons (6,000+ icons, 2px fixed), and Phosphor Icons (1,248 icons, 6 weight variants including regular ~2px). For Hydrophon's 2px requirement with modern styling, **Lucide or Tabler** are optimal choices, with Lucide offering better React/Vue integration and Tabler providing the largest 2px-consistent collection.

**Button implementation:** Component token architecture referencing semantic tokens from Phase 1, with variant composition covering size × style × state dimensions. Modern implementations use CSS custom properties with multi-tier token abstraction. WCAG 2.2 compliance (relevant for 2026) requires 3:1 contrast for focus indicators with minimum 2px perimeter equivalent, 24×24px minimum touch targets (though 44-48px recommended), and disabled states are exempt from contrast requirements.

**Primary recommendation:** Use **Lucide Icons** (ISC license, 1,668 icons, excellent framework support, 2px customizable stroke) as the base library + custom SVG icons for product-specific symbols. Implement icons as inline SVG with `currentColor` for theming. Structure buttons with three-tier design tokens (primitive → semantic → component) using CSS custom properties, with clear variant naming following `{component}-{variant}-{property}-{state}` pattern.

## Standard Stack

The established libraries/tools for this domain:

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Lucide | 0.468+ | Base icon library (UI patterns) | Community-maintained fork of Feather with 1,668 icons, 2px stroke customizable, ISC license, excellent React/Vue/Svelte support, active maintenance |
| Tabler Icons | 3.31+ | Alternative icon library | 6,000+ icons with consistent 2px stroke, MIT license, extensive coverage, good for comprehensive needs |
| Phosphor Icons | 2.1+ | Alternative (multi-weight) | 1,248 icons with 6 weight variants, MIT license, good if weight flexibility needed beyond 2px |
| SVGO | 3.3+ | SVG optimization | Industry standard for cleaning SVG exports from Figma, reduces file size, removes unnecessary metadata |
| Style Dictionary | 4.0+ | Design token transformation | Already established in Phase 1, supports icon sizing tokens and component token generation |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| svgr | 8.1+ | React component generation | If converting SVGs to React components (alternative to inline SVG) |
| lucide-react | 0.468+ | React bindings for Lucide | When using Lucide with React framework |
| @tabler/icons-react | 3.31+ | React bindings for Tabler | When using Tabler with React framework |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Lucide | Heroicons | Only 316 icons, 1.5px stroke (not 2px), but great Tailwind integration |
| Lucide | Feather Icons | Original library (287 icons), but unmaintained with 300+ open issues |
| Inline SVG | SVG Sprites | Sprites better for SPAs with many repeated icons, but inline simpler for small sets |
| Inline SVG | React components (svgr) | Components offer better TypeScript support but increase bundle size |

**Installation:**
```bash
# Lucide approach (recommended)
npm install lucide-react

# Tabler approach (alternative)
npm install @tabler/icons-react

# SVG optimization
npm install -D svgo
```

## Architecture Patterns

### Recommended Project Structure
```
src/
├── tokens/
│   ├── icons/               # Icon sizing and spacing tokens
│   │   └── sizes.json      # 16px, 20px, 24px, 32px
│   └── components/
│       └── button.json     # Component-specific tokens
├── components/
│   ├── Button/
│   │   ├── Button.tsx      # Main component
│   │   ├── Button.module.css
│   │   └── Button.stories.tsx
│   └── Icon/
│       ├── Icon.tsx        # Wrapper component
│       └── Icon.module.css
├── icons/
│   ├── custom/             # Product-specific custom icons
│   │   ├── drain-system.svg
│   │   ├── plumbing-fixture.svg
│   │   └── certification-mark.svg
│   └── index.ts            # Icon exports
└── styles/
    └── tokens.css          # Generated from Style Dictionary
```

### Pattern 1: Icon System with currentColor
**What:** SVG icons that inherit text color from parent elements using CSS `currentColor` keyword
**When to use:** All icon implementations for maximum theming flexibility
**Example:**
```tsx
// Source: https://mayashavin.com/articles/svg-icons-currentcolor
// Component wrapper
export const Icon = ({ name, size = 24, className }) => {
  return (
    <svg
      width={size}
      height={size}
      className={className}
      fill="currentColor"
      stroke="currentColor"
    >
      <use href={`#icon-${name}`} />
    </svg>
  );
};

// Usage with color inheritance
<button className="text-blue-600">
  <Icon name="search" size={20} />
  Search
</button>
```

### Pattern 2: Three-Tier Button Token Architecture
**What:** Component tokens reference semantic tokens, which reference primitive tokens
**When to use:** All button implementations to ensure consistency and maintainability
**Example:**
```json
// Source: https://medium.com/eightshapes-llc/naming-tokens-in-design-systems-9e86c7444676
// tokens/components/button.json
{
  "button": {
    "primary": {
      "background": {
        "default": { "value": "{color.action.primary}" },
        "hover": { "value": "{color.action.primary-hover}" },
        "active": { "value": "{color.action.primary-pressed}" },
        "disabled": { "value": "{color.neutral.300}" }
      },
      "foreground": {
        "default": { "value": "{color.text.on-primary}" },
        "disabled": { "value": "{color.text.disabled}" }
      },
      "border": {
        "default": { "value": "transparent" },
        "focus": { "value": "{color.action.primary}" }
      }
    },
    "secondary": {
      "background": {
        "default": { "value": "transparent" },
        "hover": { "value": "{color.neutral.50}" },
        "active": { "value": "{color.neutral.100}" }
      },
      "foreground": {
        "default": { "value": "{color.action.primary}" }
      },
      "border": {
        "default": { "value": "{color.action.primary}" },
        "hover": { "value": "{color.action.primary-hover}" }
      }
    },
    "size": {
      "small": {
        "padding-x": { "value": "{spacing.3}" },
        "padding-y": { "value": "{spacing.2}" },
        "font-size": { "value": "{font.size.sm}" },
        "min-height": { "value": "32px" }
      },
      "medium": {
        "padding-x": { "value": "{spacing.4}" },
        "padding-y": { "value": "{spacing.2.5}" },
        "font-size": { "value": "{font.size.base}" },
        "min-height": { "value": "40px" }
      },
      "large": {
        "padding-x": { "value": "{spacing.6}" },
        "padding-y": { "value": "{spacing.3}" },
        "font-size": { "value": "{font.size.lg}" },
        "min-height": { "value": "48px" }
      }
    }
  }
}
```

### Pattern 3: Accessible Icon Labeling
**What:** Proper ARIA attributes for decorative vs functional icons
**When to use:** Always - every icon implementation must be categorized
**Example:**
```tsx
// Source: https://gomakethings.com/icon-accessibility-and-aria-label/
// Decorative icon (accompanies text)
<button>
  <Icon name="search" aria-hidden="true" />
  Search
</button>

// Functional icon (standalone)
<button aria-label="Search">
  <Icon name="search" role="img" aria-label="Search" />
</button>

// Informative icon (conveys status)
<div>
  <Icon
    name="check-circle"
    role="img"
    aria-label="Success"
  />
  <span>Profile updated successfully</span>
</div>
```

### Pattern 4: Button Variant Composition
**What:** CSS classes combining size, style, and state variants
**When to use:** All button implementations to support design system flexibility
**Example:**
```css
/* Source: https://design.va.gov/foundation/design-tokens */
.button {
  /* Base styles */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-2);
  border-radius: var(--border-radius-md);
  font-family: var(--font-family-base);
  font-weight: var(--font-weight-medium);
  transition: all 150ms ease-in-out;
  cursor: pointer;
  border: 2px solid transparent;

  /* Focus indicators (WCAG 2.2 compliant) */
  &:focus-visible {
    outline: 2px solid var(--button-border-focus);
    outline-offset: 2px;
  }
}

/* Size variants */
.button--small {
  padding: var(--button-size-small-padding-y) var(--button-size-small-padding-x);
  font-size: var(--button-size-small-font-size);
  min-height: var(--button-size-small-min-height);
}

.button--medium {
  padding: var(--button-size-medium-padding-y) var(--button-size-medium-padding-x);
  font-size: var(--button-size-medium-font-size);
  min-height: var(--button-size-medium-min-height);
}

.button--large {
  padding: var(--button-size-large-padding-y) var(--button-size-large-padding-x);
  font-size: var(--button-size-large-font-size);
  min-height: var(--button-size-large-min-height);
}

/* Style variants */
.button--primary {
  background: var(--button-primary-background-default);
  color: var(--button-primary-foreground-default);

  &:hover:not(:disabled) {
    background: var(--button-primary-background-hover);
  }

  &:active:not(:disabled) {
    background: var(--button-primary-background-active);
  }

  &:disabled {
    background: var(--button-primary-background-disabled);
    color: var(--button-primary-foreground-disabled);
    cursor: not-allowed;
  }
}

.button--secondary {
  background: var(--button-secondary-background-default);
  color: var(--button-secondary-foreground-default);
  border-color: var(--button-secondary-border-default);

  &:hover:not(:disabled) {
    background: var(--button-secondary-background-hover);
    border-color: var(--button-secondary-border-hover);
  }

  &:active:not(:disabled) {
    background: var(--button-secondary-background-active);
  }
}
```

### Pattern 5: Icon Button Sizing
**What:** Icon-only buttons with appropriate touch targets
**When to use:** Toolbars, compact UIs, mobile interfaces
**Example:**
```tsx
// Source: https://www.smashingmagazine.com/2023/04/accessible-tap-target-sizes-rage-taps-clicks/
// Icon button with WCAG-compliant touch target (44x44px recommended)
export const IconButton = ({
  icon,
  label,
  size = 'medium'
}) => {
  const dimensions = {
    small: { wrapper: 32, icon: 16 },
    medium: { wrapper: 44, icon: 20 },
    large: { wrapper: 48, icon: 24 }
  };

  return (
    <button
      className="icon-button"
      aria-label={label}
      style={{
        width: `${dimensions[size].wrapper}px`,
        height: `${dimensions[size].wrapper}px`,
      }}
    >
      <Icon
        name={icon}
        size={dimensions[size].icon}
        aria-hidden="true"
      />
    </button>
  );
};

// Usage
<IconButton icon="menu" label="Open menu" size="medium" />
```

### Anti-Patterns to Avoid
- **Text in icons:** Prevents localization, reduces scalability, creates maintenance burden
- **Inconsistent sizing:** Don't use arbitrary icon sizes (17px, 22px) - stick to scale (16, 20, 24, 32)
- **Direct token references in components:** Don't use `color: #008BD2` - always reference semantic tokens
- **Missing focus indicators:** Browser defaults are often insufficient - always define custom focus styles
- **Overly complex icons:** Icons with too many details become unrecognizable at small sizes (16-20px)
- **Scale transforms on button press:** Creates jarring animation, doesn't work well with text labels
- **Fixed SVG dimensions:** Hard-coded width/height prevents responsive scaling

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Icon library for common UI | Custom icon set for navigation/actions | Lucide/Tabler/Heroicons | Already optimized, tested at multiple sizes, maintained by community, covers 95% of UI needs |
| SVG optimization | Manual cleanup of Figma exports | SVGO | Removes Figma metadata, optimizes paths, handles viewBox normalization, catches fill-rule issues |
| Design token transformation | Custom build scripts | Style Dictionary | Handles multiple output formats (CSS, JS, iOS, Android), supports token aliasing, active ecosystem |
| Focus indicator styles | Custom outline per component | `:focus-visible` + CSS custom properties | Better keyboard vs mouse detection, consistent browser behavior, easier maintenance |
| Icon color theming | Manual color props | `currentColor` CSS keyword | Automatic color inheritance, works with all themes, reduces prop drilling |
| Button state management | Custom state hooks | Native CSS pseudo-classes | More performant, accessible by default, no JS overhead |

**Key insight:** Icon systems and button components are well-established patterns with mature tooling. The complexity lies in consistency (maintaining visual coherence across 30+ icons) and accessibility (proper ARIA, focus indicators, touch targets), not in technical implementation. Use proven libraries and let them handle edge cases (RTL support, browser quirks, SVG rendering issues).

## Common Pitfalls

### Pitfall 1: Inconsistent Icon Visual Style
**What goes wrong:** Custom icons don't match library icons in stroke weight, corner radius, or grid alignment, creating visual inconsistency
**Why it happens:** Designers create custom icons without referencing library specifications, or export settings in Figma differ from library standards
**How to avoid:**
- Document exact specifications from chosen library (2px stroke, 24×24 grid, rounded/square corners)
- Create Figma template matching library style
- Use SVGO with consistent settings for all exports
- Review custom icons side-by-side with library icons before approval
**Warning signs:** Icons look "off" when placed together, varying visual weights, inconsistent spacing from edges

### Pitfall 2: Accessibility ARIA Misuse
**What goes wrong:** Icons have redundant labels (button text + icon aria-label), or functional icons hidden from screen readers
**Why it happens:** Confusion about when to use `aria-hidden="true"` vs `aria-label`, applying ARIA to every icon by default
**How to avoid:**
- Rule: If icon accompanies text → `aria-hidden="true"`
- Rule: If icon is standalone/functional → `aria-label` on interactive element (not icon itself)
- Rule: Never put `aria-hidden` on focusable elements
- Test with screen reader (NVDA/JAWS/VoiceOver)
**Warning signs:** Screen reader announces "search button search" (redundant), icon buttons with no label, decorative icons being read aloud

### Pitfall 3: Insufficient Focus Indicators
**What goes wrong:** Focus indicators don't meet WCAG 2.2 requirements (2px equivalent perimeter, 3:1 contrast), or removed entirely for "cleaner" design
**Why it happens:** Designers prioritize aesthetics over accessibility, or unaware of WCAG 2.2 Focus Appearance (2.4.13) requirements
**How to avoid:**
- Always define `:focus-visible` styles (not just `:focus`)
- Minimum 2px outline or equivalent area (WCAG 2.2)
- Ensure 3:1 contrast between focused/unfocused states
- Use `outline-offset: 2px` for better visibility
- Never use `outline: none` without replacement
**Warning signs:** No visible focus indicator, thin 1px outline, insufficient contrast on secondary buttons

### Pitfall 4: Incorrect Touch Target Sizing
**What goes wrong:** Button touch targets below 44×44px on mobile, icon buttons too small, overlapping targets
**Why it happens:** Using WCAG 2.1 minimum (no specific size) instead of 2.2 (24px minimum) or platform guidelines (44-48px)
**How to avoid:**
- Small buttons: 32px (desktop only, with spacing exceptions)
- Medium buttons: 40-44px (default, works everywhere)
- Large buttons: 48px+ (CTAs, mobile-first)
- Icon-only buttons: Minimum 44×44px even if icon is 20px
- Ensure 24px spacing between targets or overlap exceptions
**Warning signs:** Mis-taps on mobile, adjacent buttons accidentally triggered, user frustration with small controls

### Pitfall 5: Token Architecture Anti-Patterns
**What goes wrong:** Components reference primitive tokens directly (`color: #008BD2`), or semantic tokens aren't semantic (`color-blue-600` instead of `color-action-primary`)
**Why it happens:** Skipping token abstraction layers for faster initial implementation, not understanding token hierarchy
**How to avoid:**
- Three layers: Primitives → Semantic → Component
- Primitives: Never referenced directly in components
- Semantic: Based on purpose (`color-action-primary`, not `color-blue-600`)
- Component: References semantic tokens (`button-primary-bg: {color-action-primary}`)
- Use Style Dictionary's token aliasing
**Warning signs:** Hard to change brand color (touches 50+ files), can't support theming, "magic numbers" in component CSS

### Pitfall 6: SVG Export Issues from Figma
**What goes wrong:** Exported SVGs have bloated code, incorrect fill-rule (even-odd vs nonzero), missing viewBox, or outlined strokes become filled paths
**Why it happens:** Figma's default SVG export includes unnecessary metadata and uses even-odd fill rule consistently
**How to avoid:**
- Always outline strokes before export (Figma: Ctrl/Cmd + Shift + O)
- Export frames, not individual paths
- Run SVGO on all exports with config:
  ```json
  {
    "plugins": [
      "removeDoctype",
      "removeXMLProcInst",
      "removeComments",
      "removeMetadata",
      "removeEditorsNSData",
      "cleanupAttrs",
      "minifyStyles",
      "convertStyleToAttrs"
    ]
  }
  ```
- Verify viewBox is `0 0 24 24` for 24×24 grid
- Use currentColor for fill/stroke instead of hard-coded colors
**Warning signs:** Icons render differently in browser than Figma, large file sizes (>2KB for simple icons), rendering artifacts

### Pitfall 7: Button State Combinations Not Documented
**What goes wrong:** Designers create primary/secondary/tertiary × small/medium/large but forget disabled+small, loading states, or icon+text combinations
**Why it happens:** Exponential combinations (3 styles × 3 sizes × 4 states × 3 content types = 108 variations), documentation incomplete
**How to avoid:**
- Use variant composition in Figma (Boolean properties)
- Document decision matrix:
  - Styles: Primary, Secondary, Tertiary (optional)
  - Sizes: Small, Medium, Large
  - States: Default, Hover, Active, Focus, Disabled
  - Content: Text-only, Icon+Text, Icon-only
- Generate combinations programmatically in Storybook
- Don't manually create every permutation - use CSS variant classes
**Warning signs:** "How do I make a small disabled secondary button?", missing Storybook examples, inconsistent implementation

## Code Examples

Verified patterns from official sources:

### Custom Icon Component with Lucide Integration
```tsx
// Source: https://lucide.dev/guide/packages/lucide-react
import { Search, Menu, X, ChevronDown } from 'lucide-react';

interface IconProps {
  name: string;
  size?: number;
  className?: string;
  'aria-hidden'?: boolean;
}

export const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  className = '',
  ...ariaProps
}) => {
  // Map custom product icons
  const customIcons = {
    'drain-system': DrainSystemIcon,
    'plumbing-fixture': PlumbingFixtureIcon,
  };

  // Map Lucide icons
  const lucideIcons = {
    search: Search,
    menu: Menu,
    close: X,
    'chevron-down': ChevronDown,
  };

  const IconComponent = customIcons[name] || lucideIcons[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return (
    <IconComponent
      size={size}
      className={className}
      {...ariaProps}
    />
  );
};

// Usage
<Icon name="search" size={20} aria-hidden="true" />
```

### Button Component with Design Tokens
```tsx
// Source: https://penpot.app/blog/the-developers-guide-to-design-tokens-and-css-variables/
import React from 'react';
import styles from './Button.module.css';
import { Icon } from '../Icon';

type ButtonVariant = 'primary' | 'secondary' | 'tertiary';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: string;
  iconPosition?: 'left' | 'right';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  icon,
  iconPosition = 'left',
  children,
  disabled,
  className = '',
  ...props
}) => {
  const classNames = [
    styles.button,
    styles[`button--${variant}`],
    styles[`button--${size}`],
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      className={classNames}
      disabled={disabled}
      {...props}
    >
      {icon && iconPosition === 'left' && (
        <Icon name={icon} size={size === 'small' ? 16 : 20} aria-hidden="true" />
      )}
      <span>{children}</span>
      {icon && iconPosition === 'right' && (
        <Icon name={icon} size={size === 'small' ? 16 : 20} aria-hidden="true" />
      )}
    </button>
  );
};

// Usage
<Button variant="primary" size="medium" icon="search">
  Search
</Button>
```

### WCAG 2.2 Compliant Focus Styles
```css
/* Source: https://www.sarasoueidan.com/blog/focus-indicators/ */
.button {
  /* Remove default outline */
  outline: none;

  /* Add custom focus indicator that meets WCAG 2.2 */
  &:focus-visible {
    /* 2px outline meets "2 CSS pixel thick perimeter" requirement */
    outline: 2px solid var(--button-border-focus);
    outline-offset: 2px;

    /* Alternative: box-shadow approach */
    box-shadow: 0 0 0 2px var(--color-background),
                0 0 0 4px var(--button-border-focus);
  }

  /* Ensure 3:1 contrast between focused and unfocused states */
  /* This is measured between the same pixels in both states */
  &:not(:focus-visible) {
    box-shadow: none;
  }
}

/* For dark backgrounds, ensure focus indicator is visible */
.dark .button:focus-visible {
  outline-color: var(--color-focus-dark);
}
```

### Icon Sizing Token System
```json
// Source: https://styledictionary.com/info/tokens/
// tokens/icons/sizes.json
{
  "icon": {
    "size": {
      "xs": {
        "value": "16px",
        "comment": "Minimum readable size, use in compact UIs"
      },
      "sm": {
        "value": "20px",
        "comment": "Default for inline icons with text"
      },
      "md": {
        "value": "24px",
        "comment": "Default standalone icons, base grid size"
      },
      "lg": {
        "value": "32px",
        "comment": "Larger emphasis, hero sections"
      },
      "xl": {
        "value": "48px",
        "comment": "Maximum size for decorative use"
      }
    },
    "spacing": {
      "with-text": {
        "value": "{spacing.2}",
        "comment": "Gap between icon and adjacent text (8px)"
      }
    }
  }
}
```

### Accessible Icon Patterns
```tsx
// Source: https://fontawesome.com/docs/web/dig-deeper/accessibility
// Pattern 1: Decorative icon with text
<button>
  <Icon name="download" aria-hidden="true" />
  Download Report
</button>

// Pattern 2: Icon-only button (functional)
<button aria-label="Close dialog">
  <Icon name="x" aria-hidden="true" />
</button>

// Pattern 3: Informative icon (status indicator)
<div className="alert">
  <Icon
    name="alert-circle"
    role="img"
    aria-label="Warning"
  />
  <span>Your session will expire soon</span>
</div>

// Pattern 4: Icon link with visible text
<a href="/settings">
  <Icon name="settings" aria-hidden="true" />
  Settings
</a>

// Pattern 5: Icon link without visible text
<a href="/settings" aria-label="Settings">
  <Icon name="settings" aria-hidden="true" />
</a>
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Icon fonts (FontAwesome, Material Icons) | SVG-based libraries (Lucide, Tabler) | ~2020-2022 | Better scaling, styling flexibility, no FOUT, easier customization with currentColor |
| Individual SVG imports | Tree-shakeable icon libraries | 2022-2024 | Smaller bundle sizes, only import used icons, better build optimization |
| Fixed color icons | currentColor inheritance | 2019-2021 | Automatic theming, reduced CSS, color syncs with text color |
| Separate icon sizes per variant | Responsive sizing via props | 2020-2023 | Single component handles all sizes, consistent API |
| Manual ARIA labeling | Semantic HTML + conditional ARIA | 2021-2024 | Less verbose, screen reader friendly, fewer errors |
| WCAG 2.1 (no specific focus size) | WCAG 2.2 Focus Appearance (2px minimum) | October 2023 | Clearer focus indicator requirements, measurable compliance |
| WCAG 2.1 (AAA 44px touch targets) | WCAG 2.2 Target Size Minimum (24px AA) | October 2023 | AA level now has specific size requirement, 44-48px still best practice |
| Two-tier tokens (primitive → component) | Three-tier tokens (primitive → semantic → component) | 2023-2025 | Better theming support, clearer intent, easier maintenance |
| Hard-coded button variants | Variant composition with CSS custom properties | 2024-2026 | Exponential combinations handled programmatically, smaller CSS |
| Design tokens as Sass variables | CSS custom properties + W3C Design Tokens spec | 2025+ | Runtime theming, better browser support, standardized format |

**Deprecated/outdated:**
- **Icon fonts:** Still functional but SVG preferred for accessibility, performance, and styling
- **Feather Icons:** Unmaintained (300+ open issues) - use Lucide (community fork) instead
- **Heroicons v1 (2px stroke):** v2 uses 1.5px stroke - if you need 2px, stay on v1 or use Lucide/Tabler
- **Manual SVG sprite generation:** Build tools (Vite, webpack) now have plugins for automatic sprite generation
- **Separate hover/focus/active styles per component:** Use CSS custom properties for state variations
- **`outline: none` without replacement:** Now fails WCAG 2.2 Focus Appearance criterion

## Open Questions

Things that couldn't be fully resolved:

1. **Product-Specific Icon Scope**
   - What we know: Need custom icons for plumbing fixtures, drain systems, certifications, technical features
   - What's unclear: Exact number and categories without seeing product documentation or existing marketing materials
   - Recommendation: Start with 5-10 most critical product icons (based on homepage, key features), expand based on usage analytics. Good candidates: drain types (linear, point), installation contexts (floor, wall), certifications (DIN, CE), key technical features (anti-odor, height-adjustable)

2. **Tertiary/Ghost Button Necessity**
   - What we know: Primary (filled) and secondary (outline) are decided, tertiary/ghost is "Claude's discretion"
   - What's unclear: Whether B2B Handwerker/Installateure audience needs ultra-low-emphasis actions (typically: cancel, dismiss, less-important nav)
   - Recommendation: Implement tertiary variant (text-only, minimal styling) if you have: cancel/dismiss patterns, multi-step forms with "back" actions, or settings/preferences with many options. Skip if primary actions dominate UI (product catalogs, checkout flows)

3. **Icon Stroke Cap Style**
   - What we know: Lucide and Tabler both support rounded caps, Heroicons uses rounded by default
   - What's unclear: Whether Hydrophon Blau brand leans more "technical/precise" (square caps) or "modern/friendly" (rounded caps)
   - Recommendation: Use **rounded caps (border-radius: 2px)** - aligns with modern B2B (not traditional industrial), matches Inter font's humanist curves, consistent with 2px stroke weight standard. Lucide default is rounded, easy to implement.

4. **German Documentation Tooling**
   - What we know: German documentation required, Storybook supports i18n
   - What's unclear: Whether to maintain parallel docs (DE/EN) or German-only, and if MDX content should be in German
   - Recommendation: Start with **German-only** MDX docs (primary audience is Handwerker, Installateure), use English for code comments and prop names (industry standard). Consider adding English docs later if international expansion planned. Use Storybook's `locale` addon for component examples with German labels.

## Sources

### Primary (HIGH confidence)
- [Lucide Icons Official Documentation](https://lucide.dev) - Icon specifications, React integration, stroke customization
- [Lucide Comparison Guide](https://lucide.dev/guide/comparison) - Verified library differences (1,668 icons, ISC license)
- [W3C WCAG 2.2 Understanding SC 2.4.13: Focus Appearance](https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance.html) - Official focus indicator requirements (2px perimeter, 3:1 contrast)
- [W3C WCAG 2.1 Understanding SC 1.4.11: Non-text Contrast](https://www.w3.org/WAI/WCAG21/Understanding/non-text-contrast.html) - UI component contrast requirements, disabled state exemption
- [Phosphor Icons GitHub](https://github.com/phosphor-icons/homepage) - Verified 1,248 icons, MIT license, 6 weight variants
- [Heroicons Official Site](https://heroicons.com) - 316 icons, 1.5px stroke, MIT license, React/Vue packages
- [Style Dictionary Official Docs](https://styledictionary.com/info/tokens/) - Design token transformation, token aliasing

### Secondary (MEDIUM confidence)
- [A complete guide to iconography](https://www.designsystems.com/iconography-guide/) - Icon system architecture and best practices
- [Sara Soueidan: A guide to designing accessible, WCAG-conformant focus indicators](https://www.sarasoueidan.com/blog/focus-indicators/) - Focus indicator implementation patterns
- [Maya Shavin: Color for SVG icons with currentColor](https://mayashavin.com/articles/svg-icons-currentcolor) - currentColor pattern for icon theming
- [Smashing Magazine: Iconography In Design Systems](https://www.smashingmagazine.com/2024/04/iconography-design-systems-troubleshooting-maintenance/) - Common pitfalls and maintenance
- [Cloud Four: Which SVG technique performs best?](https://cloudfour.com/thinks/svg-icon-stress-test/) - Performance comparison (inline vs sprite)
- [Nathan Curtis: Naming Tokens in Design Systems](https://medium.com/eightshapes-llc/naming-tokens-in-design-systems-9e86c7444676) - Token naming conventions and hierarchy
- [Penpot Blog: Design tokens and CSS variables](https://penpot.app/blog/the-developers-guide-to-design-tokens-and-css-variables/) - Three-tier token architecture
- [Font Awesome Docs: Accessibility](https://fontawesome.com/docs/web/dig-deeper/accessibility) - Icon ARIA patterns
- [MDN: aria-hidden attribute](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-hidden) - When to hide icons from screen readers
- [Smashing Magazine: Accessible Tap Target Sizes](https://www.smashingmagazine.com/2023/04/accessible-tap-target-sizes-rage-taps-clicks/) - Touch target research and guidelines

### Tertiary (LOW confidence - WebSearch only)
- [Best React Icon Libraries for 2026](https://mighil.com/best-react-icon-libraries) - Overview of options
- [25+ Best Open Source Icon Libraries in 2026](https://hugeicons.com/blog/development/best-open-source-icon-libraries) - Comparative analysis
- [Untitled UI Icons](https://www.untitledui.com/icons) - 4,600+ icons, 2px stroke reference
- [Top Storybook Documentation Examples](https://www.supernova.io/blog/top-storybook-documentation-examples-and-the-lessons-you-can-learn) - Documentation patterns
- [Design System Naming Conventions](https://www.smashingmagazine.com/2024/05/naming-best-practices/) - Naming patterns for icons and tokens
- [Multilingual Design System Best Practices](https://www.weglot.com/guides/multi-language-website) - Localization considerations

## Metadata

**Confidence breakdown:**
- Icon library selection: **HIGH** - Multiple official sources verified (Lucide, Tabler, Phosphor docs)
- SVG implementation patterns: **HIGH** - W3C specs, established browser APIs (currentColor)
- Button component architecture: **HIGH** - Token hierarchy verified in multiple design systems
- WCAG 2.2 accessibility: **HIGH** - Official W3C documentation, verified requirements
- Custom icon workflow: **MEDIUM** - Best practices from community sources, needs tool-specific verification
- Documentation approaches: **MEDIUM** - Examples from major design systems, German-specific needs partially addressed

**Research date:** 2026-01-28
**Valid until:** ~2026-02-28 (30 days - design system patterns are relatively stable, but verify for major library updates)

**Notes:**
- WCAG 2.2 is the current standard (October 2023) and will be increasingly enforced in 2026
- W3C Design Tokens specification reached v1.0 in October 2025, stable for implementation
- Icon library ecosystem is mature and stable - major changes unlikely in next 6-12 months
- Focus on Lucide or Tabler for 2px stroke requirement - Heroicons v2 is 1.5px
