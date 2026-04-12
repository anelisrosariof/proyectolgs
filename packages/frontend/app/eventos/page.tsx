import Link from "next/link";
import { Suspense } from "react";
import { fetchApi } from "../../lib/api";
import { TipoEvento, type Evento } from "../../lib/types/evento";
import { formatCurrency } from "../../lib/utils/format-currency";
import { formatDate } from "../../lib/utils/format-date";
import { DeleteEventButton } from "./delete-event-button";

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
    <tr className="border-t border-white/10 transition hover:bg-white/3">
      <td className="px-6 py-4">
        <div>
          <p className="font-semibold text-white">{evento.nombre}</p>
          <p className="text-xs text-zinc-400">{formatEventoId(evento.idEvento)}</p>
        </div>
      </td>
      <td className="px-6 py-4">
        <EventTypeBadge tipo={evento.tipo} />
      </td>
      <td className="px-6 py-4 text-zinc-300">{formatDate(evento.fechaEvento)}</td>
      <td className="px-6 py-4 text-zinc-300">
        {formatHorario(evento.horaInicio, evento.horaFin)}
      </td>
      <td className="px-6 py-4 text-zinc-300">{formatCurrency(evento.precioBoleta)}</td>
      <td className="px-6 py-4 text-zinc-300">{formatCurrency(evento.presupuesto)}</td>
      <td className="px-6 py-4">
        <div className="flex flex-wrap gap-2">
          <Link
            href={`/eventos/${evento.idEvento}`}
            className="rounded-full border border-white/15 bg-white/5 px-3 py-2 text-xs font-semibold text-zinc-200 transition hover:bg-white/10"
          >
            Ver
          </Link>
          <Link
            href={`/eventos/${evento.idEvento}/editar`}
            className="rounded-full border border-[#b88a2f]/40 bg-[#b88a2f]/10 px-3 py-2 text-xs font-semibold text-[#f1d48a] transition hover:bg-[#b88a2f]/20"
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
        <thead className="bg-white/3 text-zinc-400">
          <tr>
            <th className="px-6 py-4 font-semibold">Nombre</th>
            <th className="px-6 py-4 font-semibold">Tipo</th>
            <th className="px-6 py-4 font-semibold">Fecha</th>
            <th className="px-6 py-4 font-semibold">Horario</th>
            <th className="px-6 py-4 font-semibold">Precio Boleta</th>
            <th className="px-6 py-4 font-semibold">Presupuesto</th>
            <th className="px-6 py-4 font-semibold">Acciones</th>
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
        <thead className="bg-white/3 text-zinc-400">
          <tr>
            <th className="px-6 py-4 font-semibold">Nombre</th>
            <th className="px-6 py-4 font-semibold">Tipo</th>
            <th className="px-6 py-4 font-semibold">Fecha</th>
            <th className="px-6 py-4 font-semibold">Horario</th>
            <th className="px-6 py-4 font-semibold">Precio Boleta</th>
            <th className="px-6 py-4 font-semibold">Presupuesto</th>
            <th className="px-6 py-4 font-semibold">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 4 }).map((_, index) => (
            <tr key={index} className="border-t border-white/10">
              <td className="px-6 py-4">
                <div className="space-y-2">
                  <div className="h-4 w-36 animate-pulse rounded bg-white/10" />
                  <div className="h-3 w-20 animate-pulse rounded bg-white/5" />
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="h-7 w-28 animate-pulse rounded-full bg-white/10" />
              </td>
              <td className="px-6 py-4">
                <div className="h-4 w-24 animate-pulse rounded bg-white/10" />
              </td>
              <td className="px-6 py-4">
                <div className="h-4 w-24 animate-pulse rounded bg-white/10" />
              </td>
              <td className="px-6 py-4">
                <div className="h-4 w-20 animate-pulse rounded bg-white/10" />
              </td>
              <td className="px-6 py-4">
                <div className="h-4 w-24 animate-pulse rounded bg-white/10" />
              </td>
              <td className="px-6 py-4">
                <div className="flex gap-2">
                  <div className="h-8 w-14 animate-pulse rounded-full bg-white/10" />
                  <div className="h-8 w-16 animate-pulse rounded-full bg-white/10" />
                  <div className="h-8 w-18 animate-pulse rounded-full bg-white/10" />
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
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <article className="rounded-2xl border border-white/10 bg-[#1c1b1a] p-5 shadow-sm">
          <p className="text-sm text-zinc-400">Total de eventos</p>
          <p className="mt-3 text-3xl font-bold text-white">{totalEvents}</p>
        </article>
        <article className="rounded-2xl border border-white/10 bg-[#1c1b1a] p-5 shadow-sm">
          <p className="text-sm text-zinc-400">Tipos distintos</p>
          <p className="mt-3 text-3xl font-bold text-white">{uniqueTypes}</p>
        </article>
        <article className="rounded-2xl border border-white/10 bg-[#1c1b1a] p-5 shadow-sm">
          <p className="text-sm text-zinc-400">Presupuesto total</p>
          <p className="mt-3 text-3xl font-bold text-white">
            {formatCurrency(totalBudget)}
          </p>
          <p className="mt-1 text-xs text-zinc-500">
            Precio boleta promedio: {formatCurrency(averageTicketPrice)}
          </p>
        </article>
      </section>

      <section className="rounded-[28px] border border-white/10 bg-[#1b1918] shadow-[0_10px_30px_rgba(0,0,0,0.24)]">
        <div className="flex flex-col gap-4 border-b border-white/10 p-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-white">Eventos registrados</h2>
            <p className="mt-1 text-sm text-zinc-400">
              Vista general del CRUD de eventos para administración.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              className="w-full rounded-xl border border-[#4a3e2a] bg-[#25211d] px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-[#a57c2d] sm:w-72"
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
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <article className="rounded-2xl border border-white/10 bg-[#1c1b1a] p-5 shadow-sm">
          <p className="text-sm text-zinc-400">Total de eventos</p>
          <div className="mt-3 h-9 w-16 animate-pulse rounded bg-white/10" />
        </article>
        <article className="rounded-2xl border border-white/10 bg-[#1c1b1a] p-5 shadow-sm">
          <p className="text-sm text-zinc-400">Tipos distintos</p>
          <div className="mt-3 h-9 w-16 animate-pulse rounded bg-white/10" />
        </article>
        <article className="rounded-2xl border border-white/10 bg-[#1c1b1a] p-5 shadow-sm">
          <p className="text-sm text-zinc-400">Presupuesto total</p>
          <div className="mt-3 h-9 w-32 animate-pulse rounded bg-white/10" />
          <div className="mt-2 h-3 w-48 animate-pulse rounded bg-white/5" />
        </article>
      </section>

      <section className="rounded-[28px] border border-white/10 bg-[#1b1918] shadow-[0_10px_30px_rgba(0,0,0,0.24)]">
        <div className="flex flex-col gap-4 border-b border-white/10 p-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-white">Eventos registrados</h2>
            <p className="mt-1 text-sm text-zinc-400">
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
    <main className="min-h-screen bg-[#161515] px-6 py-8 text-white md:px-10">
      <div className="mx-auto max-w-7xl space-y-8">
        <section className="rounded-[28px] border border-[#3a3325] bg-[linear-gradient(90deg,#1d1a17_0%,#2a2621_100%)] p-6 shadow-[0_10px_40px_rgba(0,0,0,0.28)]">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.25em] text-[#b88a2f]">
                Luxury Grand Stage
              </p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-white">
                Lista de Eventos
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-zinc-300 md:text-base">
                Consulta los eventos registrados, su tipo, horario, precio de boleta y
                presupuesto asignado.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button className="rounded-xl border border-[#6f5a2e] bg-[#2a241d] px-5 py-3 text-sm font-semibold text-[#e6c980] transition hover:bg-[#332b22]">
                Exportar
              </button>
              <Link
                href="/eventos/nuevo"
                className="rounded-xl bg-[#a57c2d] px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#8d6925]"
              >
                Nuevo Evento
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
