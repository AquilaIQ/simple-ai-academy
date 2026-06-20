# NWRA / WLS 2026 Landing Page — Product Requirements Document

## 1. Overview & Purpose

The NWRA landing page (`/nwra`) is a dedicated event and product landing page for the **Waste Leadership Summit 2026** (June 8–10, Washington D.C.). Its primary goal is to generate qualified meeting bookings with waste operators and decision-makers by demonstrating Dragonfly's Agentic AI platform for waste and recycling operations.

**Target Audience:** MRF operators, transfer station managers, waste portfolio executives, safety officers.

**Key Business Objective:** Drive 1:1 meeting bookings at the summit through low-friction form submission.

---

## 2. Information Architecture

### Page Structure (Top to Bottom)

| # | Section | Component File | Purpose |
|---|---------|---------------|---------|
| 0 | Skip Link | `page.tsx` | Accessibility bypass |
| 1 | NWRABanner | `layout/NWRABanner.tsx` | Fixed summit promo (toggleable) |
| 2 | Header | `layout/Header.tsx` | Global nav, glassmorphism |
| 3 | Hero | `nwra2026/NWRAHeroSection.tsx` | Value prop + interactive video toggle |
| 4 | Logo Ribbon | `nwra2026/NWRALogoRibbon.tsx` | Social proof marquee |
| 5 | Problem Cards | `nwra2026/NWRAProblemSection.tsx` | Pain point agitation |
| 6 | Agentic Platform | `nwra2026/NWRAAgenticPlatformSection.tsx` | Platform intro |
| 7 | Mira Launch | `nwra2026/NWRAAniLaunchSection.tsx` | Product deep-dive |
| 8 | Social Proof | `nwra2026/NWRASocialProof.tsx` | Video testimonial + quote |
| 9 | Comparison | `nwra2026/NWRAComparisonSection.tsx` | Competitive differentiation |
| 10 | Meeting Booking | `nwra2026/NWRAMeetingBooking.tsx` | Core conversion form |
| 11 | FAQ | `sections/wastev2/WasteV2FAQSection.tsx` | Objection handling |
| 12 | Final CTA | `nwra2026/NWRAFinalCTA.tsx` | Closing CTA |
| 13 | Footer | `layout/Footer.tsx` | Global footer |

---

## 3. Design System

### 3.1 Color Palette

| Token | Hex | Tailwind | Usage |
|-------|-----|----------|-------|
| `--dragonfly-green` | `#B9D531` | `bg-primary`, `text-primary` | Primary CTA, highlights |
| `--dragonfly-purple` | `#413292` | `bg-secondary`, `text-secondary` | Secondary brand |
| `--dragonfly-teal` | `#258397` | `bg-accent`, `text-accent` | Tertiary accent, headings |
| `--dragonfly-azure` | `#E8F1F2` | `bg-dragonfly-azure` | Subtle backgrounds |
| `--color-background` | `#ffffff` | `bg-white` | Page background |
| `--color-foreground` | `#171717` | `text-gray-900` | Primary text |

Functional colors: Error `#ef4444`, Success `#22c55e`, Warning `#ea580c`.

### 3.2 Typography

| Font | Variable | Role | Weights |
|------|----------|------|---------|
| Geist Sans | `--font-geist-sans` | Body, UI | 400–700 |
| Geist Mono | `--font-geist-mono` | Code | 400, 500 |
| Orbitron | `--font-orbitron` | Neo-tech display headings | 400, 600, 700 |

**Type Scale:**
- H1 Hero: `text-3xl sm:text-4xl lg:text-5xl font-bold font-neo-tech leading-tight`
- H2 Section: `text-2xl sm:text-3xl md:text-4xl font-bold font-neo-tech`
- H3 Card: `text-xl font-bold`
- Body: `text-base text-gray-600 leading-relaxed`
- Stat: `text-4xl sm:text-5xl font-bold`
- Label: `text-sm font-semibold`
- Badge: `text-xs font-semibold uppercase tracking-widest`

