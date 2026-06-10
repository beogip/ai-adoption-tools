# AI Adoption Tools

A small suite of client-side tools that help non-technical teams adopt AI with
good judgment. Built for the AI consulting program: each tool is the interactive
version of a worksheet from the workshop material.

Two tools today:

- **CRAFT Builder** (`/craft`): build an effective prompt step by step
  (Context, Role, Action, Format, Tone). It auto-assembles the prompt as you
  type and lets you copy it. No AI execution, no API keys.
- **Process Scorer** (`/procesos`): decide when to automate a process with AI
  and when not. Score one process across five questions (1-5), get a zone
  (automate / collaborate / keep human), and check the three red flags.

Everything runs in the browser. State is persisted to `localStorage`; nothing is
sent to a server.

## Stack

- [Astro](https://astro.build) with static output.
- React islands (`@astrojs/react`) for the interactive widgets.
- TypeScript for the pure scoring / prompt-building logic.
- [Vitest](https://vitest.dev) for unit tests on that logic.

## Project structure

```
src/
├── styles/tokens.css         # shared design system (ported from the program)
├── i18n/                     # all UI copy lives here
│   ├── en.ts                 # Dict interface + English reference dictionary
│   ├── es.ts                 # Spanish dictionary, typed as Dict
│   └── index.ts              # getDict(), getPath(), lang helpers
├── layouts/BaseLayout.astro  # page shell + hero + language switcher
├── lib/                      # pure logic + localStorage hook (+ tests)
│   ├── craft.ts              # buildPrompt(fields, labels)
│   ├── scoring.ts            # classify() + red flags (language-agnostic keys)
│   └── useLocalStorage.ts
├── components/
│   ├── shared/               # CopyButton, RevealExamples, PrintButton, ScoreBadge
│   ├── craft/CraftBuilder.tsx     # presentation only; receives a Dict prop
│   ├── procesos/ProcessScorer.tsx # presentation only; receives a Dict prop
│   └── views/                # one .astro view per page, parameterized by lang
└── pages/                    # en at root (/, /craft, /procesos), es under /es
```

## Internationalization (en + es)

URLs are per-language via Astro's i18n. English is the default locale and lives
at the root (`/`, `/craft`, `/procesos`); Spanish is prefixed (`/es`,
`/es/craft`, `/es/procesos`). A language switcher sits in the header.

All visible text lives in two mirror dictionaries: `src/i18n/en.ts` and
`src/i18n/es.ts`. The English file declares the `Dict` interface and `es.ts` is
typed `Dict`, so **the build fails if a key is missing or mistyped** in either
language. Components never hardcode strings: each page resolves the dictionary
for its language and passes it down, so adding or editing copy means editing the
two dictionary files in lockstep, nothing else.

To add a third language: add `xx.ts` typed as `Dict`, register it in
`src/i18n/index.ts` and `astro.config.mjs`, and add `src/pages/xx/*` route
wrappers (3 one-line files).

## Commands

| Command           | Action                                       |
| :---------------- | :------------------------------------------- |
| `npm install`     | Install dependencies                         |
| `npm run dev`     | Start the dev server at `localhost:4321`     |
| `npm run build`   | Build the static site to `./dist/`           |
| `npm run preview` | Preview the production build locally         |
| `npm run test`    | Run the unit tests (Vitest)                  |

## Deploy

Static build. Vercel auto-detects Astro: connect the repo, preview deploys on
push, production on `main`.

## Source of truth

The tool content (questions, examples, thresholds) mirrors the AI consulting
program worksheets. The visible content is Spanish (Rioplatense); code and docs
are English.
