import Link from "next/link";
import {
  Calendar,
  CalendarCheck,
  CreditCard,
  FileText,
  Plus,
  Ticket,
} from "lucide-react";

type QuickAction = {
  label: string;
  description: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
};

const quickActions: QuickAction[] = [
  {
    label: "Eventos",
    description: "Gestiona eventos especiales",
    href: "/eventos",
    icon: Calendar,
  },
  {
    label: "Buscar Disponibilidad",
    description: "Consulta fechas disponibles",
    href: "/disponibilidad",
    icon: CalendarCheck,
  },
  {
    label: "Pagos Pendientes",
    description: "Gestiona pagos",
    href: "/pagos",
    icon: CreditCard,
  },
  {
    label: "Facturas",
    description: "Generar facturas",
    href: "/facturacion",
    icon: FileText,
  },
  {
    label: "Venta de Boletos",
    description: "Eventos disponibles",
    href: "/boletos",
    icon: Ticket,
  },
];

export default function HomePage() {
  return (
    <main className="min-h-full bg-[#161515] px-6 py-8 text-white md:px-10">
      <div className="mx-auto max-w-7xl space-y-8">
        <section className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.25em] text-[#c5a55a]">
              Luxury Grand Stage
            </p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-white">
              ¡Bienvenido/a!
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-zinc-400">
              Panel principal del sistema. Selecciona una acción rápida para
              comenzar.
            </p>
          </div>

          <Link
            href="/eventos/nuevo"
            className="inline-flex items-center gap-2 rounded-xl bg-[#a57c2d] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#8d6925]"
          >
            <Plus className="h-4 w-4" />
            Nuevo Evento
          </Link>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.href}
                href={action.href}
                className="group rounded-2xl border border-[#3a3325] bg-[linear-gradient(135deg,#1d1a17_0%,#2a2621_100%)] p-5 shadow-sm transition hover:border-[#c5a55a]/60 hover:shadow-[0_8px_24px_rgba(197,165,90,0.15)]"
              >
                <Icon className="h-7 w-7 text-[#c5a55a]" />
                <p className="mt-4 text-base font-semibold text-white">
                  {action.label}
                </p>
                <p className="mt-1 text-xs text-zinc-400">
                  {action.description}
                </p>
              </Link>
            );
          })}
        </section>
      </div>
    </main>
  );
}
