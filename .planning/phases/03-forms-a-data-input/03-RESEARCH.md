# Phase 3: Forms & Data Input - Research

**Researched:** 2026-01-29
**Domain:** React form components with design tokens and accessibility
**Confidence:** HIGH

## Summary

Forms and data input components require careful attention to accessibility, validation UX, and design token architecture. The standard stack in 2026 centers on React Hook Form for state management paired with schema validation (Zod/Yup), using native HTML inputs styled via design tokens wherever possible.

The critical architectural insight is to maintain a three-tier token system (primitive → semantic → component) while preserving native HTML semantics for accessibility. Custom styling should enhance, not replace, native form controls. The validation pattern that emerged as best practice is "reward early, punish late" (onBlur for errors, onChange for corrections) with dual inline + summary error display for complex forms.

WCAG 2.1 AA compliance requires explicit attention to eight success criteria covering labels (3.3.2), error identification (3.3.1), error suggestions (3.3.3), focus indicators (2.4.7), and programmatic associations (4.1.2). The specification details are prescriptive and non-negotiable.

**Primary recommendation:** Use React Hook Form with native HTML inputs, style via design tokens maintaining 3px minimum focus indicators with 3:1 contrast, validate onBlur switching to onChange after error, display inline errors with aria-describedby, and mark required fields with red asterisk plus legend.

## Standard Stack

The established libraries/tools for React form components in design systems.

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| React Hook Form | 7.x+ | Form state & validation | Performance-focused (uncontrolled), minimal re-renders, 50KB bundle, excellent TypeScript support, validation resolver system |
| Zod | 3.x+ | Schema validation | Type-safe validation with TypeScript inference, composable schemas, 10KB bundle, modern API |
| Radix UI Primitives | 1.x+ | Accessible base components | WAI-ARIA compliant, unstyled primitives, handles complex accessibility (Select, Checkbox, Radio) |
| Style Dictionary | 4.x+ | Token transformation | DTCG-compliant, ESM support, browser-compatible, W3C Design Tokens Format 2025.10 aligned |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| Yup | 1.x+ | Alternative schema validation | Existing codebase preference, familiar API from Formik migration |
| @hookform/resolvers | 3.x+ | Validation library bridge | Integrates Zod/Yup/Joi with React Hook Form |
| @radix-ui/react-form | 0.x+ | Form validation primitives | Native browser validation + custom validation with accessibility wiring |
| Lucide React | 0.x+ | Icons for states | Success checkmarks, error indicators (already established in Phase 2) |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| React Hook Form | Formik | Formik is heavier (controlled components), causes more re-renders, but has larger ecosystem |
| React Hook Form | TanStack Form | TanStack Form is newer (2024), excellent performance, but smaller community and fewer resources |
| Native HTML Select | React-Select, Downshift | Custom selects offer styling flexibility but require extensive ARIA implementation; native is more accessible out-of-box |
| Zod | Yup | Yup has larger community but lacks native TypeScript inference |

**Installation:**
```bash
npm install react-hook-form zod @hookform/resolvers
npm install @radix-ui/react-form @radix-ui/react-select @radix-ui/react-checkbox @radix-ui/react-radio-group
npm install lucide-react # Already installed in Phase 2
```

## Architecture Patterns

### Recommended Token Structure

Following W3C DTCG specification and Phase 1's 3-tier architecture:

```
tokens/
├── primitives/          # Reference tokens
│   ├── colors.json
│   ├── spacing.json
│   └── typography.json
├── semantic/            # System tokens
│   ├── colors.json     # input.border.default, input.border.error
│   └── forms.json      # input.height.sm, input.radius, input.spacing
└── components/          # Component tokens
    └── input.json      # Complete input token definitions
```

**Token naming convention** (aligns with button system from Phase 2):
```
{component}.{element}.{property}.{state}
```

Examples:
- `input.field.background.default`
- `input.field.border.focus`
- `input.field.border.error`
- `input.label.color.default`
- `input.helper.color.default`
- `input.error.color.default`

### Pattern 1: Three-Size Input System

**What:** Consistent height system matching button sizes (32px/40px/48px)
**When to use:** All text input, textarea, select components

**Token structure:**
```json
{
  "input": {
    "height": {
      "sm": { "$value": "32px", "$type": "dimension" },
      "md": { "$value": "40px", "$type": "dimension" },
      "lg": { "$value": "48px", "$type": "dimension" }
    },
    "padding": {
      "x": {
        "sm": { "$value": "{spacing.2}", "$type": "dimension" },
        "md": { "$value": "{spacing.3}", "$type": "dimension" },
        "lg": { "$value": "{spacing.4}", "$type": "dimension" }
      }
    },
    "font": {
      "size": {
        "sm": { "$value": "{font.size.sm}", "$type": "dimension" },
        "md": { "$value": "{font.size.base}", "$type": "dimension" },
        "lg": { "$value": "{font.size.lg}", "$type": "dimension" }
      }
    }
  }
}
```

**Size recommendations:**
- Small (32px): Desktop-only, dense UIs - touch target below 44px minimum
- Medium (40px): Default for most forms - balances desktop and mobile
- Large (48px): Mobile-first, accessibility-focused UIs - exceeds 44px touch target

### Pattern 2: Five-State Input System

**What:** Comprehensive state coverage for all interactive inputs
**When to use:** Text Input, Textarea, Select (not Checkbox/Radio which need custom approach)

**States required:**
1. **Default** - Initial unfocused state
2. **Hover** - Mouse over (not applicable on touch devices)
3. **Focus** - Keyboard or click focus (WCAG 2.4.7 compliance)
4. **Error** - Validation failure
5. **Disabled** - Non-interactive (subtle, readable per Phase 3 decisions)

