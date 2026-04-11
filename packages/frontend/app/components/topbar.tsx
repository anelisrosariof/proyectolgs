import { Search, UserCircle2 } from "lucide-react";

export function Topbar() {
  return (
    <header className="flex h-16 items-center justify-between gap-4 border-b border-[#1f1f1f] bg-[#161515] px-6">
      <div className="relative flex-1 max-w-xl">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
        <input
          type="search"
          placeholder="Buscar reservas, clientes..."
          className="w-full rounded-xl border border-[#2a2a2a] bg-[#1c1b1a] py-2.5 pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-[#c5a55a]"
        />
      </div>

      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-sm font-semibold text-white">Administrador</p>
          <p className="text-xs text-zinc-400">admin@luxury.com</p>
        </div>
        <UserCircle2 className="h-9 w-9 text-[#c5a55a]" />
      </div>
    </header>
  );
}
