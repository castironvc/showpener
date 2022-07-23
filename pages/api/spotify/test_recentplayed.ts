// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getError } from "../../../utils/error";
import { dedupeArray } from "../../../utils/dedupeArray";

import {
  parseRecentlyPlayed,
  parseTopTracks,
  parseFollowed,
  parseLikedTracks,
} from "../../../utils/parsers";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const headers = {
    headers: {
      Authorization: `Bearer ${req.body.session.user.accessToken}`,
      type: "artist",
    },
  };

  let parser: any;

  if (req.body.endpoint.name === "recentlyplayed") {
    parser = parseRecentlyPlayed;
  } else if (req.body.endpoint.name === "toptracks") {
    parser = parseTopTracks;
  } else if (req.body.endpoint.name === "followedartists") {
    parser = parseFollowed;
  } else if (req.body.endpoint.name === "likedtracks") {
    parser = parseLikedTracks;
  }

  if (req.body.endpoint.name === "followedartists") {
    const spotifyFetch = await fetch(req.body.endpoint.url, headers);
    const { error, artists: spotifyItems } = await spotifyFetch.json();

    if (error) {
      // console.log(error);
      return res
        .status(400)
        .json(
          getError(
            error,
            "trying to access the Spotify 'Liked Tracks' Endpoint"
          )
        );
    } else {
      const spotifyResult: any = await parser(spotifyItems);
      return res.status(200).json(spotifyResult);
    }
  } else {
    const spotifyFetch = await fetch(req.body.endpoint.url, headers);
    const { error, items: spotifyItems } = await spotifyFetch.json();

    if (error) {
      // console.log(error);
      return res
        .status(400)
        .json(
          getError(
            error,
            "trying to access the Spotify 'Liked Tracks' Endpoint"
          )
        );
    } else {
      const spotifyResult: any = await parser(spotifyItems);

      return res.status(200).json(dedupeArray(spotifyResult, "artistname"));
    }
  }
}
