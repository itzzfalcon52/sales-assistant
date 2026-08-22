import app from "./app.js";
import { decideAction } from "./agents/decisionEngine.js";
import type { Lead } from "./agents/leadType.js";

const PORT = 4000;

const lead: Lead = {
  business: "online clothing store",
  products: "150",
  budget: "₹80,000",
  timeline: "before Diwali",
  features: ["payments", "inventory"],
  intent: "HOT",
  barrier: null,
};

const action = decideAction(lead);

console.log("Lead:", lead);
console.log("Action:", action);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});