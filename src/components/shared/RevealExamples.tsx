import type { ReactNode } from "react";

interface Props {
  summary?: string;
  children: ReactNode;
}

/** Collapsible "Ver ejemplos" block, matching the program's .reveal pattern. */
export default function RevealExamples({ summary = "Ver ejemplos", children }: Props) {
  return (
    <details className="reveal">
      <summary>{summary}</summary>
      <div className="body">{children}</div>
    </details>
  );
}
