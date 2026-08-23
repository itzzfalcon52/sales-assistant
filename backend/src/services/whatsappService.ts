import "dotenv/config";
import twilio from "twilio";

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export async function sendWhatsApp(to: string) {
  try {
    const message = await client.messages.create({
      from: "whatsapp:+14155238886",

      // Appointment Reminders Sandbox template
      contentSid: "HXb5b62575e6e4ff6129ad7c8efe1f983e",

      contentVariables: JSON.stringify({
        "1": "12/1",
        "2": "3pm",
      }),

      to: `whatsapp:${to}`,
    });

    console.log("WhatsApp sent:", message.sid);

    return message;
  } catch (error) {
    console.error("WhatsApp failed:", error);
    throw error;
  }
}