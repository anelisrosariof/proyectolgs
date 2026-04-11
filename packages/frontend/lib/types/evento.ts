/**
 * Frontend `Evento` type.
 *
 * Re-exported from `@luxury-grand-stage/core` so the frontend uses the exact
 * same shape the backend returns from `GET /api/eventos`. The core package
 * owns the canonical interface (`IEvento`); this module aliases it to
 * `Evento` for ergonomic use inside React components.
 */
export type { IEvento as Evento } from "@luxury-grand-stage/core";
export { TipoEvento, TIPO_EVENTO_VALUES } from "@luxury-grand-stage/core";
