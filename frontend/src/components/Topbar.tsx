import { Bell } from "lucide-react";

export default function Topbar() {
  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-800 bg-slate-950/90 px-8 backdrop-blur">

      <div>
        <p className="text-sm text-slate-500">
          Sales workspace
        </p>

        <h2 className="font-medium text-slate-100">
          AI Lead Management
        </h2>
      </div>

      <div className="flex items-center gap-4">

        <button
          className="relative rounded-lg p-2 text-slate-400 transition hover:bg-slate-900 hover:text-white"
          aria-label="Notifications"
        >
          <Bell size={19} />

          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-red-400" />
        </button>

        <div className="h-8 w-px bg-slate-800" />

        <div className="flex items-center gap-3">

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-sm font-medium">
            H
          </div>

          <div className="hidden sm:block">

            <p className="text-sm font-medium">
              Sales Admin
            </p>

            <p className="text-xs text-slate-500">
              Administrator
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}