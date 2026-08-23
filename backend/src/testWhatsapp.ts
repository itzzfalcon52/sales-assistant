import "dotenv/config";
import https from "node:https";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

if (!accountSid || !authToken) {
  throw new Error("Missing Twilio credentials");
}

const body = new URLSearchParams({
  To: "whatsapp:+918320375491",
  From: "whatsapp:+14155238886",
  ContentSid: "HXb5b62575e6e4ff6129ad7c8efe1f983e",
  ContentVariables: JSON.stringify({
    "1": "12/1",
    "2": "3pm",
  }),
}).toString();

const auth = Buffer
  .from(`${accountSid}:${authToken}`)
  .toString("base64");

const options = {
  hostname: "api.twilio.com",
  port: 443,
  path: `/2010-04-01/Accounts/${accountSid}/Messages.json`,
  method: "POST",
  headers: {
    Authorization: `Basic ${auth}`,
    "Content-Type": "application/x-www-form-urlencoded",
    "Content-Length": Buffer.byteLength(body),
  },
};

const req = https.request(options, (res) => {
  let data = "";

  res.on("data", (chunk) => {
    data += chunk;
  });

  res.on("end", () => {
    console.log("STATUS:", res.statusCode);
    console.log("RESPONSE:", data);
  });
});

req.on("error", (error) => {
  console.error("REQUEST ERROR:", error);
});

req.write(body);
req.end();