### 3.3 Spacing & Shape

- Section Padding: `py-12 md:py-16` (standard), `py-16 md:py-24` (large)
- Content Max Width: `max-w-7xl` (primary), `max-w-3xl/4xl` (text-heavy)
- Horizontal Padding: `px-6 lg:px-8`
- Card Padding: `p-6` to `p-8`
- Card Gap: `gap-6` to `gap-8`
- Border Radius: `rounded-xl` (12px), `rounded-2xl` (16px)
- Card Shadow: `shadow-md` default, `hover:shadow-xl` on hover

### 3.4 Background Patterns

| Pattern | CSS | Usage |
|---------|-----|-------|
| White | `bg-white` | Problem, comparison sections |
| Gray-50 | `bg-gray-50` | Value prop, booking, FAQ |
| Gradient Hero | `bg-gradient-to-t from-gray-50 to-white` | Hero |
| Gradient Accent | `bg-gradient-to-br from-gray-50 to-white` | Agentic, Ani sections |
| Gradient CTA | `bg-gradient-to-br from-secondary/10 via-primary/10 to-accent/10` | Final CTA |
| Decorative Blurs | `bg-primary/5 rounded-full blur-3xl` | Ambient orbs |

---

## 4. Animation System

### 4.1 Library
- **Framer Motion** v12.23.12 — primary engine
- **CSS Keyframes** — marquee infinite scroll

### 4.2 Reusable Variants (`src/lib/alphaAnimations.ts`)

```typescript
heroStaggerVariants: { staggerChildren: 0.2, delayChildren: 0.1 }
heroItemVariants: { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, duration: 0.6 } }
sectionRevealVariants: { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, duration: 0.6 } }
gridStaggerVariants: { staggerChildren: 0.1, delayChildren: 0.2 }
gridItemVariants: { hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1, duration: 0.6 } }
```

### 4.3 Scroll-Triggered Patterns

All sections use `whileInView` with `viewport={{ once: true }}` for single-fire animations.

| Pattern | Animation | Delay |
|---------|-----------|-------|
| Section Header | `opacity: 0→1, y: 20→0` | None |
| Grid Cards | Staggered children | `index * 0.1s` |
| Problem Cards | Background fade-out + content fade-in | `index * 0.15s + 0.3s` |

### 4.4 Interactive Animations

| Interaction | Implementation |
|-------------|----------------|
| Video Toggle | `motion.span layout` spring (`stiffness: 500, damping: 35`) |
| Glow Ring | `transition-all duration-500` gradient shift |
| Card Hover | `whileHover={{ scale: 1.02 }}` + `hover:shadow-xl` |
| Pillar Hover | `hover:-translate-y-1 hover:shadow-lg transition-all duration-200` |
| FAQ Accordion | `AnimatePresence` + height animation (`duration: 0.25`) |
| Chevron | `rotate-180` transition (`duration-300`) |
| Floating Icons | `animate={{ y: [0,-16,0], rotate: [0,4,0] }}` infinite 6–7s |
| Logo Marquee | CSS `@keyframes marquee` 30s linear infinite |

### 4.5 Reduced Motion

```typescript
const reducedMotion = useRef(false);
useEffect(() => {
  const m = window.matchMedia('(prefers-reduced-motion: reduce)');
  reducedMotion.current = m.matches;
}, []);
// Applied to video opacity transition: 'none' vs 'opacity 0.4s ease'
```

---

## 5. Component Inventory

### 5.1 Layout Components

#### Header (`src/components/layout/Header.tsx`)
- **Type:** Client Component with `React.memo`
- **Position:** `fixed top-0 z-50`
- **Style:** `bg-white/80 backdrop-blur-md border-b border-white/20`
- **Nav Links:** Waste & Recycling, Use Cases, Platform Demo, About Us, Check In
- **Mobile:** Hamburger triggers side drawer (`w-80 max-w-[85vw]`) with spring slide from right
- **Drawer Backdrop:** `bg-black/60 backdrop-blur-sm` with fade
- **Keyboard:** Escape closes menu; body scroll locked when open

