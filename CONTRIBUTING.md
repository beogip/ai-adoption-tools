# Contributing to AI Adoption Tools

Thanks for your interest in contributing! This document explains how to get set
up and how to submit changes.

## How to Contribute

1. Fork the repository.
2. Create a branch from `main`.
3. Make your changes and commit them. We follow
   [Conventional Commits](https://www.conventionalcommits.org/) (enforced by
   commitlint via a husky `commit-msg` hook).
4. Open a pull request against `main`.

## Development Setup

Requires Node.js >= 22.12 and npm.

```sh
npm install      # install dependencies (also sets up the git hooks)
npm run dev      # start the dev server at localhost:4321
npm test         # run the unit tests (Vitest)
npm run build    # build the static site to ./dist/
```

## Submitting Pull Requests

- CI must pass (tests + build).
- Add tests for new features, especially for the pure logic in `src/lib/`.
- Keep PRs focused: one change per PR.

## Code Style

- TypeScript for logic, React for interactive widgets, Astro for pages.
- There is no enforced formatter; match the existing style (2-space
  indentation, double quotes).
- All visible UI text lives in the i18n dictionaries (`src/i18n/en.ts` and
  `src/i18n/es.ts`). Never hardcode user-facing strings in components.

## Adding a New Language

The site is bilingual (English at the root, Spanish under `/es`) and designed
to make new languages cheap to add:

1. Add `src/i18n/xx.ts` typed as `Dict` (the interface is declared in
   `src/i18n/en.ts`, so the build fails if a key is missing or mistyped).
2. Register the language in `src/i18n/index.ts` and `astro.config.mjs`.
3. Add `src/pages/xx/*` route wrappers (3 one-line files, mirror `src/pages/es/`).
