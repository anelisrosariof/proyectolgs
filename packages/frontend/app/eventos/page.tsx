"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import logo from "../lgs_logo512.png";
import { DeleteEventDialog } from "./delete-event-dialog";
import { formatCurrency } from "../../lib/utils/format-currency";
import { formatDate } from "../../lib/utils/format-date";
import { getOccupancyPercent } from "../../lib/utils/get-occupancy-percent";

type EventStatus = "Activo" | "Planificado" | "Borrador";
type EventType =
  | "Fiesta temática"
  | "Concierto"
  | "Evento corporativo"
  | "Festival";

type Event = {
  id: string;
  name: string;
  type: EventType;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  status: EventStatus;
  capacity: number;
  sold: number;
  price: number;
};

const mockEvents: Event[] = [
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
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${typeStyles[type]}`}
    >
      {type}
    </span>
  );
}

function EventStatusBadge({ status }: { status: EventStatus }) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}

function EventRow({
  event,
  onView,
  onEdit,
  onDelete,
}: {
  event: Event;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const occupancyPercent = getOccupancyPercent(event.sold, event.capacity);

  return (
    <tr className="border-t border-[#d4af37]/10 transition-all hover:bg-[#d4af37]/5">
      <td className="px-6 py-5">
        <div>
          <p className="font-bold text-white">{event.name}</p>
          <p className="mt-1 text-xs font-medium text-[#d4af37]">{event.id}</p>
        </div>
      </td>

      <td className="px-6 py-5">
        <EventTypeBadge type={event.type} />
      </td>

      <td className="px-6 py-5 font-medium text-zinc-300">
        {formatDate(event.date)}
      </td>

      <td className="px-6 py-5 font-medium text-zinc-300">
        {event.startTime} - {event.endTime}
      </td>

      <td className="px-6 py-5 font-medium text-zinc-300">{event.location}</td>

      <td className="px-6 py-5 font-bold text-[#d4af37]">
        {formatCurrency(event.price)}
      </td>

      <td className="px-6 py-5">
        <div className="space-y-2.5">
          <div className="flex items-center justify-between gap-3 text-xs font-medium">
            <span className="text-zinc-400">
              {event.sold}/{event.capacity}
            </span>
            <span className="font-bold text-[#d4af37]">{occupancyPercent}%</span>
          </div>

          <div className="h-2.5 w-32 overflow-hidden rounded-full bg-[#1a1715] ring-1 ring-[#d4af37]/20">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#d4af37] to-[#b88a2f] shadow-[0_0_10px_rgba(212,175,55,0.5)]"
              style={{ width: `${occupancyPercent}%` }}
            />
          </div>
        </div>
      </td>

      <td className="px-6 py-5">
        <EventStatusBadge status={event.status} />
      </td>

      <td className="px-6 py-5">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onView(event.id)}
            className="rounded-lg border-2 border-[#6f5a2e] bg-[#1a1715] px-4 py-2 text-xs font-bold text-zinc-300 transition-all hover:border-[#d4af37] hover:bg-[#2a241d] hover:text-white"
          >
            Ver
          </button>

          <button
            onClick={() => onEdit(event.id)}
            className="rounded-lg border-2 border-[#d4af37]/40 bg-[#d4af37]/10 px-4 py-2 text-xs font-bold text-[#d4af37] transition-all hover:bg-[#d4af37]/20 hover:shadow-[0_0_15px_rgba(212,175,55,0.3)]"
          >
            Editar
          </button>

          <button
            onClick={() => onDelete(event.id)}
            className="rounded-lg border-2 border-rose-500/40 bg-rose-500/10 px-4 py-2 text-xs font-bold text-rose-400 transition-all hover:bg-rose-500/20 hover:shadow-[0_0_15px_rgba(244,63,94,0.3)]"
          >
            Eliminar
          </button>
        </div>
      </td>
    </tr>
  );
}

function EventsTable({
  events,
  onView,
  onEdit,
  onDelete,
}: {
  events: Event[];
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}) {
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
              Ubicación
            </th>
            <th className="px-6 py-5 text-xs font-bold uppercase tracking-wider text-[#d4af37]">
              Precio
            </th>
            <th className="px-6 py-5 text-xs font-bold uppercase tracking-wider text-[#d4af37]">
              Ocupación
            </th>
            <th className="px-6 py-5 text-xs font-bold uppercase tracking-wider text-[#d4af37]">
              Estado
            </th>
            <th className="px-6 py-5 text-xs font-bold uppercase tracking-wider text-[#d4af37]">
              Acciones
            </th>
          </tr>
        </thead>

        <tbody>
          {events.length === 0 ? (
            <tr>
              <td colSpan={9} className="px-6 py-12 text-center">
                <p className="text-zinc-400">No se encontraron eventos.</p>
              </td>
            </tr>
          ) : (
            events.map((event) => (
              <EventRow
                key={event.id}
                event={event}
                onView={onView}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))
          )}
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
              Ubicación
            </th>
            <th className="px-6 py-5 text-xs font-bold uppercase tracking-wider text-[#d4af37]">
              Precio
            </th>
            <th className="px-6 py-5 text-xs font-bold uppercase tracking-wider text-[#d4af37]">
              Ocupación
            </th>
            <th className="px-6 py-5 text-xs font-bold uppercase tracking-wider text-[#d4af37]">
              Estado
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
                <div className="h-4 w-28 animate-pulse rounded bg-white/10" />
              </td>
              <td className="px-6 py-5">
                <div className="h-4 w-20 animate-pulse rounded bg-white/10" />
              </td>
              <td className="px-6 py-5">
                <div className="space-y-2">
                  <div className="h-4 w-24 animate-pulse rounded bg-white/10" />
                  <div className="h-2.5 w-32 animate-pulse rounded-full bg-white/10" />
                </div>
              </td>
              <td className="px-6 py-5">
                <div className="h-7 w-24 animate-pulse rounded-full bg-white/10" />
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

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  useEffect(() => {
    setEvents(mockEvents);
    setLoading(false);
  }, []);

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || event.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalEvents = filteredEvents.length;
  const activeEvents = filteredEvents.filter((event) => event.status === "Activo").length;
  const plannedEvents = filteredEvents.filter((event) => event.status === "Planificado").length;
  const totalTicketsSold = filteredEvents.reduce((sum, event) => sum + event.sold, 0);

  const handleView = (id: string) => {
    window.location.href = `/eventos/${id}`;
  };

  const handleEdit = (id: string) => {
    window.location.href = `/eventos/${id}/editar`;
  };

  const handleDelete = (id: string) => {
    const eventToDelete = events.find((event) => event.id === id) ?? null;
    setSelectedEvent(eventToDelete);
    setIsDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setSelectedEvent(null);
  };

  const handleConfirmDelete = () => {
    if (!selectedEvent) return;

    setEvents((prevEvents) =>
      prevEvents.filter((event) => event.id !== selectedEvent.id)
    );

    setIsDeleteDialogOpen(false);
    setSelectedEvent(null);
  };

  const handleNewEvent = () => {
    window.location.href = "/eventos/nuevo";
  };

  const handleExport = () => {
    console.log("Exportar eventos");
  };

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
                  Consulta los eventos registrados, su estado, capacidad, ocupación y acciones
                  principales del CRUD.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                onClick={handleExport}
                className="rounded-xl border-2 border-[#6f5a2e] bg-[#2a241d] px-6 py-3.5 text-sm font-semibold text-[#d4af37] transition-all hover:border-[#d4af37] hover:bg-[#332b22] hover:shadow-[0_0_20px_rgba(212,175,55,0.2)]"
              >
                Exportar
              </button>
              <button
                onClick={handleNewEvent}
                className="rounded-xl border-2 border-[#d4af37] bg-gradient-to-br from-[#d4af37] to-[#b88a2f] px-6 py-3.5 text-sm font-bold text-[#1a1715] shadow-[0_8px_20px_rgba(212,175,55,0.3)] transition-all hover:shadow-[0_12px_30px_rgba(212,175,55,0.4)]"
              >
                + Nuevo Evento
              </button>
            </div>
          </div>
        </section>

        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <article className="group rounded-2xl border-2 border-[#d4af37]/20 bg-gradient-to-br from-[#2a2621] to-[#1d1a17] p-6 shadow-lg transition-all hover:border-[#d4af37]/40 hover:shadow-[0_8px_30px_rgba(212,175,55,0.15)]">
            <p className="text-sm font-medium text-[#d4af37]">Total de eventos</p>
            <p className="mt-4 text-4xl font-bold text-white">{totalEvents}</p>
          </article>

          <article className="group rounded-2xl border-2 border-emerald-500/20 bg-gradient-to-br from-[#2a2621] to-[#1d1a17] p-6 shadow-lg transition-all hover:border-emerald-500/40 hover:shadow-[0_8px_30px_rgba(16,185,129,0.15)]">
            <p className="text-sm font-medium text-emerald-400">Eventos activos</p>
            <p className="mt-4 text-4xl font-bold text-white">{activeEvents}</p>
          </article>

          <article className="group rounded-2xl border-2 border-amber-500/20 bg-gradient-to-br from-[#2a2621] to-[#1d1a17] p-6 shadow-lg transition-all hover:border-amber-500/40 hover:shadow-[0_8px_30px_rgba(245,158,11,0.15)]">
            <p className="text-sm font-medium text-amber-400">Planificados</p>
            <p className="mt-4 text-4xl font-bold text-white">{plannedEvents}</p>
          </article>

          <article className="group rounded-2xl border-2 border-sky-500/20 bg-gradient-to-br from-[#2a2621] to-[#1d1a17] p-6 shadow-lg transition-all hover:border-sky-500/40 hover:shadow-[0_8px_30px_rgba(14,165,233,0.15)]">
            <p className="text-sm font-medium text-sky-400">Boletas vendidas</p>
            <p className="mt-4 text-4xl font-bold text-white">{totalTicketsSold}</p>
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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              <select
                className="rounded-xl border-2 border-[#6f5a2e] bg-[#1a1715] px-5 py-3.5 text-sm font-medium text-white outline-none transition focus:border-[#d4af37] focus:shadow-[0_0_15px_rgba(212,175,55,0.2)]"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">Todos los estados</option>
                <option value="Activo">Activo</option>
                <option value="Planificado">Planificado</option>
                <option value="Borrador">Borrador</option>
              </select>
            </div>
          </div>

          {loading ? (
            <EventsTableSkeleton />
          ) : (
            <EventsTable
              events={filteredEvents}
              onView={handleView}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </section>
      </div>

      <DeleteEventDialog
        isOpen={isDeleteDialogOpen}
        eventName={selectedEvent?.name ?? ""}
        onClose={handleCloseDeleteDialog}
        onConfirm={handleConfirmDelete}
      />
    </main>
  );
}