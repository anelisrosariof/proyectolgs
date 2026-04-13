import { EventForm } from "../event-form";

/**
 * Create-event route — a plain Server Component that renders the shared
 * client `EventForm` in `create` mode. No data pre-loading is needed here
 * since the form starts empty.
 */
export default function NewEventPage() {
  return (
    <main className="min-h-screen bg-[#161515] px-6 py-8 text-white md:px-10">
      <div className="mx-auto max-w-5xl">
        <EventForm mode="create" />
      </div>
    </main>
  );
}
