import type { NextApiRequest, NextApiResponse } from "next";
require("dotenv").config({ path: "../../../.env" });
const mgprivatekey = process.env.MAILGUN_PRIVATE;
const domain = process.env.MAILGUN_DOMAIN;
const adminEmail = process.env.ADMIN_EMAIL;
export const mailgun = require("mailgun-js")({
  apiKey: mgprivatekey,
  domain: domain,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let data = {
    from: `Showpener < noReply@showpener.com>`,
    to: `Showpener < ${adminEmail} >`,
    subject: req.body.subject,
    html: req.body.content,
  };

  await mailgun.messages().send(data, function (error: any, body: any) {
    if (error) {
      // console.log(error);
      return res.status(400).json(error);
    } else {
      return res.status(200).json(body);
    }
    /*     res.json({ message: `Thanks ${name}!` });
    return res.json(body); */
  });
}
