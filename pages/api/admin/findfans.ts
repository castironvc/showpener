// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getError } from "../../../utils/error";
import supabase from "../../../lib/supabase";
import { passEncrypt } from "../auth/crypt";
import { FindUserProps } from "../../../types/globals";
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

  console.log(req.body.stateCode);
  let { error, data: users } = await supabase
    .from("users_table")
    .select("*")
    .match({ state: req.body.stateCode });
  /*     .order("artist", { ascending: true }); */

  if (error) {
    return res
      .status(500)
      .json(
        getError(
          error,
          "trying to get the data from the 'Users' table based on State code."
        )
      );
  } else if (users) {
    let tmpUserIdArr: number[] = new Array();
    users.map(async (user: FindUserProps) => {
      tmpUserIdArr.push(user.id);
    });

    let { error, data: artists } = await supabase
      .from("userartists_table")
      .select("*")
      /*  .rangeLt("id", "[150, 250]"); */
      .filter("user_id", "in", `(${tmpUserIdArr})`)
      .match({ artist: req.body.artist });

    /*     .filter("Users.name", "eq", "CastironVC"); */

    /*     .match({ state: req.body.stateCode }) */
    /*     .order("artist", { ascending: true }); */

    if (error) {
      return getError(
        error,
        "trying to get the data from the 'ArtistsK' table for Promoters."
      );
    } else if (artists) {
      return res.status(200).json(artists);
    }
  }
}