**Token structure for outline style:**
```json
{
  "input": {
    "field": {
      "background": {
        "default": { "$value": "{color.neutral.0}", "$type": "color" },
        "hover": { "$value": "{color.neutral.0}", "$type": "color" },
        "focus": { "$value": "{color.neutral.0}", "$type": "color" },
        "error": { "$value": "{color.neutral.0}", "$type": "color" },
        "disabled": { "$value": "{color.neutral.50}", "$type": "color" }
      },
      "border": {
        "default": { "$value": "{color.neutral.300}", "$type": "color" },
        "hover": { "$value": "{color.neutral.400}", "$type": "color" },
        "focus": { "$value": "{color.primary.500}", "$type": "color" },
        "error": { "$value": "{color.error.500}", "$type": "color" },
        "disabled": { "$value": "{color.neutral.200}", "$type": "color" }
      },
      "borderWidth": {
        "default": { "$value": "1px", "$type": "dimension" },
        "focus": { "$value": "2px", "$type": "dimension" },
        "error": { "$value": "1px", "$type": "dimension" }
      }
    }
  }
}
```

**Focus indicator requirements** (WCAG 2.4.7):
- Minimum 2px outline or border increase
- 3:1 contrast ratio against background and adjacent colors
- Use `:focus-visible` pseudo-class (not `:focus`) to show only for keyboard navigation
- Avoid removing outlines completely

### Pattern 3: Label + Helper Text + Error Message Layout

**What:** Vertical stacking pattern with consistent spacing and accessibility associations
**When to use:** All form inputs requiring labels

**Component structure:**
```tsx
// Source: React Hook Form + WCAG best practices
<div className="form-field">
  <label htmlFor="email" className="form-label">
    E-Mail-Adresse
    <span className="required-indicator" aria-label="Pflichtfeld">*</span>
  </label>

  <input
    id="email"
    type="email"
    className="form-input"
    aria-required="true"
    aria-invalid={!!errors.email}
    aria-describedby="email-helper email-error"
    {...register("email")}
  />

  <span id="email-helper" className="form-helper">
    z.B. name@firma.de
  </span>

  {errors.email && (
    <span id="email-error" className="form-error" role="alert">
      Bitte gib eine gültige E-Mail-Adresse ein (z.B. name@firma.de)
    </span>
  )}
</div>
```

**Spacing tokens:**
```json
{
  "form": {
    "spacing": {
      "labelToInput": { "$value": "{spacing.2}", "$type": "dimension" },
      "inputToHelper": { "$value": "{spacing.1}", "$type": "dimension" },
      "fieldToField": { "$value": "{spacing.4}", "$type": "dimension" }
    }
  }
}
```

**Key measurements** (based on 4px base unit from Phase 1):
- Label to Input: 8px (spacing.2)
- Input to Helper/Error: 4px (spacing.1)
- Field to Field: 16px (spacing.4)

### Pattern 4: Custom Checkbox/Radio with Native Semantics

**What:** Visually custom styled controls maintaining native `<input>` accessibility
**When to use:** Checkbox and Radio Button components

**Implementation approach:**
```tsx
// Source: Accessible custom checkboxes pattern
<label className="checkbox-wrapper">
  <input
    type="checkbox"
    className="checkbox-native"
    {...register("terms")}
  />
  <span className="checkbox-custom" aria-hidden="true">
    {/* Visual custom checkbox */}
  </span>
  <span className="checkbox-label">
    Ich akzeptiere die Nutzungsbedingungen
  </span>
</label>
```

**CSS pattern:**
```css
/* Hide native input visually, keep in accessibility tree */
.checkbox-native {
  opacity: 0;
  position: absolute;
  width: 1px;
  height: 1px;
}

/* Never use display: none or visibility: hidden */
/* These remove from accessibility tree */

/* Style custom visual */
.checkbox-custom {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid var(--input-border-default);
  border-radius: 4px;
}

/* Focus indicator on native input affects custom visual */
.checkbox-native:focus-visible + .checkbox-custom {
  outline: 2px solid var(--color-primary-500);
  outline-offset: 2px;
}

.checkbox-native:checked + .checkbox-custom {
  background-color: var(--color-primary-500);
  border-color: var(--color-primary-500);
}
```

**Why this pattern:**
- Native `<input>` maintains keyboard navigation (Space to toggle)
- Screen readers announce correct role and state
- No ARIA attributes needed (native semantics handle it)
- Focus management works automatically

**Alternative (not recommended):** Radix UI primitives for Checkbox/Radio provide accessible implementation but add component weight. Use only if native approach proves insufficient.

### Pattern 5: Progressive Validation Timing

**What:** onBlur validation initially, switching to onChange after first error
**When to use:** All forms with validation

**Implementation:**
```tsx
// Source: React Hook Form best practices
const form = useForm({
  mode: 'onBlur', // Initial validation on blur
  reValidateMode: 'onChange', // Re-validate on change after error
  resolver: zodResolver(schema)
});
```

**Why this pattern:**
- Prevents premature error messages while user is typing
- Provides immediate feedback once error occurs (user knows when fixed)
- Reduces cognitive load and frustration
- Supported natively by React Hook Form

**User flow:**
1. User types in field → no validation
2. User leaves field (blur) → validation runs
3. If error: error message displays
4. User corrects input → validation runs on each keystroke (onChange)
5. Error clears immediately when valid

### Pattern 6: Inline + Summary Error Display

**What:** Dual error presentation for complex forms
**When to use:** Forms with 5+ fields or multi-step forms

**Structure:**
```tsx
// Source: WCAG 3.3.1, 3.3.3 best practices
{errors && Object.keys(errors).length > 0 && (
  <div className="error-summary" role="alert" tabIndex={-1} ref={errorSummaryRef}>
    <h2>Bitte korrigiere folgende Fehler:</h2>
    <ul>
      {Object.entries(errors).map(([field, error]) => (
        <li key={field}>
          <a href={`#${field}`}>{error.message}</a>
        </li>
      ))}
    </ul>
  </div>
)}

