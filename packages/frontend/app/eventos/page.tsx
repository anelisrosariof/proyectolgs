import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { fetchApi } from "../../lib/api";
import { TipoEvento, type Evento } from "../../lib/types/evento";
import { formatCurrency } from "../../lib/utils/format-currency";
import { formatDate } from "../../lib/utils/format-date";
import { DeleteEventButton } from "./delete-event-button";
import logo from "../lgs_logo512.png";

const tipoEventoLabels: Record<TipoEvento, string> = {
  [TipoEvento.CONCIERTO]: "Concierto",
  [TipoEvento.FIESTA_TEMATICA]: "Fiesta temática",
  [TipoEvento.ESPECTACULO]: "Espectáculo",
  [TipoEvento.CORPORATIVO]: "Corporativo",
  [TipoEvento.BODA]: "Boda",
  [TipoEvento.CUMPLEANOS]: "Cumpleaños",
  [TipoEvento.OTRO]: "Otro",
};

const tipoEventoStyles: Record<TipoEvento, string> = {
  [TipoEvento.CONCIERTO]: "border border-sky-500/30 bg-sky-500/10 text-sky-200",
  [TipoEvento.FIESTA_TEMATICA]:
    "border border-fuchsia-500/30 bg-fuchsia-500/10 text-fuchsia-200",
  [TipoEvento.ESPECTACULO]:
    "border border-orange-500/30 bg-orange-500/10 text-orange-200",
  [TipoEvento.CORPORATIVO]:
    "border border-violet-500/30 bg-violet-500/10 text-violet-200",
  [TipoEvento.BODA]: "border border-rose-500/30 bg-rose-500/10 text-rose-200",
  [TipoEvento.CUMPLEANOS]:
    "border border-amber-500/30 bg-amber-500/10 text-amber-200",
  [TipoEvento.OTRO]: "border border-zinc-500/30 bg-zinc-500/10 text-zinc-200",
};

function formatEventoId(idEvento: number) {
  return `EVT-${String(idEvento).padStart(3, "0")}`;
}

function formatHorario(horaInicio: string, horaFin: string) {
  return `${horaInicio.slice(0, 5)} - ${horaFin.slice(0, 5)}`;
}

