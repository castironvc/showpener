// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import supabase from "../../../lib/supabase";

const RECENTLY_PLAYED_ENDPOINT = `https://api.spotify.com/v1/me/player/recently-played`;
const GET_TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks`;
const FOLLOWED_ARTISTS_ENDPOINT = `https://api.spotify.com/v1/me/following?type=artist`;

type UserProfileProps = {
  name: string;
  email: string;
  mobilePhone: string;
  spotifyId: string;
  state: string;
  tc: boolean;
};

const userProfile: UserProfileProps = {
  name: "",
  email: "",
  mobilePhone: "",
  spotifyId: "",
  state: "",
  tc: true,
};
type IdsProps = [
  {
    id: number;
    spotifyId: string;
    name: string;
  }
];
type foundArtistProps = {
  artistname: string;
  spotify_artist_id: string;
  external_url: string;
  uri: string;
};

type HeadersType = {
  headers: {
    Authorization: string;
    type: string;
  };
};

const addArtists = async (records: foundArtistProps[], ids: IdsProps) => {
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
      let tmpArr: foundArtistProps[] = new Array();
      data!.map(async (item: any) => {
        tmpArr.push(item);
      });
      await addUserArtists(ids, tmpArr);
    }
    return data;
  }
};

type userArtistBridgeProps = {
  artist: string;
  user_id: number;
  user: string;
  artist_id: string;
  spotifyId: string;
};

const addUserArtists = async (ids: any, artistData: foundArtistProps[]) => {
  const userArtistBridge: userArtistBridgeProps[] = new Array();
  console.log(ids);
  artistData.map((artist: foundArtistProps) => {
    userArtistBridge.push({
      artist: artist.artistname,
      user_id: ids.id,
      user: ids.name,
      artist_id: artist.spotify_artist_id,
      spotifyId: ids.spotifyId,
    });
  });
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
  let tmpArr: foundArtistProps[] = new Array();
  console.log(data);
  if (data) {
    data.items.map((track: any) => {
      track.track.artists.map((artist: any) => {
        const foundArtists: foundArtistProps = {
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
  let tmpArr: foundArtistProps[] = new Array();
  if (data) {
    data.items.map((track: any) => {
      track.artists.map((artist: any) => {
        const foundArtists: foundArtistProps = {
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
  let tmpArr: foundArtistProps[] = new Array();
  if (data) {
    data.artists.items.map((artist: any) => {
      const foundArtists: foundArtistProps = {
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
const getArtists = async (headers: HeadersType, ids: any) => {
  const foundArtists = {
    recentPlayed: null,
    topTracks: null,
    followedArtists: null,
  };

  // Get Recently Played
  const recentlyPlayed = await fetch(RECENTLY_PLAYED_ENDPOINT, headers);
  const recentPlayedJson = await recentlyPlayed.json();
  const recentPlayedResult: any = await parseRecentlyPlayed(recentPlayedJson);
  /*   artistSet.add(recentPlayedResult); */
  foundArtists.recentPlayed = recentPlayedJson;

  // Get Top Tracks
  const topTracks = await fetch(GET_TOP_TRACKS_ENDPOINT, headers);
  const topTracksJson = await topTracks.json();
  const topTracksResult: any = await parseTopTracks(topTracksJson);

  foundArtists.topTracks = topTracksJson;

  // Get Followed Artists
  const followedArtists = await fetch(FOLLOWED_ARTISTS_ENDPOINT, headers);
  const followedArtistsJson = await followedArtists.json();
  const followedResult = await parseFollowed(followedArtistsJson);

  foundArtists.followedArtists = followedArtistsJson;
  /*   type foundArtistProps = {
    artistname: string;
    spotify_artist_id: string;
    external_url: string;
    uri: string;
  }; */
  let combinedArtists: foundArtistProps[] = Array.from(
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

  console.log(userProfile);

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
    .select("id,spotifyId,name");

  if (error) {
    return res.status(200).json(error);
  } else {
    data!.map(async (id: any) => {
      let artistData: foundArtistProps[] = await getArtists(headers, id);
      return res.status(200).json(artistData);
    });
  }
}