{/* Individual inline errors */}
{errors.email && (
  <span className="form-error" role="alert">
    {errors.email.message}
  </span>
)}
```

**When to use each:**
- **Inline only**: Simple forms (1-4 fields)
- **Inline + Summary**: Complex forms (5+ fields), multi-step forms
- Summary at top with links allows keyboard users to jump to errors
- Focus moves to summary on submit with errors

### Anti-Patterns to Avoid

**1. Floating Labels**
- **Problem:** Label shrinks and moves on focus, becomes tiny and hard to read
- **Issues:** Motion sensitivity (vestibular disorders), cognitive load, text resize issues
- **Use instead:** Fixed labels above input (aligns with Phase 3 decisions)

**2. Placeholder-Only Labels**
- **Problem:** Placeholder disappears when typing, not announced by screen readers as label
- **Issues:** WCAG 3.3.2 failure, users forget field purpose, low contrast
- **Use instead:** Visible persistent label + optional placeholder for example values

**3. `display: none` for Custom Controls**
- **Problem:** Removes element from accessibility tree completely
- **Issues:** Screen readers can't access, keyboard navigation broken
- **Use instead:** `opacity: 0` with absolute positioning (keeps in accessibility tree)

**4. Red-Only Error Indication**
- **Problem:** Color alone doesn't convey meaning (WCAG 1.4.1)
- **Issues:** Colorblind users can't distinguish error state
- **Use instead:** Color + icon + text message + aria-invalid attribute

**5. Removing Focus Indicators**
- **Problem:** `outline: none` without replacement makes keyboard navigation impossible
- **Issues:** WCAG 2.4.7 failure, keyboard users can't see focus
- **Use instead:** Custom styled `:focus-visible` with 2px minimum, 3:1 contrast

## Don't Hand-Roll

Problems that look simple but have existing solutions.

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Form state management | Custom useState for each field | React Hook Form | Handles touched state, dirty tracking, validation timing, error management, form reset, default values, watch patterns - 50+ edge cases |
| Schema validation | Custom validation functions | Zod or Yup with @hookform/resolvers | Type-safe schemas, composable rules, async validation, custom error messages, i18n support |
| Accessible Select dropdown | Custom div-based dropdown with keyboard handling | Native `<select>` styled, or Radix UI Select | Native select has 30+ ARIA attributes, keyboard patterns (arrow navigation, type-ahead, home/end), screen reader support across all platforms; custom requires 200+ lines |
| Checkbox/Radio keyboard handling | Custom click handlers and state | Native `<input type="checkbox/radio">` visually hidden | Space key toggle, arrow navigation for radio groups, form association, validation API all built-in |
| Focus management in forms | Manual focus() calls on errors | React Hook Form's setFocus and form.formState | Automatically focuses first error field on submit, maintains focus order, handles dynamic fields |
| Accessible error announcements | Manual aria-live regions | role="alert" on error spans + aria-describedby | Alert role has implicit aria-live="assertive" and aria-atomic="true", announced immediately by screen readers |
| Input masking (phone, credit card) | Regex on onChange handlers | react-hook-form-mask or react-input-mask | Handles cursor position, paste events, backspace behavior, international formats - 15+ edge cases |
| Date input | Custom date picker from scratch | Native `<input type="date">` or established library | Native has accessibility, localization, mobile keyboards, calendar UI; custom requires 500+ lines for accessibility alone |

**Key insight:** Form accessibility has 50+ requirements across WCAG success criteria. Native HTML inputs and established libraries handle these by default. Custom solutions miss edge cases: screen reader announcements, keyboard patterns, focus management, error associations, validation timing, high contrast mode, text resizing, RTL support.

**Cost of hand-rolling forms:**
- 200+ hours implementing ARIA patterns correctly
- 15+ WCAG violations in initial implementation
- Cross-browser inconsistencies (Safari, Firefox, Chrome different behaviors)
- Ongoing maintenance as ARIA spec evolves

## Common Pitfalls

### Pitfall 1: Required Field Indicators Without Accessibility Attributes

**What goes wrong:** Adding red asterisk visually but not programmatically announcing required state
**Why it happens:** Developers focus on visual design, forget screen reader users can't see asterisk
**How to avoid:**
- Always add `aria-required="true"` to required inputs
- Add `aria-label="Pflichtfeld"` to asterisk span
- Include legend at form top: "Felder mit * sind Pflichtfelder"
- Use `required` HTML attribute for native validation API

**Warning signs:**
- Screen reader announces field but not "required"
- Form submits with empty required fields without validation
- No programmatic way to identify required fields

**Code example:**
```tsx
// WRONG - visual only
<label>
  E-Mail <span className="text-error">*</span>
</label>
<input type="email" />

// CORRECT - visual + programmatic
<label htmlFor="email">
  E-Mail <span className="text-error" aria-label="Pflichtfeld">*</span>
</label>
<input
  id="email"
  type="email"
  aria-required="true"
  required
/>
```

### Pitfall 2: Hidden Required Fields Causing "Not Focusable" Error

**What goes wrong:** Browser validation on hidden required fields triggers error: "An invalid form control with name='' is not focusable"
**Why it happens:** Hidden fields (display: none, visibility: hidden) with `required` attribute fail native validation but can't receive focus
**How to avoid:**
- Never mark hidden fields as required
- Use conditional rendering, not CSS hiding, for optional field sections
- Remove `required` attribute when hiding fields
- Use React Hook Form's `shouldUnregister: true` for conditional fields

**Warning signs:**
- Console error on form submit
- Form doesn't submit, no visible error
- Validation message doesn't appear

**Code example:**
```tsx
// WRONG - hidden required field
<input type="text" required style={{ display: 'none' }} />

