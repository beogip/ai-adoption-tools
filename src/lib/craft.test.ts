import { describe, expect, it } from "vitest";
import { buildPrompt, EMPTY_CRAFT, type CraftFields } from "./craft";

const LABELS: Record<keyof CraftFields, string> = {
  contexto: "CONTEXT",
  rol: "ROLE",
  accion: "ACTION",
  formato: "FORMAT",
  tono: "TONE",
};

describe("buildPrompt", () => {
  it("returns an empty string when no field is filled", () => {
    expect(buildPrompt(EMPTY_CRAFT, LABELS)).toBe("");
  });

  it("omits empty fields and keeps the canonical order", () => {
    const out = buildPrompt(
      { ...EMPTY_CRAFT, accion: "Resumí el documento", formato: "3 bullets" },
      LABELS,
    );
    expect(out).toBe("## ACTION:\nResumí el documento\n\n## FORMAT:\n3 bullets");
  });

  it("labels every field and joins with blank lines", () => {
    const out = buildPrompt(
      {
        contexto: "Soy PM",
        rol: "Analista senior",
        accion: "Analizá",
        formato: "Tabla",
        tono: "Formal",
      },
      LABELS,
    );
    expect(out).toBe(
      "## CONTEXT:\nSoy PM\n\n## ROLE:\nAnalista senior\n\n## ACTION:\nAnalizá\n\n## FORMAT:\nTabla\n\n## TONE:\nFormal",
    );
  });

  it("trims surrounding whitespace and skips whitespace-only fields", () => {
    const out = buildPrompt({ ...EMPTY_CRAFT, accion: "  Generá  ", tono: "   " }, LABELS);
    expect(out).toBe("## ACTION:\nGenerá");
  });

  it("uses the provided labels (language-specific)", () => {
    const esLabels: Record<keyof CraftFields, string> = {
      contexto: "CONTEXTO",
      rol: "ROL",
      accion: "ACCION",
      formato: "FORMATO",
      tono: "TONO",
    };
    const out = buildPrompt({ ...EMPTY_CRAFT, contexto: "Soy PM" }, esLabels);
    expect(out).toBe("## CONTEXTO:\nSoy PM");
  });
});
