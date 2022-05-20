import { Queue } from "quirrel/next";
import twilio from "twilio";

const accountSid = <string>process.env.TWILIO_ACCOUNT_SID;
const token = <string>process.env.TWILIO_AUTH_TOKEN;
const phonenumber = <string>process.env.TWILIO_PHONE_NUMBER;
const client = twilio(accountSid, token);
export default Queue("api/queues/send", async (job: any) => {
  console.log("Sending message: ", job);

  /*  await client.messages.create({
    body: job.message,
    to: job.to,
    from: phonenumber,
  }); */
});
