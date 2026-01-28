# Pitfalls Research

**Domain:** Corporate Design Systems for B2B Manufacturing
**Researched:** 2026-01-28
**Confidence:** HIGH

## Critical Pitfalls

### Pitfall 1: Building Too Much Too Fast (Scope Creep)

**What goes wrong:**
Teams attempt to create a complete component library at launch instead of starting small and iterating. This leads to months of work before anyone can use the system, creating a "big bang" release that's overwhelming, full of unused components, and doesn't address actual user needs.

**Why it happens:**
The desire to be "comprehensive" and fear that stakeholders won't see value unless the system looks complete. Teams confuse thoroughness with usefulness.

**How to avoid:**
- Start with 8-10 essential components that solve immediate, real problems
- Prioritize based on frequency of use, not theoretical completeness
- Launch early (6-8 weeks), then iterate based on actual usage data
- Use the "if we only had time for 3 components, which would they be?" test

**Warning signs:**
- Release timeline extends beyond 3 months for initial version
- Component list includes edge cases or "nice to have" items
- No clear prioritization based on real project needs
- Team discussing components no one has requested yet

**Phase to address:**
Phase 1 (Foundation) - Establish scope boundaries and MVP component list based on actual website needs, not theoretical completeness.

---

### Pitfall 2: Documentation Mismatch (Too Technical OR Too Shallow)

**What goes wrong:**
Documentation targets the wrong audience, becoming either impenetrable technical references that intimidate non-developers, or oversimplified guides that lack the implementation details developers need. This creates a two-tier system where developers and designers work from different sources of truth.

**Why it happens:**
Single-audience thinking. Teams assume "documentation" means one thing, not realizing they need multiple layers for different user types (marketing users, designers, developers).

**How to avoid:**
- Create three documentation tiers:
  - **Quick Start** (visual, no code): For marketing and non-technical users
  - **Design Guidelines** (Figma, usage patterns): For designers and agencies
  - **Technical Reference** (API, props, code): For developers
- Test documentation with actual users from each group before launch
- Use real-world examples, not abstract demonstrations
- Include both "what" (component description) and "when" (usage guidance)

**Warning signs:**
- Feedback like "I don't understand this" AND "where are the technical details?"
- Documentation has no clear audience statement
- Every page has the same structure/depth regardless of topic
- No testing with actual agencies or internal teams before launch

**Phase to address:**
Phase 2 (Documentation Structure) - Define documentation architecture with clear audience segmentation, then test with representatives from each user group.

---

### Pitfall 3: Design-Code Drift (Figma ≠ Implementation)

**What goes wrong:**
Figma library and code components diverge over time. Designers create mockups using updated Figma components, but developers implement using outdated code components. The resulting website doesn't match the designs, breaking trust in the system.

**Why it happens:**
Manual synchronization between design and code. One team updates without notifying the other, or updates happen at different cadences. No single source of truth.

**How to avoid:**
- Treat design tokens as the single source of truth, not Figma or code
- Set up automated syncing: tokens → Figma variables + code exports
- Implement version numbers that span both Figma and code (v1.2.0 applies to both)
- Create a change approval process where design AND code must update together
- Use automated tools (Style Dictionary, Tokens Studio) for token transformation

**Warning signs:**
- Developers asking "which component version should I use?"
- Designers updating Figma without code updates (or vice versa)
- Color/spacing values hardcoded in multiple places
- No shared versioning system across design and code
- "Just this once" manual overrides becoming common

**Phase to address:**
Phase 1 (Foundation) - Establish design tokens as source of truth with automated export pipeline. Phase 3 (Component Development) - Implement versioning system before building first components.

---

### Pitfall 4: No Clear Ownership or Governance

**What goes wrong:**
The design system belongs to "everyone" (therefore no one). Without a designated maintainer, contributions pile up without review, documentation falls out of date, and the system gradually degrades. Teams stop trusting it and build custom solutions instead.

**Why it happens:**
Assumption that design systems are "finished" projects rather than living products requiring ongoing maintenance. Lack of budget allocation for continued work.

