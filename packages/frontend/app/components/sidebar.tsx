"use client";

import Image from "next/image";
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
import logo from "../lgs_logo512.png";

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
    <aside className="flex h-screen w-55 flex-col border-r border-[#1f1f1f] bg-[#111111] text-[#ededed]">
      <div className="flex flex-col items-center gap-2 px-6 py-6">
        <Image
          src={logo}
          alt="Luxury Grand Stage"
          width={72}
          height={72}
          className="h-auto w-auto object-contain drop-shadow-[0_0_10px_rgba(197,165,90,0.3)]"
          priority
        />
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
