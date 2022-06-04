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
  spotify_user_id: string;
  state: string;
  tc: boolean;
}
export interface adminProfileProps {
  mobilePhone: string;
  role: string;
}
export interface adminUserProps {
  id: number;
  created_at: string;
  mobilePhone: string;
  role: string;
}
export interface IdsProps {
  id: number;
  spotify_user_id: string;
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
  spotify_artist_id: string;
  spotify_user_id: string;
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
export interface UserProfileAdminProps {
  session: any;
  mobilePhone: any;
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
  spotify_artist_id: string;
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
  spotify_artist_id: string;
  spotify_user_id: string;
  user_phone: string;
}
export interface errorProps {
  error: {
    message: string;
    code: string;
    details?: object;
    hint: string;
  };
  success: boolean;
}

export interface errorProps {
  server: any;
  details: {
    message: string;
  };
  error: boolean;
}
