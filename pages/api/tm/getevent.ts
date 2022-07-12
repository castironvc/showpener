// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getError } from "../../../utils/error";
import supabase from "../../../lib/supabase";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  /*   const headers = {
    headers: {
      Authorization: `Bearer ${req.body.session.access_token}`,
    },
  }; */

  let { error, data: event } = await supabase
    .from("events_table")
    .select("*")
    .match({ event_id: req.body.eventid });
  /*     .order("artist", { ascending: true }); */

  if (error) {
    return res
      .status(500)
      .json(
        getError(
          error,
          "trying to get a single event from the 'Events' table based on event_id."
        )
      );
  } else if (event) {
    return res.status(200).json(event[0]);
  }
}
