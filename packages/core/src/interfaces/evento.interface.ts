import type { TipoEvento } from '../enums';

export interface IEvento {
  idEvento: number;
  idUsuarioCreador: number | null;
  nombre: string;
  descripcion: string | null;
  tipo: TipoEvento;
  fechaEvento: string;
  horaInicio: string;
  horaFin: string;
  presupuesto: number;
  ingresoReal: number;
  gastoReal: number;
  precioBoleta: number;
  creadoEn: string;
  eliminadoEn?: string | null;
}
