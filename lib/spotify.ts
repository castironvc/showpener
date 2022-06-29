import SpotifyWebApi from "spotify-web-api-node";

require("dotenv").config({ path: "../.env" });
const scopes = [
  "user-read-private",
  "user-read-email",
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",
  "user-top-read",
  "user-read-playback-position",
  "user-read-recently-played",
  "playlist-read-collaborative",
  "playlist-modify-public",
  "playlist-read-private",
  "playlist-modify-private",
  "user-follow-read",
  "user-library-read",
].join(",");

const params = {
  scope: scopes,
};

const query = new URLSearchParams(params);

const LOGIN_URL = `https://accounts.spotify.com/authorize?${query.toString()}`;

export { LOGIN_URL };
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID as string,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET as string,
});

export default spotifyApi;
