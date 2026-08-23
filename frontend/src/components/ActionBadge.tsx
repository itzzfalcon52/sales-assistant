import type {
    LeadAction,
    LeadActionStatus,
  } from  "../types/lead"
  
  interface ActionBadgeProps {
    action: LeadAction;
    status?: LeadActionStatus;
  }
  
  const actionLabels: Record<LeadAction, string> = {
    SEND_WHATSAPP: "Send WhatsApp",
    SCHEDULE_CALLBACK: "Schedule Callback",
    FOLLOW_UP: "Follow Up",
    CONTINUE_DISCOVERY: "Continue Discovery",
  };
  
  export default function ActionBadge({
    action,
    status,
  }: ActionBadgeProps) {
  
    const statusStyles = {
      PENDING: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
      COMPLETED: "text-green-400 bg-green-400/10 border-green-400/20",
      FAILED: "text-red-400 bg-red-400/10 border-red-400/20",
    };
  
    return (
      <div className="flex items-center gap-2">
  
        <span className="text-sm text-slate-300">
          {actionLabels[action]}
        </span>
  
        {status && (
          <span
            className={`rounded-full border px-2 py-0.5 text-xs ${statusStyles[status]}`}
          >
            {status}
          </span>
        )}
  
      </div>
    );
  }