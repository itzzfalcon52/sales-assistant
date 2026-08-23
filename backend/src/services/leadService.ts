import type { Lead } from "../agents/leadSchema.js";
import { mergeLead } from "./mergeLead.js";
import { prisma } from "../lib/prisma.js";

export async function updateLead(
  callId: string,
  update: Partial<Lead>,
  phoneNumber?: string
): Promise<Lead> {

  // -----------------------------------------
  // 1. Get existing lead
  // -----------------------------------------

  const existingLead =
    await prisma.lead.findUnique({
      where: {
        callId,
      },
    });


  // -----------------------------------------
  // 2. Convert DB → internal Lead
  // -----------------------------------------

  const currentLead: Lead =
    existingLead
      ? {
          phoneNumber:
            existingLead.phoneNumber,

          business:
            existingLead.business,

          products:
            existingLead.products,

          budget:
            existingLead.budget,

          timeline:
            existingLead.timeline,

          features:
            existingLead.features,

          intent:
            existingLead.intent as Lead["intent"],

          barrier:
            existingLead.barrier,
        }
      : {
          phoneNumber:
            phoneNumber ?? null,

          business: null,

          products: null,

          budget: null,

          timeline: null,

          features: [],

          intent: "UNKNOWN",

          barrier: null,
        };


  // -----------------------------------------
  // 3. Merge lead information
  // -----------------------------------------

  const updatedLead =
    mergeLead(
      currentLead,
      {
        ...update,

        // Phone number comes from Vapi,
        // NOT from LLM extraction.
        phoneNumber:
          phoneNumber ??
          currentLead.phoneNumber,
      }
    );


  // -----------------------------------------
  // 4. Save to PostgreSQL
  // -----------------------------------------

  await prisma.lead.upsert({

    where: {
      callId,
    },

    create: {

      callId,

      phoneNumber:
        updatedLead.phoneNumber,

      business:
        updatedLead.business,

      products:
        updatedLead.products,

      budget:
        updatedLead.budget,

      timeline:
        updatedLead.timeline,

      features:
        updatedLead.features,

      intent:
        updatedLead.intent,

      barrier:
        updatedLead.barrier,
    },

    update: {

      phoneNumber:
        updatedLead.phoneNumber,

      business:
        updatedLead.business,

      products:
        updatedLead.products,

      budget:
        updatedLead.budget,

      timeline:
        updatedLead.timeline,

      features:
        updatedLead.features,

      intent:
        updatedLead.intent,

      barrier:
        updatedLead.barrier,
    },
  });


  return updatedLead;
}


// ==========================================
// GET LEAD
// ==========================================

export async function getLead(
  callId: string
): Promise<Lead | undefined> {

  const lead =
    await prisma.lead.findUnique({
      where: {
        callId,
      },
    });

  if (!lead) {
    return undefined;
  }

  return {

    phoneNumber:
      lead.phoneNumber,

    business:
      lead.business,

    products:
      lead.products,

    budget:
      lead.budget,

    timeline:
      lead.timeline,

    features:
      lead.features,

    intent:
      lead.intent as Lead["intent"],

    barrier:
      lead.barrier,
  };
}


// ==========================================
// GET DATABASE RECORD
// ==========================================

export async function getLeadRecord(
  callId: string
) {

  return prisma.lead.findUnique({
    where: {
      callId,
    },
  });
}