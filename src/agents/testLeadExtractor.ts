import { extractLead } from "./leadExtractor.js";
import { decideAction } from "./decisionEngine.js";

const conversations = [
  {
    name: "Hot lead",
    text: `
      Customer: I need an ecommerce website for my clothing business.
      I have around 200 products.
      My budget is around 1 lakh.
      I want to launch within two months.
      I definitely want online payments and inventory.
    `,
  },

  {
    name: "Warm lead",
    text: `
      Customer: I am interested in getting an ecommerce website.
      I run a small bakery.
      I don't know exactly how many products yet.
      The website sounds useful, but my budget is quite limited.
      I need to discuss it with my business partner first.
    `,
  },

  {
    name: "Cold lead",
    text: `
      Customer: I'm just exploring the idea of starting an online
      business. I don't have a business yet and I'm not sure when
      I'll start.
    `,
  },

  {
    name: "Missing information",
    text: `
      Customer: I sell handmade jewellery and I'm thinking about
      getting a website sometime later.
    `,
  },

  {
    name: "Indirect hot lead",
    text: `
      Customer: I've already finalized my products and I'm trying
      to get the store launched next month. What would it take to
      get the website ready? I can arrange the payment if the
      timeline works.
    `,
  },
];

async function main() {
  for (const conversation of conversations) {
    console.log(`\n===== ${conversation.name} =====`);

    const lead = await extractLead(conversation.text);

    console.dir(lead, { depth: null });

    console.log("Action:", decideAction(lead));
  }
}

main().catch(console.error);