#### NWRABanner (`src/components/layout/NWRABanner.tsx`)
- **Toggle:** `const SHOW_BANNER = false;` (feature flag)
- **Position:** Fixed top when enabled
- **Style:** `bg-gray-900 text-white px-6 py-3`
- **Content:** WLS logo + dates; dismissible with X

#### Footer (`src/components/layout/Footer.tsx`)
- **Style:** `bg-white/80 backdrop-blur-md border-t border-white/20`
- **Layout:** 3-column on xl (logo + desc | company links | legal links)
- **Modal:** FAQ modal at root level

### 5.2 NWRA Section Components

#### NWRAHeroSection (`src/components/nwra2026/NWRAHeroSection.tsx`)
- **Type:** Client Component
- **Height:** `min-h-screen`
- **Background:** Gradient + 3 decorative blur orbs
- **Content Stack (centered, max-w-4xl):**
  1. H1: "What if every site ran like your best?"
  2. Subtitle (gray): Agentic Operators description
  3. Bold claim (primary, neo-tech): "At Every Site. In Weeks Not Years."
  4. Toggle switch: Raw Feed ↔ Agentic Vision
  5. Dual-video stack with glow ring
  6. Dynamic tip label

**Video Toggle:**
- Two `<video>` elements synchronized via `requestAnimationFrame`
- `IntersectionObserver` pauses off-screen
- Haptic feedback: `navigator.vibrate(80)`
- Glow ring intensifies when AI active

**Videos:**
- Raw: `/videos/SQ/optimized/WasteConveyorRaw_SQ_optimized.mp4`
- AI: `/videos/SQ/optimized/WasteConveyorVisionAI_SQ_optimized.mp4`
- Aspect: `3/2`
- Container: `rounded-2xl shadow-2xl border border-gray-200`
- Label bar: `bg-black/50 backdrop-blur-sm`

#### NWRALogoRibbon (`src/components/nwra2026/NWRALogoRibbon.tsx`)
- **Style:** `py-8 bg-white border-y border-gray-100`
- **Content:** 10 logos in infinite marquee
- **Animation:** CSS `animate-marquee` (30s linear infinite)
- **Logo size:** `h-[60px] w-[168px]`
- **Logos:** Mpact, SkipWaste, RiA, NWRA, NVIDIA Inception, MSFT StartUp, NED Green, HikRobot, CES, SAB Foundation

#### NWRAProblemSection (`src/components/nwra2026/NWRAProblemSection.tsx`)
- **Grid:** `grid-cols-1 md:grid-cols-3 gap-8`
- **Card Height:** `min-h-[280px]`
- **Animation:** Full-bleed background image fades out on scroll revealing white content underneath

**Card State Machine:**
```
Phase 1 (enter viewport): Background image visible (opacity: 1), white icons/text
Phase 2 (~0.3s delay): Background fades to opacity: 0, icon bg → red-100, icon color → red-600
Phase 3 (~0.5s delay): Title + description fade in (opacity: 0→1, y: 8→0)
```

| # | Icon | Stat | Title | BG Image |
|---|------|------|-------|----------|
| 1 | `ClockIcon` | 2–3 hrs | Manual Reporting Eats Your Shift | `/waste/Staff.png` |
| 2 | `CurrencyDollarIcon` | 20%+ | You Don't Know What You're Losing | `/waste/conveyorbelt.png` |
| 3 | `EyeSlashIcon` | Zero | No Cross-Site Intelligence | `/waste/BinCollection.png` |

#### NWRAAgenticPlatformSection (`src/components/nwra2026/NWRAAgenticPlatformSection.tsx`)
- **Background:** `bg-gradient-to-br from-gray-50 to-white`
- **H2:** "Introducing The first agentic platform for the `text-primary italic` physical world."
- **Subtitle:** Ops agents description + live tracking mention
- **Bottom H2:** "Meet Dragonfly Agentic Operators at the [WLS logo]"

