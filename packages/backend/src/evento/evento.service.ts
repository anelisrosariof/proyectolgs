import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/db/prisma.service';
import { CreateEventoDto, UpdateEventoDto } from './dto';

@Injectable()
export class EventoService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const eventos = await this.prisma.evento.findMany({
      orderBy: { fechaEvento: 'desc' },
    });
    return eventos.map((e) => this.serialize(e));
  }

  async findOne(id: number) {
    const evento = await this.prisma.evento.findUnique({
      where: { idEvento: id },
    });
    if (!evento) {
      throw new NotFoundException(`Evento with id ${id} not found`);
    }
    return this.serialize(evento);
  }

  async create(dto: CreateEventoDto) {
    const evento = await this.prisma.evento.create({
      data: {
        nombre: dto.nombre,
        descripcion: dto.descripcion ?? null,
        tipo: dto.tipo,
        fechaEvento: new Date(dto.fechaEvento),
        horaInicio: this.parseTime(dto.horaInicio),
        horaFin: this.parseTime(dto.horaFin),
        presupuesto: dto.presupuesto,
        ingresoReal: dto.ingresoReal ?? 0,
        gastoReal: dto.gastoReal ?? 0,
        precioBoleta: dto.precioBoleta,
        idUsuarioCreador: dto.idUsuarioCreador ?? null,
      },
    });
    return this.serialize(evento);
  }

  async update(id: number, dto: UpdateEventoDto) {
    await this.findOne(id);

    const data: Record<string, unknown> = {};
    if (dto.nombre !== undefined) data.nombre = dto.nombre;
    if (dto.descripcion !== undefined) data.descripcion = dto.descripcion;
    if (dto.tipo !== undefined) data.tipo = dto.tipo;
    if (dto.fechaEvento !== undefined)
      data.fechaEvento = new Date(dto.fechaEvento);
    if (dto.horaInicio !== undefined)
      data.horaInicio = this.parseTime(dto.horaInicio);
    if (dto.horaFin !== undefined) data.horaFin = this.parseTime(dto.horaFin);
    if (dto.presupuesto !== undefined) data.presupuesto = dto.presupuesto;
    if (dto.ingresoReal !== undefined) data.ingresoReal = dto.ingresoReal;
    if (dto.gastoReal !== undefined) data.gastoReal = dto.gastoReal;
    if (dto.precioBoleta !== undefined) data.precioBoleta = dto.precioBoleta;
    if (dto.idUsuarioCreador !== undefined)
      data.idUsuarioCreador = dto.idUsuarioCreador;

    const evento = await this.prisma.evento.update({
      where: { idEvento: id },
      data,
    });
    return this.serialize(evento);
  }

  async remove(id: number) {
    await this.findOne(id);
    const evento = await this.prisma.evento.delete({
      where: { idEvento: id },
    });
    return this.serialize(evento);
  }

  private parseTime(time: string): Date {
    return new Date(`1970-01-01T${time}:00.000Z`);
  }

  private formatTime(date: Date): string {
    const d = new Date(date);
    return `${String(d.getUTCHours()).padStart(2, '0')}:${String(d.getUTCMinutes()).padStart(2, '0')}`;
  }

  private serialize(evento: Record<string, unknown>) {
    return {
      ...evento,
      horaInicio: this.formatTime(evento.horaInicio as Date),
      horaFin: this.formatTime(evento.horaFin as Date),
      presupuesto: Number(evento.presupuesto),
      ingresoReal: Number(evento.ingresoReal),
      gastoReal: Number(evento.gastoReal),
      precioBoleta: Number(evento.precioBoleta),
    };
  }
}
