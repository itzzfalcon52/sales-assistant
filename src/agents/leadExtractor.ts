import "dotenv/config";
import OpenAI from "openai";
import { LeadSchema } from "./leadSchema.js";


const openai=new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export async function extractLead(conversation: string) {
    const response = await openai.responses.parse({
        //this has 3 parts: model, input and text. Model is the model we are using, input is the conversation and text is the schema we want to extract from the conversation.
        model: "gpt-4.1-mini",
        input: [
            //this has 2 roles: system and user. System is the instructions we are giving to the model and user is the conversation we are passing to the model.
            {
                role: "system",
                content:
                `
                 You are a lead extraction system for an e-commerce website
                 development sales agent.

                 Analyze the conversation and extract information about the
                 potential customer.

                 Extract:

                 - business
                 - number/type of products
                 - budget
                 - timeline
                 - required features
                 - buying intent
                 - main barrier or concern

                 Classify intent as:

                   HOT:
                   The customer shows strong buying intent and is seriously
                   considering purchasing.

                  WARM:
                  The customer is interested but has some uncertainty,
                   budget constraint, timing issue, or needs further discussion.

                  COLD:
                 The customer is only exploring, has little buying intent,
                 or is not currently considering purchasing.

                 Do not invent information.

                 If information was not mentioned, use null. 

                  Use the actual conversation as evidence.
                `,
            }, 

            {
                
                role: "user",
                content: conversation, 
            },
            
        ],

        text: {
            //this is the schema we want to extract from the conversation. We are using json schema to define the schema. the type is object and the properties are business, products, budget, timeline, features, intent and barrier. The required properties are business, products, budget, timeline, features, intent and barrier. The additionalProperties is false.
            format: {
              type: "json_schema",
              name: "lead",
              schema: {
                type: "object",
                properties: {
                  business: {
                    type: ["string", "null"],
                  },
                  products: {
                    type: ["string", "null"],
                  },
                  budget: {
                    type: ["string", "null"],
                  },
                  timeline: {
                    type: ["string", "null"],
                  },
                  features: {
                    type: "array", //this will be an array of strings. Each string will be a feature that the customer wants in their e-commerce website.
                    items: {
                      type: "string",
                    },
                  },
                  intent: {
                    type: "string",
                    enum: ["UNKNOWN", "HOT", "WARM", "COLD"],
                  },
                  barrier: {
                    type: ["string", "null"],
                  },
                },
                required: [
                  "business",
                  "products",
                  "budget",
                  "timeline",
                  "features",
                  "intent",
                  "barrier",
                ],
                additionalProperties: false,
              },
              strict: true, //means the output must conform to the JSON schema. For example, it must have the required fields and valid enum values.
            },
          },
    })

    const lead = response.output_parsed ;
    return LeadSchema.parse(lead);

}