function EventTypeBadge({ tipo }: { tipo: TipoEvento }) {
  const style = tipoEventoStyles[tipo] ?? tipoEventoStyles[TipoEvento.OTRO];
  const label = tipoEventoLabels[tipo] ?? tipoEventoLabels[TipoEvento.OTRO];
  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${style}`}>
      {label}
    </span>
  );
}

function EventRow({ evento }: { evento: Evento }) {
  return (
    <tr className="border-t border-[#d4af37]/10 transition-all hover:bg-[#d4af37]/5">
      <td className="px-6 py-5">
        <div>
          <p className="font-bold text-white">{evento.nombre}</p>
          <p className="mt-1 text-xs font-medium text-[#d4af37]">
            {formatEventoId(evento.idEvento)}
          </p>
        </div>
      </td>
      <td className="px-6 py-5">
        <EventTypeBadge tipo={evento.tipo} />
      </td>
      <td className="px-6 py-5 font-medium text-zinc-300">
        {formatDate(evento.fechaEvento)}
      </td>
      <td className="px-6 py-5 font-medium text-zinc-300">
        {formatHorario(evento.horaInicio, evento.horaFin)}
      </td>
      <td className="px-6 py-5 font-bold text-[#d4af37]">
        {formatCurrency(evento.precioBoleta)}
      </td>
      <td className="px-6 py-5 font-bold text-[#d4af37]">
        {formatCurrency(evento.presupuesto)}
      </td>
      <td className="px-6 py-5">
        <div className="flex flex-wrap gap-2">
          <Link
            href={`/eventos/${evento.idEvento}`}
            className="rounded-lg border-2 border-[#6f5a2e] bg-[#1a1715] px-4 py-2 text-xs font-bold text-zinc-300 transition-all hover:border-[#d4af37] hover:bg-[#2a241d] hover:text-white"
          >
            Ver
          </Link>
          <Link
            href={`/eventos/${evento.idEvento}/editar`}
            className="rounded-lg border-2 border-[#d4af37]/40 bg-[#d4af37]/10 px-4 py-2 text-xs font-bold text-[#d4af37] transition-all hover:bg-[#d4af37]/20 hover:shadow-[0_0_15px_rgba(212,175,55,0.3)]"
          >
            Editar
          </Link>
          <DeleteEventButton
            eventoId={evento.idEvento}
            eventoNombre={evento.nombre}
          />
        </div>
      </td>
    </tr>
  );
}

function EventsEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#3a3a3a] bg-[#2a2a2a]">
        <svg
          aria-hidden="true"
          className="h-7 w-7 text-[#c5a55a]"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 2v4M16 2v4M3.5 9h17M5 5h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <h3 className="mt-5 text-lg font-semibold text-[#ededed]">
        Aún no hay eventos registrados
      </h3>
      <p className="mt-2 max-w-md text-sm text-zinc-400">
        Cuando crees tu primer evento aparecerá aquí. Usa el botón{" "}
        <span className="font-semibold text-[#c5a55a]">Nuevo Evento</span> en la parte
        superior para comenzar.
      </p>
    </div>
  );
}

function EventsTable({ eventos }: { eventos: Evento[] }) {
  if (eventos.length === 0) {
    return <EventsEmptyState />;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-left text-sm">
        <thead className="border-b-2 border-[#d4af37]/20 bg-[#1d1a17]/50">
          <tr>
            <th className="px-6 py-5 text-xs font-bold uppercase tracking-wider text-[#d4af37]">
              Evento
            </th>
            <th className="px-6 py-5 text-xs font-bold uppercase tracking-wider text-[#d4af37]">
              Tipo
            </th>
            <th className="px-6 py-5 text-xs font-bold uppercase tracking-wider text-[#d4af37]">
              Fecha
            </th>
            <th className="px-6 py-5 text-xs font-bold uppercase tracking-wider text-[#d4af37]">
              Horario
            </th>
            <th className="px-6 py-5 text-xs font-bold uppercase tracking-wider text-[#d4af37]">
              Precio Boleta
            </th>
            <th className="px-6 py-5 text-xs font-bold uppercase tracking-wider text-[#d4af37]">
              Presupuesto
            </th>
            <th className="px-6 py-5 text-xs font-bold uppercase tracking-wider text-[#d4af37]">
              Acciones
            </th>
          </tr>
        </thead>

        <tbody>
          {eventos.map((evento) => (
            <EventRow key={evento.idEvento} evento={evento} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function EventsTableSkeleton() {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-left text-sm">
        <thead className="border-b-2 border-[#d4af37]/20 bg-[#1d1a17]/50">
          <tr>
            <th className="px-6 py-5 text-xs font-bold uppercase tracking-wider text-[#d4af37]">
              Evento
            </th>
            <th className="px-6 py-5 text-xs font-bold uppercase tracking-wider text-[#d4af37]">
              Tipo
            </th>
            <th className="px-6 py-5 text-xs font-bold uppercase tracking-wider text-[#d4af37]">
              Fecha
            </th>
            <th className="px-6 py-5 text-xs font-bold uppercase tracking-wider text-[#d4af37]">
              Horario
            </th>
            <th className="px-6 py-5 text-xs font-bold uppercase tracking-wider text-[#d4af37]">
              Precio Boleta
            </th>
            <th className="px-6 py-5 text-xs font-bold uppercase tracking-wider text-[#d4af37]">
              Presupuesto
            </th>
            <th className="px-6 py-5 text-xs font-bold uppercase tracking-wider text-[#d4af37]">
              Acciones
            </th>
          </tr>
        </thead>

        <tbody>
          {Array.from({ length: 4 }).map((_, index) => (
            <tr key={index} className="border-t border-[#d4af37]/10">
              <td className="px-6 py-5">
                <div className="space-y-2">
                  <div className="h-4 w-36 animate-pulse rounded bg-white/10" />
                  <div className="h-3 w-20 animate-pulse rounded bg-white/5" />
                </div>
              </td>
              <td className="px-6 py-5">
                <div className="h-7 w-28 animate-pulse rounded-full bg-white/10" />
              </td>
              <td className="px-6 py-5">
                <div className="h-4 w-24 animate-pulse rounded bg-white/10" />
              </td>
              <td className="px-6 py-5">
                <div className="h-4 w-24 animate-pulse rounded bg-white/10" />
              </td>
              <td className="px-6 py-5">
                <div className="h-4 w-20 animate-pulse rounded bg-white/10" />
              </td>
              <td className="px-6 py-5">
                <div className="h-4 w-24 animate-pulse rounded bg-white/10" />
              </td>
              <td className="px-6 py-5">
                <div className="flex gap-2">
                  <div className="h-8 w-14 animate-pulse rounded-lg bg-white/10" />
                  <div className="h-8 w-16 animate-pulse rounded-lg bg-white/10" />
                  <div className="h-8 w-20 animate-pulse rounded-lg bg-white/10" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

async function EventosContent() {
  const eventos = await fetchApi<Evento[]>("/eventos");

  const totalEvents = eventos.length;
  const uniqueTypes = new Set(eventos.map((evento) => evento.tipo)).size;
  const totalBudget = eventos.reduce((sum, evento) => sum + evento.presupuesto, 0);
  const averageTicketPrice =
    totalEvents === 0
      ? 0
      : eventos.reduce((sum, evento) => sum + evento.precioBoleta, 0) / totalEvents;

  return (
    <>
      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        <article className="group rounded-2xl border-2 border-[#d4af37]/20 bg-gradient-to-br from-[#2a2621] to-[#1d1a17] p-6 shadow-lg transition-all hover:border-[#d4af37]/40 hover:shadow-[0_8px_30px_rgba(212,175,55,0.15)]">
          <p className="text-sm font-medium text-[#d4af37]">Total de eventos</p>
          <p className="mt-4 text-4xl font-bold text-white">{totalEvents}</p>
        </article>
        <article className="group rounded-2xl border-2 border-[#d4af37]/20 bg-gradient-to-br from-[#2a2621] to-[#1d1a17] p-6 shadow-lg transition-all hover:border-[#d4af37]/40 hover:shadow-[0_8px_30px_rgba(212,175,55,0.15)]">
          <p className="text-sm font-medium text-[#d4af37]">Tipos distintos</p>
          <p className="mt-4 text-4xl font-bold text-white">{uniqueTypes}</p>
        </article>
        <article className="group rounded-2xl border-2 border-[#d4af37]/20 bg-gradient-to-br from-[#2a2621] to-[#1d1a17] p-6 shadow-lg transition-all hover:border-[#d4af37]/40 hover:shadow-[0_8px_30px_rgba(212,175,55,0.15)]">
          <p className="text-sm font-medium text-[#d4af37]">Presupuesto total</p>
          <p className="mt-4 text-4xl font-bold text-white">
            {formatCurrency(totalBudget)}
          </p>
          <p className="mt-1 text-xs text-zinc-500">
            Precio boleta promedio: {formatCurrency(averageTicketPrice)}
          </p>
        </article>
      </section>

      <section className="rounded-3xl border-2 border-[#d4af37]/20 bg-gradient-to-br from-[#2a2621] to-[#1d1a17] shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
        <div className="flex flex-col gap-4 border-b-2 border-[#d4af37]/20 p-7 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">Eventos registrados</h2>
            <p className="mt-2 text-sm text-zinc-400">
              Vista general del CRUD de eventos para administración.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              className="w-full rounded-xl border-2 border-[#6f5a2e] bg-[#1a1715] px-5 py-3.5 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-[#d4af37] focus:shadow-[0_0_15px_rgba(212,175,55,0.2)] sm:w-72"
              placeholder="Buscar evento..."
              type="text"
            />
          </div>
        </div>

        <EventsTable eventos={eventos} />
      </section>
    </>
  );
}

function EventosContentFallback() {
  return (
    <>
      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        <article className="group rounded-2xl border-2 border-[#d4af37]/20 bg-gradient-to-br from-[#2a2621] to-[#1d1a17] p-6 shadow-lg">
          <p className="text-sm font-medium text-[#d4af37]">Total de eventos</p>
          <div className="mt-4 h-9 w-16 animate-pulse rounded bg-white/10" />
        </article>
        <article className="group rounded-2xl border-2 border-[#d4af37]/20 bg-gradient-to-br from-[#2a2621] to-[#1d1a17] p-6 shadow-lg">
          <p className="text-sm font-medium text-[#d4af37]">Tipos distintos</p>
          <div className="mt-4 h-9 w-16 animate-pulse rounded bg-white/10" />
        </article>
        <article className="group rounded-2xl border-2 border-[#d4af37]/20 bg-gradient-to-br from-[#2a2621] to-[#1d1a17] p-6 shadow-lg">
          <p className="text-sm font-medium text-[#d4af37]">Presupuesto total</p>
          <div className="mt-4 h-9 w-32 animate-pulse rounded bg-white/10" />
          <div className="mt-2 h-3 w-48 animate-pulse rounded bg-white/5" />
        </article>
      </section>

      <section className="rounded-3xl border-2 border-[#d4af37]/20 bg-gradient-to-br from-[#2a2621] to-[#1d1a17] shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
        <div className="flex flex-col gap-4 border-b-2 border-[#d4af37]/20 p-7 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">Eventos registrados</h2>
            <p className="mt-2 text-sm text-zinc-400">
              Vista general del CRUD de eventos para administración.
            </p>
          </div>
        </div>

        <EventsTableSkeleton />
      </section>
    </>
  );
}

export default function EventosPage() {
  return (
    <main className="min-h-screen bg-[#1a1a1a] px-6 py-8 text-white md:px-10">
      <div className="mx-auto max-w-7xl space-y-8">
        <section className="rounded-3xl border-2 border-[#d4af37]/30 bg-gradient-to-br from-[#2a2621] to-[#1d1a17] p-8 shadow-[0_20px_60px_rgba(212,175,55,0.15)]">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-6">
              <div className="flex h-28 w-28 items-center justify-center rounded-2xl border-2 border-[#d4af37] bg-[#1a1715] p-4 shadow-[inset_0_2px_8px_rgba(0,0,0,0.6)]">
                <Image
                  src={logo}
                  alt="Luxury Grand Stage"
                  width={88}
                  height={88}
                  className="h-auto w-auto object-contain drop-shadow-[0_0_10px_rgba(212,175,55,0.3)]"
                  priority
                />
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#d4af37]">
                  Luxury Grand Stage
                </p>
                <h1 className="mt-3 text-4xl font-bold tracking-tight text-white">
                  Lista de Eventos
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400">
                  Consulta los eventos registrados, su tipo, horario, precio de boleta y
                  presupuesto asignado.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/eventos/nuevo"
                className="rounded-xl border-2 border-[#d4af37] bg-gradient-to-br from-[#d4af37] to-[#b88a2f] px-6 py-3.5 text-center text-sm font-bold text-[#1a1715] shadow-[0_8px_20px_rgba(212,175,55,0.3)] transition-all hover:shadow-[0_12px_30px_rgba(212,175,55,0.4)]"
              >
                + Nuevo Evento
              </Link>
            </div>
          </div>
        </section>

        <Suspense fallback={<EventosContentFallback />}>
          <EventosContent />
        </Suspense>
      </div>
    </main>
  );
}
