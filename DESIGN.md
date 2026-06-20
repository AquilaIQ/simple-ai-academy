---
name: Simple AI Academy
colors:
  surface: '#f8f9fa'
  surface-dim: '#d9dadb'
  surface-bright: '#f8f9fa'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f4f5'
  surface-container: '#edeeef'
  surface-container-high: '#e7e8e9'
  surface-container-highest: '#e1e3e4'
  on-surface: '#191c1d'
  on-surface-variant: '#3e4949'
  inverse-surface: '#2e3132'
  inverse-on-surface: '#f0f1f2'
  outline: '#6e7979'
  outline-variant: '#bdc9c8'
  surface-tint: '#006a6a'
  primary: '#006565'
  on-primary: '#ffffff'
  primary-container: '#008080'
  on-primary-container: '#e3fffe'
  inverse-primary: '#76d6d5'
  secondary: '#a43c12'
  on-secondary: '#ffffff'
  secondary-container: '#fe7e4f'
  on-secondary-container: '#6b1f00'
  tertiary: '#5e5a53'
  on-tertiary: '#ffffff'
  tertiary-container: '#77726b'
  on-tertiary-container: '#fff8f1'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#93f2f2'
  primary-fixed-dim: '#76d6d5'
  on-primary-fixed: '#002020'
  on-primary-fixed-variant: '#004f4f'
  secondary-fixed: '#ffdbcf'
  secondary-fixed-dim: '#ffb59c'
  on-secondary-fixed: '#380c00'
  on-secondary-fixed-variant: '#822800'
  tertiary-fixed: '#e8e1d9'
  tertiary-fixed-dim: '#ccc6bd'
  on-tertiary-fixed: '#1e1b16'
  on-tertiary-fixed-variant: '#4a4640'
  background: '#f8f9fa'
  on-background: '#191c1d'
  surface-variant: '#e1e3e4'
typography:
  display-lg:
    fontFamily: Geist
    fontSize: 48px
    fontWeight: '600'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Geist
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
  headline-md:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 32px
  body-lg:
    fontFamily: Geist
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
  stack-sm: 12px
  stack-md: 24px
  stack-lg: 48px
---

## Brand & Style
The design system for the academy is built on the pillars of clarity, accessibility, and focused learning. It adopts a **Minimalist** aesthetic with a **Modern** corporate lean, ensuring that the complex nature of AI is presented through a calm and approachable interface.

The personality is that of a "Sophisticated Mentor"—professional yet warm, technical yet human. To achieve this, the UI utilizes expansive whitespace, a restrained color palette, and clear visual hierarchies that direct the user's attention toward educational content without distraction.

## Colors
The palette is rooted in a neutral foundation of "Atmospheric Greys" and "Paper Whites" to reduce cognitive load.

