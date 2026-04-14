"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { ApiError, fetchApi } from "../../lib/api";

type DeleteEventDialogProps = {
  isOpen: boolean;
  eventoId: string;
  eventoNombre: string;
  onClose: () => void;
  /**
   * Optional callback fired after the delete request succeeds. Lets the caller
   * decide whether to redirect (e.g. from the detail view back to the list)
   * instead of hardcoding navigation inside the dialog.
   */
  onSuccess?: () => void;
};

export function DeleteEventDialog({
  isOpen,
  eventoId,
  eventoNombre,
  onClose,
  onSuccess,
}: DeleteEventDialogProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  function handleCancel() {
    if (isPending) return;
    setErrorMessage(null);
    onClose();
  }

  function handleConfirm() {
    setErrorMessage(null);

    startTransition(async () => {
      try {
        await fetchApi(`/eventos/${eventoId}`, { method: "DELETE" });
        onClose();
        router.refresh();
        onSuccess?.();
      } catch (error) {
        if (error instanceof ApiError) {
          setErrorMessage(error.message);
          return;
        }
        setErrorMessage(
          error instanceof Error
            ? error.message
            : "Ocurrió un error inesperado al eliminar el evento.",
        );
      }
    });
  }

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
            <span className="font-semibold text-white">{eventoNombre}</span>.
            Verifica que realmente deseas continuar.
          </p>
        </div>

        <div className="rounded-2xl border border-rose-500/20 bg-rose-500/10 p-4 text-sm text-rose-200">
          El evento será marcado como eliminado y no aparecerá en el sistema.
        </div>

        {errorMessage && (
          <div
            role="alert"
            className="mt-4 rounded-2xl border border-rose-500/40 bg-rose-500/15 p-4 text-sm text-rose-100"
          >
            {errorMessage}
          </div>
        )}

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={handleCancel}
            disabled={isPending}
            className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-zinc-200 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Cancelar
          </button>

          <button
            type="button"
            onClick={handleConfirm}
            disabled={isPending}
            className="rounded-xl border border-rose-500/30 bg-rose-600/80 px-5 py-3 text-sm font-semibold text-white transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isPending ? "Eliminando..." : "Sí, eliminar"}
          </button>
        </div>
      </div>
    </div>
  );
}
