import React, { FunctionComponent /* useState */ } from "react";
import { adminUserProps } from "../types/globals";
import Image from "next/image";
import getStateCode from "../utils/getStateCode";
import { useState, useEffect, useContext } from "react";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import { AppContext, DispatchContext } from "../context/StateContext";

type BroadcasterProps = {
  /*   userid: number; */
  myuser: adminUserProps;
  engageDataCapture: (val: boolean) => void;
  setGetUserOnce: (val: boolean) => void;
};

const Broadcast: FunctionComponent<BroadcasterProps> = ({
  myuser,
  engageDataCapture,
  setGetUserOnce,
}) => {
  /*  const [logoChoice, logoSet] = useState(logo); */
  let states = require("../utils/states");
  const router = useRouter();
  const { state } = useContext(AppContext);
  const { dispatch } = useContext(DispatchContext);
  // handle errors
  const errorRedirect = (message: string) => {
    router.push({
      pathname: "/Oops/",
      search: `?message=${encodeURIComponent(message)}`,
    });
  };
  const setName = (name: string) => {
    dispatch({
      type: "SET_ADMIN_NAME",
      payload: name,
    });
  };
  const setBusiness = (business: string) => {
    dispatch({
      type: "SET_BUSINESS_NAME",
      payload: business,
    });
  };
  const setEmail = (email: string) => {
    dispatch({
      type: "SET_ADMIN_EMAIL",
      payload: email,
    });
  };

  const registerAdminUser = async () => {
    dispatch({
      type: "setLoader",
      payload: true,
    });

    const resgisterAdmin = await fetch("/api/admin/registeradmin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        adminName: state.admin.adminName,
        adminEmail: state.admin.adminEmail,
        adminBusiness: state.admin.adminBusiness,
        id: myuser.id,
      }),
    });
    const result = await resgisterAdmin.json();

    if (result.error) {
      errorRedirect(result.details.message);
    } else {
      console.log(result);
      setGetUserOnce(false);
      engageDataCapture(false);
    }
    dispatch({
      type: "setLoader",
      payload: false,
    });
  };
  /*   useEffect(() => {

  }); */
  return (
    <div>
      <p>Tell us a little about yourself to get started.</p>
      <div className={styles.statePhoneFieldContainer}>
        <div className={styles.fieldContainer}>
          <div className={styles.hint}>Enter your Name:</div>
          <input
            id="adminName"
            name="adminName"
            type="text"
            value={(state && state.admin && state.admin.adminName) || ""}
            onChange={(e) => setName(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.fieldContainer}>
          <div className={styles.hint}>Enter your email</div>
          <input
            id="adminEmail"
            name="adminEmail"
            type="email"
            value={(state && state.admin && state.admin.adminEmail) || ""}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
          />
        </div>
      </div>
      <div className={styles.fieldContainer}>
        <div className={styles.hint}>Name of business:</div>
        <input
          id="adminBusiness"
          name="adminBusiness"
          type="text"
          value={(state && state.admin && state.admin.adminBusiness) || ""}
          onChange={(e) => setBusiness(e.target.value)}
          className={styles.input}
        />
      </div>
      <div className={styles.fieldContainer} style={{ margin: "40px 0 0px 0" }}>
        <button className="submitButton" onClick={registerAdminUser}>
          <span>Next</span>
        </button>
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
