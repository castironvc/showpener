import React, { FunctionComponent /* useState */ } from "react";
import { ArtistProps } from "../types/globals";
import Image from "next/image";
import getStateCode from "../utils/getStateCode";
import { useState, useEffect, useContext } from "react";
import styles from "../styles/Home.module.css";
import adminstyles from "../styles/Admin.module.css";
import { AppContext, DispatchContext } from "../context/StateContext";
const costPerUser: number = 1;
type BroadcasterProps = {
  /*   userid: number; */
};

let getArtistOnce = false;
const Broadcast: FunctionComponent<BroadcasterProps> = (
  {
    /* userid */
  }
) => {
  /*  const [logoChoice, logoSet] = useState(logo); */
  let states = require("../utils/states");
  const [stateRegion, setStateRegion] = useState<string>();
  const [artist, setArtist] = useState<string>();
  const [stateCodes, setStates] = useState(states);
  const [artists, setAllArtists] = useState<ArtistProps[]>([]);
  const [dollarAmount, setDollarAmount] = useState(0);
  const [foundUsers, setFoundUsers] = useState(0);
  const { state } = useContext(AppContext);
  const { dispatch } = useContext(DispatchContext);
  const findFans = async () => {
    dispatch({
      type: "setLoader",
      payload: true,
    });
    getArtistOnce = true;

    const foundArtists = await fetch("/api/admin/findfans", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ stateCode: stateRegion, artist: artist }),
    });

    const result = await foundArtists.json();

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
    getArtistOnce = true;
    const foundArtists = await fetch("/api/admin/getallartists", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await foundArtists.json();

    if (result.error) {
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
        Enter a state and an artist to estimate reach and cost for direct
        messaging to your qualified audience of music fans.
      </p>

      <div className={adminstyles.twoColumn}>
        <div>
          <div className={styles.fieldContainer}>
            <div className={styles.hint}>Pick an artist</div>
            <select
              className={styles.select}
              onChange={(e) => setArtist(e.target.value)}
            >
              {artists.map((artist: any, i: number) => (
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
        <div className={adminstyles.resultsColumn}>
          <div className={styles.hint}>Results</div>
          <div className={adminstyles.resultsContainer}>
            <div className={adminstyles.resultsHeader}>Total Users</div>
            <div className={adminstyles.resultsFigure}>{foundUsers}</div>
            <div className="spacer2" />
            <div className={adminstyles.resultsHeader}>Reach cost</div>
            <div className={adminstyles.resultsFigure}>${dollarAmount}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
/* .resultsHeader {
}
.resultsFigure {
}
 */
export default Broadcast;
