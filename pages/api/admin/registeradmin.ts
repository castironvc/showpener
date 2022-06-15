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

  let { error, data: updatedUser } = await supabase
    .from("adminusers_table")
    .upsert(req.body)
    .match({ id: req.body.id });

  if (error) {
    return res
      .status(500)
      .json(
        getError(
          error,
          "trying to add name and email to the user record in AdminUsers"
        )
      );
  } else if (updatedUser) {
    return res.status(200).json(updatedUser[0]);
  }
}