#### NWRAAniLaunchSection (`src/components/nwra2026/NWRAAniLaunchSection.tsx`)
- **Background:** `bg-gradient-to-br from-gray-50 to-white`
- **Layout:** Intro block → 3-pillar grid → enterprise proof block

**Mira Intro Block:**
- Flex row (col mobile): Agent image (`/logos/Mira v1 MRF Operator.png`, 180×180) + heading/description

**3-Pillar Grid:**
| # | Image | Title |
|---|-------|-------|
| 1 | `/WasteIntelligence.png` | See Everything, Instantly |
| 2 | `/AiAnalyticsTs.png` | Speak Your Language |
| 3 | `/DF PTZ Platform.svg` | Move Fast to Close the Loop |

Card: `rounded-2xl border-2 border-gray-200 p-8 hover:shadow-lg hover:-translate-y-1`

**Enterprise Proof Block:**
- `rounded-2xl border-2 border-gray-200 p-8 md:p-12 bg-white`
- 2-col: Image (`/RumpkeSite.png`, `object-cover`) + bulleted results

#### NWRASocialProof (`src/components/nwra2026/NWRASocialProof.tsx`)
- **Background:** `bg-gradient-to-br from-dragonfly-azure/20 to-white`
- **Content:** Section header + video player + quote card

**Video Player:**
- Aspect: `4/3`, `rounded-2xl overflow-hidden shadow-2xl bg-gray-900`
- Initial: Gradient placeholder with play button
- Play: `<video controls playsInline>` with `/videos/WhoDragonfly.mp4`
- Error: Fallback with "Try again"
- Intersection Observer: Auto-plays at 50% visibility
- Decorative blurs: `bg-primary/20 blur-xl`, `bg-accent/20 blur-lg`

**Quote Card:**
- `rounded-xl border border-gray-100 bg-white p-6 shadow-sm`
- Quote: `italic text-gray-700 leading-relaxed`
- Attribution: Name (`text-primary font-semibold`) + Title (`text-xs text-gray-500`)

#### NWRAComparisonSection (`src/components/nwra2026/NWRAComparisonSection.tsx`)
- **Background:** `bg-white`
- **Layout:** `md:grid-cols-2 gap-12 max-w-5xl`

**Left: "Traditional Waste AI"**
- Red X icons (`bg-red-100 text-red-600`) + title + description
- 4 pain points

**Right: "Dragonfly Agents"**
- Green check icons (`bg-primary/20 text-primary`) + title + description
- 4 mirrored solutions

#### NWRAMeetingBooking (`src/components/nwra2026/NWRAMeetingBooking.tsx`)
- **Background:** `bg-gray-50`
- **ID:** `nwra-booking`
- **Container:** `bg-white rounded-2xl shadow-lg p-8 sm:p-12`

**Meeting Type Selector:**
- Two toggle buttons
- Active: `border-black bg-black/10 text-black`
- Inactive: `border-gray-200 bg-white text-gray-600 hover:border-gray-300`
- Options: "10-Minute Intro" | "30-Minute Assessment"

**Left Column:**
- "What to Expect" box: `bg-gradient-to-br from-black/5 to-primary/5 rounded-2xl p-6 md:p-8`
- Dynamic checklist (3 items based on selection)
- "Important Information" box: `bg-gray-50 rounded-2xl p-6`

**Right Column:** `NWRABookingForm`

**Trust Bar:** `grid-cols-1 sm:grid-cols-3` with `border-t border-gray-100`
- Limited slots — June 8–10 only
- No pitch deck — We talk operations
- 48-hour follow-up — Site-specific proposal

#### NWRABookingForm (`src/components/nwra2026/NWRABookingForm.tsx`)
- **Type:** Client Component
- **Form:** React Hook Form + Zod resolver, mode `onChange`

