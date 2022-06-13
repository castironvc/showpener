import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useContext, useState } from "react";
import supabase from "../../lib/supabase";
import styles from "../../styles/thanks.module.css";
import { AppContext, DispatchContext } from "../../context/StateContext";
import { adminUserProps } from "../../types/globals";
import Roles from "../../components/Roles";
import Broadcast from "../../components/Broadcast";
import InputForm from "../../components/InputForm";
import Image from "next/image";
let i: number = 0;
/* let getUserOnce: boolean = false; */
function Promoter() {
  const { state } = useContext(AppContext);
  const [session, setSession] = useState(supabase.auth.session());
  const [status, setStatus] = useState(
    session && session.user && session.user.aud
  );
  const [myuser, setUser] = useState<adminUserProps>();
  const [dataCapture, engageDataCapture] = useState<boolean>(false);
  const [getUserOnce, setGetUserOnce] = useState<boolean>(false);
  const [allUsers, setAllUsers] = useState<[adminUserProps]>();
  const router = useRouter();
  const { dispatch } = useContext(DispatchContext);
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
      console.log(result.details.message);
    } else {
      console.log(result);
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
      console.log(result.details.message);
    } else {
      console.log(result);
      setUser(result);

      if (result.adminName && result.role === "admin") {
        console.log("Is Admin");
        getAllUsers();
      }
      if (!result.adminName) {
        engageDataCapture(!dataCapture);
      }
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
    } /* else if (!session) {
      router.push({
        pathname: "/admin/",
        //  search: `?message=" + ${encodeURIComponent(result.details.message)}`,
      });
    } */
  });

  return (
    <div className={styles.centerColumnContent}>
      <h1>Promoter Access</h1>
      <div className={styles.messageContainer}>
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
                  setGetUserOnce={setGetUserOnce}
                />
              ) : null}
            </div>
          )}
        </div>
        {state.error.message ? (
          <div className="notice">{state.error.message}</div>
        ) : null}
        <div></div>
        {/*         <span className="whitelink" onClick={logOut}>
          Log out
        </span> */}
        {/*     <button className="submitButton" onClick={logOut}>
        <span>Log out</span>
      </button> */}
      </div>
    </div>
  );
}

export default Promoter;
