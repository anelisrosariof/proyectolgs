import { notFound } from "next/navigation";

import { ApiError, fetchApi } from "../../../../lib/api";
import type { Evento } from "../../../../lib/types/evento";
import { EventForm } from "../../event-form";

/**
 * Edit-event route — async Server Component that pre-loads the existing
 * `Evento` from the backend and hands it to the client `EventForm` as
 * `initialValues`. A 404 from the API is translated into Next.js's
 * `notFound()` so the app's global not-found UI takes over.
 */
export default async function EditEventPage({
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
      <div className="mx-auto max-w-5xl">
        <EventForm
          mode="edit"
          eventoId={String(evento.idEvento)}
          initialValues={{
            nombre: evento.nombre,
            descripcion: evento.descripcion,
            tipo: evento.tipo,
            fechaEvento: evento.fechaEvento.slice(0, 10),
            horaInicio: evento.horaInicio,
            horaFin: evento.horaFin,
            presupuesto: evento.presupuesto,
            precioBoleta: evento.precioBoleta,
          }}
        />
      </div>
    </main>
  );
}
