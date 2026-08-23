import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number | string;
  description?: string;
  icon: LucideIcon;
}

export default function StatCard({
  title,
  value,
  description,
  icon: Icon,
}: StatCardProps) {
  return (
    <div className="card card-hover p-5">

      <div className="flex items-start justify-between">

        <div>

          <p className="text-sm text-slate-400">
            {title}
          </p>

          <p className="mt-2 text-3xl font-semibold tracking-tight text-white">
            {value}
          </p>

          {description && (
            <p className="mt-2 text-xs text-slate-500">
              {description}
            </p>
          )}

        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800 text-slate-300">
          <Icon size={19} />
        </div>

      </div>

    </div>
  );
}