# Julieta Sayago — Portfolio

A scroll-driven personal portfolio built as a live demo of the kind of sites I build for clients: pinned sections, scroll-scrubbed timelines, and cinematic reveals instead of static scrolling.

## ✨ Features

- **Scroll-driven animations** — every section is pinned and scrubbed with [GSAP](https://gsap.com/) `ScrollTrigger`, choreographed to scroll position rather than time
- **Distinct motion per section** — a 3D tilt-and-blur reveal for Experience, a traveling rail/dot "stepper" timeline for Education, a progressive word-by-word "writing" effect for About
- **Curtain preloader** — a full-screen wipe reveal on first load, gated behind web font loading
- **Bilingual (ES/EN)** — every string lives in a typed translation dictionary, switchable live without a page reload
- **Light/dark theme** — CSS custom properties swap palettes instantly, persisted to `localStorage`
- **Smooth scroll** — [Lenis](https://lenis.darkroom.engineering/) drives the physical scroll feel that GSAP scrubs against
- **Responsive navigation** — hover-reveal dot navigation on desktop, a full-screen hamburger menu on tablet/mobile
- **Custom cursor** — a blended follower cursor on fine-pointer devices only, automatically off on touch

## 🛠️ Stack

| | |
|---|---|
| **Framework** | React 18 + TypeScript |
| **Build tool** | Vite |
| **Animation** | GSAP + ScrollTrigger |
| **Smooth scroll** | Lenis |
| **Styling** | Plain CSS (custom properties, `clamp()`-based fluid type, no framework) |
| **Fonts** | Bricolage Grotesque, JetBrains Mono |

## 📁 Structure

```
src/
├── components/       # One component per section (Hero, Intro, About, Experience, Education, Stack, Cta)
│                     # + Chrome (fixed nav/HUD/cursor) and Preloader
├── hooks/
│   └── useScrollAnimations.ts   # All GSAP/ScrollTrigger/Lenis setup, one hook to rule them all
├── i18n/
│   ├── translations.ts          # ES/EN copy, typed
│   └── LanguageContext.tsx
├── theme/
│   └── ThemeContext.tsx         # light/dark state + persistence
└── index.css                    # design tokens + all component styles
```

## 🚀 Getting started

```bash
npm install
npm run dev       # start the dev server
npm run build     # type-check + production build to dist/
npm run preview   # preview the production build locally
```

## 📄 License

Personal project — not licensed for reuse.