**How to avoid:**
- Establish a federated governance model for multi-agency context:
  - **Core team** (1-2 people at Hydrophon): Final decisions, quality control, versioning
  - **Contributors** (agencies + internal): Propose additions, report issues
  - **Users** (all teams): Consume system, provide feedback
- Define clear contribution process with approval gates
- Allocate 20-30% ongoing time for maintenance (not just initial build)
- Create a public roadmap showing who owns what

**Warning signs:**
- No one can answer "who maintains this?"
- Contributions sit unreviewed for weeks
- Documentation updates happen randomly or not at all
- Different teams making conflicting changes
- No process for requesting new components or reporting issues

**Phase to address:**
Phase 2 (Documentation Structure) - Define governance model and document contribution process before opening system to external agencies.

---

### Pitfall 5: Lack of Organizational Buy-In

**What goes wrong:**
Leadership sees the design system as a costly distraction from "real work." They don't allocate resources for maintenance, question ROI, and pressure teams to bypass the system to meet deadlines. Without executive support, the system is abandoned within 6-12 months.

**Why it happens:**
Failure to communicate business value in leadership language. Design systems discussed in design/tech terms (consistency, reusability) rather than business outcomes (faster time-to-market, reduced costs, brand control).

**How to avoid:**
- Frame benefits in business terms:
  - **Speed**: "New landing pages in 2 days instead of 2 weeks"
  - **Cost**: "3 agencies using shared system vs. rebuilding components 3x"
  - **Control**: "Brand consistency across all external agencies"
  - **Scale**: "Add new products without redesigning from scratch"
- Show quick wins: Build 1-2 pages using system vs. old process, measure time difference
- Get early stakeholder involvement: Include leadership in phase planning
- Demonstrate pilot project success before full rollout

**Warning signs:**
- Budget discussions focus only on initial build, not maintenance
- Leadership asks "why is this taking so long?"
- System framed as "nice to have" rather than strategic infrastructure
- No metrics defined to measure success
- Stakeholders see design system as designer/developer problem, not business opportunity

**Phase to address:**
Phase 0 (Pre-Planning) - Secure executive buy-in with business case before starting. Phase 1 (Foundation) - Create pilot project demonstrating ROI early.

---

### Pitfall 6: Treating System as "Complete" Instead of Evolving

**What goes wrong:**
Team launches the design system, declares victory, and moves on. The system becomes frozen in time while business needs evolve. Within 6 months, it's outdated and teams start working around it, leading to system abandonment.

**Why it happens:**
Project mindset instead of product mindset. Viewing design system as a deliverable with an end date rather than a living infrastructure requiring continuous evolution.

**How to avoid:**
- Establish versioning strategy from day 1 (semantic versioning: major.minor.patch)
- Schedule quarterly review cycles to evaluate usage and gaps
- Create feedback loops: Monthly check-ins with agencies and internal teams
- Budget for ongoing evolution (20-30% FTE, not just initial build)
- Maintain a public roadmap showing planned improvements

**Warning signs:**
- Team celebrates "completion" and disbands
- No process for requesting new components or changes
- "We'll add that in v2" without defined v2 timeline
- Competing systems starting to emerge (teams building alternatives)
- Feedback goes unaddressed for months

**Phase to address:**
Phase 2 (Documentation Structure) - Document evolution process and version management. Phase 5 (Iteration Planning) - Establish ongoing maintenance cadence before launch.

---

### Pitfall 7: Ignoring Developer Experience (DX)

**What goes wrong:**
The system is harder to use than building from scratch. Installation is complicated, documentation assumes knowledge, and the API is inconsistent. Developers quietly stop using it and build custom solutions that look similar but aren't part of the system.

**Why it happens:**
Focus on design excellence and visual consistency while neglecting implementation reality. Assuming "if we build it, they will use it" without considering friction.

**How to avoid:**
- Make adoption frictionless:
  - One-command installation
  - Copy-paste code examples that actually work
  - Clear error messages with solutions
  - Consistent API patterns across components
- Test with actual developers (not just component authors)
- Provide both React components AND plain HTML/CSS for flexibility
- Include troubleshooting guides for common issues

**Warning signs:**
- Developers asking the same basic questions repeatedly
- Installation requires more than 3 steps
- Code examples don't run when copied
- Developers building "custom versions" of system components
- Feedback like "it's easier to just build it myself"

