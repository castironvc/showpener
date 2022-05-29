// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getError } from "../../../utils/error";
import supabase from "../../../lib/supabase";
import {
  foundArtistsOfUsersProps,
  NewUserProfileProps,
  IdsProps,
  HeadersType,
  userArtistBridgeProps,
} from "../../../types/globals";
import {
  parseRecentlyPlayed,
  parseTopTracks,
  parseFollowed,
} from "../../../utils/parsers";
import { ErrorProps } from "next/error";
const RECENTLY_PLAYED_ENDPOINT = `https://api.spotify.com/v1/me/player/recently-played`;

const GET_TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks`;
const FOLLOWED_ARTISTS_ENDPOINT = `https://api.spotify.com/v1/me/following?type=artist`;

const userProfile: NewUserProfileProps = {
  name: "",
  email: "",
  mobilePhone: "",
  spotify_user_id: "",
  state: "",
  tc: true,
};

const addArtists = async (records: foundArtistsOfUsersProps[]) => {
  let { error, data: foundArtists } = await supabase
    .from("Artists")
    .upsert(records, {
      ignoreDuplicates: true,
      onConflict: "spotify_artist_id",
    })
    .select("artistname,spotify_artist_id");

  /*   data!.map(async (id: any) => {
    await addUserArtists(id, artistData);
  }); */
  if (error) {
    return getError(error, "issues inserting into the Artists table");
  } else {
    if (foundArtists) {
      let tmpArr: foundArtistsOfUsersProps[] = new Array();
      foundArtists.map(async (item: foundArtistsOfUsersProps) => {
        tmpArr.push(item);
      });
      return tmpArr;
    }
  }
};

const addUserArtists = async (
  ids: IdsProps,
  artistData: foundArtistsOfUsersProps[]
) => {
  const userArtistBridge: userArtistBridgeProps[] = new Array();

  artistData.map((artist: foundArtistsOfUsersProps) => {
    userArtistBridge.push({
      artist: artist.artistname,
      user_id: ids.id,
      user: ids.name,
      spotify_artist_id: artist.spotify_artist_id,
      spotify_user_id: ids.spotify_user_id,
      user_phone: ids.mobilePhone,
    });
  });

  // UPDATE THE USER ARTISTS TABLE
  let { error, data: userArtists } = await supabase
    .from("UserArtists")
    .upsert(userArtistBridge)
    .select("*");

  if (error) {
    return getError(error, "trying to access the 'UserArtists' table");
  } else {
    return userArtists;
  }
};

const getArtists = async (headers: HeadersType) => {
  // Get Recently Played
  const recentlyPlayed = await fetch(RECENTLY_PLAYED_ENDPOINT, headers);

  const { error, items: recentlyPlayedItems } = await recentlyPlayed.json();

  if (error) {
    return getError(
      error,
      "trying to access the Spotify 'Recently Played' Endpoint"
    );
  } else {
    const recentPlayedResult: any = await parseRecentlyPlayed(
      recentlyPlayedItems
    );

    // Get Top Tracks
    const topTracks = await fetch(GET_TOP_TRACKS_ENDPOINT, headers);
    const { error, items: topTracksItems } = await topTracks.json();

    if (error) {
      return getError(
        error,
        "trying to access the Spotify 'Top Tracks' Endpoint"
      );
    } else {
      const topTracksResult: any = await parseTopTracks(topTracksItems);

      // Get Followed Artists
      const followedArtists = await fetch(FOLLOWED_ARTISTS_ENDPOINT, headers);
      const { error, artists: followedTracks } = await followedArtists.json();

      if (error) {
        return getError(
          error,
          "trying to access the Spotify 'Followed Artists' Endpoint"
        );
      } else {
        const followedResult = await parseFollowed(followedTracks);

        let combinedArtists: foundArtistsOfUsersProps[] = Array.from(
          recentPlayedResult.concat(topTracksResult).concat(followedResult)
        );
        return combinedArtists;
      }
    }
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  userProfile.name = req.body.session.name;
  userProfile.spotify_user_id = req.body.session.id;
  userProfile.email = req.body.session.email;
  userProfile.mobilePhone = req.body.mobilePhone;
  userProfile.state = req.body.state;

  const headers = {
    headers: {
      Authorization: `Bearer ${req.body.session.accessToken}`,
      type: "artist",
    },
  };

  let { error, data } = await supabase
    .from("Users")
    .upsert(userProfile, {
      ignoreDuplicates: true,
      onConflict: "spotify_user_id",
    })
    .select("id,spotify_user_id,name,mobilePhone");

  if (error) {
    return res
      .status(500)
      .json(
        getError(error, "trying to add the new user to the 'Users' table.")
      );
  } else {
    if (data && data.length > 0) {
      data.map(async (userDataIds: IdsProps) => {
        // 1. GET ARTISTS OF USER
        let getArtistData: foundArtistsOfUsersProps | ErrorProps | any =
          await getArtists(headers);

        if (!getArtistData.error) {
          // 2. ADD THE USER'S ARTISTS
          const addArtistData: foundArtistsOfUsersProps[] | ErrorProps | any =
            await addArtists(getArtistData);

          // 3. ADD TO THE USER/ARTIST BRIDGING TABLE
          if (!addArtistData.error) {
            const addUserArtistData: any = await addUserArtists(
              userDataIds,
              addArtistData
            );

            if (!addUserArtistData.error) {
              // 4. END OF USERS, NOW MOVE TO EVENTS (GO BACK TO INDEX.TSX)
              return res.status(200).json(addUserArtistData);
            } else {
              return res.status(500).json(addUserArtistData);
            }
          } else {
            return res.status(500).json(addArtistData);
          }
        } else {
          return res.status(500).json(getArtistData);
        }

        // return res.status(200).json(artistData);
      });
    } else {
      // User already exists which is why no data was returned
      return res.status(200).json("user_exists");
    }
  }
}
