import { prisma } from "../lib/prisma.js";

export async function saveConversation(
  callId: string,
  transcript: string
) {
  const lead = await prisma.lead.findUnique({
    where: {
      callId,
    },
  });

  if (!lead) {
    throw new Error(
      `Lead not found for callId: ${callId}`
    );
  }

  return prisma.conversation.upsert({
    where: {
      callId,
    },

    update: {
      transcript,
    },

    create: {
      callId,
      transcript,

      lead: {
        connect: {
          id: lead.id,
        },
      },
    },
  });
}