"use client";

import {
  createEventoSchema,
  updateEventoSchema,
} from "@luxury-grand-stage/core";
import { useRouter } from "next/navigation";
import { useState, useTransition, type FormEvent } from "react";

import { ApiError, fetchApi } from "../../lib/api";
import { TipoEvento, tipoEventoOptions } from "../../lib/types/evento";

type EventFormProps = {
  mode?: "create" | "edit";
  submitLabel?: string;
  eventoId?: string;
  initialValues?: {
    nombre?: string;
    descripcion?: string | null;
    tipo?: TipoEvento | "";
    fechaEvento?: string;
    horaInicio?: string;
    horaFin?: string;
    presupuesto?: number;
    precioBoleta?: number;
  };
};

/**
 * Shape of the payload posted to the backend. Matches `CreateEventoDto` on the
 * NestJS side — numbers are real numbers, `descripcion` is optional, and
 * `fechaEvento`/`horaInicio`/`horaFin` are ISO-ish strings.
 */
type EventoPayload = {
  nombre: string;
  descripcion?: string;
  tipo: TipoEvento | "";
  fechaEvento: string;
  horaInicio: string;
  horaFin: string;
  presupuesto: number;
  precioBoleta: number;
};

/**
 * Map of per-field validation errors keyed by the DTO field name. Only fields
 * that currently have an error are present.
 */
type FieldErrors = Partial<Record<keyof EventoPayload, string>>;

function parseFormData(formData: FormData): EventoPayload {
  const rawDescripcion = (formData.get("descripcion") ?? "").toString().trim();

  return {
    nombre: (formData.get("nombre") ?? "").toString(),
    descripcion: rawDescripcion === "" ? undefined : rawDescripcion,
    tipo: (formData.get("tipo") ?? "").toString() as TipoEvento | "",
    fechaEvento: (formData.get("fechaEvento") ?? "").toString(),
    horaInicio: (formData.get("horaInicio") ?? "").toString(),
    horaFin: (formData.get("horaFin") ?? "").toString(),
    presupuesto: Number(formData.get("presupuesto") ?? 0),
    precioBoleta: Number(formData.get("precioBoleta") ?? 0),
  };
}

const baseInputClass =
  "w-full rounded-xl border bg-[#25211d] px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-500";

const validInputClass = "border-[#4a3e2a] focus:border-[#a57c2d]";

const invalidInputClass = "border-red-500/70 focus:border-red-400";

function inputClassName(hasError: boolean): string {
  return `${baseInputClass} ${hasError ? invalidInputClass : validInputClass}`;
}

const labelClass = "mb-2 block text-sm font-medium text-zinc-300";

/**
 * Format a number for use as an `<input type="number">` defaultValue.
 * Returns an empty string for `undefined` so the placeholder can show.
 */
function numberDefault(value: number | undefined): string {
  return value === undefined || Number.isNaN(value) ? "" : String(value);
}

/**
 * Normalize a backend time string (e.g. `"20:00:00"`) into the `"HH:mm"` form
 * that `<input type="time">` expects.
 */
function timeDefault(value: string | undefined): string {
  if (!value) return "";
  return value.slice(0, 5);
}

/**
 * Small inline error helper — renders a short red message under an input
 * when that field has a validation error.
 */
function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1 text-xs text-red-400">{message}</p>;
}

