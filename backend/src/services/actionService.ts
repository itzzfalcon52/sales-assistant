import { prisma } from "../lib/prisma.js";
import type { Lead } from "../agents/leadSchema.js";
import type { LeadAction } from "../agents/decisionEngine.js";

export async function executeAction(
  action: LeadAction,
  lead: Lead,
  leadId: string
) {

  console.log(`Executing action: ${action}`);

  const leadAction = await prisma.leadAction.create({
    data: {
      leadId,
      action,
      status: "PENDING",
    },
  });

  switch (action) {

    case "SEND_WHATSAPP":

      console.log("📱 Sending WhatsApp message...");

      // Real WhatsApp integration will come later.

      await prisma.leadAction.update({
        where: {
          id: leadAction.id,
        },
        data: {
          status: "COMPLETED",
        },
      });

      break;

    case "SCHEDULE_CALLBACK":

      console.log("📞 Scheduling callback...");

      // Calendar integration will come later.

      await prisma.leadAction.update({
        where: {
          id: leadAction.id,
        },
        data: {
          status: "COMPLETED",
        },
      });

      break;

    case "FOLLOW_UP":

      console.log("🔔 Creating follow-up...");

      await prisma.leadAction.update({
        where: {
          id: leadAction.id,
        },
        data: {
          status: "COMPLETED",
        },
      });

      break;

    case "CONTINUE_DISCOVERY":

      console.log("🔎 Continue discovery...");

      await prisma.leadAction.update({
        where: {
          id: leadAction.id,
        },
        data: {
          status: "COMPLETED",
        },
      });

      break;
  }

  return leadAction;
}