import { Router } from "express";

const router = Router();

router.post("/tools", async (req, res) => {
    console.log("Vapi tool call received:");
    console.dir(req.body, { depth: null });
  
    res.json({
      result: "Lead information received successfully.",
    });
  });
  
  export default router;