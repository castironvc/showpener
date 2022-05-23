// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import supabase from "../../../lib/supabase";
require("dotenv").config({ path: "../../../.env" });

let GET_ALL_EVENTS_ENDPOINT = `https://app.ticketmaster.com/discovery/v2/events?apikey=${process.env.TICKETMASTER_CONSUMER_KEY}&size=200&classificationName=music&`;

type EventDetailProps = {
  spotify_artist_id: string;
  artist_name: string;
  event_name: string;
  event_id: string;
  event_date: string;
  event_sale_date: string;
  event_url: string;
  state_code: string;
};
let eventDetail: EventDetailProps = {
  spotify_artist_id: "",
  artist_name: "",
  event_name: "",
  event_id: "",
  event_date: "",
  event_sale_date: "",
  event_url: "",
  state_code: "",
};
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
      return res.status(200).json(error);
    } else {
      return res.status(200).json(data);
    }
  };
  if (req.body) {
    const dedupedArtistArray = req.body.artists.filter(
      (v: any, i: any, a: any) =>
        a.findIndex(
          (v2: any) => v2.spotify_artist_id === v.spotify_artist_id
        ) === i
    );

    let i: number = 0; // number to control artist loop
    let numberOfRecordsToGet: number =
      dedupedArtistArray.length > 10 ? 10 : dedupedArtistArray.length; // NUMBER OF ARTISTS I WANT TO CHECK EVENTS FOR
    let eventArray: EventDetailProps[] = new Array();
    const getArtistEvent = async () => {
      if (i < numberOfRecordsToGet - 1) {
        console.log(dedupedArtistArray[i]);
        const NEW_EVENTS_ENDPOINT =
          GET_ALL_EVENTS_ENDPOINT +
          `keyword=${dedupedArtistArray[i].artistname}&stateCode=${req.body.state}`;
        const allEvents = await fetch(NEW_EVENTS_ENDPOINT);
        const allEventsJson = await allEvents.json();
        allEventsJson.artistname = dedupedArtistArray[i].artistname;
        allEventsJson.spotify_artist_id =
          dedupedArtistArray[i].spotify_artist_id;

        if (allEventsJson && allEventsJson.page.totalElements > 0) {
          allEventsJson._embedded.events.map((eventItem: any) => {
            eventArray.push({
              spotify_artist_id: allEventsJson.spotify_artist_id,
              artist_name: allEventsJson.artistname,
              event_name: eventItem.name,
              event_id: eventItem.id,
              event_date: eventItem.dates.start.dateTime,
              event_sale_date: eventItem.sales.public.startDateTime,
              event_url: eventItem.url,
              state_code: req.body.state,
            });
          });
        }

        i++;
        getArtistEvent();
        return true;
      } else {
        await addEvents(eventArray);
      }
    };
    await getArtistEvent();
  } else {
    return res.status(200).json("No Data");
  }
}
