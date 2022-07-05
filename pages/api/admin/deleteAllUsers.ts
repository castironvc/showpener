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

  let { error, data } = await supabase
    .from("userartists_table")
    .delete()
    .match({ user: "CastironVC" })
    .select("*");

  if (error) {
    return res
      .status(500)
      .json(
        getError(
          error,
          "trying to delete all CastIrosn user records for testing purposes."
        )
      );
  } else if (data) {
    let { error, data } = await supabase
      .from("users_table")
      .delete()
      .match({ name: "CastironVC" })
      .select("*");

    if (error) {
      return res
        .status(500)
        .json(
          getError(
            error,
            "trying to delete all CastIron user records for testing purposes, in the user_table."
          )
        );
    } else if (data) {
    }

    return res.status(200).json(data);
  }
}
