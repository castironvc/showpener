// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getError } from "../../../utils/error";
import supabase from "../../../lib/supabase";
import { passEncrypt } from "../auth/crypt";
import { adminProfileProps } from "../../../types/globals";

import { ErrorProps } from "next/error";
const userAdminProfile: adminProfileProps = {
  mobilePhone: "",
  role: "standard",
  totalmessages: 0,
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  /*   const headers = {
    headers: {
      Authorization: `Bearer ${req.body.session.access_token}`,
    },
  }; */
  console.log(req.body);
  userAdminProfile.mobilePhone = req.body.mobilePhone;
  userAdminProfile.role = "standard";
  let { error, data: updatedUser } = await supabase
    .from("adminusers_table")
    .upsert(userAdminProfile, {
      ignoreDuplicates: true,
      onConflict: "mobilePhone",
    })
    .select("id,mobilePhone");

  if (error) {
    return res
      .status(500)
      .json(
        getError(
          error,
          "trying to add the new admin user to the 'Admin Users' table."
        )
      );
  } else {
    return res.status(200).json(updatedUser);
  }
}