- **Primary (Teal):** Used for navigation, progress indicators, and primary interactive states. It signals stability and intelligence.
- **Secondary (Coral):** Reserved for high-impact Call-to-Actions (CTAs) and critical notifications. Its warmth contrasts sharply against the cool neutrals to drive conversion.
- **Tertiary (Sand):** Used for subtle background layering, secondary containers, and "soft" sections to add warmth to the minimalist aesthetic.
- **Surface Neutrals:** A range of high-brightness greys (from #FFFFFF to #E5E7EB) defines the structural depth of the application.

## Typography
This design system employs **Geist** for its technical precision and exceptional legibility at small sizes. The typographic scale favors generous line heights to enhance readability during long-form learning sessions.

Headlines utilize a tighter letter-spacing and semi-bold weights to create a strong visual anchor, while body text remains light and airy. Labels and small metadata should always be rendered in medium or semi-bold weights to ensure they pass accessibility standards against light-grey backgrounds.

## Layout & Spacing
The layout follows a **Fixed Grid** philosophy on desktop (12 columns) and a **Fluid** approach on mobile (4 columns).

- **Vertical Rhythm:** Built on an 8px base unit.
- **Whitespace:** Emphasize "Macro-whitespace" between major sections (stack-lg) to allow the content to breathe.
- **Reflow:** On mobile devices, the 24px gutter is reduced to 16px, and horizontal margins are minimized to 20px to maximize the reading area for educational modules.

## Elevation & Depth
The system uses **Tonal Layers** combined with **Ambient Shadows** to create a sense of organized hierarchy.

1. **Level 0 (Base):** Background color (#F9FAFB).
2. **Level 1 (Cards):** Pure White (#FFFFFF) with a very soft, diffused shadow (0px 4px 20px rgba(0,0,0,0.04)).
3. **Level 2 (Overlays/Dropdowns):** Pure White with a more defined shadow (0px 8px 32px rgba(0,0,0,0.08)).

Avoid heavy borders; instead, use subtle 1px strokes in #E5E7EB to define boundaries when elements share the same elevation level.

## Shapes
The shape language is **Rounded**, reflecting a modern and friendly educational environment. Standard UI components like input fields and cards use an 8px (0.5rem) radius. Large containers or featured "hero" cards should scale up to a 16px (1rem) radius to feel more distinct and approachable.

## Components

- **Buttons:**
  - *Primary:* High-contrast Coral (#FF7F50) with white text. Bold, 16px padding (left/right).
  - *Secondary:* Teal (#008080) outlines or Ghost style for secondary actions.
- **Cards:** White backgrounds, 8px border-radius, and the Level 1 Ambient Shadow. Use Sand (#F4EDE4) as a subtle header background within cards for module categorization.
- **Inputs:** 1px stroke (#D1D5DB) that shifts to Teal on focus. Use a 4px inner padding for a spacious, clean feel.
- **Chips:** Small, pill-shaped tags used for course categories. Use Teal text on a light Sand background for a sophisticated, low-contrast look.
- **Progress Bars:** Thin 4px tracks in light grey with a Teal fill to represent "Learner Momentum."
- **Lists:** Clean, borderless rows with 16px vertical padding, separated by a subtle 1px divider (#F3F4F6).

---

## Animation System (NWRA-Inspired)

### Library
- **Framer Motion** — primary animation engine for scroll-triggered and interactive animations.

### Reusable Variants

| Variant | Config |
|---------|--------|
| `fadeInUp` | `hidden: { opacity: 0, y: 20 }` -> `visible: { opacity: 1, y: 0, duration: 0.6 }` |
| `scaleIn` | `hidden: { opacity: 0, scale: 0.95 }` -> `visible: { opacity: 1, scale: 1, duration: 0.5 }` |
| `staggerContainer` | `staggerChildren: 0.15, delayChildren: 0.1` |
| `slideInLeft` | `hidden: { opacity: 0, x: -30 }` -> `visible: { opacity: 1, x: 0, duration: 0.6 }` |
| `slideInRight` | `hidden: { opacity: 0, x: 30 }` -> `visible: { opacity: 1, x: 0, duration: 0.6 }` |

### Scroll-Triggered Patterns
All sections use `whileInView` with `viewport={{ once: true }}` for single-fire animations.

### Interactive Animations

| Interaction | Implementation |
|-------------|----------------|
| Card Hover | `whileHover={{ y: -4 }}` + `hover:shadow-card-hover` |
| CTA Button | `hover:scale-105` transition |
| Mobile Drawer | `transition-transform duration-300 ease-out` spring from right |
| Form Success | `AnimatePresence` + `scale: 0.95 -> 1` |
| Checkbox | Border/bg color transition on toggle |

### Reduced Motion
Respect `prefers-reduced-motion: reduce` by disabling Framer Motion animations where applicable.

---

## Component Inventory

### Layout Components

#### Header (`src/components/layout/Header.tsx`)
- **Type:** Client Component
- **Position:** `fixed top-0 z-50`
- **Style:** `bg-white/90 backdrop-blur-md` on scroll; transparent at top
- **Nav Links:** Curriculum, Values, FAQ
- **Mobile:** Hamburger triggers side drawer (`w-80 max-w-[85vw]`) with spring slide from right
- **Drawer Backdrop:** `bg-black/60 backdrop-blur-sm` with fade
- **Keyboard:** Escape closes menu; body scroll locked when open
- **Accessibility:** Skip link, `aria-label="Main navigation"`, `role="dialog"` for drawer

### Section Components

#### HeroSection (`src/components/sections/HeroSection.tsx`)
- **Type:** Client Component
- **Background:** Subtle gradient + 2 decorative blur orbs (primary and secondary tones)
- **Content Stack (centered, max-w-4xl):**
  1. Badge: "100% Live & Interactive" with pulse dot
  2. H1: "Simple AI. Learn AI using AI. No Code. No Complexity."
  3. Subtitle about 100% live practical training
  4. Primary CTA: "Join the Live WhatsApp Community" with WhatsApp icon
  5. Hero visual card with live session preview placeholder

#### CoreValuesSection (`src/components/sections/CoreValuesSection.tsx`)
- **Grid:** `grid-cols-1 md:grid-cols-3 gap-6`
- **Card Style:** White bg, rounded-2xl, shadow-card, border, hover lift
- **Animation:** Staggered scale-in on scroll; `whileHover={{ y: -4 }}`

#### CurriculumFormSection (`src/components/sections/CurriculumFormSection.tsx`)
- **Type:** Client Component
- **Container:** White card with tertiary-fixed header
- **Form:** React Hook Form + Zod resolver, mode onChange
- **Fields:**
  - Full Name (text, min 2 chars)
  - Bottleneck (text, min 3 chars)
  - Interests (multi-select checkbox grid, min 1 selection)
- **Submit Button:** "Submit & Save My Spot"
- **Success State:** Green confirmation card replaces form

#### FooterSection (`src/components/sections/FooterSection.tsx`)
- **Content:** Repeated primary CTA + copyright + legal links
- **Style:** Minimal, centered on mobile, row on desktop

### UI Components

#### Button (`src/components/ui/Button.tsx`)
- **Base:** `inline-flex items-center justify-center font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 rounded-xl`
- **Variants:** primary (coral), secondary (teal), outline, ghost
- **Sizes:** sm, md, lg, xl

---

## Form Specification

### Curriculum Interest Schema (Zod)

```typescript
const curriculumSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  bottleneck: z.string().min(3, "Please describe your bottleneck"),
  interests: z.array(z.string()).min(1, "Select at least one capability"),
});
```

### Form States

| State | Visual |
|-------|--------|
| Default | Gray borders, placeholder text |
| Focus | `border-primary` (teal) |
| Error | `border-error` + red text below |
| Valid | No special styling (implicit) |
| Submitting | Button disabled, "Submitting..." with spinner |
| Success | Green card replaces entire form |
| API Error | Red alert banner above submit button |

### API
- `POST /api/curriculum`
- Returns `{ success: true }` on valid input
- Logs submission server-side (replace with DB/CRM in production)

---

## Responsive Behavior

### Breakpoints

| Breakpoint | Tailwind Prefix | Key Changes |
|------------|-----------------|-------------|
| < 640px | Default | Single column, stacked layouts |
| >= 640px | `sm:` | 2-column grids, larger text |
| >= 768px | `md:` | 3-column grids, side-by-side layouts |
| >= 1024px | `lg:` | Full navigation visible, max padding |
| >= 1280px | `xl:` | Widest containers |

### Section-Specific Behavior

**Hero:**
- H1: `text-[40px]` -> `md:text-5xl` -> `lg:text-6xl`
- Visual card: Column on mobile, row on `md:`

**Core Values:**
- Mobile: Single column stack
- Tablet+: 3-column grid (`md:grid-cols-3`)

**Curriculum Form:**
- Mobile: Single column, full width
- Tablet+: Centered `max-w-3xl` container
- Interest grid: 1-col -> `sm:grid-cols-2`

**Footer:**
- Mobile: Stacked, centered
- Desktop: Row with space-between

---

## Accessibility

### Implemented Features

| Feature | Implementation |
|---------|----------------|
| Skip Link | `sr-only focus:not-sr-only` link to `#main-content` |
| Focus States | `focus-visible:ring-2 focus-visible:ring-offset-2` on buttons and links |
| Form Labels | Every input has associated `<label>` |
| Form Errors | Inline error text + `border-error` visual indicator |
| Mobile Menu | `role="dialog"`, `aria-modal="true"`, `aria-expanded` on toggle |
| Header Nav | `aria-label="Main navigation"` |
| Section Roles | `<main role="main">` |

### Keyboard Navigation

- **Escape:** Closes mobile menu
- **Tab:** Moves through interactive elements in logical order
- **Form:** Standard tab order through inputs

---

## Performance Considerations

| Concern | Implementation |
|---------|----------------|
| Animations | `viewport={{ once: true }}` prevents re-animation |
| Font Loading | Geist via `next/font` with display swap |
| Component Memo | Header uses standard React patterns; minimal re-renders |
| Static Export | `output: "export"` for fast static hosting |

---

## File Structure

```
src/
├── app/
│   ├── api/curriculum/
│   │   └── route.ts              # Form submission API route
│   ├── page.tsx                  # Landing page composition
│   ├── layout.tsx                # Root layout (Geist font, metadata)
│   └── globals.css               # Tailwind directives, tokens, utilities
├── components/
│   ├── layout/
│   │   └── Header.tsx            # Fixed nav with mobile drawer
│   ├── sections/
│   │   ├── HeroSection.tsx       # Hero + CTA + visual card
│   │   ├── CoreValuesSection.tsx # 3-column value cards
│   │   ├── CurriculumFormSection.tsx # Demand capture form
│   │   └── FooterSection.tsx     # Final CTA + copyright
│   └── ui/
│       └── Button.tsx            # Reusable button component
├── lib/
│   ├── animations.ts             # Shared Framer Motion variants
│   └── utils.ts                  # cn() helper
```