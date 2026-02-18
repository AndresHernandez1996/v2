# V2 Portfolio Starter

Frontend v2 project built with React + TypeScript + Vite, using SCSS for styling, i18n (`en` / `es`), animejs, and entrance animations with ScrollReveal.

## Stack

- React 19
- TypeScript
- Vite 7
- SCSS Modules + global design tokens
- ESLint + Prettier + Husky + lint-staged
- i18next + react-i18next
- animejs (main loader animation)
- scrollreveal
- react-helmet

## Scripts

- `npm run dev`: start development server
- `npm run build`: type-check + production build
- `npm run preview`: preview production build locally
- `npm run lint`: run full lint
- `npm run format`: format with Prettier

## Structure (summary)

```txt
src/
  components/
    Layout/
    Loader/
    icons/
  i18n/
    locales/
  lib/
    scrollReveal.ts
  styles/
    _tokens.scss
    _mixins.scss
    globals.scss
```

## Implementation Notes

- Import alias configured: `@/* -> src/*`.
- Loader:
  - uses `headVector.svg` and `yVector.svg`
  - sequence: `headVector` first, then `yVector`
- ScrollReveal:
  - initialized after the loader finishes to avoid visual blips.
- i18n:
  - primary language: `en`
  - secondary language: `es`

## Git Hooks

Husky runs on `pre-commit`:

- `lint-staged` on staged files (ESLint + Prettier).