export function EventForm({
  mode = "create",
  submitLabel,
  eventoId,
  initialValues = {},
}: EventFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const title = mode === "edit" ? "Editar Evento" : "Nuevo Evento";
  const defaultLabel = mode === "edit" ? "Guardar Cambios" : "Crear Evento";
  const buttonText = isPending
    ? "Guardando..."
    : (submitLabel ?? defaultLabel);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);

    const payload = parseFormData(new FormData(event.currentTarget));

    // Client-side validation with the Zod schemas from @luxury-grand-stage/core.
    // In `edit` mode we run the partial schema so empty optional fields are OK.
    const schema = mode === "edit" ? updateEventoSchema : createEventoSchema;
    const result = schema.safeParse(payload);

    if (!result.success) {
      const nextErrors: FieldErrors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0];
        if (typeof key === "string" && !(key in nextErrors)) {
          nextErrors[key as keyof EventoPayload] = issue.message;
        }
      }
      setFieldErrors(nextErrors);
      return;
    }

    // Clear stale field errors once the payload parses cleanly.
    setFieldErrors({});

    startTransition(async () => {
      try {
        if (mode === "edit") {
          if (!eventoId) {
            throw new Error(
              "EventForm en modo 'edit' requiere la prop eventoId.",
            );
          }
          await fetchApi(`/eventos/${eventoId}`, {
            method: "PATCH",
            body: result.data,
          });
          router.refresh();
          router.push(`/eventos/${eventoId}`);
        } else {
          await fetchApi("/eventos", {
            method: "POST",
            body: result.data,
          });
          router.refresh();
          router.push("/eventos");
        }
      } catch (error) {
        if (error instanceof ApiError) {
          setErrorMessage(error.message);
          return;
        }
        setErrorMessage(
          error instanceof Error
            ? error.message
            : "Ocurrió un error inesperado al guardar el evento.",
        );
      }
    });
  }

  function handleCancel() {
    router.back();
  }

  return (
    <section className="rounded-[28px] border border-white/10 bg-[#1b1918] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.24)]">
      <div className="mb-6">
        <p className="text-sm font-medium uppercase tracking-[0.25em] text-[#b88a2f]">
          Luxury Grand Stage
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-white">
          {title}
        </h1>
        <p className="mt-2 text-sm text-zinc-400">
          Completa la información principal del evento dentro del sistema.
        </p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit} noValidate>
        {errorMessage ? (
          <div
            role="alert"
            className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200"
          >
            {errorMessage}
          </div>
        ) : null}

        <div className="grid gap-5 md:grid-cols-2">
          {/* Nombre — required, full width */}
          <div className="md:col-span-2">
            <label className={labelClass} htmlFor="nombre">
              Nombre del evento <span className="text-[#c5a55a]">*</span>
            </label>
            <input
              id="nombre"
              name="nombre"
              type="text"
              required
              defaultValue={initialValues.nombre ?? ""}
              placeholder="Ej. Noche de Salsa"
              aria-invalid={fieldErrors.nombre ? true : undefined}
              className={inputClassName(Boolean(fieldErrors.nombre))}
            />
            <FieldError message={fieldErrors.nombre} />
          </div>

          {/* Tipo — required select */}
          <div>
            <label className={labelClass} htmlFor="tipo">
              Tipo de evento <span className="text-[#c5a55a]">*</span>
            </label>
            <select
              id="tipo"
              name="tipo"
              required
              defaultValue={initialValues.tipo ?? ""}
              aria-invalid={fieldErrors.tipo ? true : undefined}
              className={inputClassName(Boolean(fieldErrors.tipo))}
            >
              <option value="" disabled>
                Seleccione un tipo
              </option>
              {tipoEventoOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <FieldError message={fieldErrors.tipo} />
          </div>

          {/* Fecha del evento */}
          <div>
            <label className={labelClass} htmlFor="fechaEvento">
              Fecha del evento <span className="text-[#c5a55a]">*</span>
            </label>
            <input
              id="fechaEvento"
              name="fechaEvento"
              type="date"
              required
              defaultValue={initialValues.fechaEvento ?? ""}
              aria-invalid={fieldErrors.fechaEvento ? true : undefined}
              className={inputClassName(Boolean(fieldErrors.fechaEvento))}
            />
            <FieldError message={fieldErrors.fechaEvento} />
          </div>

          {/* Hora inicio */}
          <div>
            <label className={labelClass} htmlFor="horaInicio">
              Hora de inicio <span className="text-[#c5a55a]">*</span>
            </label>
            <input
              id="horaInicio"
              name="horaInicio"
              type="time"
              required
              defaultValue={timeDefault(initialValues.horaInicio)}
              aria-invalid={fieldErrors.horaInicio ? true : undefined}
              className={inputClassName(Boolean(fieldErrors.horaInicio))}
            />
            <FieldError message={fieldErrors.horaInicio} />
          </div>

          {/* Hora fin */}
          <div>
            <label className={labelClass} htmlFor="horaFin">
              Hora de fin <span className="text-[#c5a55a]">*</span>
            </label>
            <input
              id="horaFin"
              name="horaFin"
              type="time"
              required
              defaultValue={timeDefault(initialValues.horaFin)}
              aria-invalid={fieldErrors.horaFin ? true : undefined}
              className={inputClassName(Boolean(fieldErrors.horaFin))}
            />
            <FieldError message={fieldErrors.horaFin} />
          </div>

          {/* Precio boleta — required */}
          <div>
            <label className={labelClass} htmlFor="precioBoleta">
              Precio de boleta <span className="text-[#c5a55a]">*</span>
            </label>
            <input
              id="precioBoleta"
              name="precioBoleta"
              type="number"
              required
              min="0"
              step="0.01"
              defaultValue={numberDefault(initialValues.precioBoleta)}
              placeholder="Ej. 1500"
              aria-invalid={fieldErrors.precioBoleta ? true : undefined}
              className={inputClassName(Boolean(fieldErrors.precioBoleta))}
            />
            <FieldError message={fieldErrors.precioBoleta} />
          </div>

          {/* Presupuesto — required */}
          <div>
            <label className={labelClass} htmlFor="presupuesto">
              Presupuesto <span className="text-[#c5a55a]">*</span>
            </label>
            <input
              id="presupuesto"
              name="presupuesto"
              type="number"
              required
              min="0"
              step="0.01"
              defaultValue={numberDefault(initialValues.presupuesto)}
              placeholder="Ej. 50000"
              aria-invalid={fieldErrors.presupuesto ? true : undefined}
              className={inputClassName(Boolean(fieldErrors.presupuesto))}
            />
            <FieldError message={fieldErrors.presupuesto} />
          </div>

          {/* Descripción — optional, full width */}
          <div className="md:col-span-2">
            <label className={labelClass} htmlFor="descripcion">
              Descripción
            </label>
            <textarea
              id="descripcion"
              name="descripcion"
              rows={5}
              defaultValue={initialValues.descripcion ?? ""}
              placeholder="Describe brevemente el evento..."
              aria-invalid={fieldErrors.descripcion ? true : undefined}
              className={inputClassName(Boolean(fieldErrors.descripcion))}
            />
            <FieldError message={fieldErrors.descripcion} />
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 pt-5 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={handleCancel}
            disabled={isPending}
            className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-zinc-200 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isPending}
            className="rounded-xl bg-[#a57c2d] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#8d6925] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {buttonText}
          </button>
        </div>
      </form>
    </section>
  );
}
