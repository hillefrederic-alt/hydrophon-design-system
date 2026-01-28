# Feature Research

**Domain:** Corporate Design System for B2B Manufacturing
**Researched:** 2026-01-28
**Confidence:** HIGH

## Feature Landscape

### Table Stakes (Users Expect These)

Features users assume exist. Missing these = product feels incomplete.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| **Foundation: Color System** | Every design system starts here - brand identity expressed through color | MEDIUM | Must include primary (#008BD2), neutral (#575656), semantic colors (success/error/warning), tints/shades, accessibility validation (WCAG 2.1 AA minimum) |
| **Foundation: Typography System** | Text hierarchy is essential for any professional site | MEDIUM | Need heading scales (H1-H6), body text, captions. Use rem units for accessibility. Missing from current CI - must define |
| **Foundation: Spacing System** | Consistent spacing prevents ad-hoc layouts | LOW | 8-point grid system (8px increments) is 2026 standard. Creates shared language between design/dev |
| **Foundation: Grid & Breakpoints** | B2B users access on multiple devices | MEDIUM | 12-column responsive grid with 4 breakpoints (mobile 320px, tablet 768px, desktop 1024px, large 1280px+) |
| **Design Tokens** | Bridge between design and code - source of truth | MEDIUM | JSON-based token system, syncs Figma variables to CSS/code. Non-negotiable for multi-user teams (designers, devs, agencies) |
| **Component: Buttons** | Most fundamental interactive element | LOW | Primary, secondary, tertiary variants. States: default, hover, active, disabled, loading |
| **Component: Forms** | B2B sites need contact forms, RFQ forms | MEDIUM | Inputs (text, email, tel), select dropdowns, textareas, checkboxes, radio buttons, validation states |
| **Component: Navigation** | Users need to find products/info | MEDIUM | Primary nav, mobile menu, breadcrumbs. B2B sites are typically content-heavy |
| **Component: Cards** | Standard content container pattern | LOW | Product cards, info cards. Essential for product catalog |
| **Logo Usage Guidelines** | You have logo variants - agencies need rules | LOW | When to use which variant, sizing, spacing, backgrounds, what NOT to do |
| **Accessibility Compliance** | WCAG 2.1 AA is legal requirement in many jurisdictions | HIGH | Color contrast, keyboard navigation, screen reader support. WCAG 2.2 AA is emerging standard for 2026 |
| **Documentation Platform** | Multi-user teams need searchable, living documentation | MEDIUM | Static site generation (SSG) is 2026 standard. Serves designers, developers, marketing simultaneously |

### Differentiators (Competitive Advantage)

Features that set the product apart. Not required, but valuable for B2B manufacturing context.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| **3D Product Visualization Guidelines** | Hydrophon's unique differentiator - no standard photography | HIGH | Standards for lighting, materials, camera angles, background treatments for 3D renders. Consistency across product line |
| **CAD Asset Integration** | Engineers expect downloadable geometry | MEDIUM | Define how CAD files (STEP, IGES, DXF) are presented. File naming conventions, preview thumbnails, metadata requirements |
| **Technical Data Display Patterns** | B2B engineers need specs, tolerances, materials | MEDIUM | Templates for technical tables, specification sheets, comparison charts. Role-based content (engineer vs procurement) |
| **Interactive Product Configurator Guidelines** | 3D configurators are high-value for manufacturing | HIGH | Design patterns for option selection, real-time 3D updates, price calculations. Defers to post-v1 likely |
| **Multi-Language System** | German market + export focus | MEDIUM | Text length flexibility in components, date/number formatting, RTL consideration (if Middle East export) |
| **Dark Mode Support** | Engineers often work in low-light environments | LOW | Complete dark theme tokens. Nice differentiator for technical audience |
| **Advanced Grid Patterns** | B2B manufacturing sites need complex layouts | MEDIUM | Asymmetric grids, editorial layouts for case studies, technical documentation layouts |
| **Component: Product Comparison** | Engineers compare specs before purchasing | MEDIUM | Side-by-side comparison table, sticky headers, mobile-friendly horizontal scroll |
| **Component: Data Tables** | Display technical specifications, pricing tiers | MEDIUM | Sortable columns, filterable rows, pagination, responsive behavior |
| **Iconography System** | Custom icons reflect brand personality | MEDIUM | Product category icons, system icons, technical symbols. Currently missing - must create |
| **Motion & Animation Guidelines** | Micro-interactions make modern sites feel premium | LOW | Loading states, transitions, hover effects. Subtle for B2B audience - avoid overwrought animations |
| **Email Templates** | Marketing team needs branded emails | LOW | Transactional emails, newsletters. Often forgotten until needed |

### Anti-Features (Commonly Requested, Often Problematic)

Features that seem good but create problems. Explicitly NOT building these for v1.

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| **Every Component Under the Sun** | Teams want comprehensive library | Creates bloat, delays launch, many go unused. The "10-12 components" principle: Button, Input, Select, Modal, Tooltip, Toast, Tabs, Table, Card, Nav ship first | Start minimal, add components as real needs emerge. Track requests to prioritize |
| **Pixel-Perfect Design at All Sizes** | Designers want control | Responsive design means graceful degradation, not identical appearance. B2B users prioritize function over pixel perfection | Define intent of each breakpoint, embrace flexibility within constraints |
| **Framework-Agnostic Components** | "We might change frameworks later" | Premature abstraction. You're building for today's stack, not hypothetical future | Build for your actual stack. If you change frameworks later, refactor then (unlikely to happen) |
| **Over-Engineered Token Hierarchy** | Token systems can become obsessively complex | 8 levels of token abstraction creates confusion, not clarity. Diminishing returns beyond 3 levels (primitive → semantic → component) | Keep token system flat enough that humans can understand it. Document decisions, not just structure |
| **Real-Time Collaboration Features** | "Like Figma but for our system" | Massive engineering effort, maintenance burden, scope creep | Use existing tools (Figma for design, Storybook for dev, static site for docs) |
| **Automatic Code Generation** | "Designers design, code generates" | Generated code is never production-ready for real products. Creates false expectations | Design system is specification, not automation. Devs implement with judgment |
| **One Global System for Everything** | "Unified experience across all touchpoints" | Different contexts have different needs. Forcing website, app, email, print into one system creates compromises everywhere | One design language, multiple context-specific implementations sharing tokens |
| **Perfect Documentation from Day One** | Teams want complete docs before shipping | Documentation is never done. Waiting for perfection delays value delivery | Ship components with basic usage docs, improve iteratively based on real questions |

## Feature Dependencies

```
Design Tokens (Foundation)
    ├──requires──> Color System
    ├──requires──> Typography System
    ├──requires──> Spacing System
    └──enables──> All Components

Grid & Breakpoints
    └──required by──> All Components (responsive behavior)

Accessibility Compliance
    └──enforced across──> All Components & Foundations

3D Visualization Guidelines
    └──requires──> Color System (backgrounds, shadows)
    └──requires──> Grid System (image sizing)

CAD Asset Integration
    └──enhances──> Product Cards
    └──enhances──> Technical Data Display

Product Comparison
    └──requires──> Data Tables
    └──requires──> Responsive Grid

Documentation Platform
    └──showcases──> All Components & Guidelines
    └──requires──> Design Tokens (for live examples)
```

### Dependency Notes

- **Design Tokens must come first** - They're the source of truth for all visual decisions. Components consume tokens, not hard-coded values
- **Foundation before Components** - Can't build buttons without knowing colors, typography, spacing
- **Grid System is universal** - Every component needs responsive behavior defined by breakpoint system
- **3D Visualization is high-value but independent** - Can be added after core components ship. Doesn't block other features
- **Documentation is ongoing** - Ships alongside components, improves continuously

## MVP Definition

### Launch With (v1.0 - Design System Foundation)

Minimum viable product - what's needed for agencies to start building the new website.

- [x] **Color System** - Primary, neutral, semantic colors with accessibility validation. Extends existing 2-color palette
- [x] **Typography System** - Complete type scale from current branding void. H1-H6, body, captions
- [x] **Spacing System** - 8-point grid tokens. Prevents inconsistent spacing across implementations
- [x] **Design Tokens** - JSON source, Figma variables, CSS exports. Critical for multi-user consistency
- [x] **Grid & Breakpoints** - 12-column responsive system. B2B users span mobile (procurement on-the-go) to desktop (engineers at workstations)
- [ ] **Core Components (10-12)** - Button, Input, Select, Textarea, Checkbox, Radio, Card, Nav, Breadcrumbs, Modal, Tooltip, Toast
- [ ] **Form Components** - Contact forms are essential for B2B lead generation
- [ ] **Logo Guidelines** - Rules for using existing logo variants
- [ ] **Basic Iconography** - 20-30 essential icons (navigation, UI, product categories)
- [ ] **Documentation Site** - Searchable static site with component usage, do's/don'ts, code examples
- [ ] **Accessibility Baseline** - WCAG 2.1 AA for all components. Non-negotiable for corporate site

**Why these?** Agencies can build homepage, product pages, contact forms - the essential B2B manufacturing website. Everything else adds value but isn't blocking.

### Add After Validation (v1.1 - v1.5)

Features to add once core system is being used and feedback emerges.

- [ ] **3D Visualization Guidelines** - Hydrophon's differentiator deserves dedicated guidelines. Complex enough to defer until foundations are solid
- [ ] **Technical Data Display Patterns** - Product spec sheets, comparison tables. Real usage will inform what patterns are needed
- [ ] **Data Tables Component** - Sortable, filterable tables for technical specs, pricing
- [ ] **Advanced Components** - Tabs, Accordion, Dropdown menu, Pagination, Tags, Badges
- [ ] **Dark Mode Support** - Complete token set for dark theme. Nice-to-have for technical audience
- [ ] **Email Templates** - Marketing needs these eventually, but not critical for website launch
- [ ] **Motion Guidelines** - Loading states, transitions, hover effects. Adds polish
- [ ] **Multi-Language Support** - Token structure for text flexibility, guidance for German/English content
- [ ] **CAD Asset Integration Guidelines** - How to present downloadable STEP/IGES files. Trigger: when engineers request this
- [ ] **Extended Iconography** - Product-specific icons, technical symbols. Add as categories expand

**Trigger for adding:** Wait for real requests from website team or agency. "We need X component" or "Users are asking about Y feature"

### Future Consideration (v2.0+ - Advanced Capabilities)

Features to defer until product-market fit is established and system is widely adopted.

- [ ] **Interactive Product Configurator** - High engineering effort. Defer until core website proves value of 3D approach
- [ ] **AR/VR Guidelines** - Emerging tech for product visualization. Wait for browser support to mature
- [ ] **Advanced Animation System** - Choreographed multi-element animations. Overkill for B2B manufacturing initially
- [ ] **Design System Contribution Model** - Formal process for teams to propose new components. Needed when 3+ teams actively using
- [ ] **Automated Accessibility Testing** - CI/CD integration for a11y checks. Value increases with component count
- [ ] **Version Management System** - Semantic versioning, deprecation policies. Essential when external teams depend on system
- [ ] **Component Variants System** - Systematic approach to button sizes, card layouts, etc. Adds complexity - start simple
- [ ] **Print Guidelines** - Brochures, catalogs, trade show materials. Different medium, different priorities
- [ ] **White-Label System** - If Hydrophon launches sub-brands. Not applicable now

**Why defer:** These solve problems you don't have yet. Build when pain is real, not anticipated.

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| Design Tokens | HIGH | MEDIUM | P1 |
| Color System | HIGH | MEDIUM | P1 |
| Typography System | HIGH | MEDIUM | P1 |
| Spacing System | HIGH | LOW | P1 |
| Grid & Breakpoints | HIGH | MEDIUM | P1 |
| Core Components (10-12) | HIGH | HIGH | P1 |
| Documentation Site | HIGH | MEDIUM | P1 |
| Logo Guidelines | HIGH | LOW | P1 |
| Accessibility (WCAG 2.1 AA) | HIGH | HIGH | P1 |
| Basic Iconography | MEDIUM | MEDIUM | P1 |
| 3D Visualization Guidelines | HIGH | HIGH | P2 |
| Technical Data Patterns | MEDIUM | MEDIUM | P2 |
| Data Tables | MEDIUM | MEDIUM | P2 |
| Dark Mode | LOW | MEDIUM | P2 |
| Advanced Components | MEDIUM | MEDIUM | P2 |
| Email Templates | MEDIUM | LOW | P2 |
| Motion Guidelines | LOW | LOW | P2 |
| Multi-Language Support | MEDIUM | MEDIUM | P2 |
| CAD Asset Guidelines | MEDIUM | LOW | P2 |
| Extended Iconography | LOW | MEDIUM | P2 |
| Product Configurator | HIGH | VERY HIGH | P3 |
| AR/VR Guidelines | LOW | HIGH | P3 |
| Advanced Animations | LOW | MEDIUM | P3 |
| Contribution Model | LOW | LOW | P3 |
| Automated a11y Testing | MEDIUM | MEDIUM | P3 |
| Version Management | LOW | MEDIUM | P3 |
| Print Guidelines | MEDIUM | MEDIUM | P3 |

**Priority key:**
- **P1: Must have for launch** - Blocks website development without these
- **P2: Should have, add when possible** - Adds value, improves system, informed by usage
- **P3: Nice to have, future consideration** - Solves problems you don't have yet

## B2B Manufacturing Context

### User Type Considerations

**Designers (Agency Partners)**
- Need Figma component library with documentation
- Want clear guidelines to avoid constant "is this right?" questions
- Value: Token system, component library, visual examples

**Developers (Agency + Internal)**
- Need code-ready components with accessibility baked in
- Want clear implementation examples in their framework
- Value: Design tokens exported to CSS, component code samples, responsive behavior specs

**Marketing Team (Internal)**
- Need to update content without breaking design
- Want templates for common pages (product launch, case study)
- Value: Documentation in plain language, CMS-compatible patterns, email templates

**Engineers (End Users - Hydrophon's Customers)**
- Need technical specs, CAD downloads, product comparisons
- Want efficient access to data, not marketing fluff
- Value: Technical data patterns, CAD integration, comparison tools, fast-loading 3D

**Procurement (End Users)**
- Need pricing, lead times, supplier stability signals
- Want efficient RFQ process
- Value: Clear CTAs, form components, tiered pricing display

### B2B Manufacturing Priorities

1. **Function > Form** - Engineers value technical accuracy over visual flourishes
2. **Efficiency** - B2B users are task-oriented. Minimize clicks to specs/contact
3. **Trust Signals** - Certifications, case studies, technical documentation build credibility
4. **Mobile Reality** - Procurement increasingly mobile, but engineers still primarily desktop
5. **3D Differentiation** - Hydrophon's unique approach must be showcased properly

## Competitor Feature Analysis

Based on typical B2B manufacturing design systems (Siemens, Bosch, BASF, etc.):

| Feature | Typical B2B Approach | Hydrophon's Opportunity |
|---------|---------------------|-------------------------|
| Product Visualization | Standard photography, multiple angles | **3D renders with consistent lighting/materials - more flexible, lower cost** |
| Color Palette | Conservative (blue/grey common) | Blue primary fits industry norm, can differentiate with bolder secondary palette |
| Component Library | Comprehensive (50+ components) | **Start lean (10-12), grow based on real needs** |
| Documentation | Often internal-only or developer-focused | **Multi-audience docs (design, dev, marketing) from day one** |
| CAD Integration | Often basic file links | **Opportunity: preview thumbnails, metadata, integrated in product cards** |
| Accessibility | Varies widely, often retrofitted | **Build in WCAG 2.1 AA from start - table stakes for 2026** |
| Multi-Language | Common for global manufacturers | **Plan for German/English, token structure allows expansion** |
| Design Tokens | Increasingly standard | **Critical for Hydrophon's multi-user scenario (agencies + internal)** |
| Dark Mode | Rare in B2B manufacturing | **Opportunity: differentiate with technical audience** |
| 3D Configurators | High-end feature, not common | **Aspirational for Hydrophon - defer to v2 after foundation proves value** |

**Key Insight:** Most B2B manufacturing sites are mediocre. Table stakes (solid foundations, accessibility, responsive design) done well already puts Hydrophon ahead. 3D visualization is the real differentiator - but requires solid foundation first.

## Sources

### Design System Fundamentals
- [10 Best Design System Examples for 2026 | DesignRush](https://www.designrush.com/best-designs/websites/trends/design-system-examples)
- [What is a Design System? A 2026 Guide | Untitled UI](https://www.untitledui.com/blog/what-is-a-design-system)
- [Best design system examples in 2026](https://www.adhamdannaway.com/blog/design-systems/design-system-examples)
- [Foundations of a design system](https://www.designsystemcore.com/blog/foundations-design-system)

### B2B Manufacturing Context
- [Best Practices for B2B Web Design for Manufacturing](https://www.americaneagle.com/insights/blog/post/best-practices-for-b2b-web-design-for-manufacturing-and-distribution-industries)
- [Building a Successful Design System for B2B Products | UX Cabin](https://www.uxcabin.com/blog/building-a-successful-design-system-for-b2b-products)
- [B2B Design and Tech Trends 2026 - OZ Global B2B](https://ozglobalb2b.com/blog/b2b-design-and-tech-trends-2026/)
- [Top 10 B2B Website Design Trends for 2026 - Axon Garside](https://www.axongarside.com/blog/b2b-website-design-trends-2026)
- [Best B2B Manufacturing Content Strategies for 2026](https://www.brandedagency.com/blog/the-best-content-formats-for-b2b-manufacturing-companies-15-powerful-strategies-for-2026)

### Component Libraries
- [Components | U.S. Web Design System (USWDS)](https://designsystem.digital.gov/components/overview/)
- [Carbon Design System](https://carbondesignsystem.com/components/button/usage/)
- [Atlassian Design](https://atlassian.design/components/)
- [15 Best React UI Libraries for 2026](https://www.builder.io/blog/react-component-libraries-2026)

### Design Tokens
- [Design tokens explained | Contentful](https://www.contentful.com/blog/design-token-system/)
- [Figma Design Tokens: How to Build a Scalable Design System](https://sergeichyrkov.com/blog/how-to-build-a-figma-design-system-with-variables-and-design-tokens)
- [The Complete Guide to Design Systems in Figma (2026 Edition)](https://medium.com/@EmiliaBiblioKit/the-world-of-design-systems-is-no-longer-just-about-components-and-libraries-its-about-5beecc0d21cb)
- [Streamlining Your Design System: A Guide to Tokens and Naming Conventions](https://medium.com/@wicar/streamlining-your-design-system-a-guide-to-tokens-and-naming-conventions-3e4553aa8821)

### Foundation Elements
- [The Anatomy of Typography in Design Systems](https://designsystems.surf/articles/more-than-just-fonts-the-anatomy-of-typography-in-design-systems)
- [Design tokens for designers: A practical guide](https://penpot.app/blog/design-tokens-for-designers/)
- [OutSystems UI: A Design System Foundation](https://www.outsystems.com/blog/posts/design-system-foundation/)

### Responsive Design & Grid
- [Layout grid | U.S. Web Design System](https://designsystem.digital.gov/utilities/layout-grid/)
- [Responsive Design Breakpoints: 2025 Playbook](https://dev.to/gerryleonugroho/responsive-design-breakpoints-2025-playbook-53ih)
- [Breakpoint: Responsive Design Breakpoints in 2025 | BrowserStack](https://www.browserstack.com/guide/responsive-design-breakpoints)
- [Responsive layout grid | Material Design](https://m2.material.io/design/layout/responsive-layout-grid.html)

### Accessibility
- [Accessibility | U.S. Web Design System](https://designsystem.digital.gov/documentation/accessibility/)
- [Carbon Design System - Accessibility](https://carbondesignsystem.com/guidelines/accessibility/overview/)
- [WCAG for Designers: A Practical Guide](https://birdeatsbug.com/blog/wcag-for-designers)
- [Design Systems Accessibility: Building Components for Everyone](https://montanab.com/2025/03/accessible-design-systems-building-components-for-everyone/)
- [Get to WCAG 2.2 faster with the GOV.UK Design System](https://accessibility.blog.gov.uk/2024/01/11/get-to-wcag-2-2-faster-with-the-gov-uk-design-system/)

### Brand Guidelines & Iconography
- [A complete guide to iconography](https://www.designsystems.com/iconography-guide/)
- [The Ultimate Guide to Brand Guidelines (+ Examples) in 2026](https://kijo.co.uk/blog/brand-guidelines/)
- [What Is A Brand Design System? 11 Best Examples](https://gingersauce.co/what-is-a-brand-design-system-11-best-examples/)
- [Logo Design Trends 2026 | Creative Bloq](https://www.creativebloq.com/design/logos-icons/these-logo-design-trends-will-define-2026)

### Documentation & Team Structure
- [Design System Documentation: A Practical Guide](https://www.designrush.com/best-designs/print/trends/design-system-documentation)
- [How to Structure Your Design System Using Supernova](https://www.supernova.io/blog/how-to-structure-your-design-system-using-supernova)
- [Building the Ultimate Design System: Architecture Guide for 2026](https://medium.com/@padmacnu/building-the-ultimate-design-system-a-complete-architecture-guide-for-2026-6dfcab0e9999)
- [Team Models for Scaling a Design System | EightShapes](https://medium.com/eightshapes-llc/team-models-for-scaling-a-design-system-2cf9d03be6a0)

### 3D/CAD in Manufacturing
- [3D Visualization | Dassault Systèmes](https://www.3ds.com/technologies/cad-software/3d-visualization)
- [3D Visualization Software for Manufacturers - CDS Visual](https://cdsvisual.com/)
- [What's New in Designcenter Solid Edge 2026](https://blogs.sw.siemens.com/solidedge/designcenter-solid-edge-2026/)

### Anti-Patterns
- [Design Systems in 2026: Predictions, Pitfalls, and Power Moves](https://rydarashid.medium.com/design-systems-in-2026-predictions-pitfalls-and-power-moves-f401317f7563)
- [Anti-patterns You Should Avoid in Your Code](https://www.freecodecamp.org/news/antipatterns-to-avoid-in-code/)
- [A Deeper Look at Software Architecture Anti-Patterns](https://medium.com/@srinathperera/a-deeper-look-at-software-architecture-anti-patterns-9ace30f59354)

---
*Feature research for: Hydrophon Kunststoff GmbH Corporate Design System*
*Researched: 2026-01-28*
*Confidence: HIGH (verified with multiple authoritative sources from 2025-2026)*
