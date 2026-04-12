import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

interface EventoResponse {
  idEvento: number;
  nombre: string;
  descripcion: string | null;
  tipo: string;
  fechaEvento: string;
  horaInicio: string;
  horaFin: string;
  presupuesto: number;
  ingresoReal: number;
  gastoReal: number;
  precioBoleta: number;
}

describe('EventoController (e2e)', () => {
  let app: INestApplication<App>;
  const createdIds: number[] = [];

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    // Mirror main.ts bootstrap so requests match prod behavior.
    app.setGlobalPrefix('api');
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, transform: true }),
    );

    await app.init();
  });

  afterAll(async () => {
    // Best-effort cleanup: remove any leftover eventos this suite created.
    for (const id of createdIds) {
      await request(app.getHttpServer())
        .delete(`/api/eventos/${id}`)
        .catch(() => undefined);
    }
    await app.close();
  });

  describe('CRUD flow', () => {
    let createdId: number;

    it('GET /api/eventos returns an array', async () => {
      const res = await request(app.getHttpServer())
        .get('/api/eventos')
        .expect(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    it('POST /api/eventos creates an evento', async () => {
      const payload = {
        nombre: 'E2E Test Evento',
        descripcion: 'Created by evento.e2e-spec.ts',
        tipo: 'CONCIERTO',
        fechaEvento: '2026-12-31',
        horaInicio: '20:00',
        horaFin: '23:30',
        presupuesto: 10000,
        precioBoleta: 50,
        ingresoReal: 0,
        gastoReal: 0,
      };

      const res = await request(app.getHttpServer())
        .post('/api/eventos')
        .send(payload)
        .expect(201);

      const body = res.body as EventoResponse;
      expect(body.idEvento).toEqual(expect.any(Number));
      expect(body.nombre).toBe(payload.nombre);
      expect(body.tipo).toBe(payload.tipo);
      expect(body.horaInicio).toBe(payload.horaInicio);
      expect(body.horaFin).toBe(payload.horaFin);
      expect(body.presupuesto).toBe(payload.presupuesto);
      expect(body.precioBoleta).toBe(payload.precioBoleta);

      createdId = body.idEvento;
      createdIds.push(createdId);
    });

    it('GET /api/eventos/:id returns the created evento', async () => {
      const res = await request(app.getHttpServer())
        .get(`/api/eventos/${createdId}`)
        .expect(200);

      const body = res.body as EventoResponse;
      expect(body.idEvento).toBe(createdId);
      expect(body.nombre).toBe('E2E Test Evento');
    });

    it('GET /api/eventos/:id returns 404 when not found', async () => {
      await request(app.getHttpServer())
        .get('/api/eventos/99999999')
        .expect(404);
    });

    it('PATCH /api/eventos/:id updates the evento', async () => {
      const res = await request(app.getHttpServer())
        .patch(`/api/eventos/${createdId}`)
        .send({ nombre: 'E2E Test Evento (updated)', precioBoleta: 75 })
        .expect(200);

      const body = res.body as EventoResponse;
      expect(body.idEvento).toBe(createdId);
      expect(body.nombre).toBe('E2E Test Evento (updated)');
      expect(body.precioBoleta).toBe(75);
    });

    it('DELETE /api/eventos/:id removes the evento', async () => {
      await request(app.getHttpServer())
        .delete(`/api/eventos/${createdId}`)
        .expect(200);

      // Drop from cleanup list since it's already gone.
      const idx = createdIds.indexOf(createdId);
      if (idx >= 0) createdIds.splice(idx, 1);

      await request(app.getHttpServer())
        .get(`/api/eventos/${createdId}`)
        .expect(404);
    });
  });

  describe('validation', () => {
    it('POST /api/eventos returns 400 when required fields are missing', async () => {
      // Missing `nombre`, `tipo`, `fechaEvento`, `horaInicio`, `horaFin`,
      // `presupuesto`, `precioBoleta`.
      await request(app.getHttpServer())
        .post('/api/eventos')
        .send({ descripcion: 'incomplete payload' })
        .expect(400);
    });
  });
});