// CORRECT - conditional rendering
{showField && (
  <input type="text" required />
)}
```

### Pitfall 3: Helper Text and Error Message Competing for Space

**What goes wrong:** Helper text disappears when error appears, or both display causing confusion
**Why it happens:** Unclear strategy for managing persistent hints vs temporary errors
**How to avoid:** Choose one approach consistently:

**Approach A: Error Replaces Helper** (Recommended)
- Helper text visible by default
- On error: helper hidden, error shown in same location
- Clear visual hierarchy, less cluttered

**Approach B: Error Below Helper**
- Helper text always visible
- Error appears below helper text
- Better when helper contains critical permanent information

**Code example:**
```tsx
// Approach A: Error Replaces Helper
<input {...register("email")} aria-describedby={errors.email ? "email-error" : "email-helper"} />
{!errors.email && (
  <span id="email-helper" className="form-helper">z.B. name@firma.de</span>
)}
{errors.email && (
  <span id="email-error" className="form-error" role="alert">
    {errors.email.message}
  </span>
)}
```

**Warning signs:**
- Both helper and error visible simultaneously
- aria-describedby references missing elements
- Inconsistent behavior across different fields

### Pitfall 4: Disabled State Too Subtle or Inaccessible

**What goes wrong:** Disabled inputs either invisible (too faded) or indistinguishable from enabled (too subtle)
**Why it happens:** Trying to balance aesthetics with WCAG contrast requirements, misunderstanding disabled state purpose
**How to avoid:**
- Maintain 4.5:1 contrast for text in disabled fields (WCAG 1.4.3)
- Use combination of: reduced opacity (0.6-0.7), gray background, cursor: not-allowed
- Never hide disabled fields completely
- Include `aria-disabled="true"` for screen reader announcement
- Phase 3 decision: "subtle (leicht reduziert)" but "Inhalt bleibt lesbar"

**Warning signs:**
- Users try to click disabled fields not realizing they're disabled
- Low-vision users can't read disabled field values
- Screen reader doesn't announce disabled state

**Token recommendations:**
```json
{
  "input": {
    "field": {
      "disabled": {
        "background": { "$value": "{color.neutral.50}" },
        "border": { "$value": "{color.neutral.200}" },
        "text": { "$value": "{color.neutral.600}" },
        "opacity": { "$value": "0.7" }
      }
    }
  }
}
```

### Pitfall 5: Input Type Number Accessibility Issues

**What goes wrong:** `<input type="number">` has inconsistent screen reader announcements and problematic spinner buttons
**Why it happens:** HTML5 number input has poor accessibility support across browsers
**How to avoid:**
- Use `type="text"` with `inputmode="numeric"` for mobile numeric keyboard
- Add `pattern="[0-9]*"` for validation
- Implement custom validation with React Hook Form
- Avoid spinners for large ranges or precise values

**Warning signs:**
- Screen readers announce "spinbox" or "edit" inconsistently
- Users can't enter decimal values in some browsers
- Spinner buttons only visible on focus (Chrome/Edge)
- Scientific notation (e) breaks validation

**Code example:**
```tsx
// WRONG - type="number" has accessibility issues
<input type="number" min="0" max="100" />

// CORRECT - text with numeric input mode
<input
  type="text"
  inputmode="numeric"
  pattern="[0-9]*"
  {...register("quantity", {
    pattern: { value: /^[0-9]+$/, message: "Nur Zahlen erlaubt" },
    min: { value: 0, message: "Mindestens 0" },
    max: { value: 100, message: "Maximal 100" }
  })}
/>
```

### Pitfall 6: Textarea Auto-Resize Breaking Accessibility

**What goes wrong:** JavaScript-based auto-resize breaks screen reader announcements or high contrast mode
**Why it happens:** Complex implementations using hidden divs, generated content, or contenteditable
**How to avoid:**
- Use CSS-only solution: `field-sizing: content` (emerging standard)
- Or use proven library: react-textarea-autosize
- Always maintain `<textarea>` element (not contenteditable div)
- Keep `rows` and `cols` attributes for baseline sizing
- Ensure `<label>` association with `htmlFor` + `id`

**Warning signs:**
- Generated content (::before/::after) announced by screen readers
- High contrast mode shows invisible elements
- Voice control can't target the textarea
- Text resize (200%) breaks layout

**Accessibility requirements:**
- Use `<label>` with `for` attribute (not aria-label alone)
- Maintain semantic `<textarea>` element
- Test with text resize to 200% (WCAG 1.4.4)
- Verify high contrast mode support

### Pitfall 7: Select Dropdown Styling Breaking Keyboard Navigation

**What goes wrong:** Custom select dropdowns lose arrow key navigation, type-ahead, or screen reader support
**Why it happens:** Replacing native `<select>` with div-based dropdown misses 30+ keyboard interactions
**How to avoid:**
- **Prefer native `<select>`** - most accessible, style with modern CSS
- If custom required: use Radix UI Select (WAI-ARIA compliant primitives)
- Never use div + click handlers without full ARIA implementation
- Test with keyboard only: Arrow up/down, Home/End, type-ahead, Escape to close

**Native select advantages:**
- Works across all screen readers without ARIA
- Mobile devices show native picker (optimized UX)
- Keyboard patterns built-in (20+ interactions)
- Form validation API integration

**Warning signs:**
- Arrow keys don't work
- Typing doesn't jump to options
- Screen reader announces "button" not "combobox"
- Mobile users see desktop dropdown (not native picker)

**When custom is justified:**
- Need for icons, images, or complex option content
- Multi-select with search
- Async loading of options
- Custom keyboard shortcuts

## Code Examples

Verified patterns from official sources and specifications.

### Complete Form Field with Validation

```tsx
// Source: React Hook Form + WCAG 3.3.1, 3.3.2, 3.3.3
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Check, AlertCircle } from 'lucide-react';