**Phase to address:**
Phase 3 (Component Development) - Test developer experience with external agency developers before launch. Phase 4 (Website Integration) - Gather friction points during first real implementation.

---

### Pitfall 8: Missing Critical Components (Blocking Development)

**What goes wrong:**
System launches with buttons, typography, and colors but lacks the components teams actually need for real projects (forms, data tables, navigation patterns). Development stops waiting for missing pieces, or teams build non-standard versions.

**Why it happens:**
Building components in isolation without validating against actual project requirements. Choosing components based on "what design systems usually have" rather than "what our projects need."

**How to avoid:**
- Audit existing website and agency projects FIRST
- Identify the 10-15 components used in 80% of pages
- Prioritize by frequency × complexity × inconsistency
- Include "boring but essential" components (forms, error states, loading patterns)
- Validate component list with agencies before building

**Warning signs:**
- Teams saying "the system doesn't have what we need"
- Custom components being built outside the system
- Launch delayed because of missing dependencies
- Component list includes exotic patterns but no forms
- No one validated against real project requirements

**Phase to address:**
Phase 1 (Foundation) - Conduct component audit of existing sites and agency needs. Prioritize by actual usage, not design interest.

---

### Pitfall 9: Design Tokens Implementation Mess

**What goes wrong:**
Tokens are poorly named (color.blue instead of color.primary.default), inconsistently applied, or exist only in Figma without code synchronization. This creates a "token theater" where tokens exist but aren't actually providing value.

**Why it happens:**
Treating tokens as Figma features instead of strategic infrastructure. One-time export instead of automated pipeline. No naming conventions established upfront.

**How to avoid:**
- Establish naming conventions FIRST (semantic, not descriptive):
  - ✓ color.primary.default, spacing.scale.md
  - ✗ color.blue-500, spacing.16px
- Use automated transformation tools (Style Dictionary) with CI/CD integration
- Export to multiple formats: CSS variables, SCSS, JSON, iOS, Android
- Version tokens independently from components
- Test token changes across all platforms before merging

**Warning signs:**
- Token names describe appearance not purpose
- Manual export process (someone has to "remember to export")
- Tokens in Figma don't match tokens in code
- Developers hard-coding values instead of using tokens
- Different token structures for web vs. other platforms

**Phase to address:**
Phase 1 (Foundation) - Establish token naming system and automated export pipeline before building any components. This is the foundation everything else depends on.

---

### Pitfall 10: Single-Channel Feedback (GitHub-Only Trap)

**What goes wrong:**
System feedback limited to GitHub issues, effectively excluding non-technical users (designers, marketing) from contributing. This creates an echo chamber where only developers influence system evolution, missing critical user needs.

**Why it happens:**
Developer-centric thinking. GitHub is convenient for technical teams but creates barriers for other stakeholders.

**How to avoid:**
- Provide multiple feedback channels:
  - **GitHub Issues**: For developers (bugs, feature requests with code)
  - **Feedback form in documentation**: For quick suggestions (all users)
  - **Slack/Teams channel**: For questions and discussions
  - **Quarterly review meetings**: For strategic feedback from agencies
- Route all feedback to a central triage process
- Acknowledge all feedback within 48 hours, even if not immediately actioning

**Warning signs:**
- All feedback comes from developers, none from designers/marketing
- Designers complaining "I don't know how to report issues"
- Agencies not participating in system evolution
- GitHub issues written by developers on behalf of others
- Low engagement from non-technical stakeholders

**Phase to address:**
Phase 2 (Documentation Structure) - Set up multi-channel feedback system accessible to all user types before external launch.

---

## Technical Debt Patterns

