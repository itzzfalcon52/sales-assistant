//what vapi sends us is empty strings instead of null where info is missing,so we normalize it with null values

import type { Lead } from "../agents/leadSchema.js";


type VapiLeadUpdate = {
    business?: string;
    products?: string;
    budget?: string;
    timeline?: string;
    features?: string[];
    intent?: "UNKNOWN" | "HOT" | "WARM" | "COLD";
    barrier?: string;
  };

export function normalizeLeadUpdate(
  data: VapiLeadUpdate
): Partial<Lead> {
  return {
    business: data.business || null,
    products: data.products || null,
    budget: data.budget || null,
    timeline: data.timeline || null,
    features: data.features ?? [],
    intent: data.intent,
    barrier: data.barrier || null,
  };
}