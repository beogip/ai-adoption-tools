interface Props {
  label?: string;
}

/** Trigger the browser print dialog (print styles hide chrome, see tokens.css). */
export default function PrintButton({ label = "Imprimir / Guardar PDF" }: Props) {
  return (
    <button type="button" className="ws-btn secondary" onClick={() => window.print()}>
      {label}
    </button>
  );
}
