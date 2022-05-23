import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import { getProviders, signIn, signOut, useSession } from "next-auth/react";
import { Provider } from "../types/globals";
import Image from "next/image";
import styles from "../styles/connectSpotify.module.css";
import { AppContext, DispatchContext } from "../context/StateContext";
function ConnectSpotify({ providers }: { providers: { spotify: Provider } }) {
  const { state } = useContext(AppContext);
  const { dispatch } = useContext(DispatchContext);
  const router = useRouter();
  const { status, data: session } = useSession();
  type UserProfileProps = {
    session: any;
    mobilePhone: any;
    state: any;
  };
  type foundArtistProps = {
    artists: any;
    state: any;
  };
  const tmpProfile: UserProfileProps = {
    session: {},
    mobilePhone: "",
    state: "",
  };
  tmpProfile.mobilePhone = state.userProfile.mobilePhone;
  const setStateRegion = (region: string) => {
    dispatch({
      type: "setRegion",
      payload: region,
    });
  };
  const fetchTicketData = async (tmpArray: foundArtistProps) => {
    const events = await fetch("/api/tm/getallevents", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tmpArray),
    });

    const result = await events.json();

    return result;
  };

  const welcomeText = async (tmpProfile: UserProfileProps) => {
    const user = await fetch("/api/sms/init", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tmpProfile),
    });

    const result = await user.json();
    console.log(result);
  };

  const createNewUser = async (tmpProfile: UserProfileProps) => {
    const user = await fetch("/api/spotify/newuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tmpProfile),
    });

    const result = await user.json();
    const artistObj: foundArtistProps = {
      artists: result,
      state: tmpProfile.state,
    };

    // STEP 2: THIS IS WHERE WE GET THE TICKET DATA FOR THE USER'S ARTISTS WE JUST EXTRACTED
    const ticketData = await fetchTicketData(artistObj);
    console.log(ticketData);

    // STEP 3: SEND WELCOME TEXT MESSAGE

    await welcomeText(tmpProfile);
    return ticketData;

    //// ***** HERE IS WHERE IT ALL ENDS
  };
  useEffect(() => {
    console.log(session);
    if (session) {
      /*    userProfile.spotifyId = session.user!.tc; */
      tmpProfile.mobilePhone = router.query.phone;
      tmpProfile.state = router.query.state;
      tmpProfile.session = session.user;

      // STEP 1: THIS IS WHERE WE BEGIN THE PROCESS OF ADDING A NEW USER AND EXTRACTING THEIR ARTISTS
      createNewUser(tmpProfile);
      /*       welcomeText(tmpProfile); */
      if (status === "authenticated") {
        router.push({
          pathname: "/Thanks",
        });
      }
      /*   router.push("/"); */
    }
  });

  /*   if (status === "authenticated") {
    router.push("/Thanks");
  } else {
    router.push("/");
  } */
  return (
    <div className={styles.container}>
      {/*       {router.query.phone ? ( */}
      <div className={styles.main}>
        {Object.values(providers).map((provider: Provider) => (
          <div key={provider.id} className="">
            <div className={styles.card}>
              <h1 className={styles.mainTitle}>Connect Spotify</h1>
              <div className={styles.spotifyVisualInstructions}>
                <Image
                  src="/images/Spotify.svg"
                  width={140}
                  height={60}
                  className=""
                  alt=""
                />
                <Image
                  src="/images/Arrow.svg"
                  width={140}
                  height={20}
                  className=""
                  alt=""
                />
                <Image
                  src="/images/Showpener_logo_transparent.svg"
                  width={140}
                  height={60}
                  className=""
                  alt=""
                />
              </div>
              <div className={styles.textContainer}>
                Enter your state and connect with Spotify in order to build your
                list of personalized artists that are performing{" "}
                <span className="widow">near you:</span>
              </div>

              <div className={styles.fieldContainer}>
                <input
                  id="state-region"
                  name="state-region"
                  type="text"
                  value={state.userProfile.state}
                  onChange={(e) => setStateRegion(e.target.value)}
                  required
                  className={styles.input}
                  placeholder="Enter state"
                />
              </div>
              <div className={styles.buttonContainer}>
                <button
                  className={styles.submitButton}
                  onClick={() =>
                    signIn(provider.id, {
                      callbackUrl: `/ConnectSpotify?phone=${state.userProfile.mobilePhone}&state=${state.userProfile.state}`,
                    })
                  }
                >
                  <span>Log in with {provider.name}</span>
                </button>
              </div>
            </div>

            {/*      <div>
          <button
            onClick={() => signIn(provider.id, { callbackUrl: "/Login" })}
            className="rounded-lg bg-[#18D860] p-5 text-white"
          >
            Log in with {provider.name}{" "}
          </button>
          <button
            onClick={logOut}
            className="rounded-lg bg-[#18D860] p-5 text-white"
          >
            Log Out
          </button>
        </div> */}
            <div className={styles.disclaimer}>
              We will not be sharing your personal information with{" "}
              <span className="widow">third parties.</span>
            </div>
          </div>
        ))}
      </div>
      {/*       ) : null} */}
    </div>
  );
}

export default ConnectSpotify;

export const getServerSideProps: GetServerSideProps = async ({}) => {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
};
