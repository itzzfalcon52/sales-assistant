export type LeadIntent =
  | "UNKNOWN"
  | "HOT"
  | "WARM"
  | "COLD";

export type LeadAction =
  | "SEND_WHATSAPP"
  | "SCHEDULE_CALLBACK"
  | "FOLLOW_UP"
  | "CONTINUE_DISCOVERY";

export type LeadActionStatus =
  | "PENDING"
  | "COMPLETED"
  | "FAILED";


export interface Conversation {
  id: string;
  callId: string;

  transcript: string | null;

  startedAt: string | null;
  endedAt: string | null;

  createdAt: string;
  updatedAt: string;
}


export interface LeadActionRecord {
  id: string;

  leadId: string;

  action: LeadAction;

  status: LeadActionStatus;

  createdAt: string;
  updatedAt: string;
}


export interface Lead {
  id: string;

  callId: string;

  business: string | null;
  products: string | null;
  budget: string | null;
  timeline: string | null;

  features: string[];

  intent: LeadIntent;

  barrier: string | null;

  createdAt: string;
  updatedAt: string;

  conversation?: Conversation | null;

  actions?: LeadActionRecord[];
}