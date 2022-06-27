// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from "next";
import twilio from "twilio";
import supabase from "../../../lib/supabase";
import moment from "moment";

import { passDecrypt } from "../auth/crypt";
import {
  EventDetailProps,
  shortEvent,
  messageDetails,
  eventForBroadcast,
} from "../../../types/globals";
require("dotenv").config({ path: "../../../.env" });

const mgprivatekey = process.env.MAILGUN_PRIVATE;
const domain = process.env.MAILGUN_DOMAIN;
const adminEmail = process.env.ADMIN_EMAIL;

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const token = process.env.TWILIO_AUTH_TOKEN;
const phonenumber = process.env.TWILIO_NUMBER;
const appUURL = process.env.VERCEL_URL;
// use this to set how long before the On Sale date/time to send the message
const daysOrMinutes = "minutes";
const unitsBeforeAlert = 30;
let i = 0;
const client = twilio(accountSid, token);
export const mailgun = require("mailgun-js")({
  apiKey: mgprivatekey,
  domain: domain,
});
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let data = {
    from: `Showpener Cron Test < noReply@showpener.com>`,
    to: `Mike < mike@gamaroff.net>`,
    subject: "Showpener Cron Test",
    text: "This is a Cron Test" + i++,
  };
  await mailgun.messages().send(data, function (error: any, body: any) {
    if (error) {
      return error;
    } else {
      return res.json({ message: body });
    }
    /*     res.json({ message: `Thanks ${name}!` });
    return res.json(body); */
  });

  const nowDate = moment.utc();
  const timeBefore = moment.utc(nowDate).add(unitsBeforeAlert, daysOrMinutes);

  const sendAlert = async (messageDetails: messageDetails) => {
    const sendResult = await client.messages.create(messageDetails);
    return res.status(200).json(sendResult);
  };

  /* 
  const matchEventsToUsers = async (artist: shortEvent) => {
    let { error, data } = await supabase
      .from("userartists_table")
      .select("*")
      .match({ spotify_artist_id: artist.spotify_artist_id });

    // GET THIS ARRAY FROM THE RESPONSE
    // WHICH WILL SHOW ALL THE ARTISTS
    // MATCHED TO THE EVENTS FOUND WITHIN THE TIMEFRAME
    // AND THE USER PHONE NUMBER
    // TO SEND THE ALERT TO

    if (error) {
      return res.status(200).json(error);
    } else if (data) {
      data.map((eventItem: eventForBroadcast) => {
        const decryptedNumber = passDecrypt(eventItem.user_phone).toString();
        sendAlert({
          body:
            "Tickets for " +
            eventItem.artist +
            " are going on sale in the next 30 minutes! Click here to get them before it's too late: " +
            appUURL +
            "Tickets/?tm=" +
            artist.event_url,
          from: phonenumber,
          to: decryptedNumber,
        });
      });

      return data;
    } else {
      return res.status(200).json("No Events for that artist found");
    }
  };

  /// THIS CHECK IS FOR THE PG_CRON
  /// IT'S SO THAT YOU CANNOT TRIGGER THE ENDPOINT IF YOU FIND IT IN THE BROWSER
  // if (req.body.dbcall === true) {

  let { error, data: EventHitsResult } = await supabase
    .from("events_table")
    .select("*")
    .gt("event_sale_date", nowDate)
    .lt("event_sale_date", timeBefore);

  if (error) {
    return res.status(200).json(error);
  } else {
    // return res.status(200).json(data);
    if (EventHitsResult && EventHitsResult.length > 0) {
      EventHitsResult.map(async (event: EventDetailProps) => {
        const match = await matchEventsToUsers({
          spotify_artist_id: event.spotify_artist_id,
          event_url: event.event_url,
        });
        return res.status(200).json(match);
      });
    } else {
      return res.status(200).json("No events found");
    }
  } */
  /*  
/// END OF PG_CRON TEST WHEN NOT TESTING
} else {
    return res.status(200).json("How on earth did you find this endpoint?");
  }
 */
}
