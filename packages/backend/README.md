# @luxury-grand-stage/backend

API REST del sistema Luxury Grand Stage, construida con **NestJS** y **Prisma ORM**.

Expone los endpoints para reservas, eventos, venta de entradas, pagos, facturación, clientes y reportes.

## Stack

- NestJS
- Prisma ORM (multi-file schemas)
- PostgreSQL 17
- TypeScript

## Desarrollo

```bash
# Levantar PostgreSQL
docker compose up -d

# Desde la raíz del monorepo
pnpm dev:backend

# O desde este directorio
pnpm dev
```

El backend se ejecuta en `http://localhost:3001`.

## Prisma

Los schemas de Prisma están en `prisma/schema/` usando multi-file schemas. Cada modelo se define en su propio archivo `.prisma`.

```bash
# Generar el cliente
pnpm prisma:generate

# Crear/ejecutar migraciones
pnpm prisma:migrate

# Abrir Prisma Studio
pnpm prisma:studio
```

## Variables de entorno

Copiar `.env` y ajustar según sea necesario:

```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/luxury_grand_stage?schema=public"
```
