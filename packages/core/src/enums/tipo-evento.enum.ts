export enum TipoEvento {
  PRIVADO = 'PRIVADO',
  FIESTA = 'FIESTA',
}

export const TIPO_EVENTO_VALUES = Object.values(TipoEvento) as [string, ...string[]];

export const tipoEventoLabels: Record<TipoEvento, string> = {
  [TipoEvento.PRIVADO]: 'Privado',
  [TipoEvento.FIESTA]: 'Fiesta',
};

export const tipoEventoOptions: Array<{ value: TipoEvento; label: string }> = Object.values(
  TipoEvento,
).map((value) => ({ value, label: tipoEventoLabels[value] }));
