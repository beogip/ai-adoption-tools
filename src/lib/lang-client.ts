import type { Lang } from "../i18n";

/**
 * Client-side read/write of the `lang` cookie that remembers an explicit
 * language choice. The cookie is a strictly-necessary functional cookie set
 * only on user action (toggle click, banner accept, banner dismiss) — never on
 * page load — so it stays consent-exempt. Server-readable (not localStorage).
 */
const COOKIE_NAME = "lang";
const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

/** Persist an explicit language choice (~12 months, first-party, SameSite=Lax). */
export function writeLangCookie(lang: Lang): void {
  document.cookie = `${COOKIE_NAME}=${lang}; path=/; max-age=${ONE_YEAR_SECONDS}; SameSite=Lax`;
}

/** Whether the visitor has already made an explicit language choice. */
export function hasLangCookie(): boolean {
  return document.cookie
    .split("; ")
    .some((pair) => pair.startsWith(`${COOKIE_NAME}=`));
}