Shortcuts that seem reasonable but create long-term problems.

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Hard-coding colors instead of tokens | Faster initial development | Rebranding requires finding/changing hundreds of values | Never (tokens are foundational) |
| Building components without accessibility | Ship faster | Legal risk, expensive remediation, user exclusion | Never (accessibility must be built in) |
| Skipping documentation for "obvious" components | Save time now | Repeated questions, inconsistent usage, training overhead | Never for public-facing components |
| One-time Figma-to-code export | Quick initial sync | Permanent drift between design and code | Only for throwaway prototypes |
| Starting without design tokens | Faster setup | Impossible to scale across platforms | Never in multi-platform contexts |
| Building all components before testing | Feel productive | Building wrong things, major rework needed | Never - validate early with pilot projects |
| Manual version management | Simple initially | Inconsistent versioning, broken dependencies | Only for internal-only alpha versions |
| Combining all CSS in one file | Easy to manage initially | Performance issues, difficult debugging at scale | Acceptable for very small systems (<10 components) |

## Organizational Pitfalls (B2B Manufacturing Context)

Domain-specific challenges for Hydrophon's multi-agency, B2B context.

### Pitfall 11: Designing for Internal Opinions Instead of Users

**What goes wrong:**
System shaped by sales requests, executive preferences, or edge cases rather than real user behavior. Results in bloated interfaces that make sense internally but confuse actual users.

**How to avoid:**
- Validate all component decisions against real project requirements
- Test with actual agency teams before finalizing
- Prioritize frequent use cases over executive pet features
- Document decision rationale to push back on opinion-based requests

**Warning signs:**
- "The CEO wants this component" without usage justification
- Components designed for hypothetical future needs
- Agency feedback ignored in favor of internal preferences

**Phase to address:**
Phase 1 (Foundation) & Phase 3 (Component Development) - Establish user research process and validation gates.

---

### Pitfall 12: B2C Patterns Applied Directly to B2B

**What goes wrong:**
Importing consumer-focused design patterns into B2B manufacturing context without adaptation. Results in surface-level improvements while leaving core workflows fragmented.

**How to avoid:**
- Recognize B2B-specific needs:
  - Technical specifications and data tables are primary, not secondary
  - Users need efficiency over delight
  - Information density is appropriate (not minimalism for its own sake)
  - Technical accuracy more important than marketing polish
- Test patterns with actual B2B users (procurement, engineers, facility managers)

**Warning signs:**
- Heavy focus on animations/interactions over content
- Hiding technical details to "simplify"
- Patterns optimized for casual browsing not task completion

**Phase to address:**
Phase 1 (Foundation) - Define B2B-specific design principles before building components.

---

### Pitfall 13: Misaligned Prioritization Across Agencies

**What goes wrong:**
Agency A needs forms, Agency B needs product grids, Agency C needs navigation. System tries to build for all simultaneously, creating bottlenecks and delayed launches. Or worse, prioritizes by loudest voice not actual strategic value.

**How to avoid:**
- Establish transparent prioritization criteria:
  - Frequency of use across all projects
  - Number of projects blocked by missing component
  - Strategic importance to business goals
  - Effort required vs. value delivered
- Create a shared roadmap visible to all agencies
- Hold monthly prioritization meetings with agency representatives

**Warning signs:**
- Different agencies building same component separately
- "When will you build X?" asked repeatedly without clear answer
- Priority changes based on who asked most recently
- No visible roadmap showing what's being worked on

**Phase to address:**
Phase 2 (Documentation Structure) - Document prioritization process and establish agency liaison structure before opening contributions.

---

### Pitfall 14: Feature Overload (More ≠ Better)

**What goes wrong:**
Belief that more components/features equals more value. System becomes overwhelming, hard to navigate, and reduces clarity. Users can't find what they need because there are too many options.

**How to avoid:**
- Apply 80/20 rule: 20% of components used in 80% of projects
- Resist "nice to have" additions without clear, frequent use cases
- Combine similar components instead of proliferating variants
- Regular pruning: Remove unused components annually

**Warning signs:**
- Component library has 50+ components but teams use 10
- Multiple components serving similar purposes
- "Kitchen sink" mentality ("let's add everything")
- Usage data shows components with <5% adoption

**Phase to address:**
Phase 1 (Foundation) - Set scope boundaries with "must justify with 3 real use cases" rule. Phase 5 (Iteration Planning) - Establish usage tracking and pruning process.

---

## Integration Gotchas

