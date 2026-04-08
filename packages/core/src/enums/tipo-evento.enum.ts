export enum TipoEvento {
  CONCIERTO = 'CONCIERTO',
  FIESTA_TEMATICA = 'FIESTA_TEMATICA',
  ESPECTACULO = 'ESPECTACULO',
  CORPORATIVO = 'CORPORATIVO',
  BODA = 'BODA',
  CUMPLEANOS = 'CUMPLEANOS',
  OTRO = 'OTRO',
}

export const TIPO_EVENTO_VALUES = Object.values(TipoEvento) as [string, ...string[]];
