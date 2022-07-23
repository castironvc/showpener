// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getError } from "../../../utils/error";
import supabase from "../../../lib/supabase";
import { passEncrypt } from "../auth/crypt";

import { ErrorProps } from "next/error";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  /*   const headers = {
    headers: {
      Authorization: `Bearer ${req.body.session.access_token}`,
    },
  }; */

  let { error, data: insertedMessage } = await supabase
    .from("broadcastmessages_table")
    .insert(req.body);

  if (error) {
    return res
      .status(500)
      .json(
        getError(
          error,
          "trying to insert a broadcast messaging into the BroadcastMessage table"
        )
      );
  } else if (insertedMessage) {
    let incremented = await supabase.rpc("increment_messages", {
      user_id: Number(req.body.userid),
    });

    if (error) {
      return res
        .status(500)
        .json(
          getError(
            error,
            "trying to insert a broadcast messaging into the BroadcastMessage table"
          )
        );
    } else if (incremented) {
      //   console.log(incremented);
      return res.status(200).json(incremented);
    }
  }
}