**Fields:**
| Field | Type | Validation | Required |
|-------|------|------------|----------|
| Full Name | text | `min(2)` | Yes |
| Email | email | `email()` | Yes |
| Company | text | `min(2)` | Yes |
| Job Title | text | `min(2)` | Yes |
| Phone | tel | — | No |
| Facility Count | text | — | No |
| Additional Notes | textarea | — | No |
| Consent | checkbox | must be `true` | Yes |

**Input Style:** `w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-secondary transition-colors`
- Error: `border-red-500`

**Submit Button:** `w-full bg-secondary text-white hover:bg-secondary/90 disabled:opacity-50`
- Dynamic label based on meeting type

**Success State:** `bg-green-50 border-2 border-green-200 rounded-2xl p-8 text-center`

**Analytics:** `gtag('event', 'nwra_meeting_booking_started')` and `nwra_meeting_booked`

**API:** `POST /api/nwra/booking`

#### NWRAFinalCTA (`src/components/nwra2026/NWRAFinalCTA.tsx`)
- **Background:** `bg-gradient-to-br from-secondary/10 via-primary/10 to-accent/10`
- **ID:** `nwra-final-cta`
- **Decorative:** Floating animated `FireIcon` and `ChartBarIcon` + blur orbs

**Content:**
1. H2: "Your Operation Deserves Better Data"
2. Body paragraph
3. Button pair:
   - Primary: `bg-black text-white hover:bg-black/90 shadow-xl` → scrolls to `#nwra-booking`
   - Secondary: `border-2 border-black text-black hover:bg-black/10` → mailto
4. Trust row (3 items with `CheckIcon`)
5. Scarcity note

**Info Cards (3-col):**
| Icon | Title | Details |
|------|-------|---------|
| 📍 | Location | Washington Hilton, Washington D.C. |
| 📅 | Dates | June 8–10, 2026 + WLS logo |
| ✉️ | Direct Contact | Manuel@Anisoptera.io |

Card: `rounded-2xl border-2 border-gray-200 p-8 bg-white text-center hover:shadow-lg`

### 5.3 Shared UI Components

#### Button (`src/components/ui/Button.tsx`)
- **Base:** `inline-flex items-center justify-center font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 rounded-xl shadow-lg backdrop-blur-sm`

**Variants:**
| Variant | Style |
|---------|-------|
| `primary` | `bg-primary/90 text-white hover:bg-primary border border-primary/20` |
| `secondary` | `bg-secondary/90 text-white hover:bg-secondary border border-secondary/20` |
| `outline` | `border border-gray-300 text-gray-900 bg-white/90 hover:bg-gray-100` |
| `ghost` | `text-gray-900 bg-white/60 hover:bg-gray-100 border border-white/30` |

**Sizes:** `sm` (h-9 px-4), `md` (h-10 px-6), `lg` (h-12 px-8), `xl` (h-14 px-10)

#### NumberedBadge (`src/components/alpha/ui/NumberedBadge.tsx`)
- `absolute -top-4 -left-4 w-12 h-12 rounded-full bg-{color} text-white flex items-center justify-center text-xl font-bold shadow-lg z-10`
- Colors: `primary`, `secondary`, `accent`

### 5.4 External Component

#### WasteV2FAQSection (`src/components/sections/wastev2/WasteV2FAQSection.tsx`)
- **Background:** `bg-gray-50`
- **Max Width:** `max-w-3xl`
- **7 FAQ items** from combined `wasteFAQs` + `additionalFAQs`
- **Accordion:** `border border-gray-200 rounded-xl overflow-hidden bg-white`
- **Trigger:** `w-full flex justify-between px-6 py-4 hover:bg-gray-50/80`
- **Question:** `text-sm font-semibold text-gray-900 pr-6 leading-snug`
- **Answer:** `px-6 pb-5 pt-2 text-sm text-gray-600 leading-relaxed border-t border-gray-100`
- **Animation:** `AnimatePresence` height `0→auto`, opacity, `duration: 0.25`
- **Chevron:** `h-4 w-4 text-gray-400` with `rotate-180` when open

