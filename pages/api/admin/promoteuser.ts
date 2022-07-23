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

  let { error, data: changedRoleUser } = await supabase
    .from("adminusers_table")
    .upsert({
      id: req.body.id,
      role: req.body.role,
    });

  if (error) {
    return res
      .status(500)
      .json(
        getError(
          error,
          "trying to get the data from the 'Admin Users' table in order to determine role."
        )
      );
  } else if (changedRoleUser) {
    //console.log(changedRoleUser);
    return res.status(200).json(changedRoleUser[0]);
  }
}
