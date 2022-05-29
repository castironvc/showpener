// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import twilio from "twilio";
require("dotenv").config({ path: "../../../.env" });

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const token = process.env.TWILIO_AUTH_TOKEN;
const phonenumber = process.env.TWILIO_NUMBER;
const client = twilio(accountSid, token);

/* type UserProfileProps = {
  name: string | unknown;
  email: string | unknown;
  mobilePhone: string | unknown;
  spotify_user_id: string | unknown;
  state: string | unknown;
  tc: boolean | unknown;
}; */

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  /*   const sendResult = await client.messages.create({
    body: "hello how are you",
    from: phonenumber,
    to: "+19176782017",
  });

  return res.status(200).json(sendResult); */
  console.log(req.body);
  return res.status(200).json(req.body);
}