---

## 6. Interaction Patterns

### 6.1 Hero Video Toggle

```
User Action: Click toggle switch
System Response:
  1. motion.span slides with spring animation
  2. Glow ring gradient shifts (duration: 500ms)
  3. AI overlay video opacity: 0→1 (duration: 400ms)
  4. Bottom label text updates
  5. Tip label text updates
  6. Mobile: haptic vibrate(80)
```

### 6.2 Problem Card Scroll Animation

```
Trigger: Card enters viewport (whileInView, once)
Sequence:
  0ms: Card visible with full-bleed background image
  +150ms×index: Background begins fading (duration: 700ms)
  +150ms×index + 300ms: Icon bg → red-100, icon → red-600, text color → gray-900
  +150ms×index + 500ms: Title + description fade in (opacity: 0→1, y: 8→0, duration: 500ms)
```

### 6.3 Meeting Type Selection

```
User Action: Click intro or assessment button
System Response:
  1. Border/bg color transitions (duration: 300ms)
  2. Left column checklist content swaps instantly
  3. Submit button label updates
```

### 6.4 Form Submission Flow

```
1. User fills form + checks consent
2. Click submit → disabled state, "Reserving..."
3. gtag event fired
4. POST /api/nwra/booking
5. Success → green confirmation card replaces form
6. gtag conversion event fired
7. Error → red alert banner, form stays editable
```

### 6.5 FAQ Accordion

```
User Action: Click question
System Response:
  1. Chevron rotates 180° (duration: 300ms)
  2. Answer container height: 0→auto (duration: 250ms)
  3. Answer opacity: 0→1
  4. Other open items close simultaneously
```

### 6.6 Video Player

```
Initial: Gradient placeholder with centered play button
Click Play:
  1. Play button disappears
  2. Video element mounts with controls
  3. Auto-plays muted (volume: 0)
  4. IntersectionObserver: pauses when <50% visible
Error:
  1. Error state replaces player
  2. "Try again" button resets to initial state
```

---

## 7. Responsive Behavior

### Breakpoints

| Breakpoint | Tailwind Prefix | Key Changes |
|------------|-----------------|-------------|
| < 640px | Default | Single column, stacked layouts |
| ≥ 640px | `sm:` | 2-column grids appear, larger text |
| ≥ 768px | `md:` | 3-column grids, side-by-side layouts |
| ≥ 1024px | `lg:` | Full navigation visible, max padding |
| ≥ 1280px | `xl:` | Footer 3-column, widest containers |

### Section-Specific Behavior

**Hero:**
- H1: `text-3xl` → `sm:text-4xl` → `lg:text-5xl`
- Toggle: Always centered, switch remains `h-8 w-16`
- Video: Full width within `max-w-4xl` container

**Problem Cards:**
- Mobile: Single column stack
- Tablet+: 3-column grid (`md:grid-cols-3`)

**Mira Section:**
- Intro block: Column on mobile, row on `md:`
- Pillars: Stack on mobile, 3-col on `md:`
- Enterprise block: Stack on mobile, 2-col on `md:`

**Comparison:**
- Mobile: Stacked columns (pain points first, then solutions)
- Tablet+: Side-by-side 2-col

**Booking:**
- Mobile: Single column (selector → details → form, stacked)
- Tablet+: 2-col grid (details left, form right)
- Trust bar: 1-col → `sm:grid-cols-3`

**Final CTA:**
- Buttons: Full width on mobile, auto width on `sm:`
- Info cards: Stack on mobile, 3-col on `md:`

**Header:**
- Desktop: Horizontal nav with Log In button
- Mobile: Hamburger → side drawer with spring animation

---

## 8. Accessibility

### Implemented Features

