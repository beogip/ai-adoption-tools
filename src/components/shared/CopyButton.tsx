import { useEffect, useRef, useState } from "react";

interface Props {
  text: string;
  label: string;
  copiedLabel: string;
  disabled?: boolean;
}

/** Copy-to-clipboard button with execCommand fallback and copied feedback. */
export default function CopyButton({ text, label, copiedLabel, disabled }: Props) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  function fallbackCopy(value: string) {
    const ta = document.createElement("textarea");
    ta.value = value;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    try {
      document.execCommand("copy");
    } catch {
      /* ignore */
    }
    document.body.removeChild(ta);
  }

  function show() {
    clearTimeout(timer.current);
    setCopied(true);
    timer.current = setTimeout(() => setCopied(false), 1800);
  }

  function onClick() {
    if (!text) return;
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text).then(show, () => {
        fallbackCopy(text);
        show();
      });
    } else {
      fallbackCopy(text);
      show();
    }
  }

  return (
    <>
      <button type="button" className="ws-btn" onClick={onClick} disabled={disabled || !text}>
        {label}
      </button>
      {copied && <span className="copied">{copiedLabel}</span>}
    </>
  );
}
