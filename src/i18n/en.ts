import type { CraftFields } from "../lib/craft";
import type { CriterionKey, FlagKey, Zone } from "../lib/scoring";

export interface FieldCopy {
  label: string;
  guide: string;
  placeholder: string;
  examples: string[];
}
export interface CriterionCopy {
  label: string;
  guide: string;
  low: string;
  high: string;
  ej1: string;
  ej5: string;
}
export interface FlagCopy {
  label: string;
  detail: string;
}
export interface ZoneCopy {
  label: string;
  meaning: string;
}

/**
 * Shape of a full UI dictionary. `en` below is the reference implementation;
 * `es.ts` is typed as `Dict`, so TypeScript fails the build if a key is
 * missing or mistyped. To change copy, edit both files in lockstep.
 */
/** Footer copy split around the author link so the layout can render the anchor. */
export interface FooterCopy {
  before: string;
  linkText: string;
  after: string;
  /** Persistent privacy reassurance, shown on every page footer. */
  privacy: string;
  /** Lead-in to the sibling-site cross-link (e.g. "Also by the same author:"). */
  siblingText: string;
}

export interface Dict {
  htmlLang: string;
  footer: FooterCopy;
  common: {
    backToTools: string;
    seeExamples: string;
    printPdf: string;
    clearAll: string;
    /** Accessible name for the language switch, in the current page's language. */
    langSwitchLabel: string;
  };
  home: {
    pageTitle: string;
    pageDesc: string;
    kicker: string;
    title: string;
    lead: string;
    craftTag: string;
    craftTitle: string;
    craftDesc: string;
    processTag: string;
    processTitle: string;
    processDesc: string;
    howTitle: string;
    howBody: string;
  };
  craft: {
    pageTitle: string;
    pageDesc: string;
    kicker: string;
    heroTitle: string;
    heroText: string;
    lead: string;
    stepFields: string;
    fieldsGuide: string;
    fields: Record<keyof CraftFields, FieldCopy>;
    promptLabels: Record<keyof CraftFields, string>;
    stepPrompt: string;
    promptGuide: string;
    promptEmpty: string;
    copyLabel: string;
    copied: string;
    clearConfirm: string;
  };
  process: {
    pageTitle: string;
    pageDesc: string;
    kicker: string;
    heroTitle: string;
    heroText: string;
    lead: string;
    stepProcess: string;
    metaProceso: string;
    metaProcesoPh: string;
    metaArea: string;
    metaFecha: string;
    stepQuestions: string;
    questionsGuide: string;
    criteria: Record<CriterionKey, CriterionCopy>;
    sinPuntuar: string;
    stepResult: string;
    resultPlaceholder: string;
    totalSuffix: string;
    zones: Record<Zone, ZoneCopy>;
    capLowCriterion: string;
    capRedFlag: string;
    stepFlags: string;
    flagsGuide: string;
    flags: Record<FlagKey, FlagCopy>;
    flagActiveTitle: string;
    redFlagRule: string;
    clearConfirm: string;
    nextCraftText: string;
    nextCraftCta: string;
    nextHumanText: string;
    nextHumanCta: string;
  };
}

