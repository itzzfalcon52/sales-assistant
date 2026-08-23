import { Router } from "express";

import { prisma } from "../lib/prisma.js";

const router = Router();


// GET ALL LEADS
router.get("/", async (req, res) => {

  try {

    const leads = await prisma.lead.findMany({
      orderBy: {
        createdAt: "desc",
      },

      include: {
        conversation: true,
        actions: true,
      },
    });

    return res.json(leads);

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      error: "Failed to fetch leads",
    });
  }
});


// GET SINGLE LEAD
router.get("/:id", async (req, res) => {

  try {

    const lead = await prisma.lead.findUnique({

      where: {
        id: req.params.id,
      },

      include: {
        conversation: true,
        actions: true,
      },

    });

    if (!lead) {

      return res.status(404).json({
        error: "Lead not found",
      });

    }

    return res.json(lead);

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      error: "Failed to fetch lead",
    });
  }
});


// GET CONVERSATION
router.get("/:id/conversation", async (req, res) => {

  try {

    const conversation =
      await prisma.conversation.findUnique({

        where: {
          leadId: req.params.id,
        },

      });

    if (!conversation) {

      return res.status(404).json({
        error: "Conversation not found",
      });

    }

    return res.json(conversation);

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      error: "Failed to fetch conversation",
    });
  }
});


// GET ACTIONS
router.get("/:id/actions", async (req, res) => {

  try {

    const actions =
      await prisma.leadAction.findMany({

        where: {
          leadId: req.params.id,
        },

        orderBy: {
          createdAt: "desc",
        },

      });

    return res.json(actions);

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      error: "Failed to fetch actions",
    });
  }
});


export default router;