| Feature | Implementation |
|---------|----------------|
| Skip Link | `sr-only focus:not-sr-only` link to `#main-content` |
| Reduced Motion | `prefers-reduced-motion: reduce` disables video transitions |
| Toggle ARIA | `role="switch"`, `aria-checked`, `aria-label="Toggle Vision AI"` |
| Video Labels | `aria-label` on both base and AI videos |
| Focus States | `focus-visible:ring-2 focus-visible:ring-offset-2` on buttons |
| Form Labels | Every input has associated `<label>` |
| Form Errors | Inline error text + `border-red-500` visual indicator |
| Mobile Menu | `role="dialog"`, `aria-modal="true"`, `aria-labelledby` |
| Header Nav | `aria-label="Main navigation"` |
| Footer | `aria-labelledby="footer-heading"` with `sr-only` h2 |
| Section Roles | `<main role="main">` |

### Keyboard Navigation

- **Escape:** Closes mobile menu
- **Tab:** Moves through interactive elements in logical order
- **Toggle:** Activatable via click/tap
- **Form:** Standard tab order through inputs
- **FAQ:** Buttons are focusable; Enter/Space toggles

---

## 9. Assets & Media

### Images

| Asset | Path | Dimensions | Usage |
|-------|------|------------|-------|
| Mira Agent | `/logos/Mira v1 MRF Operator.png` | 180×180 | AniLaunch intro |
| WLS Logo | `/WLS.png` | 200×48 / 180×44 | Platform section, Comparison, Final CTA |
| Rumpke Site | `/RumpkeSite.png` | Cover fill | Enterprise proof block |
| Waste Intelligence | `/WasteIntelligence.png` | 200×120 cont | Pillar card 1 |
| AI Analytics | `/AiAnalyticsTs.png` | 200×120 cont | Pillar card 2 |
| DF PTZ Platform | `/DF PTZ Platform.svg` | 200×120 cont | Pillar card 3, OG image |
| Staff | `/waste/Staff.png` | Card bg | Problem card 1 |
| Conveyor Belt | `/waste/conveyorbelt.png` | Card bg | Problem card 2 |
| Bin Collection | `/waste/BinCollection.png` | Card bg | Problem card 3 |
| DF Platform | `/DF Platform.svg` | 300×200 cont | Value prop card |
| Dragonfly Logo | `/DF Full Logo.png` | 252×65 | Header |
| Dragonfly Logo SVG | `/DF Full Logo.svg` | 180×46 | Footer |

### Videos

| Asset | Path | Usage |
|-------|------|-------|
| Waste Raw | `/videos/SQ/optimized/WasteConveyorRaw_SQ_optimized.mp4` | Hero base layer |
| Waste AI | `/videos/SQ/optimized/WasteConveyorVisionAI_SQ_optimized.mp4` | Hero overlay |
| Who Dragonfly | `/videos/WhoDragonfly.mp4` | Social proof testimonial |

### Partner Logos (Logo Ribbon)

| Logo | Path |
|------|------|
| Mpact | `/logos/mpact.png` |
| SkipWaste | `/logos/SkipWaste.png` |
| Resource Innovations Africa | `/logos/RiA.png` |
| NWRA | `/logos/NWRA.png` |
| NVIDIA Inception | `/logos/NVIDIA Inception.png` |
| Microsoft for Startups | `/logos/MSFT StartUp.png` |
| NED Green Foundation | `/logos/NED Green Foundation.png` |
| HikRobot | `/logos/HikRobot.png` |
| CES | `/logos/CES.png` |
| SAB Foundation | `/logos/SAB Foundation.png` |

---

## 10. Form Specification

### NWRABookingForm Schema (Zod)

```typescript
const nwraBookingSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().min(2, 'Company name must be at least 2 characters'),
  jobTitle: z.string().min(2, 'Job title must be at least 2 characters'),
  phone: z.string().optional(),
  facilityCount: z.string().optional(),
  additionalNotes: z.string().optional(),
  consent: z.boolean().refine((val) => val === true, {
    message: 'You must agree to receive communications'
  }),
});
```

