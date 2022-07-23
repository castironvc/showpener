import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useContext, useState } from "react";
import supabase from "../../lib/supabase";
import styles from "../../styles/thanks.module.css";
import { AppContext, DispatchContext } from "../../context/StateContext";
import { adminUserProps, Provider } from "../../types/globals";

import Roles from "../../components/Roles";
import Broadcast from "../../components/Broadcast";
import InputForm from "../../components/InputForm";
import "../api/spotify/test_recentplayed";
import { getProviders, signIn, useSession } from "next-auth/react";
let i: number = 0;
/* let getUserOnce: boolean = false; */
function Promoter({ providers }: { providers: { spotify: Provider } }) {
  const { state } = useContext(AppContext);
  const [session, setSession] = useState(supabase.auth.session());
  const [status, setStatus] = useState(
    session && session.user && session.user.aud
  );
  const [artists, setArtists] = useState([]);
  const [endpointTest, setEndpointTest] = useState(false);
  const [myuser, setUser] = useState<adminUserProps>();
  const [dataCapture, engageDataCapture] = useState<boolean>(false);
  const [getUserOnce, setGetUserOnce] = useState<boolean>(false);
  const [allUsers, setAllUsers] = useState<[adminUserProps]>();
  const router = useRouter();
  const { dispatch } = useContext(DispatchContext);
  const { status: fanstatus, data: fansession } = useSession();
  const errorRedirect = (message: string) => {
    router.push({
      pathname: "/Oops/",
      search: `?message=${encodeURIComponent(message)}`,
    });
    dispatch({
      type: "setLoader",
      payload: false,
    });
  };
  const logOut = async (e: any) => {
    setGetUserOnce(false);
    dispatch({
      type: "setLoader",
      payload: true,
    });
    const signedOut = await supabase.auth.signOut();
    dispatch({
      type: "setLoader",
      payload: false,
    });
    router.push({
      pathname: "/admin/",
      //  search: `?message=" + ${encodeURIComponent(result.details.message)}`,
    });
    dispatch({
      type: "resetState",
    });
  };

  const getAllUsers = async () => {
    const foundUsers = await fetch("/api/admin/getallusers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await foundUsers.json();

    if (result.error) {
      //errorRedirect(result.details.message);
      //   console.log(result.details.message);
    } else {
      //   console.log(result);
      setAllUsers(result);
    }
  };

  const getAdminUser = async () => {
    setGetUserOnce(true);

    const user = await fetch("/api/admin/getadminuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify("+" + session!.user!.phone),
    });

    const result = await user.json();

    if (result.error) {
      //errorRedirect(result.details.message);
      //  console.log(result.details.message);
    } else {
      setUser(result);

      if (result.adminName && result.role === "admin") {
        // console.log("Is Admin");
        getAllUsers();
      }
      if (!result.adminName) {
        engageDataCapture(!dataCapture);
      }
    }
  };
  const beginSignIn = () => {
    signIn("spotify", {
      callbackUrl: `/admin/Promoter`,
    });
  };
  const getRecentPlayed = async (endpoint: string, name: string) => {
    const postData = {
      session: fansession,
      endpoint: { name: name, url: endpoint },
    };
    const recentplayed = await fetch("../../api/spotify/test_recentplayed", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });

    const result = await recentplayed.json();

    if (result.error) {
      /*       errorRedirect(result.details.message); */
    } else {
      setArtists(result);
    }
  };

  useEffect(() => {
    if (session && status === "authenticated" && !getUserOnce) {
      getAdminUser();
    } else if ((session && status === "unauthenticated") || !session) {
      router.push({
        pathname: "/admin/",
        //  search: `?message=" + ${encodeURIComponent(result.details.message)}`,
      });
    }

    if (fanstatus === "unauthenticated") {
      beginSignIn();
    }

    dispatch({
      type: "setLoader",
      payload: false,
    });
  }, [getUserOnce, session, fanstatus]);

  return (
    <div className="centerColumnContent">
      <h1>Promoter Access</h1>

      {fanstatus === "authenticated" ? (
        <span
          className="top-right pillnav"
          onClick={() => setEndpointTest(true)}
        >
          API Test
        </span>
      ) : null}
      {endpointTest ? (
        <div className="absolute modal">
          <div
            className="top-right closex"
            onClick={() => setEndpointTest(false)}
          >
            X
          </div>
          {fanstatus && fanstatus === "authenticated" ? (
            <div className="mini-nav">
              <span
                onClick={() =>
                  getRecentPlayed(
                    "https://api.spotify.com/v1/me/player/recently-played?offset=0&limit=50",
                    "recentlyplayed"
                  )
                }
              >
                Recently Played
              </span>
              <span
                onClick={() =>
                  getRecentPlayed(
                    "https://api.spotify.com/v1/me/top/tracks?offset=0&limit=50",
                    "toptracks"
                  )
                }
              >
                Get Top Tracks
              </span>
              <span
                onClick={() =>
                  getRecentPlayed(
                    "https://api.spotify.com/v1/me/following?type=artist&offset=0&limit=50",
                    "followedartists"
                  )
                }
              >
                Followed Artists
              </span>
              <span
                onClick={() =>
                  getRecentPlayed(
                    "https://api.spotify.com/v1/me/tracks?offset=0&limit=50",
                    "likedtracks"
                  )
                }
              >
                Liked Tracks
              </span>
            </div>
          ) : (
            <div className="fieldContainer">
              {Object.values(providers).map((provider: Provider) => (
                <div key={provider.toString()}>
                  <button className="submitButton" onClick={beginSignIn}>
                    <span>Log in with {provider.name}</span>
                  </button>
                </div>
              ))}
            </div>
          )}
          <div className="testArtist-result">
            {fanstatus &&
              artists &&
              artists.map((artist: any, i: number) => {
                return (
                  <div
                    className="testrecord"
                    key={artist.spotify_artist_id + "" + i}
                  >
                    {artist.artistname}
                  </div>
                );
              })}
          </div>
        </div>
      ) : null}
      <div className="messageContainer">
        {myuser && myuser.role === "standard" ? (
          <p>
            Your request for promoter access has been submitted.
            <br />
            We will be in touch soon.
          </p>
        ) : null}
        <div>
          {!dataCapture && myuser ? (
            <div>
              {myuser && myuser.role === "admin" && allUsers ? (
                <Roles
                  allUsers={allUsers}
                  getAllUsers={getAllUsers}
                  myuser={myuser}
                />
              ) : null}
              {(myuser && myuser.role === "promoter") ||
              (myuser && myuser.role === "admin") ? (
                <Broadcast myuser={myuser} />
              ) : null}
            </div>
          ) : (
            <div>
              {myuser ? (
                <InputForm
                  myuser={myuser}
                  engageDataCapture={engageDataCapture}
                  /*    setGetUserOnce={setGetUserOnce} */
                />
              ) : null}
            </div>
          )}
        </div>
        {state.error.message ? (
          <div className="notice">{state.error.message}</div>
        ) : null}
        <div></div>
        <span className="whitelink" onClick={logOut}>
          Log out
        </span>
        {/*     <button className="submitButton" onClick={logOut}>
        <span>Log out</span>
      </button> */}
      </div>
    </div>
  );
}

export default Promoter;
export const getServerSideProps: GetServerSideProps = async ({}) => {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
};
