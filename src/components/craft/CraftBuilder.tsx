import { buildPrompt, CRAFT_ORDER, EMPTY_CRAFT, type CraftFields } from "../../lib/craft";
import { useLocalStorage } from "../../lib/useLocalStorage";
import type { Dict } from "../../i18n";
import CopyButton from "../shared/CopyButton";
import PrintButton from "../shared/PrintButton";
import RevealExamples from "../shared/RevealExamples";

interface CraftState {
  fields: CraftFields;
}

const DEFAULT_STATE: CraftState = {
  fields: { ...EMPTY_CRAFT },
};

export default function CraftBuilder({ dict }: { dict: Dict }) {
  const t = dict.craft;
  const [state, setState, clear] = useLocalStorage<CraftState>("craft-builder", DEFAULT_STATE);
  const prompt = buildPrompt(state.fields, t.promptLabels);

  const setField = (key: keyof CraftFields, value: string) =>
    setState((s) => ({ ...s, fields: { ...s.fields, [key]: value } }));

  const onClear = () => {
    if (window.confirm(t.clearConfirm)) clear();
  };

  return (
    <div className="ws">
      <div className="ws-step">{t.stepFields}</div>
      <p className="ws-guide">{t.fieldsGuide}</p>

      {CRAFT_ORDER.map((key) => {
        const f = t.fields[key];
        return (
          <div className="block" key={key}>
            <label htmlFor={`craft-${key}`}>{f.label}</label>
            <p className="ws-guide">{f.guide}</p>
            <textarea
              id={`craft-${key}`}
              placeholder={f.placeholder}
              value={state.fields[key]}
              onChange={(e) => setField(key, e.target.value)}
            />
            <RevealExamples summary={dict.common.seeExamples}>
              <ul>
                {f.examples.map((ex, i) => (
                  <li key={i}>{ex}</li>
                ))}
              </ul>
            </RevealExamples>
          </div>
        );
      })}

      <div className="ws-step">{t.stepPrompt}</div>
      <p className="ws-guide">{t.promptGuide}</p>
      <div className="craft-out" aria-live="polite">
        {prompt || <span className="craft-out-empty">{t.promptEmpty}</span>}
      </div>
      <div className="ws-actions">
        <CopyButton text={prompt} label={t.copyLabel} copiedLabel={t.copied} />
      </div>

      <div className="ws-actions">
        <PrintButton label={dict.common.printPdf} />
        <button type="button" className="ws-btn secondary" onClick={onClear}>
          {dict.common.clearAll}
        </button>
      </div>
    </div>
  );
}
