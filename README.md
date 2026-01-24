# AJRR - SvelteKit Project

This project has been migrated to SvelteKit. All pages have been converted from separate HTML/CSS/JS files to SvelteKit `+page.svelte` components.

## Project Structure

```
Project/
├── src/
│   ├── routes/
│   │   ├── +page.svelte          # Home page (/)
│   │   ├── calendar/
│   │   │   └── +page.svelte      # Calendar page (/calendar)
│   │   ├── donation/
│   │   │   └── +page.svelte      # Donation page (/donation)
│   │   ├── salat/
│   │   │   └── +page.svelte      # Salat page (/salat)
│   │   ├── quran/
│   │   │   └── +page.svelte      # Quran page (/quran)
│   │   ├── tasbih/
│   │   │   └── +page.svelte      # Tasbih page (/tasbih)
│   │   └── contact/
│   │       └── +page.svelte      # Contact page (/contact)
│   └── app.html                  # App template
├── static/                       # Static assets
│   ├── kaaba.jpg
│   ├── National-flag-of-palestine-with-ribbon-on-transparent-background-PNG-removebg-preview.png
│   └── donation/
│       ├── heart.png
│       ├── users.png
│       └── earth.png
├── package.json
├── svelte.config.js
└── vite.config.js
```

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to `http://localhost:5173`

## Building for Production

```bash
npm run build
```

This will create an optimized production build in the `build` directory.

## What Changed

- All HTML pages converted to `+page.svelte` components
- CSS and JavaScript combined into each component
- Static assets moved to `static/` folder
- Navigation links updated to use SvelteKit routing (e.g., `/calendar` instead of `calendar/calendar.html`)
- All functionality preserved and converted to Svelte reactive code

## Routes

- `/` - Home page
- `/calendar` - Hijri Calendar & Events
- `/donation` - Donations page
- `/salat` - Prayer times
- `/quran` - Quran reader
- `/tasbih` - Tasbih counter
- `/contact` - Contact form
