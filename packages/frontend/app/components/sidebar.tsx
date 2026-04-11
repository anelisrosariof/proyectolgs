"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Calendar,
  CalendarCheck,
  CreditCard,
  FileText,
  Home,
  Ticket,
} from "lucide-react";

type NavItem = {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
};

const navItems: NavItem[] = [
  { label: "Inicio", href: "/", icon: Home },
  { label: "Eventos", href: "/eventos", icon: Calendar },
  { label: "Reservas", href: "/reservas", icon: CalendarCheck },
  { label: "Disponibilidad", href: "/disponibilidad", icon: Calendar },
  { label: "Pagos", href: "/pagos", icon: CreditCard },
  { label: "Facturación", href: "/facturacion", icon: FileText },
  { label: "Venta de boletos", href: "/boletos", icon: Ticket },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-[220px] flex-col border-r border-[#1f1f1f] bg-[#111111] text-[#ededed]">
      <div className="flex flex-col items-center gap-2 px-6 py-8">
        <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#c5a55a] text-2xl font-bold text-[#c5a55a]">
          L
        </div>
        <p className="text-center text-sm font-semibold uppercase tracking-[0.2em] text-[#c5a55a]">
          Luxury
        </p>
        <p className="text-center text-[10px] uppercase tracking-[0.3em] text-[#c5a55a]/70">
          Grand Stage
        </p>
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-3 py-2">
        {navItems.map((item) => {
          const active = isActive(pathname, item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                active
                  ? "bg-[#1f1d1a] text-[#c5a55a]"
                  : "text-zinc-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/5 px-6 py-4 text-center text-[10px] uppercase tracking-[0.2em] text-zinc-500">
        © 2026 Luxury Grand Stage
      </div>
    </aside>
  );
}
