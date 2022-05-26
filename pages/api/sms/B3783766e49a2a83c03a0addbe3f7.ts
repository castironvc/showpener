// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import twilio from "twilio";
import supabase from "../../../lib/supabase";
import moment from "moment";
import {
  EventDetailProps,
  shortEvent,
  messageDetails,
  eventForBroadcast,
} from "../../../types/globals";
require("dotenv").config({ path: "../../../.env" });

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const token = process.env.TWILIO_AUTH_TOKEN;
const phonenumber = process.env.TWILIO_NUMBER;

// use this to set how long before the On Sale date/time to send the message
const daysOrMinutes = "days";
const unitsBeforeAlert = 30;

const client = twilio(accountSid, token);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const nowDate = moment.utc();
  const timeBefore = moment.utc(nowDate).add(unitsBeforeAlert, daysOrMinutes);

  const sendAlert = async (messageDetails: messageDetails) => {
    const sendResult = await client.messages.create(messageDetails);
    return res.status(200).json(sendResult);
  };

  const matchEventsToUsers = async (artist: shortEvent) => {
    let { error, data } = await supabase
      .from("UserArtists")
      .select("*")
      .match({ artist_id: artist.artist_id });

    // GET THIS ARRAY FROM THE RESPONSE
    // WHICH WILL SHOW ALL THE ARTISTS
    // MATCHED TO THE EVENTS FOUND WITHIN THE TIMEFRAME
    // AND THE USER PHONE NUMBER
    // TO SEND THE ALERT TO

    if (error) {
      return res.status(200).json(error);
    } else if (data) {
      data.map((eventItem: eventForBroadcast) => {
        sendAlert({
          body:
            "Tickets for " +
            eventItem.artist +
            " are going on sale in the next 30 minutes! Click here to get them before it's too late:" +
            artist.event_url,
          from: phonenumber,
          to: eventItem.user_phone,
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

  let { error, data } = await supabase
    .from("Events")
    .select("*")
    .gt("event_sale_date", nowDate)
    .lt("event_sale_date", timeBefore);
  let EventHitsResult = data;

  if (error) {
    return res.status(200).json(error);
  } else {
    // return res.status(200).json(data);
    if (EventHitsResult && EventHitsResult.length > 0) {
      EventHitsResult.map(async (event: EventDetailProps) => {
        const match = await matchEventsToUsers({
          artist_id: event.spotify_artist_id,
          event_url: event.event_url,
        });
        return res.status(200).json(match);
      });
    } else {
      return res.status(200).json("poes");
    }
  }
  /*  
/// END OF PG_CRON TEST WHEN NOT TESTING
} else {
    return res.status(200).json("How on earth did you find this endpoint?");
  }
 */
}
