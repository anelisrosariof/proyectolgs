import { TipoEvento, tipoEventoLabels } from "./types/evento";

export const tipoEventoStyles: Record<TipoEvento, string> = {
  [TipoEvento.PRIVADO]: "border border-sky-500/30 bg-sky-500/10 text-sky-200",
  [TipoEvento.FIESTA]:
    "border border-fuchsia-500/30 bg-fuchsia-500/10 text-fuchsia-200",
};

export function EventTypeBadge({ tipo }: { tipo: TipoEvento }) {
  const style = tipoEventoStyles[tipo] ?? tipoEventoStyles[TipoEvento.PRIVADO];
  const label = tipoEventoLabels[tipo] ?? tipoEventoLabels[TipoEvento.PRIVADO];
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${style}`}
    >
      {label}
    </span>
  );
}
