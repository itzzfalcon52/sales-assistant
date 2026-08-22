import type { Lead } from "../agents/leadSchema.js";

const intentPriority = { //we define the priority of the intents here so that we can compare the intents and get the final intent when we merge the leads. The priority is defined as follows: UNKNOWN < COLD < WARM < HOT
  UNKNOWN: 0,
  COLD: 1,
  WARM: 2,
  HOT: 3,
};

export function mergeLead(
  current: Lead,
  update: Partial<Lead>
): Lead {
  const currentIntent = current.intent;
  const updateIntent = update.intent;

  const finalIntent =
    updateIntent &&
    intentPriority[updateIntent] > intentPriority[currentIntent]
      ? updateIntent
      : currentIntent;

  return {
    business: update.business ?? current.business,

    products: update.products ?? current.products,

    budget: update.budget ?? current.budget,

    timeline: update.timeline ?? current.timeline,

    features: [
      ...new Set([
        ...current.features,
        ...(update.features ?? []),
      ]),
    ],

    intent: finalIntent,

    barrier: update.barrier ?? current.barrier,
  };
}