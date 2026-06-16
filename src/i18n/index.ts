import { en, type Dict } from "./en";
import { es } from "./es";

export type Lang = "en" | "es";
export type { Dict, FooterCopy } from "./en";

/** Author profile, shared by the footer, the home about section and tool CTAs. */
export const LINKEDIN_URL = "https://www.linkedin.com/in/juan-gipponi/";

/** Source repository, linked from the footer. */
export const GITHUB_URL = "https://github.com/beogip/ai-adoption-tools";

/** Sibling site by the same author — signals the shared-creator family. */
export const SIBLING_URL = "https://code-first-agents.com";

export const DEFAULT_LANG: Lang = "en";
export const LANGS: Lang[] = ["en", "es"];

const DICTS: Record<Lang, Dict> = { en, es };

export function getDict(lang: Lang): Dict {
  return DICTS[lang];
}

/** Logical page id, mapped to a localized URL. */
export type Page = "home" | "craft" | "process" | "legal";

const SLUG: Record<Page, string> = { home: "", craft: "craft", process: "process", legal: "legal" };

/**
 * Build the URL for a page in a given language. English is the default locale
 * and lives at the root; Spanish is prefixed with /es.
 *   getPath("en", "craft")     -> "/craft"
 *   getPath("es", "home")      -> "/es"
 *   getPath("es", "process")   -> "/es/process"
 */
export function getPath(lang: Lang, page: Page): string {
  const slug = SLUG[page];
  if (lang === DEFAULT_LANG) return slug ? `/${slug}` : "/";
  return slug ? `/es/${slug}` : "/es";
}

export function otherLang(lang: Lang): Lang {
  return lang === "en" ? "es" : "en";
}

export const LANG_LABEL: Record<Lang, string> = { en: "EN", es: "ES" };
