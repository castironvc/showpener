import NextAuth, { NextAuthOptions } from "next-auth";
import SpotifyProviders from "next-auth/providers/spotify";
import spotifyApi, { LOGIN_URL } from "../../../lib/spotify";
import { JWT } from "next-auth/jwt";
import { ProvidersType, UserProps } from "../../../types/globals";
let user: UserProps = {
  id: "",
  name: "",
  accessToken: "",
  refreshToken: "",
};
const options: NextAuthOptions = {
  providers: [
    SpotifyProviders<ProvidersType>({
      clientId: process.env.SPOTIFY_CLIENT_ID as string,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET as string,
      authorization: LOGIN_URL,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.JWT_SECRET as string,
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error", // Error code passed in query string as ?error=
  },
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      //   initial sign in

      const isSignIn = user ? true : false;
      const tmpToken: any = token.accessTokenExpiresAt;
      if (account && isSignIn) {
        token.user = { id: user!.id };

        console.log("New User");
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          accessTokenExpiresAt: account.expires_at! * 1000,
          user: profile,
        };
      }
      //   Return previous token if the access token has not expired yet
      else if (token && tmpToken > Date.now()) {
        console.log("Existing token still valid");

        return token;
      } else {
        //   Refresh token
        console.log("Need to refresh token");
        const gotToken = await refreshAccessToken(token);

        return gotToken;
      }
    },

    async session({ session, token }) {
      user.id = token.sub as string;
      user.name = token.name as string;
      user.accessToken = token.accessToken as string;
      user.refreshToken = token.refreshToken as string;
      session.user = user;
      session.accessTokenExpiry = token.accessTokenExpiry;
      session.error = token.error;
      return session;
    },
  },
};

async function refreshAccessToken(token: JWT) {
  try {
    spotifyApi.setAccessToken(token.accessToken as string);
    spotifyApi.setRefreshToken(token.refreshToken as string);

    const { body: refreshToken } = await spotifyApi.refreshAccessToken();

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

export default NextAuth(options);
