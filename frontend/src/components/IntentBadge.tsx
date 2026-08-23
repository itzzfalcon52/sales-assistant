import type { LeadIntent } from "../types/lead";

interface IntentBadgeProps {
  intent: LeadIntent;
}

export default function IntentBadge({
  intent,
}: IntentBadgeProps) {

  const styles = {
    HOT: "status-hot",
    WARM: "status-warm",
    COLD: "status-cold",
    UNKNOWN: "status-unknown",
  };

  const labels = {
    HOT: "Hot",
    WARM: "Warm",
    COLD: "Cold",
    UNKNOWN: "Unknown",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${styles[intent]}`}
    >
      {labels[intent]}
    </span>
  );
}