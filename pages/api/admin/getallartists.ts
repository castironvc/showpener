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

  let { error, data: artists } = await supabase
    .from("Artists")
    .select("*")
    .order("artistname", { ascending: true });

  if (error) {
    return res
      .status(500)
      .json(
        getError(
          error,
          "trying to get the data from the 'Artists' table for Promoters."
        )
      );
  } else if (artists) {
    return res.status(200).json(artists);
  }
}
