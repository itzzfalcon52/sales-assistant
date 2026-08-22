import type { Lead } from "../agents/leadSchema.js";
//this function is needed so that we can merge the current lead object with the new lead object that we get from the extractLead function. This is useful because we can use this to update the lead object with new information without having to provide all of the information again. For example if we have a lead object with only the business and products properties and we get a new lead object with only the budget and timeline properties we can merge them together to get a complete lead object with all of the properties.
export function mergeLead(
  current: Lead,
  update: Partial<Lead> //this is a partial lead object which means that it can have any of the properties of the lead object but not all of them. This is useful because we can use this to update the lead object with new information without having to provide all the information again.
): Lead {
  return {
    business: update.business ?? current.business, //this means that if the update object has a business property then we will use that otherwise we will use the current object's business property. This is useful because we can use this to update the lead object with new information without having to provide all of the information again.
    products: update.products ?? current.products,
    budget: update.budget ?? current.budget,
    timeline: update.timeline ?? current.timeline,

    features: [ //we make it like this as previously what was happening was that if the current lead object had features and the update lead object also had features then we would have two arrays of features and we would have to merge them together. But now we are using a set which will automatically remove duplicates and give us a unique array of features.
        ...new Set([
          ...current.features,
          ...(update.features ?? []),
        ]),
      ],
    intent: update.intent ?? current.intent,
    barrier: update.barrier ?? current.barrier,
  };
}