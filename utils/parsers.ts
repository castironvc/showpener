import { foundArtistsOfUsersProps, ArtistType } from "../types/globals";
export const parseRecentlyPlayed = async (data: any) => {
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
export const parseTopTracks = async (data: any) => {
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
export const parseFollowed = async (data: any) => {
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
