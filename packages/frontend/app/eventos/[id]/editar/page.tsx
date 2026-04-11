import { EventForm } from "../../event-form";

/**
 * Edit event page — placeholder while Fase 7.6 is pending.
 *
 * The previous implementation used mock event data with fields (`name`,
 * `type`, `location`, `status`, `capacity`, `price`) that no longer match
 * the real backend DTO after the Fase 7.1 form rewrite. Fetching the real
 * evento via `GET /api/eventos/:id` and passing it as `initialValues` is
 * the scope of Fase 7.6; for now this page renders the empty form so the
 * route keeps compiling.
 */
export default async function EditEventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // `id` is intentionally awaited but not yet used — pre-loading the real
  // evento lands in Fase 7.6.
  await params;

  return (
    <main className="min-h-screen bg-[#161515] px-6 py-8 text-white md:px-10">
      <div className="mx-auto max-w-5xl">
        <EventForm mode="edit" submitLabel="Guardar Cambios" />
      </div>
    </main>
  );
}
