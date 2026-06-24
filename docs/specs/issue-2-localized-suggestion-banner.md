---
issue_number: 2
issue_title: "feat: suggest localized version via a dismissable banner (no forced redirect)"
repo: "beogip/ai-adoption-tools"
labels: [enhancement]
plan_level: "full"
depth: "medium"
branch_name: "feat/2-localized-suggestion-banner"
created_at: "2026-06-10T23:43:09Z"
---

# Implementation Plan: #2 — Suggest localized version via a dismissable banner

> **Approach note.** The original issue proposed an `Accept-Language` → 307 server redirect requiring an SSR migration (`@astrojs/vercel`, `output: 'server'`). After research we changed to a **client-side suggestion banner**: Google recommends against auto-redirecting by language, the site is already client-side-only so a banner keeps it **100% static**, there is no SEO/cache risk, and bots need no special handling (JS doesn't run for crawlers). The issue (#2) title, body, and a rationale comment were updated to reflect this.

## Files

| # | Action | Path | Purpose |
|---|--------|------|---------|
| 1 | modify | `astro.config.mjs` | Add `site: 'https://ai-adoption-tools.vercel.app'` to enable absolute hreflang. No `output`/adapter change — stays static. |
| 2 | create | `src/i18n/lang-preference.ts` | Pure `pickPreferredLang(browserLangs, supported, fallback)` helper |
| 3 | create | `src/i18n/lang-preference.test.ts` | Vitest unit tests for the helper |
| 4 | create | `src/lib/lang-client.ts` | DOM-only client helpers `writeLangCookie(lang)` / `hasLangCookie()` |
| 5 | create | `src/components/LangSuggestionBanner.astro` | Banner markup, hidden by default — **built with the `frontend-design` skill** |
| 6 | modify | `src/i18n/en.ts` + `src/i18n/es.ts` | Add `common.langBanner` copy `{ message, accept, dismiss }` + `Dict` interface key |
| 7 | modify | `src/layouts/BaseLayout.astro` | Full hreflang set, include banner, one client `<script>` wiring toggle + banner |

## Codebase Context

- **Reuse** `getPath(lang, page)` and `otherLang(lang)` from `src/i18n/index.ts` — build the suggested URL via the mapping, never string-prefix (handles locale-specific slugs).
- **Banner copy comes from the *target* dict.** With 2 locales the target is always `otherLang(lang)`, so render `getDict(otherLang(lang)).common.langBanner` server-side in `BaseLayout` — no client-side i18n needed.
- **Dict-in-lockstep rule** (`src/i18n/en.ts:27-31`): `en` is the reference `Dict`; `es.ts` is typed as `Dict`, so the build fails if the new `langBanner` key is missing or mistyped — add it to **both** files.
- **`src/lib/` convention**: existing `craft.ts`, `scoring.ts` — put the client cookie helper there. TypeScript, 2-space indent, JSDoc on exported functions.
- **`site` is currently unset** — `BaseLayout`'s `ogImage` (`src/layouts/BaseLayout.astro:35`) already falls back to relative; setting `site` upgrades it to absolute with no regression.
- **Current single hreflang** lives at `src/layouts/BaseLayout.astro:55`; the EN/ES toggle is the inline `<a class="lang-switch">` at `src/layouts/BaseLayout.astro:77` (currently a pure nav link, no JS).
- **Design**: build the banner component with the **`frontend-design` skill** so it matches the dark-teal theme and design tokens in `src/styles/tokens.css`; it must be visually consistent with the existing hero/topbar and accessible (focusable controls, dismiss button, `aria-live` so screen readers announce it).

## Steps

1. **Set `site` in `astro.config.mjs`.**
   **Done when:** `Astro.site` resolves to `https://ai-adoption-tools.vercel.app` in a built page.
2. **Add `pickPreferredLang`** → `src/i18n/lang-preference.ts`.
   **Done when:** `pickPreferredLang(["es-AR","es","en-US"],["en","es"],"en")==="es"`, `pickPreferredLang(["fr"],…)==="en"`, `pickPreferredLang([],…)==="en"`.
3. **Add client cookie helpers** → `src/lib/lang-client.ts`.
   **Done when:** `writeLangCookie("es")` sets `document.cookie` to `lang=es; path=/; max-age≈31536000; SameSite=Lax`; `hasLangCookie()` reflects presence.
4. **Add `common.langBanner` copy to both dicts** → `src/i18n/en.ts`, `src/i18n/es.ts` (and the `Dict` interface).
   **Done when:** `npm run build` type-checks (both dicts satisfy `Dict`); ES copy is Spanish, EN copy is English.
5. **Build the banner component** → `src/components/LangSuggestionBanner.astro`, using the **`frontend-design` skill** for the markup/styles.
   **Done when:** it renders hidden (`hidden`/`display:none`) with an accept `<a href={targetUrl}>` and a dismiss `<button>`, labeled from the target-locale copy, styled to the dark-teal theme/tokens and accessible.
6. **Expand hreflang in `<head>`** → `src/layouts/BaseLayout.astro`.
   **Done when:** every page's `<head>` contains absolute `hreflang="en"`, `hreflang="es"`, and `hreflang="x-default"` (→ English) links.
7. **Wire the client `<script>` in BaseLayout** (toggle cookie-write + banner show/accept/dismiss).
   **Done when:** browser set to `es` on `/craft` with no cookie reveals the Spanish banner linking `/es/craft`; accept/dismiss/toggle each write `lang`; with a cookie present the banner never shows.

## Interfaces

- `pickPreferredLang(browserLangs: readonly string[], supported: Lang[], fallback: Lang): Lang` — ordered browser-lang strings → best supported `Lang`.
- `BannerCopy { message: string; accept: string; dismiss: string }` — the new `common.langBanner` shape added to `Dict`.
- `LangSuggestionBanner` props: `{ currentLang: Lang; targetLang: Lang; targetUrl: string; copy: BannerCopy }`.
- `writeLangCookie(lang: Lang): void` and `hasLangCookie(): boolean` — client cookie helpers.

## Function Design

- `src/i18n/lang-preference.ts`: `pickPreferredLang` — sole concern: map an ordered list of browser-lang strings to a supported `Lang`. Pure, no DOM.
- `src/lib/lang-client.ts`: `writeLangCookie` / `hasLangCookie` — sole concern: read/write the `lang` cookie. DOM-only.
- `LangSuggestionBanner.astro`: markup only — no logic.
- `BaseLayout` `<script>` (module): sole concern: on load decide banner visibility (via `pickPreferredLang(navigator.languages, …)` + `hasLangCookie()`), and wire cookie writes on toggle-click / banner-accept / banner-dismiss. Orchestration only — delegates detection and cookie I/O to the helpers above.

## Acceptance Criteria (EARS)

- **AC-1** When a visitor with no `lang` cookie loads a page whose locale differs from their browser's highest-priority supported locale, the system shall display a dismissable banner (in the target locale) linking to the `getPath` equivalent.
- **AC-2** If the browser-preferred supported locale equals the current page's locale, then no banner shall be displayed.
- **AC-3** If a `lang` cookie is present, then no banner shall be displayed.
- **AC-4** When the visitor clicks the banner's accept link, the system shall navigate to the target-locale URL and write `lang` = target locale.
- **AC-5** When the visitor dismisses the banner, the system shall hide it and write `lang` = current locale, so it does not reappear.
- **AC-6** When the visitor clicks the EN/ES toggle, the system shall write `lang` = target locale (~12 months, `path=/`, `SameSite=Lax`).
- **AC-7** The system shall write the cookie only on explicit user action; page load alone shall never write it.
- **AC-8** Every page shall expose a full hreflang set — `en`, `es`, and `x-default` → English — using absolute URLs.
- **AC-9** When mapping `navigator.languages`, the system shall honor order and region subtags, mapping to the nearest supported locale with `en` fallback.
- **AC-10** The banner suggestion text shall be rendered in the target locale.
- **AC-11** If JavaScript is disabled or the requester is a crawler, then no banner shall be shown and the page shall serve normally with complete hreflang.

## Out of Scope

- Any automatic redirect / SSR / `@astrojs/vercel` adapter / server middleware.
- Locales beyond `en`/`es`.
- Analytics or consent tooling for the functional cookie.
- A separate banner-dismissal flag — dismiss reuses the `lang` cookie.

## Edge Cases + Error Handling

| # | Scenario | Source | Handling |
|---|----------|--------|----------|
| 1 | `es-AR,es,en-US` | [from issue] | Iterate in order, strip region subtag → first supported = `es` |
| 2 | Unsupported `fr` | [from issue] | Fall back to `en` |
| 3 | `navigator.languages` empty/undefined | [inferred] | Fall back to `en`; no banner if already on English |
| 4 | `lang` cookie present | [from issue] | Skip banner entirely |
| 5 | Locale-specific slugs | [from issue] | Build target URL via `getPath`, not naive prefixing |
| 6 | Crawler / JS disabled | [from issue] | No banner; full hreflang serves both locales independently |
| 7 | Banner reveal causes layout shift (CLS) | [inferred] | Hidden by default; reveal in a non-shifting position (top/sticky strip) sized to avoid jank |
| 8 | `site` unset → `new URL()` throws at build | [inferred] | Set `site` in config (Step 1); build fails loudly if missing rather than emitting relative hreflang |

## Done Criteria per Feature

| Feature | Done when |
|---------|-----------|
| Browser-language detection | AC-9 passes |
| Suggestion banner | AC-1, AC-2, AC-10, AC-11 pass |
| Cookie persistence | AC-3, AC-4, AC-5, AC-6, AC-7 pass |
| hreflang | AC-8 passes |

## Risks

- **CLS when the banner appears** → render hidden and reveal in a non-shifting position (top sticky strip); reserve height. Verify visually in browser.
- **Dict drift** (key added to `en` but not `es`) → `Dict` typing fails the build; add to both in lockstep.
- **Banner shown in the wrong language** → always render the target-locale copy (`otherLang(lang)`); AC-10 done-when covers it.
- **Absolute hreflang depends on `site`** → Step 1 sets it; without it `new URL()` throws at build (fail-loud, not a silent relative URL).

## Test Strategy

- **Unit (vitest, already configured — `npm test`):** `pickPreferredLang` — order precedence, region subtags (`es-AR`→`es`), `fr`→`en` fallback, empty/undefined array → fallback.
- **Manual browser matrix (`npm run dev`):** set the browser language to Spanish, open `/craft` → Spanish banner linking `/es/craft`; accept → cookie `lang=es`, lands on `/es/craft`; reload `/craft` → no banner (cookie); dismiss flow → cookie `lang=en`, banner does not reappear; click EN/ES toggle → cookie flips; View Source → 3 absolute hreflang links present.
- **Design review:** verify the banner (built via the `frontend-design` skill) matches the dark-teal theme/tokens, has no CLS, and is keyboard/screen-reader accessible.
- **No server tests** — fully static; cookie/DOM behavior is client-side, covered by the manual matrix plus the pure-function unit tests.
