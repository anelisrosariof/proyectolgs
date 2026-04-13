import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";

export function LayoutShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-full bg-[#161515] text-[#ededed]">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar />
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
