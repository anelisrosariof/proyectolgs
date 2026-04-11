import Link from "next/link";
import { formatCurrency } from "../../../lib/utils/format-currency";
import { formatDate } from "../../../lib/utils/format-date";
import { getOccupancyPercent } from "../../../lib/utils/get-occupancy-percent";

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
    description:
      "Evento temático con música en vivo, ambientación especial y venta de boletas por zona.",
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
    description:
      "Presentación acústica con cupos limitados, zona general y experiencia íntima para el público.",
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
    description:
      "Actividad corporativa enfocada en networking, música ambiental y catering premium.",
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
    description:
      "Festival de varios artistas y experiencias en distintas áreas del salón.",
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

function DetailItem({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#1c1b1a] p-4">
      <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">{label}</p>
      <div className="mt-2 text-sm text-white">{value}</div>
    </div>
  );
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = events.find((item) => item.id === id);

  if (!event) {
    return (
      <main className="min-h-screen bg-[#161515] p-8 text-white">
        <div className="mx-auto max-w-4xl rounded-[28px] border border-white/10 bg-[#1b1918] p-8 text-center">
          <h1 className="text-3xl font-bold">Evento no encontrado</h1>
          <p className="mt-3 text-zinc-400">
            No se encontró un evento con el código {id}.
          </p>
          <Link
            href="/eventos"
            className="mt-6 inline-flex rounded-xl bg-[#a57c2d] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#8d6925]"
          >
            Volver a eventos
          </Link>
        </div>
      </main>
    );
  }

  const occupancy = getOccupancyPercent(event.sold, event.capacity);

  return (
    <main className="min-h-screen bg-[#161515] px-6 py-8 text-white md:px-10">
      <div className="mx-auto max-w-6xl space-y-8">
        <section className="rounded-[28px] border border-[#3a3325] bg-[linear-gradient(90deg,#1d1a17_0%,#2a2621_100%)] p-6 shadow-[0_10px_40px_rgba(0,0,0,0.28)]">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.25em] text-[#b88a2f]">
                Luxury Grand Stage
              </p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-white">
                {event.name}
              </h1>
              <p className="mt-2 text-sm text-zinc-300">
                Código del evento: {event.id}
              </p>

              <div className="mt-4 flex flex-wrap gap-3">
                <EventTypeBadge type={event.type} />
                <EventStatusBadge status={event.status} />
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/eventos"
                className="rounded-xl border border-[#6f5a2e] bg-[#2a241d] px-5 py-3 text-sm font-semibold text-[#e6c980] transition hover:bg-[#332b22]"
              >
                Volver
              </Link>
              <button className="rounded-xl bg-[#a57c2d] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#8d6925]">
                Editar Evento
              </button>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <DetailItem label="Fecha" value={formatDate(event.date)} />
          <DetailItem
            label="Horario"
            value={`${event.startTime} - ${event.endTime}`}
          />
          <DetailItem label="Ubicación" value={event.location} />
          <DetailItem label="Precio" value={formatCurrency(event.price)} />
        </section>

        <section className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="rounded-[28px] border border-white/10 bg-[#1b1918] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.24)]">
            <h2 className="text-xl font-semibold text-white">
              Información general
            </h2>
            <p className="mt-4 text-sm leading-7 text-zinc-300">
              {event.description}
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <DetailItem label="Capacidad total" value={event.capacity} />
              <DetailItem label="Boletas vendidas" value={event.sold} />
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-[#1b1918] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.24)]">
            <h2 className="text-xl font-semibold text-white">Ocupación</h2>
            <p className="mt-3 text-sm text-zinc-400">
              Porcentaje actual de ocupación del evento.
            </p>

            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between text-sm text-zinc-300">
                <span>
                  {event.sold}/{event.capacity}
                </span>
                <span className="font-semibold text-[#d4af37]">{occupancy}%</span>
              </div>
              <div className="h-3 rounded-full bg-white/10">
                <div
                  className="h-3 rounded-full bg-[#b88a2f]"
                  style={{ width: `${occupancy}%` }}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}