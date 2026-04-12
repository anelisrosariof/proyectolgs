import Link from "next/link";
import { notFound } from "next/navigation";

import { ApiError, fetchApi } from "../../../lib/api";
import { TipoEvento, type Evento } from "../../../lib/types/evento";
import { formatCurrency } from "../../../lib/utils/format-currency";
import { formatDate } from "../../../lib/utils/format-date";
import { DeleteEventButton } from "../delete-event-button";

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
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${style}`}
    >
      {label}
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
      <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
        {label}
      </p>
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

  let evento: Evento;
  try {
    evento = await fetchApi<Evento>(`/eventos/${id}`);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      notFound();
    }
    throw error;
  }

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
                {evento.nombre}
              </h1>
              <p className="mt-2 text-sm text-zinc-300">
                Código del evento: {formatEventoId(evento.idEvento)}
              </p>

              <div className="mt-4 flex flex-wrap gap-3">
                <EventTypeBadge tipo={evento.tipo} />
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/eventos"
                className="rounded-xl border border-[#6f5a2e] bg-[#2a241d] px-5 py-3 text-sm font-semibold text-[#e6c980] transition hover:bg-[#332b22]"
              >
                Volver
              </Link>
              <Link
                href={`/eventos/${evento.idEvento}/editar`}
                className="rounded-xl bg-[#a57c2d] px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#8d6925]"
              >
                Editar Evento
              </Link>
              <DeleteEventButton
                eventoId={evento.idEvento}
                eventoNombre={evento.nombre}
                variant="detail"
                redirectTo="/eventos"
              />
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <DetailItem label="Fecha" value={formatDate(evento.fechaEvento)} />
          <DetailItem
            label="Horario"
            value={formatHorario(evento.horaInicio, evento.horaFin)}
          />
          <DetailItem
            label="Precio boleta"
            value={formatCurrency(evento.precioBoleta)}
          />
          <DetailItem
            label="Presupuesto"
            value={formatCurrency(evento.presupuesto)}
          />
        </section>

        <section className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="rounded-[28px] border border-white/10 bg-[#1b1918] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.24)]">
            <h2 className="text-xl font-semibold text-white">
              Información general
            </h2>
            {evento.descripcion ? (
              <p className="mt-4 text-sm leading-7 text-zinc-300">
                {evento.descripcion}
              </p>
            ) : (
              <p className="mt-4 text-sm italic text-zinc-500">
                Sin descripción.
              </p>
            )}

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <DetailItem
                label="Ingreso real"
                value={formatCurrency(evento.ingresoReal)}
              />
              <DetailItem
                label="Gasto real"
                value={formatCurrency(evento.gastoReal)}
              />
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-[#1b1918] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.24)]">
            <h2 className="text-xl font-semibold text-white">Metadatos</h2>
            <p className="mt-3 text-sm text-zinc-400">
              Información de registro del evento en el sistema.
            </p>

            <div className="mt-6 space-y-4">
              <DetailItem
                label="Creado el"
                value={formatDate(evento.creadoEn)}
              />
              <DetailItem
                label="Usuario creador"
                value={
                  evento.idUsuarioCreador !== null
                    ? `#${evento.idUsuarioCreador}`
                    : "—"
                }
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
