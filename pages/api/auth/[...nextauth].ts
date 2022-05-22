import NextAuth, { NextAuthOptions } from "next-auth";
import SpotifyProviders from "next-auth/providers/spotify";
import spotifyApi, { LOGIN_URL } from "../../../lib/spotify";
import { JWT } from "next-auth/jwt";

type ProvidersType = {
  clientId: string;
  clientSecret: string;
  authorization: string;
  id: string;
  display_name: string;
  email: string;
  images: any;
};
async function refreshAccessToken(token: JWT) {
  try {
    spotifyApi.setAccessToken(token.accessToken as string);
    spotifyApi.setRefreshToken(token.refreshToken as string);

    const { body: refreshToken } = await spotifyApi.refreshAccessToken();

    console.log("Refreshed access token is", refreshToken);
    return {
      ...token,
      accessToken: refreshToken.access_token,
      accessTokenExpiresAt: Date.now() + refreshToken.expires_in * 1000,
      refreshToken: refreshToken.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    return {
      ...token,
      error: "Refresh token failed",
    };
  }
}

export default NextAuth({
  providers: [
    SpotifyProviders<ProvidersType>({
      clientId: process.env.SPOTIFY_CLIENT_ID as string,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET as string,
      authorization: LOGIN_URL,
    }),
  ],
  secret: process.env.JWT_SECRET as string,
  pages: {
    signIn: "/ConnectSpotify",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      //   initial sign in
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          accessTokenExpiresAt: account.expires_at! * 1000,
          user,
        };
      }

      //   Return previous token if the access token has not expired yet
      const tmpToken: any = token.accessTokenExpiresAt;
      if (token && tmpToken > Date.now()) {
        console.log("Existing token still valid");
        /*         console.log(token); */
        return token;
      }

      //   Refresh token
      const gotToken = await refreshAccessToken(token);
      return gotToken;
    },
    async session({ session, token }) {
      let user: any = session.user as string;
      user = token.user;
      user.accessToken = token.accessToken;
      user.refreshToken = token.refreshToken;
      user.name = token.name;
      session.user = user;

      return session;
    },
  },
});