Common mistakes when connecting to agency workflows and technical environments.

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| Agency Figma Libraries | Assuming agencies will switch to your library | Provide both Figma library AND export options (Sketch, XD, design tokens) |
| External Hosting | Hosting documentation on internal-only systems | Use public documentation site with tiered access (public guidelines, internal specs) |
| Version Distribution | Agencies manually downloading updates | Use npm packages with semantic versioning, notify on updates |
| Brand Guidelines Integration | Design system separate from brand guidelines | Integrate brand guidelines INTO design system documentation |
| CMS Integration | Assuming components work with all CMS platforms | Test with agencies' actual CMS tools (WordPress, Webflow, etc.) |
| Export Formats | Only providing React components | Offer multiple formats: React, Vue, plain HTML/CSS, Figma |
| Design Handoff | Assuming Figma inspect is enough | Provide explicit redlines and developer-friendly specs |

## Performance & Scale Traps

Patterns that work at small scale but fail as usage grows.

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| All CSS in single file | Works fine initially | Use modular CSS with tree-shaking | 50+ components, 200KB+ CSS |
| No component lazy loading | Fast development | Implement code splitting and lazy loading | 20+ heavy components |
| Unoptimized SVG icons | Icons work fine | Optimize SVGs, use icon fonts or sprite sheets | 100+ icons across site |
| Token files too granular | Good organization | Balance granularity with performance | 500+ individual token files |
| No caching strategy | Fresh content always | Implement versioned CDN caching | Multiple agency sites using system |
| Heavy component dependencies | Easy development | Minimize dependencies, tree-shake aggressively | Production bundle >500KB |
| Real-time Figma sync | Always up to date | Scheduled sync (daily/weekly), not real-time | 10+ teams making simultaneous changes |

## "Looks Done But Isn't" Checklist

Things that appear complete but are missing critical pieces.

- [ ] **Components built but not documented:** Components exist in code but no usage guidelines, examples, or API docs - teams won't know how to use them
- [ ] **Design tokens defined but not automated:** Tokens exist as JSON but require manual export/sync - guarantees drift within weeks
- [ ] **Figma library published but no update strategy:** Library exists but no process for versioning, communicating changes, or handling breaking changes
- [ ] **Documentation exists but not tested:** Docs written but never validated with actual agencies or non-technical users - may be incomprehensible
- [ ] **Components responsive on desktop but not mobile:** Looks great on designer's monitor, breaks on phones/tablets - verify all breakpoints
- [ ] **Accessibility claimed but not validated:** Components have ARIA labels but never tested with screen readers or keyboard navigation
- [ ] **Version numbers exist but no changelog:** Semantic versioning implemented but no communication about what changed between versions
- [ ] **Feedback channels created but no triage process:** Forms/Slack exist but no one monitoring or routing feedback - creates black hole
- [ ] **Components work in isolation but not together:** Individual components perfect, but combining them reveals spacing/z-index/specificity conflicts
- [ ] **Code works but no error states:** Happy path implemented but no handling for loading, errors, empty states, edge cases
- [ ] **Single brand only:** System works for current brand but will break if company acquires new brands or needs multi-brand support
- [ ] **Design decisions documented but rationale missing:** "Use component X" documented but not WHY, making it hard to know when to break rules

## Recovery Strategies

When pitfalls occur despite prevention, how to recover.

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| Design-Code Drift | HIGH | 1. Audit all components for discrepancies. 2. Establish single source of truth (tokens). 3. Rebuild sync pipeline. 4. Re-align versions. Plan 4-6 weeks. |
| Poor Token Naming | MEDIUM | 1. Document migration path. 2. Use token aliases temporarily. 3. Deprecate old names with warnings. 4. Hard cut-over in major version. Plan 2-4 weeks. |
| No Governance | MEDIUM | 1. Freeze new contributions. 2. Establish governance model. 3. Document contribution process. 4. Triage backlog. 5. Resume with new structure. Plan 2-3 weeks. |
| Missing Components | LOW-MEDIUM | 1. Prioritize based on blocking projects. 2. Fast-track essential components. 3. Document workarounds for others. Plan 1-4 weeks depending on complexity. |
| Lost Buy-In | HIGH | 1. Gather failure evidence (inconsistencies, wasted effort). 2. Build pilot project showing improvement. 3. Present business case with metrics. 4. Start small with supportive team. Plan 6-12 weeks. |
| Documentation Too Technical | LOW | 1. Add beginner tier with minimal jargon. 2. Add visual examples. 3. Test with non-technical users. 4. Iterate based on feedback. Plan 1-2 weeks. |
| Documentation Too Shallow | LOW | 1. Add technical reference section. 2. Include API docs, prop tables. 3. Add advanced examples. 4. Test with developers. Plan 1-2 weeks. |
| Scope Creep | MEDIUM | 1. Freeze development. 2. Audit usage of existing components. 3. Remove unused components. 4. Focus on top 10 by usage. 5. Launch simplified version. Plan 2-4 weeks. |
| GitHub-Only Feedback | LOW | 1. Add website feedback form. 2. Create Slack channel. 3. Communicate new channels. Plan 1 week. |
| Static System | MEDIUM | 1. Establish version strategy. 2. Create public roadmap. 3. Schedule quarterly reviews. 4. Budget ongoing maintenance. Plan 2-3 weeks setup. |

