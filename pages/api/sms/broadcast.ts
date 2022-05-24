// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import twilio from "twilio";
import { getToken } from "next-auth/jwt";
require("dotenv").config({ path: "../../../.env" });

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const token = process.env.TWILIO_AUTH_TOKEN;
const phonenumber = process.env.TWILIO_NUMBER;
const client = twilio(accountSid, token);
const secret = process.env.JWT_SECRET;
let i: number = 0;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await getToken({ req, secret });
  if (token) {
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