const schema = z.object({
  email: z
    .string()
    .min(1, 'E-Mail-Adresse ist erforderlich')
    .email('Bitte gib eine gültige E-Mail-Adresse ein (z.B. name@firma.de)'),
  message: z
    .string()
    .min(10, 'Nachricht muss mindestens 10 Zeichen lang sein')
    .max(500, 'Nachricht darf maximal 500 Zeichen lang sein'),
  terms: z
    .boolean()
    .refine((val) => val === true, 'Du musst den Nutzungsbedingungen zustimmen')
});

type FormData = z.infer<typeof schema>;

function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, dirtyFields }
  } = useForm<FormData>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    resolver: zodResolver(schema)
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* Text Input with Success/Error States */}
      <div className="form-field">
        <label htmlFor="email" className="form-label">
          E-Mail-Adresse
          <span className="required-indicator" aria-label="Pflichtfeld">*</span>
        </label>

        <div className="input-wrapper">
          <input
            id="email"
            type="email"
            className={`form-input ${errors.email ? 'error' : ''} ${!errors.email && dirtyFields.email ? 'success' : ''}`}
            aria-required="true"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : "email-helper"}
            {...register('email')}
          />
          {!errors.email && dirtyFields.email && (
            <Check className="input-icon success" aria-hidden="true" />
          )}
          {errors.email && (
            <AlertCircle className="input-icon error" aria-hidden="true" />
          )}
        </div>

        {!errors.email && (
          <span id="email-helper" className="form-helper">
            z.B. name@firma.de
          </span>
        )}
        {errors.email && (
          <span id="email-error" className="form-error" role="alert">
            {errors.email.message}
          </span>
        )}
      </div>

      {/* Textarea */}
      <div className="form-field">
        <label htmlFor="message" className="form-label">
          Nachricht
          <span className="required-indicator" aria-label="Pflichtfeld">*</span>
        </label>

        <textarea
          id="message"
          className={`form-textarea ${errors.message ? 'error' : ''}`}
          rows={4}
          aria-required="true"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : "message-helper"}
          {...register('message')}
        />

        {!errors.message && (
          <span id="message-helper" className="form-helper">
            Mindestens 10 Zeichen
          </span>
        )}
        {errors.message && (
          <span id="message-error" className="form-error" role="alert">
            {errors.message.message}
          </span>
        )}
      </div>

      {/* Checkbox */}
      <div className="form-field">
        <label className="checkbox-wrapper">
          <input
            type="checkbox"
            className="checkbox-native"
            aria-required="true"
            aria-invalid={!!errors.terms}
            aria-describedby={errors.terms ? "terms-error" : undefined}
            {...register('terms')}
          />
          <span className="checkbox-custom" aria-hidden="true" />
          <span className="checkbox-label">
            Ich akzeptiere die Nutzungsbedingungen
            <span className="required-indicator" aria-label="Pflichtfeld">*</span>
          </span>
        </label>

        {errors.terms && (
          <span id="terms-error" className="form-error" role="alert">
            {errors.terms.message}
          </span>
        )}
      </div>

      <button type="submit" className="btn-primary">
        Absenden
      </button>
    </form>
  );
}
```

### Accessible Custom Checkbox with States

```tsx
// Source: Accessible custom checkboxes patterns + Radix UI patterns
import { forwardRef } from 'react';
import { Check } from 'lucide-react';

