import "dotenv/config";

const accountSid = process.env.TWILIO_ACCOUNT_SID!;
const authToken = process.env.TWILIO_AUTH_TOKEN!;

const client = (await import("twilio")).default(
  accountSid,
  authToken
);

const message = await client.messages.create({
  from: "whatsapp:+14155238886",

  contentSid:
    "HX350d429d32e64a552466cafecbe95f3c",

  contentVariables: JSON.stringify({
    "1": "12/1",
    "2": "3pm",
  }),

  to: "whatsapp:+918320375491",
});

console.log("SENT:", message.sid);