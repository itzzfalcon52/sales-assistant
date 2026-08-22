import type { Lead } from "../agents/leadSchema.js";
import { mergeLead } from "./mergeLead.js";
import { prisma } from "../lib/prisma.js";

export async function updateLead(
  callId: string, //this is the unique identifier for the call, we will use it to find the lead in the database
  update: Partial<Lead>
): Promise<Lead> {

  // 1. Get the existing lead for this Vapi call
  const existingLead = await prisma.lead.findUnique({ //we first check if there is an existing lead for this callId in the database, if there is we will merge the new information with the existing information, if not we will create a new lead with the new information
    where: {
      callId,
    },
  });

  // 2. Convert database record into our internal Lead type
  const currentLead: Lead = existingLead //we make the currentLead object based on the existingLead if it exists, otherwise we create a new lead with null values for all fields except features which is an empty array and intent which is UNKNOWN
    ? {
        business: existingLead.business,
        products: existingLead.products,
        budget: existingLead.budget,
        timeline: existingLead.timeline,
        features: existingLead.features,
        intent: existingLead.intent as Lead["intent"],
        barrier: existingLead.barrier,
      }
    : {
        business: null,
        products: null,
        budget: null,
        timeline: null,
        features: [],
        intent: "UNKNOWN",
        barrier: null,
      };

  // 3. Merge the new information with existing information
  const updatedLead = mergeLead(
    currentLead,
    update
  );

  // 4. Save the result to PostgreSQL
  await prisma.lead.upsert({ //upsert is a combination of update and insert, it will update the existing lead if it exists, otherwise it will create a new lead with the new information
    where: {
      callId,
    },

    create: {
      callId,
      business: updatedLead.business,
      products: updatedLead.products,
      budget: updatedLead.budget,
      timeline: updatedLead.timeline,
      features: updatedLead.features,
      intent: updatedLead.intent,
      barrier: updatedLead.barrier,
    },

    update: {
      business: updatedLead.business,
      products: updatedLead.products,
      budget: updatedLead.budget,
      timeline: updatedLead.timeline,
      features: updatedLead.features,
      intent: updatedLead.intent,
      barrier: updatedLead.barrier,
    },
  });

  return updatedLead;
}

export async function getLead(
    callId: string
  ): Promise<Lead | undefined> {
  
    const lead = await prisma.lead.findUnique({
      where: {
        callId,
      },
    });
  
    if (!lead) {
      return undefined;
    }
  
    return {
      business: lead.business,
      products: lead.products,
      budget: lead.budget,
      timeline: lead.timeline,
      features: lead.features,
      intent: lead.intent as Lead["intent"],
      barrier: lead.barrier,
    };
  }

export async function getLeadRecord(callId: string) {
    return prisma.lead.findUnique({
      where: {
        callId,
      },
    });
  }