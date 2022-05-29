import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useContext, useEffect, useRef } from "react";
import styles from "../styles/Home.module.css";
import { AppContext, DispatchContext } from "../context/StateContext";
import { normalizePhone } from "../utils/validation";
import getStateCode from "../utils/getStateCode";
import { Loader } from "../components/Loader";
import { getProviders, signIn, signOut, useSession } from "next-auth/react";

import {
  Provider,
  foundArtistsForEventProps,
  UserProfileProps,
} from "../types/globals";
import { ErrorProps } from "next/error";

let states = require("../utils/states");

function Home({ providers }: { providers: { spotify: Provider } }) {
  const { state } = useContext(AppContext);
  const [checked, acceptTerms] = useState(false);
  const [error, setError] = useState(false);
  const { dispatch } = useContext(DispatchContext);
  const router = useRouter();
  const { status, data: session } = useSession();
  const [stateCodes, setStates] = useState(states);
  const inputEl = useRef(null);
  /*   if (status === "authenticated") {
    router.push("/Thanks");
  }
 */

  // handle errors
  const errorRedirect = (message: string) => {
    router.push({
      pathname: "/Oops/",
      search: `?message=${encodeURIComponent(message)}`,
    });
  };

  // set the form fields to the state
  const setPhone = (phone: string) => {
    dispatch({
      type: "setPhone",
      payload: phone,
    });
  };
  const setStateRegion = (stateCode: any) => {
    console.log(getStateCode(stateCode));
    dispatch({
      type: "setRegion",
      payload: getStateCode(stateCode),
    });
  };

  const beginSignIn = (provider: Provider) => {
    dispatch({
      type: "setLoader",
      payload: true,
    });
    signIn(provider.id, {
      callbackUrl: `/?phone=${state.userProfile.mobilePhone}&state=${state.userProfile.state}`,
    });
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
    console.log(result);

    if (result.error) {
      errorRedirect(result.details.message);
    } else if (result === "user_exists") {
      router.push({
        pathname: "/Thanks",
        //  search: `?message=" + ${encodeURIComponent(result.details.message)}`,
      });
    } else {
      // Retrieved the stuff needed to proceed to TicketMaster for the event data
      const artistObj: foundArtistsForEventProps = {
        artists: result,
        state: state.userProfile.state,
      };

      // STEP 2: THIS IS WHERE WE GET THE TICKET DATA FOR THE USER'S ARTISTS WE JUST EXTRACTED

      const ticketData = await fetchTicketData(artistObj);

      console.log(ticketData);

      if (ticketData.error) {
        errorRedirect(ticketData.details.message);
      } else {
        if (!ticketData || ticketData.length < 1) {
          console.log("No Events Found");
          dispatch({
            type: "setError",
            payload:
              "The events that were found either had no event date, no on sale date, or the on sale date was in the past.",
          });
        } else {
          console.log("Events Found");
        }

        // STEP 3: SEND WELCOME TEXT MESSAGE
        await welcomeText(state.userProfile);

        if (status === "authenticated") {
          router.push({
            pathname: "/Thanks",
          });
        }
        return ticketData;
      }
      //// ***** HERE IS WHERE IT ALL ENDS
    }
  };

  const fetchTicketData = async (tmpArray: foundArtistsForEventProps) => {
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

  const sendAlertsToUsers = async (e: any) => {
    e.preventDefault();
    const events = await fetch("/api/sms/B3783766e49a2a83c03a0addbe3f7", {
      method: "GET",
    });

    const result = await events.json();
    console.log(result);
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

  useEffect(() => {
    console.log(status);
    if (
      session &&
      router.query.phone &&
      status === "authenticated" &&
      state.userProfile.mobilePhone === ""
    ) {
      state.userProfile.mobilePhone = router.query.phone;
      state.userProfile.state = router.query.state;
      state.userProfile.session = session.user;

      // STEP 1: THIS IS WHERE WE BEGIN THE PROCESS OF ADDING A NEW USER AND EXTRACTING THEIR ARTISTS
      createNewUser(state.userProfile);
      /*       welcomeText(tmpProfile); */

      /*   router.push("/"); */
    } else if (status === "authenticated") {
      router.push({
        pathname: "/Thanks",
      });
    }
  });

  return (
    <div className={styles.container}>
      <div ref={inputEl}></div>
      {state.loading ? <Loader /> : null}
      {!router.query.phone ? (
        <div className={styles.main}>
          {Object.values(providers).map((provider: Provider) => (
            <div key={provider.id} className="">
              <div className="logo">
                <Image
                  src="/images/Showpener_logo.svg"
                  layout="responsive"
                  width={140}
                  height={35}
                  className=""
                  alt=""
                ></Image>
              </div>
              <div className={styles.formContainer}>
                <h1 className={styles.mainTitle}>Showpener</h1>
                <h2 className={styles.subTitle}>Never Miss A Show.</h2>
                <p className={styles.p}>
                  Text alerts for new concerts in your area and ticket sale
                  releases.
                </p>

                <input type="hidden" name="remember" defaultValue="true" />
                <div className={styles.statePhoneFieldContainer}>
                  <div className={styles.fieldContainer}>
                    <div className={styles.hint}>Enter your phone number.</div>
                    <input
                      id="phone-number"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      value={state.userProfile.mobilePhone}
                      onChange={(e) =>
                        setPhone(normalizePhone(e.target.value) || "")
                      }
                      className={styles.input}
                      placeholder="(000) 000-0000"
                    />
                  </div>
                  <div className={styles.fieldContainer}>
                    <div className={styles.hint}>Enter your state.</div>
                    <select
                      className={styles.select}
                      onChange={(e) => setStateRegion(e.target)}
                    >
                      {stateCodes.states.map((stateCode: any, i: number) => (
                        <option
                          key={i}
                          id={Object.keys(stateCode)[i]}
                          value={Object.keys(stateCode)[i]}
                        >
                          {Object.values(stateCode)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className={styles.checkboxContainer}>
                  <input
                    type="checkbox"
                    id="TC"
                    onChange={() => acceptTerms(!checked)}
                    value="I agree to Showpener's Terms of Usage & Privacy Policy"
                  ></input>
                  <label htmlFor="TC" className="">
                    I agree to Showpener&apos;s Terms & Privacy Policy
                  </label>
                </div>
                <div className={styles.fieldContainer}>
                  <button
                    className={styles.submitButton}
                    disabled={!checked}
                    onClick={() => beginSignIn(provider)}
                  >
                    <span>Log in with {provider.name}</span>
                  </button>
                </div>
              </div>
              <div className={styles.disclaimer}>
                We will not be sharing your personal information with{" "}
                <span className="widow">third parties.</span>
              </div>
            </div>
          ))}
        </div>
      ) : null}
      {/*   <button
        onClick={logOut}
        className="rounded-lg bg-[#18D860] p-5 text-white"
      >
        Log Out
      </button> */}
    </div>
  );
}

export default Home;
export const getServerSideProps: GetServerSideProps = async ({}) => {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
};
