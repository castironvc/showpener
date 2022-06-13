import React, { FunctionComponent /* useState */ } from "react";
import { ArtistProps, adminUserProps } from "../types/globals";

import Image from "next/image";
import getStateCode from "../utils/getStateCode";
import { useState, useEffect, useContext } from "react";
import styles from "../styles/Home.module.css";
import adminstyles from "../styles/Admin.module.css";
import { AppContext, DispatchContext } from "../context/StateContext";
import { useRouter } from "next/router";
const costPerUser: number = 1;
type BroadcasterProps = {
  /*   userid: number; */
  myuser: adminUserProps;
};

const Broadcast: FunctionComponent<BroadcasterProps> = ({
  /* userid */
  myuser,
}) => {
  /*  const [logoChoice, logoSet] = useState(logo); */
  let states = require("../utils/states");
  const [stateRegion, setStateRegion] = useState<string>();
  const [artist, setArtist] = useState<string>();
  const [stateCodes, setStates] = useState(states);
  const router = useRouter();
  const [getArtistOnce, setGetArtistOnce] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [artists, setAllArtists] = useState<ArtistProps[]>([]);
  const [dollarAmount, setDollarAmount] = useState(0);
  const [foundUsers, setFoundUsers] = useState(0);
  const { state } = useContext(AppContext);
  const { dispatch } = useContext(DispatchContext);

  const errorRedirect = (message: string) => {
    router.push({
      pathname: "/Oops/",
      search: `?message=${encodeURIComponent(message)}`,
    });
  };
  const setBroadcastMessage = (message: string) => {
    dispatch({
      type: "SET_ADMIN_BROADCASTMESSAGE",
      payload: message,
    });
  };

  const saveBroadcastMessage = async () => {
    dispatch({
      type: "setLoader",
      payload: true,
    });

    const saveBroadcast = await fetch("/api/admin/postbroadcastmessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        message: state.admin.adminBroadcastMessage,
        userid: myuser.id,
      }),
    });
    const result = await saveBroadcast.json();

    if (result.error) {
      //  errorRedirect(result.details.message);
      console.log(result.error);
    } else {
      setSubmitted(true);
      console.log(result);
      /*       setGetUserOnce(false);
      engageDataCapture(false); */
    }
    dispatch({
      type: "setLoader",
      payload: false,
    });
  };
  const findFans = async () => {
    dispatch({
      type: "setLoader",
      payload: true,
    });
    setGetArtistOnce(true);

    const foundFans = await fetch("/api/admin/findfans", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ stateCode: stateRegion, artist: artist }),
    });

    const result = await foundFans.json();

    if (result.error) {
      //errorRedirect(result.details.message);
      console.log(result.details.message);
    } else {
      console.log(result);
      setFoundUsers(result.length);
      setDollarAmount(result.length * costPerUser);
      //   setAllArtists(result);
    }
    dispatch({
      type: "setLoader",
      payload: false,
    });
  };
  const getAllArtists = async () => {
    setGetArtistOnce(true);
    const foundArtists = await fetch("/api/admin/getallartists", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await foundArtists.json();

    if (result.error) {
      console.log(result.error);
      errorRedirect(result.error);
      //errorRedirect(result.details.message);
      console.log(result.details.message);
    } else {
      console.log(result);
      setAllArtists(result);
    }
  };

  useEffect(() => {
    if (!getArtistOnce) {
      getAllArtists();
    }
  });
  return (
    <div>
      <p>
        Choose and artist and event state in order to estimate send size and
        cost to reach our network of fans.
      </p>

      <div className={adminstyles.twoColumn}>
        <div className={styles.fieldContainer}>
          <div className={styles.hint}>Pick an artist</div>
          <select
            className={styles.select}
            onChange={(e) => setArtist(e.target.value)}
          >
            {artists &&
              artists.map((artist: any, i: number) => (
                <option key={i} id={artist.id} value={artist.artistname}>
                  {artist.artistname}
                </option>
              ))}
          </select>
        </div>
        <div className={styles.fieldContainer}>
          <div className={styles.hint}>Enter your state.</div>
          <select
            className={styles.select}
            onChange={(e) => setStateRegion(getStateCode(e.target))}
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
      {foundUsers ? (
        <div className={adminstyles.resultsColumn}>
          <h2>Results</h2>
          <div>
            <div className={adminstyles.resultsContainer}>
              <div>
                <div className={adminstyles.resultsHeader}>Total Fans</div>
                <div className={adminstyles.resultsFigure}>{foundUsers}</div>
              </div>
              <div>
                <div className={adminstyles.resultsHeader}>
                  Estimated Send Cost:
                </div>
                <div className={adminstyles.resultsFigure}>${dollarAmount}</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="spacer3" />
          <div className="notice">
            We do not have any matching results for this search. Please change
            your selection.
          </div>
        </div>
      )}
      <div className={styles.fieldContainer} style={{ margin: "40px 0 0px 0" }}>
        <button
          className={`${foundUsers ? "smallButton" : "submitButton"}`}
          onClick={findFans}
        >
          <span>{foundUsers ? "Search Again" : "Find Fans"}</span>
        </button>
      </div>
      {foundUsers ? (
        <div>
          {!submitted ? (
            <div>
              <div className={styles.fieldContainer}>
                <div className={styles.hint}>
                  Please provide your desired message copy and content for
                  Showpener approval:
                </div>
                <textarea
                  id="adminBroadcastMessage"
                  name="adminBroadcastMessage"
                  value={
                    (state &&
                      state.admin &&
                      state.admin.adminBroadcastMessage) ||
                    ""
                  }
                  onChange={(e) => setBroadcastMessage(e.target.value)}
                  className={styles.input}
                  rows={3}
                />
              </div>
              <div
                className={styles.fieldContainer}
                style={{ margin: "40px 0 0px 0" }}
              >
                <button className="submitButton" onClick={saveBroadcastMessage}>
                  <span>Submit Your Request</span>
                </button>
              </div>
            </div>
          ) : (
            <div className={adminstyles.thankyou}>
              Thank you for submitting your request.
              <br />
              We will be in touch as soon as possible.
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};
/* .resultsHeader {
}
.resultsFigure {
}
 */
export default Broadcast;
