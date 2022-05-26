// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { StringifyOptions } from "querystring";
import supabase from "../../../lib/supabase";
import {
  foundArtistsOfUsersProps,
  NewUserProfileProps,
  IdsProps,
  HeadersType,
  userArtistBridgeProps,
  ArtistType,
} from "../../../types/globals";
const RECENTLY_PLAYED_ENDPOINT = `https://api.spotify.com/v1/me/player/recently-played`;
const GET_TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks`;
const FOLLOWED_ARTISTS_ENDPOINT = `https://api.spotify.com/v1/me/following?type=artist`;

const userProfile: NewUserProfileProps = {
  name: "",
  email: "",
  mobilePhone: "",
  spotifyId: "",
  state: "",
  tc: true,
};

const addArtists = async (
  records: foundArtistsOfUsersProps[],
  ids: IdsProps
) => {
  let { error, data } = await supabase
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
    return error;
  } else {
    if (data!.length > 0) {
      let tmpArr: foundArtistsOfUsersProps[] = new Array();
      data!.map(async (item: foundArtistsOfUsersProps) => {
        tmpArr.push(item);
      });

      await addUserArtists(ids, tmpArr);
    }
    return data;
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
      artist_id: artist.spotify_artist_id,
      spotifyId: ids.spotifyId,
      user_phone: ids.mobilePhone,
    });
  });

  // UPDATE THE USER ARTISTS TABLE
  let { error, data } = await supabase
    .from("UserArtists")
    .upsert(userArtistBridge);

  if (error) {
    return error;
  } else {
    return data;
  }
};

const parseRecentlyPlayed = async (data: any) => {
  let tmpArr: foundArtistsOfUsersProps[] = new Array();
  if (data) {
    data.map((track: any) => {
      track.track.artists.map((artist: ArtistType) => {
        const foundArtists: foundArtistsOfUsersProps = {
          artistname: artist.name,
          spotify_artist_id: artist.id,
          external_url: artist.external_urls.spotify,
          uri: artist.uri,
        };
        tmpArr.push(foundArtists);
      });
    });
    return tmpArr;
  } else {
    console.log("No Recently Played Tracks");
    ("No Recently Played Tracks");
  }
};
const parseTopTracks = async (data: any) => {
  let tmpArr: foundArtistsOfUsersProps[] = new Array();
  if (data) {
    data.map((track: any) => {
      track.artists.map((artist: ArtistType) => {
        const foundArtists: foundArtistsOfUsersProps = {
          artistname: artist.name,
          spotify_artist_id: artist.id,
          external_url: artist.external_urls.spotify,
          uri: artist.uri,
        };
        tmpArr.push(foundArtists);
      });
    });
    return tmpArr;
  } else {
    console.log("No Top Tracks");
    return "No Top Tracks";
  }
};
const parseFollowed = async (data: any) => {
  let tmpArr: foundArtistsOfUsersProps[] = new Array();
  if (data) {
    data.items.map((artist: ArtistType) => {
      const foundArtists: foundArtistsOfUsersProps = {
        artistname: artist.name,
        spotify_artist_id: artist.id,
        external_url: artist.external_urls.spotify,
        uri: artist.uri,
      };
      tmpArr.push(foundArtists);
    });
    return tmpArr;
  } else {
    console.log("No Followed Tracks");
    return "No Followed Tracks";
  }
};
const getArtists = async (headers: HeadersType, ids: IdsProps) => {
  // Get Recently Played
  const recentlyPlayed = await fetch(RECENTLY_PLAYED_ENDPOINT, headers);
  const recentPlayedJson = await recentlyPlayed.json();
  const recentPlayedResult: any = await parseRecentlyPlayed(
    recentPlayedJson.items
  );

  // Get Top Tracks
  const topTracks = await fetch(GET_TOP_TRACKS_ENDPOINT, headers);
  const topTracksJson = await topTracks.json();
  const topTracksResult: any = await parseTopTracks(topTracksJson.items);

  // Get Followed Artists
  const followedArtists = await fetch(FOLLOWED_ARTISTS_ENDPOINT, headers);
  const followedArtistsJson = await followedArtists.json();
  const followedResult = await parseFollowed(followedArtistsJson.artists);

  let combinedArtists: foundArtistsOfUsersProps[] = Array.from(
    recentPlayedResult.concat(topTracksResult).concat(followedResult)
  );

  await addArtists(combinedArtists, ids);

  return combinedArtists;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  userProfile.name = req.body.session.name;
  userProfile.spotifyId = req.body.session.id;
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
      onConflict: "spotifyId",
    })
    .select("id,spotifyId,name,mobilePhone");

  if (error) {
    return res.status(200).json(error);
  } else {
    data!.map(async (id: IdsProps) => {
      let artistData: foundArtistsOfUsersProps[] = await getArtists(
        headers,
        id
      );

      return res.status(200).json(artistData);
    });
  }
}
