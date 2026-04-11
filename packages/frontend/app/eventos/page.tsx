import { formatCurrency } from "../../lib/utils/format-currency";
import { formatDate } from "../../lib/utils/format-date";
import { getOccupancyPercent } from "../../lib/utils/get-occupancy-percent";

const events = [
  {
    id: "EVT-001",
    name: "Noche de Salsa",
    type: "Fiesta temática",
    date: "2026-04-18",
    startTime: "20:00",
    endTime: "23:30",
    location: "Salón Principal",
    status: "Planificado",
    capacity: 250,
    sold: 180,
    price: 1500,
  },
  {
    id: "EVT-002",
    name: "Concierto Acústico",
    type: "Concierto",
    date: "2026-04-22",
    startTime: "19:00",
    endTime: "22:00",
    location: "Terraza",
    status: "Activo",
    capacity: 120,
    sold: 96,
    price: 2000,
  },
  {
    id: "EVT-003",
    name: "After Office Premium",
    type: "Evento corporativo",
    date: "2026-04-25",
    startTime: "18:30",
    endTime: "22:30",
    location: "Área VIP",
    status: "Planificado",
    capacity: 80,
    sold: 54,
    price: 2500,
  },
  {
    id: "EVT-004",
    name: "Festival Urbano",
    type: "Festival",
    date: "2026-05-02",
    startTime: "17:00",
    endTime: "23:59",
    location: "Salón Principal",
    status: "Borrador",
    capacity: 400,
    sold: 0,
    price: 1800,
  },
];

type Event = (typeof events)[number];
type EventStatus = Event["status"];
type EventType = Event["type"];

const statusStyles: Record<EventStatus, string> = {
  Activo: "border border-emerald-500/40 bg-emerald-500/10 text-emerald-300",
  Planificado: "border border-amber-500/40 bg-amber-500/10 text-amber-300",
  Borrador: "border border-zinc-500/40 bg-zinc-500/10 text-zinc-300",
};

const typeStyles: Record<EventType, string> = {
  "Fiesta temática": "border border-fuchsia-500/30 bg-fuchsia-500/10 text-fuchsia-200",
  Concierto: "border border-sky-500/30 bg-sky-500/10 text-sky-200",
  "Evento corporativo": "border border-violet-500/30 bg-violet-500/10 text-violet-200",
  Festival: "border border-orange-500/30 bg-orange-500/10 text-orange-200",
};

function EventTypeBadge({ type }: { type: EventType }) {
  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${typeStyles[type]}`}>
      {type}
    </span>
  );
}

function EventStatusBadge({ status }: { status: EventStatus }) {
  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[status]}`}>
      {status}
    </span>
  );
}

function EventRow({ event }: { event: Event }) {
  const occupancyPercent = getOccupancyPercent(event.sold, event.capacity);

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
      <td className="px-6 py-4 text-zinc-300">{event.location}</td>
      <td className="px-6 py-4 text-zinc-300">{formatCurrency(event.price)}</td>
      <td className="px-6 py-4 text-zinc-300">
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-3 text-xs">
            <span>
              {event.sold}/{event.capacity}
            </span>
            <span className="font-semibold text-[#d4af37]">{occupancyPercent}%</span>
          </div>
          <div className="h-2 w-32 rounded-full bg-white/10">
            <div
              className="h-2 rounded-full bg-[#b88a2f]"
              style={{ width: `${occupancyPercent}%` }}
            />
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <EventStatusBadge status={event.status} />
      </td>
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

function EventsTable({ events }: { events: Event[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-white/[0.03] text-zinc-400">
          <tr>
            <th className="px-6 py-4 font-semibold">Evento</th>
            <th className="px-6 py-4 font-semibold">Tipo</th>
            <th className="px-6 py-4 font-semibold">Fecha</th>
            <th className="px-6 py-4 font-semibold">Horario</th>
            <th className="px-6 py-4 font-semibold">Ubicación</th>
            <th className="px-6 py-4 font-semibold">Precio</th>
            <th className="px-6 py-4 font-semibold">Ocupación</th>
            <th className="px-6 py-4 font-semibold">Estado</th>
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
            <th className="px-6 py-4 font-semibold">Ubicación</th>
            <th className="px-6 py-4 font-semibold">Precio</th>
            <th className="px-6 py-4 font-semibold">Ocupación</th>
            <th className="px-6 py-4 font-semibold">Estado</th>
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
                <div className="h-4 w-28 animate-pulse rounded bg-white/10" />
              </td>
              <td className="px-6 py-4">
                <div className="h-4 w-20 animate-pulse rounded bg-white/10" />
              </td>
              <td className="px-6 py-4">
                <div className="space-y-2">
                  <div className="h-4 w-24 animate-pulse rounded bg-white/10" />
                  <div className="h-2 w-32 animate-pulse rounded-full bg-white/10" />
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="h-7 w-24 animate-pulse rounded-full bg-white/10" />
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

export default function Home() {
  const totalEvents = events.length;
  const activeEvents = events.filter((event) => event.status === "Activo").length;
  const plannedEvents = events.filter((event) => event.status === "Planificado").length;
  const totalTicketsSold = events.reduce((sum, event) => sum + event.sold, 0);

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
                Consulta los eventos registrados, su estado, capacidad, ocupación y acciones
                principales del CRUD.
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

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <article className="rounded-2xl border border-white/10 bg-[#1c1b1a] p-5 shadow-sm">
            <p className="text-sm text-zinc-400">Total de eventos</p>
            <p className="mt-3 text-3xl font-bold text-white">{totalEvents}</p>
          </article>
          <article className="rounded-2xl border border-white/10 bg-[#1c1b1a] p-5 shadow-sm">
            <p className="text-sm text-zinc-400">Eventos activos</p>
            <p className="mt-3 text-3xl font-bold text-white">{activeEvents}</p>
          </article>
          <article className="rounded-2xl border border-white/10 bg-[#1c1b1a] p-5 shadow-sm">
            <p className="text-sm text-zinc-400">Planificados</p>
            <p className="mt-3 text-3xl font-bold text-white">{plannedEvents}</p>
          </article>
          <article className="rounded-2xl border border-white/10 bg-[#1c1b1a] p-5 shadow-sm">
            <p className="text-sm text-zinc-400">Boletas vendidas</p>
            <p className="mt-3 text-3xl font-bold text-white">{totalTicketsSold}</p>
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
              <select className="rounded-xl border border-[#4a3e2a] bg-[#25211d] px-4 py-3 text-sm text-white outline-none transition focus:border-[#a57c2d]">
                <option>Todos los estados</option>
                <option>Activo</option>
                <option>Planificado</option>
                <option>Borrador</option>
              </select>
            </div>
          </div>

          <EventsTable events={events} />
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
