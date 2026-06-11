import type { Lang } from "./index";

/**
 * Pick the best supported locale from an ordered list of browser language tags
 * (the client-side equivalent of `Accept-Language`, e.g. `navigator.languages`).
 *
 * Entries are already ordered by preference, so the first one whose base
 * language (region subtag stripped) is supported wins. Falls back when nothing
 * matches or the list is empty/missing.
 *   pickPreferredLang(["es-AR", "es", "en-US"], ["en", "es"], "en") -> "es"
 *   pickPreferredLang(["fr"], ["en", "es"], "en")                   -> "en"
 *   pickPreferredLang([], ["en", "es"], "en")                       -> "en"
 */
export function pickPreferredLang(
  browserLangs: readonly string[],
  supported: Lang[],
  fallback: Lang,
): Lang {
  if (!browserLangs?.length) return fallback;
  for (const tag of browserLangs) {
    const base = tag.toLowerCase().split("-")[0];
    const match = supported.find((lang) => lang === base);
    if (match) return match;
  }
  return fallback;
}