export const en: Dict = {
  htmlLang: "en",
  footer: {
    before: "AI Adoption Tools · Built by Juan Gipponi · Questions? ",
    linkText: "Find me on LinkedIn",
    after: "",
    privacy: "Saves in your browser — nothing is sent to any server.",
    siblingText: "Also by the same author:",
  },
  common: {
    backToTools: "All tools",
    seeExamples: "See examples",
    printPdf: "Print / Save PDF",
    clearAll: "Clear all",
    langSwitchLabel: "Switch to Spanish",
  },
  home: {
    pageTitle: "AI Adoption Tools · Free Tools to Adopt AI With Judgment",
    pageDesc: "Free tools to adopt AI with judgment: build prompts that work and decide what's worth automating.",
    kicker: "Free tools",
    title: "AI Adoption Tools",
    lead: "Getting started with AI isn't about automating everything. It's knowing what's worth delegating and how to ask for it right. These two free tools help you with both, in that order.",
    craftTag: "Prompting",
    craftTitle: "CRAFT Builder",
    craftDesc:
      "Build an effective prompt step by step (Context, Role, Action, Format, Tone). Copy it and try it in your AI.",
    processTag: "Automation",
    processTitle: "Process evaluator",
    processDesc:
      "Score a process with 5 questions and find out whether to automate it, collaborate with AI, or keep it human.",
    howTitle: "How to use them",
    howBody:
      "Each tool saves your work in your browser (nothing is sent to any server). You can print or save as PDF when you finish.",
  },
  craft: {
    pageTitle: "CRAFT Builder · Free AI Prompt Builder",
    pageDesc:
      "Build effective AI prompts step by step with the CRAFT framework: Context, Role, Action, Format, Tone. Free, no signup.",
    kicker: "Prompting",
    heroTitle: "CRAFT Builder",
    heroText: "Build your prompt with the CRAFT framework: Context, Role, Action, Format, Tone.",
    lead: "Fill in the fields below. As you type, the prompt assembles itself and skips whatever you leave empty. When it's ready, copy it and try it in your AI.",
    stepFields: "The 5 CRAFT fields",
    fieldsGuide:
      "Not all are required: for simple tasks Action + Format is enough. For complex tasks, use all 5.",
    fields: {
      contexto: {
        label: "C: Context",
        guide:
          "What background does the AI need to understand your request? Include: who you are, what this is for, what relevant facts it should know.",
        placeholder: "Write the context here",
        examples: [
          "\"I'm a product manager at a B2B SaaS company with 500 customers.\"",
          "\"I'm preparing a presentation for the board of directors.\"",
          "\"We have a team of 15 people across 3 time zones.\"",
        ],
      },
      rol: {
        label: "R: Role",
        guide: "Who should the AI be for this task? Pick a realistic role based on real people (not a \"supreme guru\").",
        placeholder: "Write the role here",
        examples: [
          "Senior data analyst",
          "Professional content editor",
          "Strategy consultant with 10 years of experience",
          "University professor explaining to first-year students",
          "Corporate lawyer reviewing a contract",
          "Project manager organizing tasks",
        ],
      },
      accion: {
        label: "A: Action",
        guide:
          "What specific task should it perform? Use an action verb. Be as specific as possible about what you want it to do.",
        placeholder: "Write the action here",
        examples: [
          "Useful action verbs: summarize, analyze, classify, extract, generate, draft, compare, evaluate, list, translate, rephrase, prioritize, identify.",
        ],
      },
      formato: {
        label: "F: Format",
        guide: "What should the output look like?",
        placeholder: "Write the desired format here",
        examples: [
          "Bulleted list",
          "Table with specific columns",
          "Paragraph of X words",
          "Ready-to-send email",
          "JSON / structured data",
          "3-line executive summary",
          "Presentation with N slides (title + bullets)",
          "Pros / cons comparison",
        ],
      },
      tono: {
        label: "T: Tone",
        guide: "What voice should the response use?",
        placeholder: "Write the tone here",
        examples: [
          "Formal / professional",
          "Casual / friendly",
          "Technical / precise",
          "Approachable / accessible",
          "Persuasive / sales",
          "Neutral / objective",
          "Didactic / explanatory",
        ],
      },
    },
    promptLabels: {
      contexto: "CONTEXT",
      rol: "ROLE",
      accion: "ACTION",
      formato: "FORMAT",
      tono: "TONE",
    },
    stepPrompt: "Assembled prompt (automatic)",
    promptGuide:
      "It assembles itself from what you wrote above. Empty fields are skipped. Copy it and try it in your AI.",
    promptEmpty: "Your prompt will appear here as you fill in the fields.",
    copyLabel: "Copy prompt",
    copied: "Copied",
    clearConfirm: "Clear everything you entered in the CRAFT template?",
  },
  process: {
    pageTitle: "Process Evaluator · Should You Automate This With AI?",
    pageDesc:
      "Score a process on 5 criteria and 3 red flags to decide: automate with AI, collaborate, or keep it human. Free, no signup.",
    kicker: "Automation",
    heroTitle: "Process evaluator",
    heroText: "When to automate a process with AI, and when not. Score five questions and check the red flags.",
    lead: "Not every task is a good candidate for AI. Score a process from 1 to 5 on each criterion: the total places it in a zone, and the three red flags tell you when to stop regardless of the score.",
    stepProcess: "The process",
    metaProceso: "Process",
    metaProcesoPh: "e.g. classify support tickets",
    metaArea: "Area / team",
    metaFecha: "Date",
    stepQuestions: "The 5 questions",
    questionsGuide: "Score each criterion from 1 to 5. The total places you in a zone.",
    criteria: {
      repetible: {
        label: "1. Is it repeatable and well-defined?",
        guide:
          "A task you always do the same way is ideal for AI. One that changes completely every time is hard to delegate.",
        low: "Different every time",
        high: "Always the same steps",
        ej1: "Score 1: \"Every negotiation with a supplier is completely different.\"",
        ej5: "Score 5: \"I classify 50 support emails a day, always into the same 4 categories.\"",
      },
      verificable: {
        label: "2. Is the output easy to verify?",
        guide:
          "If you can review the result in under 5 minutes, AI adds value (it saves more time than it takes to verify). If verifying takes as long as doing it yourself, it saves nothing.",
        low: "Hard to verify",
        high: "Verifiable in <5 min",
        ej1: "Score 1: \"It generates a legal analysis and I'd need a lawyer to verify it.\"",
        ej5: "Score 5: \"It generates a meeting summary and I can verify it against my notes in 2 minutes.\"",
      },
      frecuencia: {
        label: "3. How often does it happen?",
        guide:
          "Daily tasks pay off more than quarterly ones. If you do something once a year, optimizing the prompt isn't worth it.",
        low: "Quarterly or less",
        high: "Daily",
        ej1: "Score 1: \"I do it once a year.\"",
        ej5: "Score 5: \"I do this every day.\"",
      },
      costoError: {
        label: "4. What's the cost of an error?",
        guide:
          "If an error in the output has no serious consequences, it's a good candidate. If it can have legal or financial impact, it needs strict human oversight.",
        low: "Serious consequence",
        high: "Easy to fix",
        ej1: "Score 1 (high cost): \"The financial report going to the board has a wrong number.\"",
        ej5: "Score 5 (low cost): \"A draft of an internal email has errors, I fix it and move on.\"",
      },
      complejidad: {
        label: "5. Does it need adaptive decisions or just follow rules?",
        guide:
          "Tasks that follow clear rules are ideal. Tasks that need judgment, empathy or unique context are hard to fully delegate.",
        low: "Expert judgment",
        high: "Follows clear rules",
        ej1: "Score 1: \"Deciding whether to approve or reject a claim from an important 15-year client.\"",
        ej5: "Score 5: \"Classifying invoices by amount and category using fixed rules.\"",
      },
    },
    sinPuntuar: "Not scored",
    stepResult: "Result",
    resultPlaceholder:
      "Score the 5 questions to see the classification (Automate / Collaborate with AI / Keep it human).",
    totalSuffix: "/ 25",
    zones: {
      automatizar: { label: "Automate", meaning: "Excellent candidate. You can delegate to AI with minimal oversight." },
      colaborar: { label: "Collaborate with AI", meaning: "Use AI as an assistant, always with human review." },
      humano: { label: "Keep it human", meaning: "Better to do it yourself. AI adds no value or the risk is too high." },
    },
    capLowCriterion:
      "Your total lands in the Automate zone, but a criterion scored 1-2 is a weakness the rest can't compensate. The result is capped at Collaborate with AI:",
    capRedFlag:
      "Your total lands in the Automate zone, but with a red flag active the final decision stays human. The result is capped at Collaborate with AI.",
    stepFlags: "The three red flags",
    flagsGuide: "Regardless of the score, if any of these applies, the answer is \"think it through first\".",
    flags: {
      datosConfidenciales: {
        label: "Confidential or sensitive data",
        detail:
          "If the task involves private customer information, medical, legal or financial data, check your privacy and data-handling policies before sending anything to an AI.",
      },
      consecuenciasLegales: {
        label: "Legal or financial consequences",
        detail:
          "If an error could lead to a lawsuit, a fine or a significant financial loss, AI can assist but the final decision is always human.",
      },
      faltaSupervision: {
        label: "No human oversight possible",
        detail: "If no one will review the output before it takes effect, it's not a good case to automate yet.",
      },
    },
    flagActiveTitle: "Red flag active",
    redFlagRule: "AI automates tasks, not responsibility. You're still the owner of the result.",
    clearConfirm: "Clear this process evaluation?",
    nextCraftText: "Next step:",
    nextCraftCta: "build the prompt with the CRAFT Builder →",
    nextHumanText: "This one stays with people. If you want a second opinion on where AI actually fits in your team,",
    nextHumanCta: "reach out on LinkedIn →",
  },
};
