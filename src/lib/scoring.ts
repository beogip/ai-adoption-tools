/**
 * Pure logic for the process evaluator ("when to automate, when not"):
 * five criteria scored 1-5, summed to a zone, plus three red flags.
 *
 * This module is language-agnostic: it returns zone/badge keys, never display
 * text. The UI maps those keys to translated copy via the i18n dictionary.
 */

export type Zone = "automatizar" | "colaborar" | "humano";
export type Badge = "ok" | "warn" | "bad";

export type CriterionKey = "repetible" | "verificable" | "frecuencia" | "costoError" | "complejidad";

export const CRITERION_KEYS: CriterionKey[] = [
  "repetible",
  "verificable",
  "frecuencia",
  "costoError",
  "complejidad",
];

export interface ZoneResult {
  zone: Zone;
  badge: Badge;
}

/**
 * Map a total score (5-25) to its zone.
 * 20-25 automatizar, 12-19 colaborar, 5-11 humano.
 */
export function classify(total: number): ZoneResult {
  if (total >= 20) return { zone: "automatizar", badge: "ok" };
  if (total >= 12) return { zone: "colaborar", badge: "warn" };
  return { zone: "humano", badge: "bad" };
}

export interface RedFlags {
  datosConfidenciales: boolean;
  consecuenciasLegales: boolean;
  faltaSupervision: boolean;
}

export type FlagKey = keyof RedFlags;

export const FLAG_KEYS: FlagKey[] = ["datosConfidenciales", "consecuenciasLegales", "faltaSupervision"];

export const EMPTY_RED_FLAGS: RedFlags = {
  datosConfidenciales: false,
  consecuenciasLegales: false,
  faltaSupervision: false,
};

export function anyRedFlag(flags: RedFlags): boolean {
  return flags.datosConfidenciales || flags.consecuenciasLegales || flags.faltaSupervision;
}

/** A criterion scored at or below this is a weakness the other criteria can't compensate. */
export const WEAK_SCORE_MAX = 2;

export interface Evaluation extends ZoneResult {
  total: number;
  /** Zone the raw total maps to, before cap rules. */
  baseZone: Zone;
  /** Criteria scored at or below WEAK_SCORE_MAX. */
  weakCriteria: CriterionKey[];
  flagged: boolean;
}

/**
 * Full evaluation: classify the total, then apply cap rules. "Automatizar"
 * promises minimal supervision, which nothing justifies when a criterion
 * scored 1-2 or a red flag is active — those results are capped at
 * "colaborar". Returns null until all five criteria are scored.
 */
export function evaluate(scores: Record<CriterionKey, number | null>, flags: RedFlags): Evaluation | null {
  if (CRITERION_KEYS.some((k) => scores[k] == null)) return null;
  const total = CRITERION_KEYS.reduce((sum, k) => sum + (scores[k] as number), 0);
  const base = classify(total);
  const weakCriteria = CRITERION_KEYS.filter((k) => (scores[k] as number) <= WEAK_SCORE_MAX);
  const flagged = anyRedFlag(flags);
  const capped = base.zone === "automatizar" && (weakCriteria.length > 0 || flagged);
  return {
    total,
    baseZone: base.zone,
    zone: capped ? "colaborar" : base.zone,
    badge: capped ? "warn" : base.badge,
    weakCriteria,
    flagged,
  };
}