## Pitfall-to-Phase Mapping

How roadmap phases should address these pitfalls.

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| Building Too Much Too Fast | Phase 1: Foundation | Component list has 8-10 items maximum, all validated against real projects |
| Documentation Mismatch | Phase 2: Documentation Structure | Three-tier docs tested with agencies, developers, marketing |
| Design-Code Drift | Phase 1: Foundation | Automated token pipeline with version parity across Figma and code |
| No Clear Ownership | Phase 2: Documentation Structure | Governance model documented, core team named, contribution process defined |
| Lack of Organizational Buy-In | Phase 0: Pre-Planning | Executive sponsor named, budget for ongoing maintenance approved |
| Treating System as Complete | Phase 5: Iteration Planning | Quarterly review schedule, public roadmap, ongoing maintenance budget |
| Ignoring Developer Experience | Phase 3: Component Development | External developer testing completed before launch, <5 min installation |
| Missing Critical Components | Phase 1: Foundation | Component audit completed, prioritization validated with agencies |
| Design Tokens Mess | Phase 1: Foundation | Token naming conventions defined, automated exports to 3+ formats |
| Single-Channel Feedback | Phase 2: Documentation Structure | 3+ feedback channels operational, triage process documented |
| Designing for Internal Opinions | Phase 1: Foundation | User research completed with agencies, validation gates established |
| B2C Patterns Applied to B2B | Phase 1: Foundation | B2B-specific design principles documented and reviewed |
| Misaligned Agency Prioritization | Phase 2: Documentation Structure | Transparent prioritization criteria, shared roadmap, monthly agency meetings |
| Feature Overload | Phase 1: Foundation | Scope boundaries with "3 use case" rule enforced |

## Sources

