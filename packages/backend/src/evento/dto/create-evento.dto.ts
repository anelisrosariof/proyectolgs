import {
  IsString,
  IsOptional,
  IsEnum,
  IsDateString,
  IsNumber,
  IsInt,
  Matches,
  MaxLength,
  Min,
} from 'class-validator';
import { TipoEvento } from '@/generated/prisma/client';

export class CreateEventoDto {
  @IsString()
  @MaxLength(255)
  nombre!: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsEnum(TipoEvento)
  tipo!: TipoEvento;

  @IsDateString()
  fechaEvento!: string;

  @IsString()
  @Matches(/^\d{2}:\d{2}$/, { message: 'horaInicio must be in HH:mm format' })
  horaInicio!: string;

  @IsString()
  @Matches(/^\d{2}:\d{2}$/, { message: 'horaFin must be in HH:mm format' })
  horaFin!: string;

  @IsNumber()
  @Min(0)
  presupuesto!: number;

  @IsNumber()
  @Min(0)
  precioBoleta!: number;

  @IsOptional()
  @IsInt()
  idUsuarioCreador?: number;
}
