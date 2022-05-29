// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import supabase from "../../../lib/supabase";
import { EventDetailProps } from "../../../types/globals";
import getRelevantDate from "../../../utils/getRelevantDate";
import { getTicketMasterError } from "../../../utils/error";
require("dotenv").config({ path: "../../../.env" });

let GET_ALL_EVENTS_ENDPOINT = `https://app.ticketmaster.com/discovery/v2/events?apikey=${process.env.TICKETMASTER_CONSUMER_KEY}&size=200&classificationName=music&`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const addEvents = async (events: EventDetailProps[]) => {
    let { error, data } = await supabase.from("Events").upsert(events, {
      ignoreDuplicates: true,
      onConflict: "event_id",
    });

    if (error) {
      return res
        .status(200)
        .json(
          getTicketMasterError(
            error,
            "trying to add events to the Events table."
          )
        );
    } else {
      return res.status(200).json(data);
    }
  };

  if (req.body && req.body.artists) {
    const dedupedArtistArray = req.body.artists.filter(
      (v: any, i: any, a: any) =>
        a.findIndex(
          (v2: any) => v2.spotify_artist_id === v.spotify_artist_id
        ) === i
    );

    let i: number = 0; // number to control artist loop
    /*  let numberOfRecordsToGet: number =
      dedupedArtistArray.length > 10 ? 10 : dedupedArtistArray.length; // NUMBER OF ARTISTS I WANT TO CHECK EVENTS FOR */
    let eventArray: EventDetailProps[] = new Array();

    const getArtistEvent = async () => {
      if (i < dedupedArtistArray.length) {
        const NEW_EVENTS_ENDPOINT =
          GET_ALL_EVENTS_ENDPOINT +
          `keyword=${dedupedArtistArray[i].artist}&stateCode=${req.body.state}`;
        const allEvents = await fetch(NEW_EVENTS_ENDPOINT);
        return res.status(200).json(allEvents);
        const allEventsJson = await allEvents.json();

        if (allEventsJson.error) {
          return res
            .status(200)
            .json(
              getTicketMasterError(
                allEventsJson.error,
                "trying to access Ticketmaster's events endpoint."
              )
            );
        } else {
          allEventsJson.artist = dedupedArtistArray[i].artist;

          allEventsJson.spotify_artist_id =
            dedupedArtistArray[i].spotify_artist_id;

          if (
            allEventsJson &&
            allEventsJson.page &&
            allEventsJson.page.totalElements > 0
          ) {
            allEventsJson._embedded.events.map((eventItem: any) => {
              if (
                getRelevantDate(eventItem.sales.public.startDateTime) &&
                getRelevantDate(eventItem.dates.start.localDate)
              ) {
                eventArray.push({
                  spotify_artist_id: allEventsJson.spotify_artist_id,
                  artist_name: allEventsJson.artist,
                  event_name: eventItem.name,
                  event_id: eventItem.id,
                  event_date:
                    eventItem.dates.start.dateTime ||
                    eventItem.dates.start.localDate,
                  event_sale_date:
                    eventItem.sales.public.startDateTime ||
                    eventItem.sales.public.localDate,
                  event_url: eventItem.url,
                  state_code: req.body.state,
                });
              }
            });
          }

          i++;
          getArtistEvent();

          return true;
        }
      } else {
        /*     return res.status(200).json(eventArray); */

        await addEvents(eventArray);
      }
    };
    await getArtistEvent();
  } else {
    return res.status(200).json("No Data");
  }
}
