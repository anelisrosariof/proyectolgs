import { formatCurrency } from "../lib/utils/format-currency";
import { formatDate } from "../lib/utils/format-date";
import { getOccupancyPercent } from "../lib/utils/get-occupancy-percent";

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
  Activo: "bg-emerald-100 text-emerald-700 ring-emerald-200",
  Planificado: "bg-amber-100 text-amber-700 ring-amber-200",
  Borrador: "bg-slate-100 text-slate-700 ring-slate-200",
};

const typeStyles: Record<EventType, string> = {
  "Fiesta temática": "bg-fuchsia-100 text-fuchsia-700 ring-fuchsia-200",
  Concierto: "bg-sky-100 text-sky-700 ring-sky-200",
  "Evento corporativo": "bg-violet-100 text-violet-700 ring-violet-200",
  Festival: "bg-orange-100 text-orange-700 ring-orange-200",
};

function EventTypeBadge({ type }: { type: EventType }) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ring-1 ${typeStyles[type]}`}
    >
      {type}
    </span>
  );
}

function EventStatusBadge({ status }: { status: EventStatus }) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ring-1 ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}

function EventRow({ event }: { event: Event }) {
  const occupancyPercent = getOccupancyPercent(event.sold, event.capacity);

  return (
    <tr className="border-t border-slate-200 hover:bg-slate-50">
      <td className="px-6 py-4">
        <div>
          <p className="font-semibold text-slate-900">{event.name}</p>
          <p className="text-xs text-slate-500">{event.id}</p>
        </div>
      </td>
      <td className="px-6 py-4">
        <EventTypeBadge type={event.type} />
      </td>
      <td className="px-6 py-4 text-slate-600">{formatDate(event.date)}</td>
      <td className="px-6 py-4 text-slate-600">
        {event.startTime} - {event.endTime}
      </td>
      <td className="px-6 py-4 text-slate-600">{event.location}</td>
      <td className="px-6 py-4 text-slate-600">{formatCurrency(event.price)}</td>
      <td className="px-6 py-4 text-slate-600">
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-3 text-xs">
            <span>
              {event.sold}/{event.capacity}
            </span>
            <span className="font-semibold">{occupancyPercent}%</span>
          </div>
          <div className="h-2 w-32 rounded-full bg-slate-200">
            <div
              className="h-2 rounded-full bg-slate-900"
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
          <button className="rounded-full border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100">
            Ver
          </button>
          <button className="rounded-full border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100">
            Editar
          </button>
          <button className="rounded-full border border-rose-200 px-3 py-2 text-xs font-semibold text-rose-600 transition hover:bg-rose-50">
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
        <thead className="bg-slate-50 text-slate-500">
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
        <thead className="bg-slate-50 text-slate-500">
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
            <tr key={index} className="border-t border-slate-200">
              <td className="px-6 py-4">
                <div className="space-y-2">
                  <div className="h-4 w-36 animate-pulse rounded bg-slate-200" />
                  <div className="h-3 w-20 animate-pulse rounded bg-slate-100" />
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="h-7 w-28 animate-pulse rounded-full bg-slate-100" />
              </td>
              <td className="px-6 py-4">
                <div className="h-4 w-24 animate-pulse rounded bg-slate-100" />
              </td>
              <td className="px-6 py-4">
                <div className="h-4 w-24 animate-pulse rounded bg-slate-100" />
              </td>
              <td className="px-6 py-4">
                <div className="h-4 w-28 animate-pulse rounded bg-slate-100" />
              </td>
              <td className="px-6 py-4">
                <div className="h-4 w-20 animate-pulse rounded bg-slate-100" />
              </td>
              <td className="px-6 py-4">
                <div className="space-y-2">
                  <div className="h-4 w-24 animate-pulse rounded bg-slate-100" />
                  <div className="h-2 w-32 animate-pulse rounded-full bg-slate-100" />
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="h-7 w-24 animate-pulse rounded-full bg-slate-100" />
              </td>
              <td className="px-6 py-4">
                <div className="flex gap-2">
                  <div className="h-8 w-14 animate-pulse rounded-full bg-slate-100" />
                  <div className="h-8 w-16 animate-pulse rounded-full bg-slate-100" />
                  <div className="h-8 w-18 animate-pulse rounded-full bg-slate-100" />
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
    <main className="min-h-screen bg-slate-50 p-6 text-slate-900 md:p-10">
      <div className="mx-auto max-w-7xl space-y-8">
        <section className="flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
              Luxury Grand Stage
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight">Lista de Eventos</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-600 md:text-base">
              Consulta los eventos registrados, su estado, capacidad, ocupación y acciones
              principales del CRUD.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100">
              Exportar
            </button>
            <button className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700">
              Nuevo Evento
            </button>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <article className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <p className="text-sm text-slate-500">Total de eventos</p>
            <p className="mt-3 text-3xl font-bold">{totalEvents}</p>
          </article>
          <article className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <p className="text-sm text-slate-500">Eventos activos</p>
            <p className="mt-3 text-3xl font-bold">{activeEvents}</p>
          </article>
          <article className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <p className="text-sm text-slate-500">Planificados</p>
            <p className="mt-3 text-3xl font-bold">{plannedEvents}</p>
          </article>
          <article className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <p className="text-sm text-slate-500">Boletas vendidas</p>
            <p className="mt-3 text-3xl font-bold">{totalTicketsSold}</p>
          </article>
        </section>

        <section className="rounded-3xl bg-white shadow-sm ring-1 ring-slate-200">
          <div className="flex flex-col gap-4 border-b border-slate-200 p-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-xl font-semibold">Eventos registrados</h2>
              <p className="mt-1 text-sm text-slate-500">
                Vista general del CRUD de eventos para administración.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-500 sm:w-72"
                placeholder="Buscar evento..."
                type="text"
              />
              <select className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-slate-500">
                <option>Todos los estados</option>
                <option>Activo</option>
                <option>Planificado</option>
                <option>Borrador</option>
              </select>
            </div>
          </div>

          <EventsTable events={events} />
        </section>

        <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Skeleton de tabla</h2>
            <p className="mt-1 text-sm text-slate-500">
              Placeholder para estados de carga mientras llegan los eventos del backend.
            </p>
          </div>
          <EventsTableSkeleton />
        </section>
      </div>
    </main>
  );
}
