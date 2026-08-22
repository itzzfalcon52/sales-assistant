import { Router } from "express";
import { LeadSchema } from "../agents/leadSchema.js";
import { decideAction } from "../agents/decisionEngine.js";
import { updateLead } from "../services/leadService.js";
import { normalizeLeadUpdate } from "../services/normalizeLead.js";
import { executeAction } from "../services/actionService.js";
import { saveConversation } from "../services/conversationService.js";
import { getLead,getLeadRecord } from "../services/leadService.js";

const router = Router();


type VapiLeadUpdate = {
    business?: string;
    products?: string;
    budget?: string;
    timeline?: string;
    features?: string[];
    intent?: "UNKNOWN" | "HOT" | "WARM" | "COLD";
    barrier?: string;
  };

  router.post("/tools", async (req, res) => {

    const messageType = req.body?.message?.type;
  
    console.log("\n===== VAPI WEBHOOK =====");
    console.log("Message Type:", messageType);


     // -----------------------------
     // END OF CALL
     // -----------------------------

     if (messageType === "end-of-call-report") {

        console.log("🚨 END OF CALL HANDLER STARTED");
      
        const callId = req.body?.message?.call?.id;
      
        const transcript =
          req.body?.message?.artifact?.transcript;
      
        console.log("Call ID:", callId);
        console.log("Transcript exists:", !!transcript);
      
        if (!callId || !transcript) {
          console.log("❌ Missing callId or transcript");
      
          return res.status(400).json({
            error: "Missing callId or transcript",
          });
        }
      
        try {
      
          console.log("1️⃣ Saving conversation...");
      
          await saveConversation(
            callId,
            transcript
          );
      
          console.log("2️⃣ Conversation saved!");
      
          const finalLead = await getLead(callId);
      
          console.log("3️⃣ getLead returned:");
          console.dir(finalLead, { depth: null });
      
          if (!finalLead) {
            throw new Error(
              `Lead not found for callId: ${callId}`
            );
          }
      
          const leadRecord = await getLeadRecord(callId);
      
          console.log("4️⃣ getLeadRecord returned:");
          console.dir(leadRecord, { depth: null });
      
          if (!leadRecord) {
            throw new Error(
              `Lead database record not found for callId: ${callId}`
            );
          }
      
          const action = decideAction(finalLead);
      
          console.log("5️⃣ Action decided:", action);
      
          console.log("6️⃣ Executing action...");
      
          await executeAction(
            action,
            finalLead,
            leadRecord.id
          );
      
          console.log("7️⃣ Action executed!");
      
          return res.status(200).json({
            received: true,
          });
      
        } catch (error) {
      
          console.error(
            "❌ END OF CALL PROCESSING FAILED:",
            error
          );
      
          return res.status(500).json({
            error: "Failed to process end-of-call event",
          });
        }
      }

  
  
    // ==========================================
    // TOOL CALL
    // ==========================================
  
    if (messageType === "tool-calls") {

        const toolCall = req.body?.message?.toolCallList?.[0];
      
        const toolCallId = toolCall?.id;
        const callId = req.body?.message?.call?.id;
        const rawArguments = toolCall?.function?.arguments;
      
        console.log("Call ID:", callId);
        console.log("Tool Call ID:", toolCallId);
        console.log("Arguments:", rawArguments);
      
        if (!toolCallId || !callId) {
          return res.status(400).json({
            error: "Missing toolCallId or callId",
          });
        }
      
        try {
      
          const normalizedUpdate =
            normalizeLeadUpdate(rawArguments);
      
          const updatedLead =
            await updateLead(callId, normalizedUpdate);
      
          const validatedLead =
            LeadSchema.parse(updatedLead);
      
          console.log("\nUpdated Lead:");
          console.dir(validatedLead, { depth: null });
      
          return res.json({
            results: [
              {
                toolCallId,
                result: "Lead information updated successfully.",
              },
            ],
          });
      
        } catch (error) {
      
          console.error("Lead processing failed:", error);
      
          return res.status(400).json({
            results: [
              {
                toolCallId,
                result: "Unable to process lead information.",
              },
            ],
          });
        }
      }
  
    // ==========================================
    // OTHER VAPI EVENTS
    // ==========================================
  
    console.log("Non-tool Vapi event:");
    console.dir(req.body, { depth: null });
  
    return res.status(200).json({
      received: true,
    });
  });
export default router;