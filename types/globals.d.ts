// newuser.ts

export interface UserProps {
  id: string;
  name: string;
  accessToken: string;
  refreshToken: string;
}
export interface foundArtistsOfUsersProps {
  artistname: string;
  spotify_artist_id: string;
  external_url: string;
  uri: string;
}
export interface ArtistType {
  external_urls: { spotify: string };
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}
export interface NewUserProfileProps {
  name: string;
  email: string;
  mobilePhone: string;
  spotifyId: string;
  state: string;
  tc: boolean;
}
export interface IdsProps {
  id: number;
  spotifyId: string;
  name: string;
  mobilePhone: string;
}
[];
export interface HeadersType {
  headers: {
    Authorization: string;
    type: string;
  };
}
export interface userArtistBridgeProps {
  artist: string;
  user_id: number;
  user: string;
  artist_id: string;
  spotifyId: string;
  user_phone: String;
}

/// Providers
export interface Provider {
  callbackUrl: string;
  id: string;
  name: string;
  signinUrl: string;
  type: string;
}
export interface ProvidersType {
  clientId: string;
  clientSecret: string;
  authorization: string;
  id: string;
  display_name: string;
  email: string;
  images: any;
}
export interface UserProfileProps {
  session: any;
  mobilePhone: any;
  state: any;
}

export interface foundArtistsForEventProps {
  artists: foundArtistsOfUsersProps[];
  state: any;
}

export interface EventDetailProps {
  spotify_artist_id: string;
  artist_name: string;
  event_name: string;
  event_id: string;
  event_date: string;
  event_sale_date: string;
  event_url: string;
  state_code: string;
}
export interface shortEvent {
  artist_id: string;
  event_url: string;
}
export interface messageDetails {
  body: string;
  from: string | undefined;
  to: string;
}

export interface eventForBroadcast {
  id: number;
  artist: string;
  user_id: number;
  user: string;
  artist_id: string;
  spotifyId: string;
  user_phone: string;
}
