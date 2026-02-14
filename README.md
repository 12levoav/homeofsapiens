# Home of Sapiens Landing Page (Vite + React JSX)

## Run
1. Install Node.js 18+.
2. Install dependencies:
   - `npm install`
3. Start frontend only:
   - `npm run dev`
4. Start contact API (Resend):
   - `npm run dev:api`
5. Or run both together:
   - `npm run dev:full`

## Build
- `npm run build`
- `npm run preview`

## Gemini Image Generation
- Script: `/Users/kimaarakelyan/Documents/homeofsapiens/scripts/gemini_image_gen.py`
- Key file (local, gitignored): `/Users/kimaarakelyan/Documents/homeofsapiens/.env.gemini`

Example:
- `python3 /Users/kimaarakelyan/Documents/homeofsapiens/scripts/gemini_image_gen.py --prompt "Minimal sandy cave-style house exterior at golden hour" --name hero-cave-house`

Defaults:
- Model: `gemini-2.5-flash-image`
- Output dir: `/Users/kimaarakelyan/Documents/homeofsapiens/output/gemini`

## Project Structure
- `/Users/kimaarakelyan/Documents/homeofsapiens/src/App.jsx` - page sections and JSX components
- `/Users/kimaarakelyan/Documents/homeofsapiens/src/styles.css` - design tokens and all styling
- `/Users/kimaarakelyan/Documents/homeofsapiens/public/assets/images` - hero/category/story visual assets
- `/Users/kimaarakelyan/Documents/homeofsapiens/public/assets/logos` - partner logo assets
- `/Users/kimaarakelyan/Documents/homeofsapiens/BRANDBOOK.md` - inferred brandbook (fonts/type/colors)
- `/Users/kimaarakelyan/Documents/homeofsapiens/server/contact-server.mjs` - local contact API forwarding messages to Resend

## Contact Form (Resend)
- Local env file: `/Users/kimaarakelyan/Documents/homeofsapiens/.env.resend`
- Tracked template: `/Users/kimaarakelyan/Documents/homeofsapiens/.env.resend.example`
- Required variables:
  - `RESEND_API_KEY`
  - `CONTACT_TO`
  - `CONTACT_FROM`

## Environment Files
- Do not commit real keys in `.env.*` files.
- Use templates:
  - `/Users/kimaarakelyan/Documents/homeofsapiens/.env.gemini.example`
  - `/Users/kimaarakelyan/Documents/homeofsapiens/.env.resend.example`

## Asset Replacement
If you have the exact production images/logos, replace files in `/Users/kimaarakelyan/Documents/homeofsapiens/public/assets/images` and `/Users/kimaarakelyan/Documents/homeofsapiens/public/assets/logos` with the same names.
# homeofsapiens
