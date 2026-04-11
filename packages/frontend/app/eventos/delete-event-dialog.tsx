"use client";

type DeleteEventDialogProps = {
  isOpen?: boolean;
  eventName?: string;
  onClose?: () => void;
  onConfirm?: () => void;
};

export function DeleteEventDialog({
  isOpen = true,
  eventName = "Noche de Salsa",
  onClose,
  onConfirm,
}: DeleteEventDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
      <div className="w-full max-w-md rounded-[28px] border border-white/10 bg-[#1b1918] p-6 shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
        <div className="mb-4">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-[#b88a2f]">
            Luxury Grand Stage
          </p>
          <h2 className="mt-2 text-2xl font-bold text-white">
            Eliminar evento
          </h2>
          <p className="mt-3 text-sm leading-6 text-zinc-400">
            Esta acción eliminará el evento{" "}
            <span className="font-semibold text-white">{eventName}</span>.
            Verifica que realmente deseas continuar.
          </p>
        </div>

        <div className="rounded-2xl border border-rose-500/20 bg-rose-500/10 p-4 text-sm text-rose-200">
          Esta acción no se puede deshacer.
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-zinc-200 transition hover:bg-white/10"
          >
            Cancelar
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="rounded-xl border border-rose-500/30 bg-rose-600/80 px-5 py-3 text-sm font-semibold text-white transition hover:bg-rose-700"
          >
            Sí, eliminar
          </button>
        </div>
      </div>
    </div>
  );
}