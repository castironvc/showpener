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
  console.log(req.body);
  let data = {
    from: `Showpener Cron Test < noReply@showpener.com>`,
    to: `Mike < mike@gamaroff.net>`,
    subject: "Showpener Cron Test",
    text: req.body,
  };

  await mailgun.messages().send(data, function (error: any, body: any) {
    if (error) {
      return error;
    } else {
      res.json({ message: req.body });
      return res.json(body);
    }
    /*     res.json({ message: `Thanks ${name}!` });
    return res.json(body); */
  });
}
