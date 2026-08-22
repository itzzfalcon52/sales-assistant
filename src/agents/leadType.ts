//this is basically a file to define the lead type and we can add more types in the future if we want to expand the lead definition

export type LeadIntent = "HOT" | "WARM" | "COLD";

export interface Lead {
  business: string | null;
  products: string | null;
  budget: string | null;
  timeline: string | null;
  features: string[];
  intent: LeadIntent;
  barrier: string | null;
}