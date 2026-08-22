import { z } from "zod";

export const LeadSchema = z.object({
  business: z.string().nullable(),
  products: z.string().nullable(),
  budget: z.string().nullable(),
  timeline: z.string().nullable(),
  features: z.array(z.string()),
  intent: z.enum(["UNKNOWN","HOT", "WARM", "COLD"]),
  barrier: z.string().nullable(),
});

export type Lead = z.infer<typeof LeadSchema>;