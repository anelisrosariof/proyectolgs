import { EventForm } from "../../event-form";

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
    price: 2000,
    description:
      "Presentación acústica con cupos limitados, zona general y experiencia íntima para el público.",
  },
];

export default async function EditEventPage({
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
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#161515] px-6 py-8 text-white md:px-10">
      <div className="mx-auto max-w-5xl">
        <EventForm
          mode="edit"
          submitLabel="Guardar Cambios"
          initialValues={event}
        />
      </div>
    </main>
  );
}