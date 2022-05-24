// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import twilio from "twilio";
import { getSession } from "next-auth/react";
require("dotenv").config({ path: "../../../.env" });

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const token = process.env.TWILIO_AUTH_TOKEN;
const phonenumber = process.env.TWILIO_NUMBER;
const client = twilio(accountSid, token);

let i: number = 0;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  if (session) {
    i++;
    const sendResult = await client.messages.create({
      body: "hello how are you - " + i,
      from: phonenumber,
      to: "+19176782017",
    });
    return res.status(200).json(sendResult);
  } else {
    res.status(401);
  }
  res.end();
}
