// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import supabase from "../../../lib/supabase";
import { EventDetailProps } from "../../../types/globals";
import getRelevantDate from "../../../utils/getRelevantDate";
import { getTicketMasterError } from "../../../utils/error";
import getStateCode from "../../../utils/getStateCode";
let states = require("../../../utils/states.json");
require("dotenv").config({ path: "../../../.env" });

let GET_ALL_EVENTS_ENDPOINT = `https://app.ticketmaster.com/discovery/v2/events?apikey=${process.env.TICKETMASTER_CONSUMER_KEY}&size=200&classificationName=music&`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const addEvents = async (events: EventDetailProps[]) => {
    if (events.length > 0) {
      let { error, data: addedEvents } = await supabase
        .from("events_table")
        .upsert(events, {
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
        // console.log(events);
        return events;
      }
    } else {
      return "No Events Found";
    }
  };

  let { error, data: statecodes } = await supabase
    .from("states_table")
    .select("state_code");

  if (error) {
    return res
      .status(200)
      .json(
        getTicketMasterError(error, "trying to add events to the Events table.")
      );
  } else {
    let { error, data: artists } = await supabase
      .from("artists_table")
      .select("*");
    // Comment the next line to stop the filter restriction
    /*      .match({ artistname: "The Band" }); */

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
      let i: number = 0;
      let j: number = 0;
      let eventArray: EventDetailProps[] = new Array();

      // SOME HERE, PULL ALL ARTISTS WHICH YOU ARE GOING TO NEED FOR THE ARTIST ARRAY TO RUN TICKETMASTER QUERIES.
      const getArtistEvent = async (statecode: string) => {
        if (artists && i < artists.length) {
          const NEW_EVENTS_ENDPOINT =
            GET_ALL_EVENTS_ENDPOINT +
            `keyword=${artists[i].artistname}&stateCode=${statecode}`;
          const allEvents = await fetch(NEW_EVENTS_ENDPOINT);
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
            allEventsJson.artist = artists[i].artistname;
            allEventsJson.spotify_artist_id = artists[i].spotify_artist_id;
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
                    state_code: statecode,
                    event_venue: eventItem._embedded.venues[0].name,
                    event_city: eventItem._embedded.venues[0].city.name,
                  });
                }
              });
            }
            console.log(allEventsJson);
            i++;

            getArtistEvent(statecode);

            return true;
          }
        } else {
          if (j < statecodes!.length) {
            i = 0;
            let tmpStateCode = statecodes![j].state_code;

            if (tmpStateCode) {
              getArtistEvent(tmpStateCode);
              j++;
            }
          } else {
            addEvents(eventArray);
          }
          return true;
        }
      };
      /*   states.states.map(async (stateCode: any) => { */
      if (statecodes!.length > 0) {
        // Loop Trigger
        await getArtistEvent(statecodes![j].state_code);
        return res.status(200).json("Fetching new events");
      }
      return true;
    }
  }
}
