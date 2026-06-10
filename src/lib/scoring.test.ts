import { describe, expect, it } from "vitest";
import {
  anyRedFlag,
  classify,
  CRITERION_KEYS,
  EMPTY_RED_FLAGS,
  evaluate,
  WEAK_SCORE_MAX,
  type CriterionKey,
} from "./scoring";

describe("classify", () => {
  it("maps the top range to automatizar", () => {
    expect(classify(25).zone).toBe("automatizar");
    expect(classify(20).zone).toBe("automatizar");
  });

  it("maps the middle range to colaborar", () => {
    expect(classify(19).zone).toBe("colaborar");
    expect(classify(12).zone).toBe("colaborar");
  });

  it("maps the low range to humano", () => {
    expect(classify(11).zone).toBe("humano");
    expect(classify(5).zone).toBe("humano");
  });

  it("places the zone boundaries correctly", () => {
    // 11/12 boundary
    expect(classify(11).zone).toBe("humano");
    expect(classify(12).zone).toBe("colaborar");
    // 19/20 boundary
    expect(classify(19).zone).toBe("colaborar");
    expect(classify(20).zone).toBe("automatizar");
  });

  it("exposes a badge per zone", () => {
    expect(classify(25).badge).toBe("ok");
    expect(classify(15).badge).toBe("warn");
    expect(classify(8).badge).toBe("bad");
  });
});

describe("anyRedFlag", () => {
  it("is false when no flag is set", () => {
    expect(anyRedFlag(EMPTY_RED_FLAGS)).toBe(false);
  });

  it("is true when any single flag is set", () => {
    expect(anyRedFlag({ ...EMPTY_RED_FLAGS, datosConfidenciales: true })).toBe(true);
    expect(anyRedFlag({ ...EMPTY_RED_FLAGS, consecuenciasLegales: true })).toBe(true);
    expect(anyRedFlag({ ...EMPTY_RED_FLAGS, faltaSupervision: true })).toBe(true);
  });
});

function scoresOf(values: number[]): Record<CriterionKey, number | null> {
  return Object.fromEntries(CRITERION_KEYS.map((k, i) => [k, values[i]])) as Record<CriterionKey, number | null>;
}

describe("evaluate", () => {
  it("returns null until all criteria are scored", () => {
    expect(evaluate(scoresOf([5, 5, 5, 5, 5]), EMPTY_RED_FLAGS)).not.toBeNull();
    expect(evaluate({ ...scoresOf([5, 5, 5, 5, 5]), complejidad: null }, EMPTY_RED_FLAGS)).toBeNull();
  });

  it("keeps a clean high score in automatizar", () => {
    const r = evaluate(scoresOf([5, 4, 5, 4, 5]), EMPTY_RED_FLAGS);
    expect(r).toMatchObject({ total: 23, zone: "automatizar", baseZone: "automatizar", badge: "ok" });
    expect(r?.weakCriteria).toEqual([]);
  });

  it("caps automatizar at colaborar when a criterion scores 1-2", () => {
    const r = evaluate(scoresOf([1, 5, 5, 5, 5]), EMPTY_RED_FLAGS);
    expect(r).toMatchObject({ total: 21, baseZone: "automatizar", zone: "colaborar", badge: "warn" });
    expect(r?.weakCriteria).toEqual(["repetible"]);
  });

  it("caps automatizar at colaborar when a red flag is active", () => {
    const r = evaluate(scoresOf([5, 5, 5, 5, 5]), { ...EMPTY_RED_FLAGS, consecuenciasLegales: true });
    expect(r).toMatchObject({ total: 25, baseZone: "automatizar", zone: "colaborar", badge: "warn", flagged: true });
  });

  it("leaves colaborar and humano zones untouched by cap rules", () => {
    expect(evaluate(scoresOf([2, 3, 3, 2, 2]), EMPTY_RED_FLAGS)).toMatchObject({ zone: "colaborar", badge: "warn" });
    expect(evaluate(scoresOf([1, 1, 1, 1, 1]), { ...EMPTY_RED_FLAGS, datosConfidenciales: true })).toMatchObject({
      zone: "humano",
      badge: "bad",
    });
  });

  it("never lands in automatizar with a weak criterion or a red flag (all 3125 combinations)", () => {
    const flagged = { ...EMPTY_RED_FLAGS, faltaSupervision: true };
    for (let a = 1; a <= 5; a++)
      for (let b = 1; b <= 5; b++)
        for (let c = 1; c <= 5; c++)
          for (let d = 1; d <= 5; d++)
            for (let e = 1; e <= 5; e++) {
              const values = [a, b, c, d, e];
              const clean = evaluate(scoresOf(values), EMPTY_RED_FLAGS)!;
              if (clean.zone === "automatizar") {
                expect(clean.total).toBeGreaterThanOrEqual(20);
                expect(Math.min(...values)).toBeGreaterThan(WEAK_SCORE_MAX);
              }
              expect(evaluate(scoresOf(values), flagged)!.zone).not.toBe("automatizar");
            }
  });
});
