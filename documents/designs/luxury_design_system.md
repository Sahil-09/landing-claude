# Luxury Design System

## Overview
A refined, premium design system focused on clean lines, elegant spacing, and high‑end visual hierarchy. Tailored for a luxury landing page that conveys exclusivity and sophistication.

---

## 1. Color Palette

| Role | Color | Hex | Usage |
|------|-------|-----|-------|
| Primary | Deep Charcoal | `#151312` | Backgrounds, primary text |
| Secondary | Ivory | `#F4EFE6` | Card backgrounds, subtle highlights |
| Accent | Champagne | `#D9B875` | Buttons, link accents, highlights |
| Functional | Bronze | `#9B6F3D` | Badges, decorative elements |
| Dark Mode Primary | `#0A0804` | Very dark charcoal | Dark mode backgrounds |
| Dark Mode Accent | `#CFA66B` | Soft gold | Dark mode accents |

## 2. Typography

| Element | Font | Weight | Size | Line Height | Letter Spacing |
|---------|------|--------|------|-------------|----------------|
| Display (H1) | Cormorant Garamond | 700 (Bold) | 5xl (1.75rem) | 1.15 | `-0.01em` |
| Title (H2) | Cormorant Garamond | 600 (Semi‑Bold) | 2xl (1.5rem) | 1.2 | `-0.005em` |
| Subtitle (H3) | Cormorant Garamond | 500 (Medium) | 1.5xl (1.25rem) | 1.3 | `0` |
| Body (Paragraph) | Manrope | 400 (Regular) | 1rem (16px) | 1.6 | `0.01em` |
| Small (Caption) | Manrope | 300 (Light) | 0.875rem (14px) | 1.3 | `0.02em` |

### Web‑safe fallback
- **Display & Title**: Georgia, serif
- **Body & Small**: system-ui, sans‑serif

## 3. Spacing System

A baseline of **8px** (0.5rem) with multiples thereof:
- 0.5rem (4 px) – tight padding
- 0.75rem (6 px) – compact sections
- 1rem (8 px) – base spacing
- 1.5rem (12 px) – card gaps
- 2rem (16 px) – major section spacing
- 2.5rem (20 px) – hero vertical padding
- 3rem (24 px) – large whitespace sections

Use consistent multiples to maintain rhythm.

## 4. Component Styles

### Buttons
- **Base**: `bg-champagne text-ink uppercase tracking-[0.18em] px-6 py-3 rounded-lg font-medium transition-colors duration-200 hover:bg-white text-sm`
- **Dark mode**: `bg-[#151312] text-champagne hover:bg-[#252827]`

### Cards / Panels
- Background: `bg-[#F4EFE6]/10` (10% opacity ivory)
- Border: `border border-champagne/20`
- Shadow: `shadow-lg` (subtle elevation)
- Rounded: `rounded-xl`

### Inputs
- Background: `bg-[#151312]/30`
- Border: `border border-[#F4EFE6]/20`
- Text color: `text-ink`
- Focus ring: `ring-2 ring-champagne/50`

### Shadows & Elevation
- `shadow-sm` for subtle lift
- `shadow-lg` for prominent cards
- `transform hover:scale-[1.02]` for interactive elements

## 5. Animations & Transitions

| Property | Duration | Timing Function |
|----------|----------|-----------------|
| Transition on color, background, transform | 200‑300 ms | `cubic-bezier(0.4, 0, 0.2, 1)` (ease‑out) |
| Scale on hover (buttons, cards) | 150 ms | `ease-out` |
| Fade‑in for hero elements | 500 ms with `delay-75` stagger |

## 6. Dark Mode

- **Background**: `#0A0804` (deep charcoal)
- **Primary Text**: `#F4EFE6` (ivory)
- **Accent Highlights**: `#CFA66B` (soft gold)
- Adjust component backgrounds to `#151312` with appropriate opacity tweaks.

---

### Implementation Notes
- The color tokens are defined in `tailwind.config.cjs` under `extend.colors`.
- Typography is configured via `extend.fontFamily`.
- Spacing utilities follow the 8‑px grid; custom utilities can be added in `Tailwind` config if needed.
- Use `group-hover` and `hover:scale-105` for subtle interactive feedback.
- Ensure all text contrast meets WCAG AA standards in both light and dark modes.