# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### feat
- Initialize Next.js 14 project with TypeScript, Tailwind CSS, and Framer Motion
- Add shared animation variants (fadeInUp, scaleIn, staggerContainer, slideInLeft, slideInRight)
- Add `cn()` utility for class merging with clsx and tailwind-merge
- Build responsive Header with mobile drawer, skip link, and keyboard accessibility
- Build HeroSection with decorative blur orbs, WhatsApp CTA, and scroll-triggered animations
- Build CoreValuesSection with 3-column card grid and staggered scale-in animations
- Build CurriculumFormSection with React Hook Form + Zod validation, multi-select checkboxes, and animated success state
- Build FooterSection with repeated primary CTA and minimalist copyright
- Add `/api/curriculum` API route for form submission with Zod validation
- Configure static export (`output: "export"`) for fast static hosting
- Add Geist font via next/font for optimal loading performance
- Update DESIGN.md with NWRA PRD-inspired animation system, component inventory, form spec, responsive behavior, accessibility, and file structure

### feat
- Optimize `SimpleAi Intro.mp4` with ffmpeg: H.264, CRF 28, faststart, reduced from 118MB to 5.3MB
- Extract poster.jpg thumbnail from first frame for video placeholder
- Replace HeroSection placeholder box with native `<video>` player using optimized MP4 + poster
- Add video accessibility: `aria-label`, `playsInline`, `preload="metadata"`, controls

### feat
- Add full English/Spanish bilingual support with React Context i18n
- Create `LanguageProvider` with `localStorage` persistence and browser language detection
- Add EN/ES language toggle pill in Header (desktop + mobile drawer)
- Translate all section components: Hero, Core Values, Curriculum Form, Footer
- Translate all form labels, placeholders, validation errors, and success messages
- Update `html lang` attribute dynamically based on selected language

### feat
- Set up Supabase database (`curriculum_interests` table) with RLS policies for anonymous inserts
- Create `src/lib/supabase.ts` client with `@supabase/supabase-js`
- Wire `/api/curriculum` route to persist form submissions to Supabase
- Add `.env.example` with placeholder Supabase credentials
- Add `.env.local` (gitignored) with real project credentials

### feat
- Add email field to curriculum form with validation
- Add email translations (EN/ES) to i18n dictionary
- Update Zod schema and API route to include email
- Add add-email-column.sql migration for Supabase table

### feat
- Add Luma event card alongside curriculum form in two-column layout
- Event card mirrors form card styling (rounded-2xl, shadow-card, border) for visual cohesion
- Form header uses `bg-tertiary-fixed`, event header uses `bg-secondary-fixed` for differentiation
- Event card includes platform badge, description, host chips, and CTA to Luma registration
- Fully translated event content in EN/ES
- Responsive: stacks vertically on mobile, side-by-side on lg+

### design
- Adopt warm minimalist aesthetic with Teal, Coral, and Sand accent palette
- Use Level 1 ambient shadows (0px 4px 20px rgba(0,0,0,0.04)) on cards
- Apply generous macro-whitespace between major sections for breathing room
- Implement focus-visible rings and reduced-motion awareness for accessibility
