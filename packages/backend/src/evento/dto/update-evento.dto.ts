import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsOptional, Min } from 'class-validator';
import { CreateEventoDto } from './create-evento.dto';

export class UpdateEventoDto extends PartialType(CreateEventoDto) {
  @IsOptional()
  @IsNumber()
  @Min(0)
  ingresoReal?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  gastoReal?: number;
}
