//here we create one more type leadAction which will basically define what needs to be done with the lead based on the intent of the lead. For example if the lead is hot we will send a whatsapp message to the lead and if the lead is warm we will schedule a callback and if the lead is cold we will follow up with the lead.
//decideAction function will take the lead as input and based on the intent of the lead it will return the action that needs to be taken with the lead.
import type { Lead } from "./leadType.js";

export type LeadAction =
  | "SEND_WHATSAPP"
  | "SCHEDULE_CALLBACK"
  | "FOLLOW_UP";

export function decideAction(lead: Lead): LeadAction {
  switch (lead.intent) {
    case "HOT":
      return "SEND_WHATSAPP";

    case "WARM":
      return "SCHEDULE_CALLBACK";

    case "COLD":
      return "FOLLOW_UP";
  }
}