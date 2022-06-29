import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useState, useContext, useEffect, useRef } from "react";
import { newUserAdminEmail } from "../utils/adminemail";
import { AppContext, DispatchContext } from "../context/StateContext";
import { normalizePhone } from "../utils/validation";

import getStateCode from "../utils/getStateCode";

import {
  getProviders,
  signIn,
  signOut,
  getSession,
  useSession,
} from "next-auth/react";

import {
  Provider,
  foundArtistsForEventProps,
  UserProfileProps,
  adminEmailProps,
} from "../types/globals";
let states = require("../utils/states");
const randNum = Math.floor(Math.random() * 4);

let disableLoader: boolean = false;
function Home({ providers }: { providers: { spotify: Provider } }) {
  const { state } = useContext(AppContext);
  const [checked, acceptTerms] = useState(false);
  const { dispatch } = useContext(DispatchContext);
  const router = useRouter();
  const { status, data: session } = useSession();
  const [stateCodes, setStates] = useState(states);

  // handle errors
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
  const thanksRedirect = () => {
    let thanked: boolean = false;
    if (!thanked) {
      router.push({
        pathname: "/Thanks/",
      });
      thanked = true;
    }
  };

  // set the form fields to the state
  const setPhone = (phone: string) => {
    dispatch({
      type: "setPhone",
      payload: phone,
    });
  };
  const setStateRegion = (stateCode: any) => {
    dispatch({
      type: "setRegion",
      payload: getStateCode(stateCode),
    });
  };

  const beginSignIn = async () => {
    dispatch({
      type: "setLoader",
      payload: true,
    });

    const token = signIn("spotify", {
      callbackUrl: `/?phone=${state.userProfile.mobilePhone}&state=${state.userProfile.state}`,
    });

    console.log(token);
    return token;

    /*     const user = await fetch("/api/auth/getToken", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });

    console.log(user); */
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

    if (result.error) {
      errorRedirect(result.details.message);
    } else if (result === "user_exists") {
      thanksRedirect();
    } else {
      // Retrieved the stuff needed to proceed to TicketMaster for the event data
      const artistObj: foundArtistsForEventProps = {
        artists: result,
        state: state.userProfile.state,
      };
      const newUserEmail: adminEmailProps = {
        name: state.userProfile.session.name,
        mobilePhone: state.userProfile.mobilePhone,
        state: state.userProfile.state,
      };

      // SEND EMAIL TO CHARLIE
      const adminEmail = await newUserAdminEmail("new_enduser", newUserEmail);

      // STEP 2: THIS IS WHERE WE GET THE TICKET DATA FOR THE USER'S ARTISTS WE JUST EXTRACTED

      const ticketData = await fetchTicketData(artistObj);

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
          thanksRedirect();
        }
        return ticketData;
      }
      /*       dispatch({
        type: "setLoader",
        payload: false,
      }); */
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
    console.log(session);
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
    } else {
      dispatch({
        type: "setLoader",
        payload: false,
      });
    }
    if (status === "authenticated" && !router.query.phone) {
      thanksRedirect();
    }
  }, [session]);

  return (
    <div>
      {!state.loading && status === "unauthenticated" ? (
        <>
          {Object.values(providers).map((provider: Provider) => (
            <div key={provider.id}>
              <h1 className="mainTitle">Showpener</h1>
              <h2 className="subTitle">Never Miss A Show</h2>
              <p className="center-text para">
                Get personal text alerts for upcoming concerts in your area.
              </p>
              <div>
                <input type="hidden" name="remember" defaultValue="true" />
                <div className="statePhoneFieldContainer">
                  <div className="fieldContainer">
                    <div className="hint">Enter your phone number</div>
                    <input
                      id="phone-number"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      value={state.userProfile.mobilePhone}
                      onChange={(e) =>
                        setPhone(normalizePhone(e.target.value) || "")
                      }
                      className="input"
                      placeholder="(000) 000-0000"
                    />
                  </div>
                  <div className="fieldContainer">
                    <div className="hint">Choose your state</div>
                    <select
                      className="select"
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
                <div className="checkboxContainer">
                  <input
                    type="checkbox"
                    id="TC"
                    checked={checked}
                    onChange={() => acceptTerms(!checked)}
                    value="I agree to Showpener's Terms of Usage & Privacy Policy"
                  ></input>
                  <label htmlFor="TC" className="">
                    I agree to Showpener&apos;s{" "}
                    <a className="links" href="/Terms" target="_blank">
                      Terms
                    </a>{" "}
                    &{" "}
                    <a className="links" href="/Privacy" target="_blank">
                      Privacy Policy
                    </a>
                  </label>
                </div>
                <div className="fieldContainer">
                  <button
                    className="submitButton"
                    disabled={!checked}
                    onClick={beginSignIn}
                  >
                    <span>Log in with {provider.name}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </>
      ) : null}
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
