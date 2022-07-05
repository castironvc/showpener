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
  mobilePhone: string;
  spotify_user_id: string;
  state: string;
  tc: boolean;
}
export interface FindUserProps {
  id: number;
  created_at: string;
  name: string;
  mobilePhone: string;
  spotify_user_id: string;
  tc: boolean;
  state: string;
}

export interface adminProfileProps {
  mobilePhone: string;
  role: string;
  totalmessages: number;
}
export interface adminUserProps {
  id: number;
  created_at: string;
  mobilePhone: string;
  role: string;
  totalmessages: number;
  adminName: string;
  adminEmail: string;
  adminPhone: string;
  adminMessage: string;
}
export interface IdsProps {
  id: number;
  spotify_user_id: string;
  name: string;
  mobilePhone: string;
  state: string;
}
[];

export interface ArtistProps {
  id: number;
  artistname: string;
  spotify_artist_id: string;
  external_url: string;
  uri: string;
}
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
  user_phone: string;
  user_state: string;
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
export interface adminMessagesProps {
  id: number;
  created_at: string;
  userid: number;
  message: string;
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
  state_code: string;
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
export interface adminEmailProps {
  mobilePhone: string;
  name: string;
  state: string;
}
