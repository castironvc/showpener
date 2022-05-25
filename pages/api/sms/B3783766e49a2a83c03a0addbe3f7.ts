// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import twilio from "twilio";

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
  i++;

  if (req.body.dbcall === true) {
    const sendResult = await client.messages.create({
      body: "hello how are you - " + i,
      from: phonenumber,
      to: "+19176782017",
    });
    return res.status(500).json(sendResult);
  } else {
    return res.status(500).json("what?");
  }
  /*   res.writeHead(301, {
    Location: "/",
  }); */
  /*  return res.status(200).json(sendResult); */
}
