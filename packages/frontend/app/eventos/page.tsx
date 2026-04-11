import { fetchApi } from "../../lib/api";
import type { Evento } from "../../lib/types/evento";
import { formatCurrency } from "../../lib/utils/format-currency";
import { formatDate } from "../../lib/utils/format-date";

// NOTE: Phase 6.3 — mock-only UI (`status`, `location`, `capacity`, `sold`
// badges/columns and the occupancy bar) has been removed. The transitional
// `DisplayEvent` shape now mirrors only fields that exist on the backend
// `Evento` model. Phase 6.4 will replace this table with the final column
// layout (Nombre, Tipo, Fecha, Horario, Precio Boleta, Presupuesto, Acciones).
type DisplayEvent = {
  id: string;
  name: string;
  type: string;
  date: string;
  startTime: string;
  endTime: string;
  price: number;
  budget: number;
};

const typeStyles: Record<string, string> = {
  "Fiesta temática": "border border-fuchsia-500/30 bg-fuchsia-500/10 text-fuchsia-200",
  Concierto: "border border-sky-500/30 bg-sky-500/10 text-sky-200",
  "Evento corporativo": "border border-violet-500/30 bg-violet-500/10 text-violet-200",
  Festival: "border border-orange-500/30 bg-orange-500/10 text-orange-200",
};

function EventTypeBadge({ type }: { type: string }) {
  const style =
    typeStyles[type] ?? "border border-zinc-500/30 bg-zinc-500/10 text-zinc-200";
  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${style}`}>
      {type}
    </span>
  );
}

function EventRow({ event }: { event: DisplayEvent }) {
  return (
    <tr className="border-t border-white/10 transition hover:bg-white/[0.03]">
      <td className="px-6 py-4">
        <div>
          <p className="font-semibold text-white">{event.name}</p>
          <p className="text-xs text-zinc-400">{event.id}</p>
        </div>
      </td>
      <td className="px-6 py-4">
        <EventTypeBadge type={event.type} />
      </td>
      <td className="px-6 py-4 text-zinc-300">{formatDate(event.date)}</td>
      <td className="px-6 py-4 text-zinc-300">
        {event.startTime} - {event.endTime}
      </td>
      <td className="px-6 py-4 text-zinc-300">{formatCurrency(event.price)}</td>
      <td className="px-6 py-4 text-zinc-300">{formatCurrency(event.budget)}</td>
      <td className="px-6 py-4">
        <div className="flex flex-wrap gap-2">
          <button className="rounded-full border border-white/15 bg-white/5 px-3 py-2 text-xs font-semibold text-zinc-200 transition hover:bg-white/10">
            Ver
          </button>
          <button className="rounded-full border border-[#b88a2f]/40 bg-[#b88a2f]/10 px-3 py-2 text-xs font-semibold text-[#f1d48a] transition hover:bg-[#b88a2f]/20">
            Editar
          </button>
          <button className="rounded-full border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-xs font-semibold text-rose-300 transition hover:bg-rose-500/20">
            Eliminar
          </button>
        </div>
      </td>
    </tr>
  );
}

function EventsTable({ events }: { events: DisplayEvent[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-white/[0.03] text-zinc-400">
          <tr>
            <th className="px-6 py-4 font-semibold">Evento</th>
            <th className="px-6 py-4 font-semibold">Tipo</th>
            <th className="px-6 py-4 font-semibold">Fecha</th>
            <th className="px-6 py-4 font-semibold">Horario</th>
            <th className="px-6 py-4 font-semibold">Precio Boleta</th>
            <th className="px-6 py-4 font-semibold">Presupuesto</th>
            <th className="px-6 py-4 font-semibold">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <EventRow key={event.id} event={event} />
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
        <thead className="bg-white/[0.03] text-zinc-400">
          <tr>
            <th className="px-6 py-4 font-semibold">Evento</th>
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

/**
 * Adapts a real backend `Evento` into the transitional `DisplayEvent` shape.
 * After Phase 6.3 this only carries fields that actually exist on the backend
 * model. Phase 6.4 will drop this intermediate shape entirely and consume
 * `Evento` directly in the rewritten table.
 */
function toDisplayEvent(evento: Evento): DisplayEvent {
  return {
    id: `EVT-${String(evento.idEvento).padStart(3, "0")}`,
    name: evento.nombre,
    type: evento.tipo,
    date: evento.fechaEvento,
    startTime: evento.horaInicio,
    endTime: evento.horaFin,
    price: evento.precioBoleta,
    budget: evento.presupuesto,
  };
}

export default async function EventosPage() {
  const eventos = await fetchApi<Evento[]>("/eventos");
  const displayEvents = eventos.map(toDisplayEvent);

  const totalEvents = displayEvents.length;
  const uniqueTypes = new Set(displayEvents.map((event) => event.type)).size;
  const totalBudget = displayEvents.reduce((sum, event) => sum + event.budget, 0);
  const averageTicketPrice =
    totalEvents === 0
      ? 0
      : displayEvents.reduce((sum, event) => sum + event.price, 0) / totalEvents;

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
              <button className="rounded-xl bg-[#a57c2d] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#8d6925]">
                Nuevo Evento
              </button>
            </div>
          </div>
        </section>

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

          <EventsTable events={displayEvents} />
        </section>

        <section className="rounded-[28px] border border-white/10 bg-[#1b1918] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.24)]">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-white">Skeleton de tabla</h2>
            <p className="mt-1 text-sm text-zinc-400">
              Placeholder para estados de carga mientras llegan los eventos del backend.
            </p>
          </div>
          <EventsTableSkeleton />
        </section>
      </div>
    </main>
  );
}
