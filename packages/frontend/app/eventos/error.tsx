"use client";

export default function EventosError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="min-h-screen bg-[#161515] px-6 py-8 text-white md:px-10">
      <div className="mx-auto max-w-3xl">
        <section
          role="alert"
          className="rounded-[28px] border border-red-500/30 bg-[#1b1918] p-8 shadow-[0_10px_30px_rgba(0,0,0,0.24)]"
        >
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-[#b88a2f]">
            Luxury Grand Stage
          </p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-white">
            No se pudieron cargar los eventos
          </h1>
          <p className="mt-3 text-sm text-zinc-300">{error.message}</p>
          <p className="mt-4 text-xs text-zinc-500">
            Verifica que el backend esté corriendo en{" "}
            <code className="rounded bg-black/40 px-1 py-0.5 text-[#c5a55a]">
              http://localhost:3001
            </code>{" "}
            y que Postgres esté levantado con{" "}
            <code className="rounded bg-black/40 px-1 py-0.5 text-[#c5a55a]">
              docker compose up -d
            </code>
            .
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-6 rounded-xl bg-[#a57c2d] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#8d6925]"
          >
            Reintentar
          </button>
        </section>
      </div>
    </main>
  );
}
