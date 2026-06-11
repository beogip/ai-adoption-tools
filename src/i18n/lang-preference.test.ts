import { describe, expect, it } from "vitest";
import { pickPreferredLang } from "./lang-preference";
import type { Lang } from "./index";

const SUPPORTED: Lang[] = ["en", "es"];

describe("pickPreferredLang", () => {
  it("picks the highest-priority supported locale, honoring order", () => {
    expect(pickPreferredLang(["es-AR", "es", "en-US"], SUPPORTED, "en")).toBe("es");
    expect(pickPreferredLang(["en-GB", "es"], SUPPORTED, "en")).toBe("en");
  });

  it("strips region subtags before matching", () => {
    expect(pickPreferredLang(["es-419"], SUPPORTED, "en")).toBe("es");
    expect(pickPreferredLang(["EN-US"], SUPPORTED, "en")).toBe("en");
  });

  it("skips unsupported tags until a supported one is found", () => {
    expect(pickPreferredLang(["fr-FR", "de", "es"], SUPPORTED, "en")).toBe("es");
  });

  it("falls back when no tag is supported", () => {
    expect(pickPreferredLang(["fr", "de"], SUPPORTED, "en")).toBe("en");
  });

  it("falls back on an empty or missing list", () => {
    expect(pickPreferredLang([], SUPPORTED, "en")).toBe("en");
    expect(pickPreferredLang(undefined as unknown as string[], SUPPORTED, "en")).toBe("en");
  });
});
