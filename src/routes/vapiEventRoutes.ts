import { Router } from "express";

const router = Router();

router.post("/events", async (req, res) => {
  console.log("\n===== VAPI EVENT =====");

  console.dir(req.body, { depth: null });

  res.status(200).json({
    received: true,
  });
});

export default router;