import { z } from 'zod';
import { TIPO_EVENTO_VALUES } from '../enums';

export const createEventoSchema = z.object({
  nombre: z
    .string()
    .min(1, 'El nombre es requerido')
    .max(255, 'El nombre no puede exceder 255 caracteres'),
  descripcion: z.string().nullable().optional(),
  tipo: z.enum(TIPO_EVENTO_VALUES, {
    error: 'Tipo de evento invalido',
  }),
  fechaEvento: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Formato de fecha invalido (YYYY-MM-DD)'),
  horaInicio: z
    .string()
    .regex(/^\d{2}:\d{2}$/, 'Formato de hora invalido (HH:mm)'),
  horaFin: z
    .string()
    .regex(/^\d{2}:\d{2}$/, 'Formato de hora invalido (HH:mm)'),
  presupuesto: z.coerce.number().min(0, 'El presupuesto debe ser mayor o igual a 0'),
  ingresoReal: z.coerce.number().min(0).default(0),
  gastoReal: z.coerce.number().min(0).default(0),
  precioBoleta: z.coerce.number().min(0, 'El precio de boleta debe ser mayor o igual a 0'),
  idUsuarioCreador: z.number().int().nullable().optional(),
});

export const updateEventoSchema = createEventoSchema.partial();

export type CreateEventoInput = z.infer<typeof createEventoSchema>;
export type UpdateEventoInput = z.infer<typeof updateEventoSchema>;