### Form States

| State | Visual |
|-------|--------|
| Default | Gray borders, placeholder text |
| Focus | `border-secondary` (black) |
| Error | `border-red-500` + red text below |
| Valid | No special styling (implicit) |
| Submitting | Button disabled, opacity 50%, label changes to "Reserving..." |
| Success | Green card replaces entire form |
| API Error | Red alert banner above submit button |

---

## 11. Performance Considerations

| Concern | Implementation |
|---------|----------------|
| Video Playback | `IntersectionObserver` pauses off-screen videos |
| Video Sync | `requestAnimationFrame` frame-locking prevents drift |
| Font Loading | `display: 'swap'`, `preload: true` for critical fonts |
| Images | `next/image` with `sizes` prop for responsive optimization |
| Animations | `viewport={{ once: true }}` prevents re-animation |
| Marquee | Pure CSS animation, no JS overhead |
| Component Memo | `Header` and `Footer` use `React.memo` |

---

## 12. Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `next` | 15.5.9 | Framework |
| `react` | 19.1.0 | UI library |
| `framer-motion` | 12.23.12 | Animations |
| `tailwindcss` | 4 | Styling |
| `@tailwindcss/postcss` | 4 | PostCSS integration |
| `lucide-react` | 1.7.0 | Icons (some sections) |
| `@heroicons/react` | 2.2.0 | Icons (primary) |
| `react-hook-form` | 7.62.0 | Form management |
| `@hookform/resolvers` | 5.2.1 | Zod integration |
| `zod` | 4.1.3 | Validation schema |
| `clsx` | 2.1.1 | Class merging |
| `class-variance-authority` | 0.7.1 | Component variants |

---

## 13. File Structure

```
src/
├── app/
│   ├── nwra/
│   │   └── page.tsx              # Page component + metadata
│   ├── layout.tsx                # Root layout (fonts, SEO, scripts)
│   └── globals.css               # Design tokens, theme, utilities
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── ConditionalHeader.tsx
│   │   ├── ConditionalFooter.tsx
│   │   └── NWRABanner.tsx
│   ├── nwra2026/
│   │   ├── index.ts              # Barrel exports
│   │   ├── NWRAHeroSection.tsx
│   │   ├── NWRALogoRibbon.tsx
│   │   ├── NWRAProblemSection.tsx
│   │   ├── NWRAAgenticPlatformSection.tsx
│   │   ├── NWRAAniLaunchSection.tsx
│   │   ├── NWRASocialProof.tsx
│   │   ├── NWRAComparisonSection.tsx
│   │   ├── NWRAMeetingBooking.tsx
│   │   ├── NWRABookingForm.tsx
│   │   ├── NWRAFinalCTA.tsx
│   │   ├── NWRASafetySection.tsx      # (exported, not rendered)
│   │   ├── NWRAWasteStats.tsx         # (exported, not rendered)
│   │   └── NWRAValueProposition.tsx   # (exported, not rendered)
│   ├── sections/wastev2/
│   │   └── WasteV2FAQSection.tsx
│   ├── alpha/ui/
│   │   └── NumberedBadge.tsx
│   └── ui/
│       └── Button.tsx
├── lib/
│   ├── alphaAnimations.ts        # Shared Framer Motion variants
│   └── utils.ts                  # cn(), formatCurrency(), formatNumber()
└── data/
    └── wasteData.ts              # FAQ data source
```

---

## 14. Unrendered Components (Exported but Not Used on `/nwra`)

These components exist in the `nwra2026/` barrel export and may be used on variant pages or were part of earlier iterations:

- **NWRAWasteStats:** 3-col stats bar + 2-col differentiators grid
- **NWRAValueProposition:** 2-col grid of 4 value cards (Know, Defend, Detect Hazards, Leverage)
- **NWRASafetySection:** 3 hazard cards with NumberedBadge + orange stats bar + CTA
