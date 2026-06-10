import { describe, expect, it } from "vitest";
import { classify, CRITERION_KEYS, type CriterionKey } from "./scoring";

/**
 * Smoke test: enumerate ALL 5^5 = 3125 score combinations and look for
 * combinations where the zone classification is arguably "wrong" given the
 * meaning of each criterion.
 *
 * Direction of every criterion (from the i18n copy): 5 = more automatable.
 *   repetible:   5 = always same steps
 *   verificable: 5 = output verifiable in <5 min
 *   frecuencia:  5 = daily
 *   costoError:  5 = error corrects easily (low cost of error)
 *   complejidad: 5 = follows clear rules (low complexity)
 *
 * "Make-or-break" feasibility criteria — if any of these is at its floor the
 * process is genuinely hard/dangerous to automate, regardless of the others:
 *   - verificable (can't verify the output)
 *   - costoError  (a mistake has grave consequences)
 *   - complejidad (needs expert judgment)
 * frecuencia is an ROI axis, NOT a feasibility axis: a rare task can still be
 * trivially automatable.
 */

type Combo = Record<CriterionKey, number>;

function* allCombos(): Generator<Combo> {
  const vals = [1, 2, 3, 4, 5];
  for (const a of vals)
    for (const b of vals)
      for (const c of vals)
        for (const d of vals)
          for (const e of vals)
            yield { repetible: a, verificable: b, frecuencia: c, costoError: d, complejidad: e };
}

const total = (c: Combo) => CRITERION_KEYS.reduce((s, k) => s + c[k], 0);
const fmt = (c: Combo) =>
  `rep=${c.repetible} ver=${c.verificable} frec=${c.frecuencia} err=${c.costoError} cmplx=${c.complejidad}`;

describe("scoring smoke test (all 3125 combinations)", () => {
  it("counts the full space", () => {
    expect([...allCombos()].length).toBe(5 ** 5);
  });

  it("FINDING A: 'Automatizar' while a make-or-break criterion is at the floor (=1)", () => {
    const dangerous = [...allCombos()].filter((c) => {
      const z = classify(total(c)).zone;
      const veto = c.verificable === 1 || c.costoError === 1 || c.complejidad === 1;
      return z === "automatizar" && veto;
    });
    // eslint-disable-next-line no-console
    console.log(`\n[A] "Automatizar" with a critical criterion = 1: ${dangerous.length} combos`);
    dangerous.slice(0, 6).forEach((c) => console.log(`    ${fmt(c)}  -> total ${total(c)}`));
    // We EXPECT the flat-sum model to (incorrectly) allow these:
    expect(dangerous.length).toBeGreaterThan(0);
  });

  it("FINDING B: worst case — expert judgment / unverifiable / grave error still lands in Automatizar", () => {
    // Needs expert judgment but everything else maxed out.
    expect(classify(total({ repetible: 5, verificable: 5, frecuencia: 5, costoError: 5, complejidad: 1 })).zone)
      .toBe("automatizar"); // total 21
    // Output cannot be verified but everything else maxed.
    expect(classify(total({ repetible: 5, verificable: 1, frecuencia: 5, costoError: 5, complejidad: 5 })).zone)
      .toBe("automatizar"); // total 21
    // A mistake has grave consequences but everything else maxed.
    expect(classify(total({ repetible: 5, verificable: 5, frecuencia: 5, costoError: 1, complejidad: 5 })).zone)
      .toBe("automatizar"); // total 21
  });

  it("FINDING C: ROI axis (frecuencia) can move the zone even though it is not a feasibility axis", () => {
    // Same perfectly-automatable feasibility profile, only frequency changes.
    const daily = { repetible: 4, verificable: 4, frecuencia: 5, costoError: 4, complejidad: 4 };
    const rare = { repetible: 4, verificable: 4, frecuencia: 1, costoError: 4, complejidad: 4 };
    console.log(`\n[C] daily ${fmt(daily)} -> total ${total(daily)} / ${classify(total(daily)).zone}`);
    console.log(`[C] rare  ${fmt(rare)} -> total ${total(rare)} / ${classify(total(rare)).zone}`);
    // identical feasibility, frequency alone flips automatizar -> colaborar
    expect(classify(total(daily)).zone).toBe("automatizar"); // 20
    expect(classify(total(rare)).zone).toBe("colaborar"); // 16
  });

  it("FINDING D: distribution of zones across the whole space", () => {
    const counts = { automatizar: 0, colaborar: 0, humano: 0 };
    for (const c of allCombos()) counts[classify(total(c)).zone]++;
    console.log(`\n[D] zone distribution: ${JSON.stringify(counts)}`);
    expect(counts.automatizar + counts.colaborar + counts.humano).toBe(5 ** 5);
  });
});
