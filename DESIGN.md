# Dr. Voiceless — Design Guidelines

## Color Palette

- Primary: Teal (#0D9488 / teal-600) — trust, calm, medical authority
- Secondary: Navy (#1E3A5F) — depth, credibility, professionalism
- Accent: Light Teal (#CCFBF1 / teal-100) — gentle highlights, accessible backgrounds
- Neutral: White (#FFFFFF) — dominant background, maximum white space
- Text primary: Dark Navy (#0F172A / slate-900)
- Text secondary: Slate (#475569 / slate-600)
- Border: Slate-200 (#E2E8F0)
- Success/Safe: Teal-500
- Warning/Escalate: Amber-500
- Danger/Emergency: Red-600

## Typography

- Font family: Inter (Google Fonts) — clean, highly legible, medical credibility
- Heading scale: 4xl–6xl for hero, 2xl–3xl for sections, xl for cards
- Body: base (16px), leading-relaxed — optimized for readability across ages
- Weight: Bold for headings, Medium for UI labels, Regular for body text
- Never use font sizes below 14px — accessibility for elderly users

## Layout & Spacing

- Max content width: 1200px, centered
- Generous padding: 4rem vertical sections, 2rem horizontal minimum
- Grid: 12-column, responsive — mobile-first
- Card elevation: subtle shadow (shadow-md), rounded-2xl corners
- Consistent 1.5rem gap between content blocks

## Components

### Navigation
- Sticky top nav, white background, teal logo text
- Links: slate-700, hover teal-600
- CTA button: teal-600 bg, white text, rounded-full, hover teal-700

### Hero Section
- Full-width, white background
- Large headline (5xl–6xl), bold, navy
- Subheadline: slate-600, xl, leading-relaxed
- Primary CTA: teal pill button
- Secondary CTA: outline navy button
- Trust badge row: "Available 24/7", "No insurance required", "All languages welcome"

### Healthcare Finder (Day-One Feature)
- Prominent card section, teal-50 background
- ZIP code input + dropdown for issue type (symptom category)
- "Find Care Near Me" teal button, full-width on mobile
- Results: list of provider cards with name, address, distance, accepted insurances, languages spoken
- Each result card: rounded-xl, white bg, subtle shadow, teal accent left border
- Empty state: friendly message + link to 211.org and HRSA finder

### AI Chat Interface
- Floating chat panel or dedicated /chat page
- Header: navy background, white "Dr. Voiceless" title, teal pulse indicator ("Online")
- Message bubbles: user = teal-100 right-aligned; assistant = white left-aligned, shadow-sm
- Input bar: white bg, rounded-full, teal send button
- Safety disclaimer banner: amber-50 bg, amber-600 text, always visible at top of chat
- Escalation callout: red-50 bg, red-700 text — triggered by emergency keywords
- Typing indicator: three-dot pulse animation, slate-400

### Trust & Equity Section
- Three-column icon + text layout
- Icons: outlined, teal, 48px
- Titles: navy, semibold
- Body: slate-600, base

### Footer
- Navy background, white text
- Disclaimer text: "Dr. Voiceless is an AI health information assistant, not a licensed physician. Always seek professional medical care for emergencies."
- Links: Privacy, Terms, Contact

## Accessibility

- All text meets WCAG AA contrast ratios
- Focus rings: teal-400 outline
- Touch targets: minimum 44px
- Alt text on all images
- Aria labels on all interactive elements
- Language toggle visible in nav (future)

## Motion & Interaction

- Transitions: 200ms ease-in-out
- Chat send: subtle scale pulse on button
- Card hover: translateY(-2px), shadow-lg
- Scroll reveal: fade-in-up, 300ms, staggered
- No autoplay media — respects reduced-motion preferences