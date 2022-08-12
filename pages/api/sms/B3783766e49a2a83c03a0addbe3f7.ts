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
const appURL = process.env.VERCEL_URL;
// use this to set how long before the On Sale date/time to send the message
const daysOrMinutes = "minutes";
const unitsBeforeAlert = 30;
let i = 0;
const client = twilio(accountSid, token);
let matchArr: any[] = new Array();
export const mailgun = require("mailgun-js")({
  apiKey: mgprivatekey,
  domain: domain,
});
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  /*
  // CRON TEST
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
  });
 */
  const nowDate = moment.utc();
  const timeBefore = moment.utc(nowDate).add(unitsBeforeAlert, daysOrMinutes);

  const sendAlert = async (messageDetails: messageDetails) => {
    const sendResult = await client.messages.create(messageDetails);
    // Should be doing error checking on this send result and at least logging it
    return sendResult;
  };

  const matchEventsToUsers = async (artist: shortEvent) => {
    console.log(artist);
    let { error, data } = await supabase
      .from("userartists_table")
      .select("*")
      .match({
        spotify_artist_id: artist.spotify_artist_id,
        user_state: artist.state_code,
      });

    // GET THIS ARRAY FROM THE RESPONSE
    // WHICH WILL SHOW ALL THE ARTISTS
    // MATCHED TO THE EVENTS FOUND WITHIN THE TIMEFRAME
    // AND THE USER PHONE NUMBER
    // TO SEND THE ALERT TO

    // ********** IMPORTANT *********

    // We need to send users texts for all matches, however it must also match the State of the user.
    // So below, instead of just sending texts to users if they have an event/artist match,
    // we need to make sure that they don't get texts from other states
    // so when we are cycling through the results to send texts to, we need to discard states that don't match the user.
    // So you need state code to appear now in the User Artists table.

    // The logic will be: if eventItem.state (from events_table) === state code from the userartists_table, send
    // otherwise ignore that record.

    if (error) {
      return error;
    } else if (data) {
      data.map((eventItem: eventForBroadcast) => {
        //   return res.status(200).json(eventItem);
        const decryptedNumber = passDecrypt(eventItem.user_phone).toString();

        sendAlert({
          body: `Hey, ${
            eventItem.artist
          } tickets for their upcoming show on ${moment
            .utc(artist.event_date)
            .format("dddd")} ${moment
            .utc(artist.event_date)
            .format("MMM Do")} at ${artist.event_venue}, ${
            artist.event_city
          }, ${
            eventItem.user_state
          } go on sale soon, hit the link below to go to the event page: ${
            appURL + "/Tickets/?tm=" + artist.event_id
          }`,

          from: phonenumber,
          to: decryptedNumber,
        });
      });

      return data;
    } else {
      return "No Events for that artist found";
    }
  };

  /// THIS CHECK IS FOR THE PG_CRON
  /// IT'S SO THAT YOU CANNOT TRIGGER THE ENDPOINT IF YOU FIND IT IN THE BROWSER
  /*   if (req.body.dbcall) { */
  let { error, data: EventHitsResult } = await supabase
    .from("events_table")
    .select("*")
    .gt("event_sale_date", nowDate)
    .lt("event_sale_date", timeBefore);

  if (error) {
    return res.status(401).json(error);
  } else {
    if (EventHitsResult && EventHitsResult.length > 0) {
      EventHitsResult.map(async (event: EventDetailProps) => {
        const match = await matchEventsToUsers({
          event_id: event.event_id,
          spotify_artist_id: event.spotify_artist_id,
          event_url: event.event_url,
          state_code: event.state_code,
          event_venue: event.event_venue,
          event_city: event.event_city,
          event_date: event.event_date,
        });
        matchArr.push(match);

        // return match;
      });
      return res.status(200).json(matchArr);
    } else {
      return res.status(200).json("No events found");
    }
  }

  /// END OF PG_CRON TEST WHEN NOT TESTING
  /*   } else {
    return res.status(200).json("How on earth did you find this endpoint?");
  } */
}