### Design System Pitfalls & Common Mistakes
- [Design Systems Pitfalls | Medium](https://medium.com/@withinsight1/design-systems-pitfalls-6b3113fa0898)
- [Design Systems in 2026: Predictions, Pitfalls, and Power Moves | Medium](https://rydarashid.medium.com/design-systems-in-2026-predictions-pitfalls-and-power-moves-f401317f7563)
- [9 Design System Traps to Avoid | Modus Create](https://moduscreate.com/blog/9-design-system-traps-to-avoid/)
- [5 Things to Avoid When Building a Design System | Backlight](https://backlight.dev/blog/5-things-to-avoid-when-building-a-design-system)
- [Main Challenges and Mistakes in Creating Your Design System | Habr](https://habr.com/en/companies/innotech/articles/704576/)
- [Design System Adoption Pitfalls | Netguru](https://www.netguru.com/blog/design-system-adoption-pitfalls)

### Design System Failures
- [Why Design Systems Fail | Knapsack](https://www.knapsack.cloud/blog/why-design-systems-fail)
- [8 Ways Your Design System Can Fail | Creative Online](https://www.creative.onl/8-ways-your-design-system-can-fail-and-how-to-avoid-them/)
- [Why Most Design Systems Fail – and How to Cultivate Success | UI Patterns](https://ui-patterns.com/blog/why-most-design-systems-fail-and-how-to-cultivate-success)
- [Five Reasons Your First Design System Will Fail | Rangle](https://rangle.io/blog/why-your-first-design-system-will-fail)
- [When Your Design System Fails | Medium](https://medium.com/design-paperless-post/when-your-design-system-fails-f035041ad6d2)
- [Why Design Systems Fail, and How to Make Them Work | Marvel Blog](https://marvelapp.com/blog/why-design-systems-fail-how-to-make-them-work/)

### Documentation Issues
- [Common Design System Documentation Mistakes | UXPin](https://www.uxpin.com/studio/blog/common-design-system-documentation-mistakes/)
- [Design System Documentation Best Practices | Backlight](https://backlight.dev/blog/design-system-documentation-best-practices)
- [The Dark Side of Design Systems - Mistakes, Missteps, and Lessons Learned | Sakalim](https://sakalim.com/content/the-dark-side-of-design-systems-mistakes-missteps-and-lessons-learned)
- [The Dumbest Design System Mistakes | Romina Kavcic](https://learn.thedesignsystem.guide/p/the-dumbest-design-system-mistakes)

### Governance & Adoption
- [Design System: Governance and Adoption | DEV Community](https://dev.to/denis_bratchikov/design-system-governance-and-adoption-30ai)
- [Design System Governance Models | UX Planet](https://uxplanet.org/design-system-governance-models-f66a97367ad5)
- [Design System Governance | UXPin](https://www.uxpin.com/studio/blog/design-system-governance/)
- [On Design Systems: Scope and Governance | Dept Agency](https://engineering.deptagency.com/on-design-systems-scope-and-governance)

### B2B-Specific Issues
- [The Changing Face of Design For B2B Companies | Frog](https://www.frog.co/designmind/the-changing-face-of-design-for-b2b-companies)
- [B2B SaaS UX Design in 2026: Challenges & Patterns | Onething Design](https://www.onething.design/post/b2b-saas-ux-design)
- [5 Practical Steps to Design Better B2B Experiences in 2026 | Zaelab](https://www.zaelab.com/blogs/5-practical-steps-to-design-better-b2b-experiences-in-2026)
- [B2B UX Design Made Simple: Essential Principles That Work | Netguru](https://www.netguru.com/blog/b2b-ux-design)

### Design Tokens & Technical Implementation
- [Design Tokens Format Module 2025.10 | W3C DTCG](https://www.designtokens.org/tr/drafts/format/)
- [Design Tokens Specification Reaches First Stable Version | W3C](https://www.w3.org/community/design-tokens/2025/10/28/design-tokens-specification-reaches-first-stable-version/)
- [Design Tokens in Webstudio: A Practical Implementation Guide | Medium](https://www.designsystemscollective.com/design-tokens-in-webstudio-a-practical-implementation-guide-927af8d36f36)
- [Design Token Management Tools 2025: Complete Guide | CSS Author](https://cssauthor.com/design-token-management-tools/)

### Evolution & Maintenance
- [The 2026 Shift: Bridging the Gap Between Design and Dev | Medium](https://medium.com/@EmiliaBiblioKit/the-2026-shift-bridging-the-gap-between-design-and-dev-eeefb781af30)
- [Design System: Why Your Component Library is Dying | DEV Community](https://dev.to/augustosandim/design-system-why-your-component-library-is-dying-and-how-we-started-saving-it-40m0)
- [Building the Ultimate Design System: A Complete Architecture Guide for 2026 | Medium](https://medium.com/@padmacnu/building-the-ultimate-design-system-a-complete-architecture-guide-for-2026-6dfcab0e9999)

### Stakeholder Management
- [How to Evangelize a Design System | UXPin](https://www.uxpin.com/studio/blog/evangelize-design-system-guide/)
- [Design System Adoption: The Importance of Stakeholder Buy-in | Medium](https://medium.com/john-lewis-design/design-system-adoption-the-importance-of-stakeholder-buy-in-6a0d6ea7880e)
- [The Politics of Design Systems | UXP Magazine](https://uxpamagazine.org/the-politics-of-design-systems/?lang=en)

---
*Pitfalls research for: Hydrophon Kunststoff GmbH Corporate Design System*
*Researched: 2026-01-28*
*Context: First corporate design system for B2B manufacturing company with multi-agency usage*
