# Luxury Grand Stage

Sistema de gestión integral para **Luxury Grand Stage**, un salón de eventos orientado a la organización de fiestas y espectáculos. La plataforma centraliza la gestión de reservaciones, venta de entradas, procesamiento de pagos y facturación, eliminando la dependencia de procesos manuales.

## Módulos principales

- **Gestión de Reservas** — Registro, consulta, modificación y cancelación con verificación de disponibilidad en tiempo real.
- **Gestión de Eventos Públicos** — Planificación y control de eventos con zonas diferenciadas y capacidad máxima.
- **Venta de Entradas** — Control automatizado por zona con generación de entradas digitales/QR.
- **Gestión de Clientes** — Registro completo de datos, historial de eventos y pagos.
- **Pagos** — Múltiples métodos de pago con validaciones automáticas y control de plazos.
- **Facturación** — Comprobantes fiscales (RNC, ITBIS) con numeración secuencial.
- **Dashboard y Reportes** — KPIs, reportes financieros y operativos.
- **Notificaciones** — Confirmaciones, recordatorios y promociones automáticas.

## Estructura del monorepo

```
packages/
├── frontend/   → Next.js (interfaz de usuario)
├── backend/    → NestJS + Prisma (API REST)
└── core/       → Schemas, modelos y utilidades compartidas
```

## Stack tecnológico

| Capa        | Tecnología                          |
| ----------- | ----------------------------------- |
| Frontend    | Next.js, React, Tailwind CSS        |
| Backend     | NestJS, Prisma ORM                  |
| Base de datos | PostgreSQL 17                     |
| Monorepo    | pnpm workspaces                     |
| Lenguaje    | TypeScript                          |
| Contenedores | Docker Compose (desarrollo)        |

## Requisitos previos

- Node.js >= 20
- pnpm >= 9
- Docker y Docker Compose

## Inicio rápido

```bash
# Instalar dependencias
pnpm install

# Levantar PostgreSQL
docker compose up -d

# Ejecutar en desarrollo (frontend + backend)
pnpm dev
```

| Servicio   | URL                  |
| ---------- | -------------------- |
| Frontend   | http://localhost:3000 |
| Backend    | http://localhost:3001 |
| PostgreSQL | localhost:5432        |

## Scripts disponibles

| Script                 | Descripción                       |
| ---------------------- | --------------------------------- |
| `pnpm dev`             | Inicia frontend y backend         |
| `pnpm dev:frontend`    | Inicia solo el frontend           |
| `pnpm dev:backend`     | Inicia solo el backend            |
| `pnpm build`           | Build de todos los paquetes       |
| `pnpm lint`            | Lint de todos los paquetes        |
| `pnpm prisma:generate` | Generar Prisma Client             |
| `pnpm prisma:migrate`  | Ejecutar migraciones de Prisma    |
| `pnpm prisma:studio`   | Abrir Prisma Studio               |
