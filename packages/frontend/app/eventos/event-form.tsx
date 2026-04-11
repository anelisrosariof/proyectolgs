"use client";

type EventFormProps = {
  mode?: "create" | "edit";
  submitLabel?: string;
  initialValues?: {
    name?: string;
    type?: string;
    date?: string;
    startTime?: string;
    endTime?: string;
    location?: string;
    status?: string;
    capacity?: number;
    price?: number;
    description?: string;
  };
};

const eventTypes = [
  "Concierto",
  "Festival",
  "Fiesta temática",
  "Evento corporativo",
];

const eventStatuses = ["Activo", "Planificado", "Borrador"];

export function EventForm({
  mode = "create",
  submitLabel,
  initialValues = {},
}: EventFormProps) {
  const title = mode === "edit" ? "Editar Evento" : "Nuevo Evento";
  const buttonText =
    submitLabel ?? (mode === "edit" ? "Guardar Cambios" : "Crear Evento");

  return (
    <section className="rounded-[28px] border border-white/10 bg-[#1b1918] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.24)]">
      <div className="mb-6">
        <p className="text-sm font-medium uppercase tracking-[0.25em] text-[#b88a2f]">
          Luxury Grand Stage
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-white">{title}</h1>
        <p className="mt-2 text-sm text-zinc-400">
          Completa la información principal del evento dentro del sistema.
        </p>
      </div>

      <form className="space-y-6">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Nombre del evento
            </label>
            <input
              defaultValue={initialValues.name ?? ""}
              placeholder="Ej. Noche de Salsa"
              className="w-full rounded-xl border border-[#4a3e2a] bg-[#25211d] px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-[#a57c2d]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Tipo de evento
            </label>
            <select
              defaultValue={initialValues.type ?? ""}
              className="w-full rounded-xl border border-[#4a3e2a] bg-[#25211d] px-4 py-3 text-sm text-white outline-none transition focus:border-[#a57c2d]"
            >
              <option value="">Seleccione un tipo</option>
              {eventTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Estado
            </label>
            <select
              defaultValue={initialValues.status ?? ""}
              className="w-full rounded-xl border border-[#4a3e2a] bg-[#25211d] px-4 py-3 text-sm text-white outline-none transition focus:border-[#a57c2d]"
            >
              <option value="">Seleccione un estado</option>
              {eventStatuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Fecha
            </label>
            <input
              type="date"
              defaultValue={initialValues.date ?? ""}
              className="w-full rounded-xl border border-[#4a3e2a] bg-[#25211d] px-4 py-3 text-sm text-white outline-none transition focus:border-[#a57c2d]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Hora de inicio
            </label>
            <input
              type="time"
              defaultValue={initialValues.startTime ?? ""}
              className="w-full rounded-xl border border-[#4a3e2a] bg-[#25211d] px-4 py-3 text-sm text-white outline-none transition focus:border-[#a57c2d]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Hora de fin
            </label>
            <input
              type="time"
              defaultValue={initialValues.endTime ?? ""}
              className="w-full rounded-xl border border-[#4a3e2a] bg-[#25211d] px-4 py-3 text-sm text-white outline-none transition focus:border-[#a57c2d]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Ubicación
            </label>
            <input
              defaultValue={initialValues.location ?? ""}
              placeholder="Ej. Salón Principal"
              className="w-full rounded-xl border border-[#4a3e2a] bg-[#25211d] px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-[#a57c2d]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Capacidad
            </label>
            <input
              type="number"
              defaultValue={initialValues.capacity ?? ""}
              placeholder="Ej. 250"
              className="w-full rounded-xl border border-[#4a3e2a] bg-[#25211d] px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-[#a57c2d]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Precio por entrada
            </label>
            <input
              type="number"
              defaultValue={initialValues.price ?? ""}
              placeholder="Ej. 1500"
              className="w-full rounded-xl border border-[#4a3e2a] bg-[#25211d] px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-[#a57c2d]"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Descripción
            </label>
            <textarea
              rows={5}
              defaultValue={initialValues.description ?? ""}
              placeholder="Describe brevemente el evento..."
              className="w-full rounded-xl border border-[#4a3e2a] bg-[#25211d] px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-[#a57c2d]"
            />
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 pt-5 sm:flex-row sm:justify-end">
          <button
            type="button"
            className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-zinc-200 transition hover:bg-white/10"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="rounded-xl bg-[#a57c2d] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#8d6925]"
          >
            {buttonText}
          </button>
        </div>
      </form>
    </section>
  );
}