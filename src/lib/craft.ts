/**
 * Pure logic for the CRAFT prompt builder.
 * Each non-empty field is rendered as a markdown header followed by its value,
 * joined by blank lines. Empty fields are omitted. The header words are passed
 * in (`labels`) so the assembled prompt matches the active language.
 */

export interface CraftFields {
  contexto: string;
  rol: string;
  accion: string;
  formato: string;
  tono: string;
}

export const EMPTY_CRAFT: CraftFields = {
  contexto: "",
  rol: "",
  accion: "",
  formato: "",
  tono: "",
};

export const CRAFT_ORDER: Array<keyof CraftFields> = ["contexto", "rol", "accion", "formato", "tono"];

export function buildPrompt(fields: CraftFields, labels: Record<keyof CraftFields, string>): string {
  const parts: string[] = [];
  for (const key of CRAFT_ORDER) {
    const value = (fields[key] ?? "").trim();
    if (value) parts.push(`## ${labels[key]}:\n${value}`);
  }
  return parts.join("\n\n");
}