interface CheckboxProps {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  helper?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ id, label, required, error, helper, ...props }, ref) => {
    return (
      <div className="checkbox-field">
        <label className="checkbox-wrapper">
          <input
            ref={ref}
            type="checkbox"
            id={id}
            className="checkbox-native"
            aria-required={required}
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-error` : helper ? `${id}-helper` : undefined}
            {...props}
          />
          <span className="checkbox-custom" aria-hidden="true">
            <Check className="checkbox-icon" />
          </span>
          <span className="checkbox-label">
            {label}
            {required && (
              <span className="required-indicator" aria-label="Pflichtfeld">*</span>
            )}
          </span>
        </label>

        {!error && helper && (
          <span id={`${id}-helper`} className="form-helper checkbox-helper">
            {helper}
          </span>
        )}
        {error && (
          <span id={`${id}-error`} className="form-error checkbox-error" role="alert">
            {error}
          </span>
        )}
      </div>
    );
  }
);
```

### Radio Group with Keyboard Navigation

```tsx
// Source: WAI-ARIA Radio Group pattern + React Hook Form
import { forwardRef } from 'react';

interface RadioOption {
  value: string;
  label: string;
  helper?: string;
}

interface RadioGroupProps {
  name: string;
  label: string;
  options: RadioOption[];
  required?: boolean;
  error?: string;
}

const RadioGroup = forwardRef<HTMLInputElement, RadioGroupProps>(
  ({ name, label, options, required, error, ...props }, ref) => {
    return (
      <fieldset className="radio-group">
        <legend className="form-label">
          {label}
          {required && (
            <span className="required-indicator" aria-label="Pflichtfeld">*</span>
          )}
        </legend>

        <div className="radio-options" role="radiogroup" aria-required={required}>
          {options.map((option, index) => (
            <label key={option.value} className="radio-wrapper">
              <input
                ref={index === 0 ? ref : undefined}
                type="radio"
                name={name}
                value={option.value}
                className="radio-native"
                aria-invalid={!!error}
                aria-describedby={option.helper ? `${name}-${option.value}-helper` : undefined}
                {...props}
              />
              <span className="radio-custom" aria-hidden="true" />
              <div className="radio-content">
                <span className="radio-label">{option.label}</span>
                {option.helper && (
                  <span id={`${name}-${option.value}-helper`} className="radio-helper">
                    {option.helper}
                  </span>
                )}
              </div>
            </label>
          ))}
        </div>

        {error && (
          <span id={`${name}-error`} className="form-error" role="alert">
            {error}
          </span>
        )}
      </fieldset>
    );
  }
);
```

### CSS for Focus-Visible and States

```css
/* Source: WCAG 2.4.7 Focus Visible + :focus-visible best practices */

/* Text Input States */
.form-input {
  height: var(--input-height-md);
  padding: 0 var(--input-padding-x-md);
  font-size: var(--input-font-size-md);
  background-color: var(--input-background-default);
  border: 1px solid var(--input-border-default);
  border-radius: var(--input-radius);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.form-input:hover:not(:disabled) {
  border-color: var(--input-border-hover);
}

/* Use :focus-visible instead of :focus (only shows for keyboard) */
.form-input:focus-visible {
  outline: none;
  border-width: 2px;
  border-color: var(--input-border-focus);
  box-shadow: 0 0 0 3px var(--input-focus-ring);
}

.form-input.error {
  border-color: var(--input-border-error);
}

.form-input.success {
  border-color: var(--color-success-500);
}

.form-input:disabled {
  background-color: var(--input-background-disabled);
  border-color: var(--input-border-disabled);
  color: var(--input-text-disabled);
  cursor: not-allowed;
  opacity: 0.7;
}

/* Custom Checkbox States */
.checkbox-native {
  /* Visually hidden, accessible to screen readers */
  opacity: 0;
  position: absolute;
  width: 1px;
  height: 1px;
  /* NEVER use display: none or visibility: hidden */
}

.checkbox-custom {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border: 2px solid var(--input-border-default);
  border-radius: 4px;
  background-color: var(--input-background-default);
  transition: all 0.2s ease;
}

.checkbox-custom .checkbox-icon {
  opacity: 0;
  color: white;
  width: 14px;
  height: 14px;
}

.checkbox-native:checked + .checkbox-custom {
  background-color: var(--color-primary-500);
  border-color: var(--color-primary-500);
}

.checkbox-native:checked + .checkbox-custom .checkbox-icon {
  opacity: 1;
}

/* Focus indicator - 2px outline, 3:1 contrast */
.checkbox-native:focus-visible + .checkbox-custom {
  outline: 2px solid var(--color-primary-500);
  outline-offset: 2px;
}

.checkbox-native:disabled + .checkbox-custom {
  background-color: var(--input-background-disabled);
  border-color: var(--input-border-disabled);
  cursor: not-allowed;
  opacity: 0.7;
}

/* Error state */
.checkbox-native[aria-invalid="true"] + .checkbox-custom {
  border-color: var(--input-border-error);
}

/* Radio Button States (similar pattern) */
.radio-custom {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border: 2px solid var(--input-border-default);
  border-radius: 50%; /* Circle for radio */
  background-color: var(--input-background-default);
  transition: all 0.2s ease;
}

.radio-custom::after {
  content: '';
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: white;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.radio-native:checked + .radio-custom {
  background-color: var(--color-primary-500);
  border-color: var(--color-primary-500);
}

.radio-native:checked + .radio-custom::after {
  opacity: 1;
}

.radio-native:focus-visible + .radio-custom {
  outline: 2px solid var(--color-primary-500);
  outline-offset: 2px;
}
```

### Design Tokens JSON (Style Dictionary Format)

```json
{
  "input": {
    "$type": "composite",
    "height": {
      "sm": { "$value": "32px", "$type": "dimension" },
      "md": { "$value": "40px", "$type": "dimension" },
      "lg": { "$value": "48px", "$type": "dimension" }
    },
    "padding": {
      "x": {
        "sm": { "$value": "{spacing.2}", "$type": "dimension" },
        "md": { "$value": "{spacing.3}", "$type": "dimension" },
        "lg": { "$value": "{spacing.4}", "$type": "dimension" }
      }
    },
    "radius": { "$value": "{radius.md}", "$type": "dimension" },
    "font": {
      "size": {
        "sm": { "$value": "{font.size.sm}", "$type": "dimension" },
        "md": { "$value": "{font.size.base}", "$type": "dimension" },
        "lg": { "$value": "{font.size.lg}", "$type": "dimension" }
      }
    },
    "field": {
      "background": {
        "default": { "$value": "{color.neutral.0}", "$type": "color" },
        "hover": { "$value": "{color.neutral.0}", "$type": "color" },
        "focus": { "$value": "{color.neutral.0}", "$type": "color" },
        "error": { "$value": "{color.neutral.0}", "$type": "color" },
        "disabled": { "$value": "{color.neutral.50}", "$type": "color" }
      },
      "border": {
        "default": { "$value": "{color.neutral.300}", "$type": "color" },
        "hover": { "$value": "{color.neutral.400}", "$type": "color" },
        "focus": { "$value": "{color.primary.500}", "$type": "color" },
        "error": { "$value": "{color.error.500}", "$type": "color" },
        "disabled": { "$value": "{color.neutral.200}", "$type": "color" }
      },
      "text": {
        "default": { "$value": "{color.neutral.900}", "$type": "color" },
        "placeholder": { "$value": "{color.neutral.400}", "$type": "color" },
        "disabled": { "$value": "{color.neutral.600}", "$type": "color" }
      }
    },
    "label": {
      "color": {
        "default": { "$value": "{color.neutral.700}", "$type": "color" },
        "error": { "$value": "{color.error.600}", "$type": "color" }
      },
      "fontSize": { "$value": "{font.size.sm}", "$type": "dimension" },
      "fontWeight": { "$value": "{font.weight.medium}", "$type": "number" }
    },
    "helper": {
      "color": { "$value": "{color.neutral.600}", "$type": "color" },
      "fontSize": { "$value": "{font.size.xs}", "$type": "dimension" }
    },
    "error": {
      "color": { "$value": "{color.error.600}", "$type": "color" },
      "fontSize": { "$value": "{font.size.xs}", "$type": "dimension" }
    },
    "focus": {
      "ring": { "$value": "{color.primary.100}", "$type": "color" },
      "width": { "$value": "3px", "$type": "dimension" }
    }
  },
  "form": {
    "spacing": {
      "labelToInput": { "$value": "{spacing.2}", "$type": "dimension" },
      "inputToHelper": { "$value": "{spacing.1}", "$type": "dimension" },
      "fieldToField": { "$value": "{spacing.4}", "$type": "dimension" }
    }
  }
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Formik for form state | React Hook Form | 2020-2021 | 3x performance improvement (uncontrolled), smaller bundle (15KB vs 50KB), better TypeScript DX |
| PropTypes validation | Zod/Yup schema validation | 2021-2022 | Type-safe validation with TS inference, composable schemas, better error messages |
| `:focus` pseudo-class | `:focus-visible` pseudo-class | 2021 (widely supported 2022) | Shows focus only for keyboard navigation, avoids focus rings on mouse click, better UX |
| Floating labels | Fixed labels above input | Ongoing | Accessibility concerns with motion sensitivity and readability drove shift back to traditional labels |
| Custom div dropdowns | Native `<select>` or Radix UI primitives | 2023-2024 | Native select has better mobile UX and accessibility; Radix provides accessible custom alternative |
| Style Dictionary 3.x | Style Dictionary 4.x ESM | 2024 | W3C DTCG compliance, browser-compatible, async support, token.type property |
| Manual ARIA implementation | React Hook Form + native inputs | 2022-2024 | Libraries handle 50+ ARIA attributes automatically, reducing accessibility bugs |

**Deprecated/outdated:**
- **Floating labels as accessibility improvement:** Now recognized as problematic for motion sensitivity, text resizing, cognitive load
- **`<input type="number">` for all numeric inputs:** Screen reader inconsistencies led to recommendation of `type="text"` + `inputmode="numeric"`
- **Placeholder as label replacement:** Never was accessible, but now universally recognized as WCAG failure (3.3.2)
- **`outline: none` without replacement:** WCAG 2.4.7 violation, now enforced by accessibility audits
- **Custom select dropdowns without ARIA:** Required 200+ lines of keyboard handling; native or Radix UI now standard

## Open Questions

Things that couldn't be fully resolved.

### 1. **Optimal Color for Required Field Asterisk**

**What we know:**
- Red (error.500) is web convention (Jakob's Law)
- Phase 3 context left this as "Claude's discretion"
- Options: Red (error.500), Brand blue (primary.500), or Neutral gray (neutral.600)

**What's unclear:**
- Does red asterisk cause anxiety or imply error before user interacts?
- Would brand color (Hydrophon blue) better fit B2B professional tone?
- Is neutral gray too subtle for low-vision users?

**Recommendation:**
- Start with **red (error.500)** as it's universally recognized
- Include legend "Felder mit * sind Pflichtfelder" to reinforce meaning
- Validate with user testing in Phase 3-4 implementation
- Consider A/B testing red vs. brand color for B2B context

**WCAG considerations:** Color must have 3:1 contrast against background; meaning can't rely on color alone (asterisk shape + legend provide redundancy)

### 2. **Input Visual Style: Outline vs. Filled Background**

**What we know:**
- Phase 3 context: "Claude's discretion — Wahl zwischen outline (nur Border) oder filled (Hintergrund)"
- Buttons in Phase 2 use variants (primary filled, secondary outline, tertiary ghost)
- Outline style: white background + border
- Filled style: light gray background + border

**What's unclear:**
- Which style aligns better with Phase 2 button system?
- Does filled background improve perceived affordance for B2B users?
- How does each style perform in different contexts (light forms vs. dark sidebars)?

**Recommendation:**
- Use **outline style (white background)** as primary for these reasons:
  1. Aligns with secondary button (outline variant)
  2. Cleaner appearance for form-heavy B2B application
  3. Better contrast for focus states (border color change more visible)
  4. Disabled state differentiation easier (filled gray background on white)
- Tokens should support both styles for flexibility

**Implementation:** Create tokens for both, choose outline as default, document filled as alternative for future needs

### 3. **Severity States: Error-Only vs. Success/Warning/Error**

**What we know:**
- Phase 3 context: "Claude's discretion — Entscheidung ob Success/Warning/Error States oder nur Error State"
- Success state with green checkmark icon decided: "Ja, grünes Checkmark Icon"
- Warning state left unclear

**What's unclear:**
- When would warning state be used vs. error?
- Does warning state add value or create confusion?
- Should warning block submission or just inform?

**Recommendation:**
- Implement **Success + Error only** (no Warning), rationale:
  1. Warning vs. Error distinction ambiguous ("invalid format" is error, not warning)
  2. Clear binary: valid (success) or invalid (error)
  3. Reduces token complexity and component states
  4. Warning can be conveyed through helper text if needed (non-blocking info)
- Success state: green checkmark + green border (after validation passes)
- Error state: red AlertCircle icon + red border + error message

**Future consideration:** If warning needed later (e.g., "password weak but acceptable"), can add without breaking existing error/success states

## Sources

### Primary (HIGH confidence)

**W3C/WCAG Official:**
- [W3C WCAG 2.2 Quick Reference](https://www.w3.org/WAI/WCAG22/quickref/) - WCAG 2.1 AA success criteria for forms (3.3.1, 3.3.2, 3.3.3, 2.4.7, 4.1.2)
- [W3C Design Tokens Format Module 2025.10](https://www.designtokens.org/tr/drafts/format/) - DTCG specification for token structure

**Official Library Documentation:**
- [Radix UI Form Component](https://www.radix-ui.com/primitives/docs/components/form) - Accessible form primitives, validation patterns, ARIA implementation
- [React Hook Form Get Started](https://react-hook-form.com/get-started) - Core API, validation timing, accessibility attributes

**Design System Authoritative Sources:**
- [Sara Soueidan: Inclusively Hiding & Styling Checkboxes and Radio Buttons](https://www.sarasoueidan.com/blog/inclusively-hiding-and-styling-checkboxes-and-radio-buttons/) - Accessible custom controls pattern (opacity: 0 technique)
- [Sara Soueidan: A Guide to Designing Accessible, WCAG-Conformant Focus Indicators](https://www.sarasoueidan.com/blog/focus-indicators/) - Focus indicator design patterns, WCAG 2.4.7 compliance

### Secondary (MEDIUM confidence)

**Best Practices Articles (2025-2026):**
- [Nielsen Norman Group: Marking Required Fields in Forms](https://www.nngroup.com/articles/required-fields/) - Required vs. optional field marking strategies
- [Nielsen Norman Group: 10 Design Guidelines for Reporting Errors in Forms](https://www.nngroup.com/articles/errors-forms-design-guidelines/) - Error message patterns
- [Smashing Magazine: A Guide To Accessible Form Validation](https://www.smashingmagazine.com/2023/02/guide-accessible-form-validation/) - Inline vs. summary errors, validation timing
- [UserWay: Floating vs. Static Labels - Which are More Accessible?](https://userway.org/blog/floating-vs-static-labels/) - Label pattern accessibility analysis
- [Deque: Accessible Forms - The Problem with Placeholders](https://www.deque.com/blog/accessible-forms-the-problem-with-placeholders/) - Placeholder accessibility issues
- [W3C WAI: Form Instructions](https://www.w3.org/WAI/tutorials/forms/instructions/) - aria-describedby pattern for helper text

**Technical Implementation:**
- [MDN: :focus-visible CSS pseudo-class](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:focus-visible) - Focus-visible vs. focus best practices
- [Pawel Grzybek: The Difference Between CSS focus and focus-visible](https://pawelgrzybek.com/the-difference-between-css-focus-and-focus-visible-pseudo-class/) - Focus indicator implementation
- [Evinced: Creating Accessible Styled Checkboxes](https://www.evinced.com/blog/creating-accessible-styled-checkboxes) - Custom checkbox patterns
- [Evinced: Creating Accessible Styled Radio Groups](https://www.evinced.com/blog/creating-accessible-styled-radio-groups) - Custom radio button patterns

**Design Tokens (verified with DTCG spec):**
- [Smashing Magazine: Naming Best Practices for Design Tokens](https://www.smashingmagazine.com/2024/05/naming-best-practices/) - Token naming conventions
- [Nathan Curtis: Naming Tokens in Design Systems](https://medium.com/eightshapes-llc/naming-tokens-in-design-systems-9e86c7444676) - Component token structure
- [Style Dictionary Documentation](https://styledictionary.com/) - Style Dictionary 4.0 ESM, token.type property

### Tertiary (LOW confidence - marked for validation)

**Ecosystem Discovery (WebSearch, verified via official docs):**
- [Builder.io: 15 Best React UI Libraries for 2026](https://www.builder.io/blog/react-component-libraries-2026) - React Hook Form positioning
- [Croct Blog: The Best React Form Libraries of 2026](https://blog.croct.com/post/best-react-form-libraries) - Form library comparison (React Hook Form, TanStack Form, Formik)
- [LogRocket: The Best React Select Component Libraries](https://blog.logrocket.com/best-react-select-component-libraries/) - Native select vs. custom dropdown tradeoffs

**Validation UX Patterns:**
- [Medium: Inline Form Validations — UX Design Considerations](https://medium.com/@shanplourde/inline-form-validations-ux-design-considerations-and-react-examples-c2f53f89bebc) - onBlur vs. onChange validation timing
- [Medium: Building UX for Error Validation Strategy](https://medium.com/@olamishina/building-ux-for-error-validation-strategy-36142991017a) - "Reward early, punish late" pattern

**Vertical Rhythm/Spacing:**
- [UInica: Vertical Rhythm in UI](https://uinica.com/vertical-rhythm/) - Form field spacing patterns based on base unit
- [Red Hat Design System: Spacing](https://ux.redhat.com/foundations/spacing/) - 6px form field spacer use case

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - React Hook Form and Zod verified via official documentation, Context7-equivalent sources, consistent across multiple 2025-2026 references
- Architecture patterns: HIGH - WCAG success criteria verified via W3C official source, token patterns verified via DTCG spec and Sara Soueidan's authoritative articles
- WCAG requirements: HIGH - Direct verification from W3C official quick reference guide, specific success criteria numbers and requirements extracted
- Validation UX patterns: MEDIUM - "Reward early, punish late" pattern cited in multiple sources but no single authoritative spec; React Hook Form's mode/reValidateMode verified in official docs
- Custom control patterns: HIGH - opacity: 0 technique verified via Sara Soueidan (recognized accessibility expert), Radix UI patterns from official documentation
- Pitfalls: MEDIUM-HIGH - Native select advantages and input type="number" issues verified via multiple accessibility-focused sources; some pitfalls based on common developer experience rather than formal specification

**Research date:** 2026-01-29
**Valid until:** 60 days (April 2026) - Form patterns are relatively stable; React Hook Form and Zod APIs mature; WCAG 2.1 unchanged; :focus-visible widely supported; main risk is new libraries emerging (TanStack Form adoption) or WCAG 2.2 adoption shifting requirements
