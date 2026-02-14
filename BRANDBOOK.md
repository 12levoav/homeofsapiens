# Home of Sapiens - Brandbook

## 1) Brand Direction
- Mood: Warm, refined, intentional, contemporary.
- Reference style: Minimal premium home-and-living presentation inspired by the clarity of Kave Home and Ferm Living.
- Visual principles:
  - Quiet neutral canvas
  - Editorial serif moments paired with clean sans-serif UI
  - Clear section hierarchy and large breathing space
  - Subtle motion rather than decorative effects

## 2) Typography System

### Primary UI font
- Family: `Manrope` (Google Fonts)
- Roles:
  - Navigation
  - Body copy
  - Labels and utility text
  - Form fields
- Reason: Modern, neutral, highly legible, professional retail UI feel.

### Display and editorial font
- Family: `Bodoni Moda` (Google Fonts)
- Roles:
  - Headlines
  - Category titles
  - Story emphasis
  - Hero title
- Reason: Elegant, premium serif character that keeps the page expressive.

### Brand accent font
- Family: `Cormorant Garamond` (Google Fonts)
- Roles:
  - Italic brand accent (`of` in the wordmark treatment)
  - Occasional editorial emphasis

### Type scale tokens (implemented)
- `display-xl`: ~`4.15rem` (hero heading)
- `display-lg`: ~`3.1rem` (section headings)
- `display-md`: ~`2.65rem` (feature headings)
- `heading-sm`: ~`2.25rem`
- `body-lg`: ~`1.2rem`
- `body-md`: ~`0.97rem`
- `ui-sm`: ~`0.85rem`
- `label-xs`: ~`0.76rem`

## 3) Color Palette

### Core surfaces
- `--bg-main`: `#EFEEEC`
- `--bg-soft`: `#E7E4DE`
- `--bg-elevated`: `#F4F1EC`
- `--bg-hero`: `#F6F3EF`

### Typography colors
- `--text-primary`: `#191612`
- `--text-muted`: `#443D35`
- `--text-subtle`: `#6F685F`

### Lines and accents
- `--line-soft`: `#D3CCC2`
- `--line-strong`: `#2A2520`
- `--accent-deep`: `#8D603D`
- `--accent-warm`: `#B4865A`

## 4) Layout and Structure
- Main content width: `min(1320px, 94vw)`
- Hierarchy pattern:
  - Eyebrow label (`section-kicker`)
  - Main heading (`section-header h2`)
  - Content block (grid/list/paragraphs)
- Major sections:
  - Header + announcement
  - Hero with CTA
  - Intro statement
  - Brands
  - Product categories
  - Value/features strip
  - Story
  - Impact statement
  - Contact
  - Footer + social links

## 5) Motion Language
- Scroll reveal for nearly every section/card (`data-animate` + `IntersectionObserver`)
- Directional variants: up, left, right, zoom, fade-down
- Staggered reveal delays for partner and category grids
- Soft hover transitions on cards, images, buttons, and social icons
- Hero entry zoom for stronger first impression

## 6) Social Icon Standard
- Social logos use official Bootstrap brand icon paths for:
  - Instagram
  - Pinterest
  - TikTok
  - LinkedIn
- Rendered as monochrome circular buttons to fit premium neutral UI.

## 7) Contact UX
- Added dedicated contact section with:
  - Business details
  - Email and phone links
  - Opening hours
  - Inquiry form (name, email, message)

## 8) Implementation Paths
- App/component structure: `/Users/kimaarakelyan/Documents/homeofsapiens/src/App.jsx`
- Styles and motion tokens: `/Users/kimaarakelyan/Documents/homeofsapiens/src/styles.css`
- Visual assets: `/Users/kimaarakelyan/Documents/homeofsapiens/public/assets/images`
- Partner logos: `/Users/kimaarakelyan/Documents/homeofsapiens/public/assets/logos`
