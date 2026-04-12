"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { DeleteEventDialog } from "./delete-event-dialog";

type DeleteEventButtonProps = {
  eventoId: number;
  eventoNombre: string;
  /**
   * Visual variant of the trigger button.
   * - `"row"` matches the compact pill style used inside the list table row.
   * - `"detail"` matches the larger rounded button used on the detail view header.
   */
  variant?: "row" | "detail";
  /**
   * Optional path to navigate to after the delete succeeds. When omitted, the
   * dialog simply closes and refreshes the current route (useful on the list
   * page). When provided, the button pushes to the given path (e.g. from the
   * detail view back to `/eventos`).
   */
  redirectTo?: string;
};

const ROW_BUTTON_CLASSES =
  "rounded-full border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-xs font-semibold text-rose-300 transition hover:bg-rose-500/20";

const DETAIL_BUTTON_CLASSES =
  "rounded-xl border border-rose-500/30 bg-rose-500/10 px-5 py-3 text-sm font-semibold text-rose-300 transition hover:bg-rose-500/20";

export function DeleteEventButton({
  eventoId,
  eventoNombre,
  variant = "row",
  redirectTo,
}: DeleteEventButtonProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  function handleOpen() {
    setIsOpen(true);
  }

  function handleClose() {
    setIsOpen(false);
  }

  function handleSuccess() {
    if (redirectTo) {
      router.push(redirectTo);
    }
  }

  const buttonClasses =
    variant === "detail" ? DETAIL_BUTTON_CLASSES : ROW_BUTTON_CLASSES;

  return (
    <>
      <button type="button" onClick={handleOpen} className={buttonClasses}>
        Eliminar
      </button>

      <DeleteEventDialog
        isOpen={isOpen}
        eventoId={String(eventoId)}
        eventoNombre={eventoNombre}
        onClose={handleClose}
        onSuccess={redirectTo ? handleSuccess : undefined}
      />
    </>
  );
}
