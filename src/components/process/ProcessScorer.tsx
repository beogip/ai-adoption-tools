import {
  anyRedFlag,
  CRITERION_KEYS,
  EMPTY_RED_FLAGS,
  evaluate,
  FLAG_KEYS,
  type CriterionKey,
  type RedFlags,
} from "../../lib/scoring";
import { useLocalStorage } from "../../lib/useLocalStorage";
import { getPath, LINKEDIN_URL, type Dict, type Lang } from "../../i18n";
import PrintButton from "../shared/PrintButton";
import RevealExamples from "../shared/RevealExamples";
import ScoreBadge from "../shared/ScoreBadge";

interface ScorerState {
  meta: { proceso: string; area: string; fecha: string };
  scores: Record<CriterionKey, number | null>;
  flags: RedFlags;
}

const DEFAULT_STATE: ScorerState = {
  meta: { proceso: "", area: "", fecha: "" },
  scores: { repetible: null, verificable: null, frecuencia: null, costoError: null, complejidad: null },
  flags: { ...EMPTY_RED_FLAGS },
};

export default function ProcessScorer({ dict }: { dict: Dict }) {
  const t = dict.process;
  const [state, setState, clear] = useLocalStorage<ScorerState>("process-scorer", DEFAULT_STATE);

  const result = evaluate(state.scores, state.flags);
  const zoneCopy = result ? t.zones[result.zone] : null;
  const capped = result != null && result.zone !== result.baseZone;
  const flagged = anyRedFlag(state.flags);
  const lang = dict.htmlLang as Lang;
  // Next-step CTA: CRAFT Builder when AI has a role (and no red flag), LinkedIn otherwise.
  const nextIsCraft = result != null && result.zone !== "humano" && !result.flagged;

  const setScore = (key: CriterionKey, value: number) =>
    setState((s) => ({ ...s, scores: { ...s.scores, [key]: value } }));

  const toggleFlag = (key: keyof RedFlags) =>
    setState((s) => ({ ...s, flags: { ...s.flags, [key]: !s.flags[key] } }));

  const setMeta = (key: keyof ScorerState["meta"], value: string) =>
    setState((s) => ({ ...s, meta: { ...s.meta, [key]: value } }));

  const onClear = () => {
    if (window.confirm(t.clearConfirm)) clear();
  };

  return (
    <div className="ws">
      <div className="ws-step">{t.stepProcess}</div>
      <div className="ws-meta">
        <div>
          <label htmlFor="ps-proceso">{t.metaProceso}</label>
          <input
            id="ps-proceso"
            type="text"
            placeholder={t.metaProcesoPh}
            value={state.meta.proceso}
            onChange={(e) => setMeta("proceso", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="ps-area">{t.metaArea}</label>
          <input id="ps-area" type="text" value={state.meta.area} onChange={(e) => setMeta("area", e.target.value)} />
        </div>
        <div>
          <label htmlFor="ps-fecha">{t.metaFecha}</label>
          <input id="ps-fecha" type="date" value={state.meta.fecha} onChange={(e) => setMeta("fecha", e.target.value)} />
        </div>
      </div>

      <div className="ws-step">{t.stepQuestions}</div>
      <p className="ws-guide">{t.questionsGuide}</p>

      {CRITERION_KEYS.map((key) => {
        const c = t.criteria[key];
        const score = state.scores[key];
        const untouched = score == null;
        const sliderId = `ps-score-${key}`;
        return (
          <div className="block" key={key}>
            <label htmlFor={sliderId}>{c.label}</label>
            <p className="ws-guide">{c.guide}</p>
            <div className={`slider${untouched ? " untouched" : ""}`}>
              <input
                id={sliderId}
                type="range"
                min={1}
                max={5}
                step={1}
                value={score ?? 3}
                aria-valuetext={untouched ? t.sinPuntuar : String(score)}
                onChange={(e) => setScore(key, Number(e.target.value))}
              />
              <span className="slider-val">{untouched ? t.sinPuntuar : score}</span>
            </div>
            <div className="scale-ends">
              <span>1: {c.low}</span>
              <span>5: {c.high}</span>
            </div>
            <RevealExamples summary={dict.common.seeExamples}>
              <ul>
                <li>{c.ej1}</li>
                <li>{c.ej5}</li>
              </ul>
            </RevealExamples>
          </div>
        );
      })}

      <div className="ws-step">{t.stepResult}</div>
      <div className="result">
        {result && zoneCopy ? (
          <>
            <p className="total">
              {result.total} <small>{t.totalSuffix}</small> &nbsp;{" "}
              <ScoreBadge badge={result.badge}>{zoneCopy.label}</ScoreBadge>
            </p>
            <p>{zoneCopy.meaning}</p>
            {capped && result.weakCriteria.length > 0 && (
              <p className="ws-guide">
                {t.capLowCriterion} {result.weakCriteria.map((k) => t.criteria[k].label).join(" · ")}
              </p>
            )}
            {capped && result.flagged && <p className="ws-guide">{t.capRedFlag}</p>}
          </>
        ) : (
          <p className="ws-guide" style={{ margin: 0 }}>
            {t.resultPlaceholder}
          </p>
        )}
      </div>

      <div className="ws-step">{t.stepFlags}</div>
      <p className="ws-guide">{t.flagsGuide}</p>
      <ul className="check">
        {FLAG_KEYS.map((key) => {
          const f = t.flags[key];
          return (
            <li key={key}>
              <input
                type="checkbox"
                id={`flag-${key}`}
                checked={state.flags[key]}
                onChange={() => toggleFlag(key)}
              />
              <label htmlFor={`flag-${key}`}>
                <strong>{f.label}.</strong> {f.detail}
              </label>
            </li>
          );
        })}
      </ul>

      {flagged && (
        <div className="callout warn">
          <p className="title">{t.flagActiveTitle}</p>
          <p style={{ margin: 0 }}>{t.redFlagRule}</p>
        </div>
      )}

      <div className="ws-actions">
        <PrintButton label={dict.common.printPdf} />
        <button type="button" className="ws-btn secondary" onClick={onClear}>
          {dict.common.clearAll}
        </button>
      </div>

      {result && (
        <div className="callout key">
          {nextIsCraft ? (
            <p style={{ margin: 0 }}>
              {t.nextCraftText} <a href={getPath(lang, "craft")}>{t.nextCraftCta}</a>
            </p>
          ) : (
            <p style={{ margin: 0 }}>
              {t.nextHumanText}{" "}
              <a href={LINKEDIN_URL} target="_blank" rel="noopener">
                {t.nextHumanCta}
              </a>
            </p>
          )}
        </div>
      )}
    </div>
  );
}
