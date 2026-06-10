import { useEffect, useState } from "react";

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

/**
 * Merge stored data onto the defaults, one level deep, so an older or partial
 * schema (e.g. a missing `meta` key) can't crash the component at render.
 * Nested plain objects are shallow-merged; everything else is taken from the
 * stored value when present, otherwise from the default.
 */
function mergeDefaults<T>(initial: T, stored: unknown): T {
  if (!isPlainObject(initial) || !isPlainObject(stored)) {
    return stored === undefined ? initial : (stored as T);
  }
  const out: Record<string, unknown> = { ...initial };
  for (const k of Object.keys(initial)) {
    const iv = (initial as Record<string, unknown>)[k];
    const sv = stored[k];
    if (sv === undefined) continue;
    out[k] = isPlainObject(iv) && isPlainObject(sv) ? { ...iv, ...sv } : sv;
  }
  return out as T;
}

function read<T>(key: string, initial: T): T {
  if (typeof window === "undefined") return initial;
  try {
    const raw = window.localStorage.getItem(key);
    if (raw != null) return mergeDefaults(initial, JSON.parse(raw));
  } catch {
    /* ignore malformed / unavailable storage */
  }
  return initial;
}

/**
 * Persist a piece of state to localStorage. The initial value is read from
 * storage lazily on first render (client only), so there is no load/save race
 * and no flash. Components using this hook must be mounted with
 * `client:only="react"` so the server never renders a diverging tree.
 */
export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => read(key, initial));

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* ignore quota / unavailable storage */
    }
  }, [key, value]);

  const clear = () => {
    try {
      window.localStorage.removeItem(key);
    } catch {
      /* ignore */
    }
    setValue(initial);
  };

  return [value, setValue, clear] as const;
}
