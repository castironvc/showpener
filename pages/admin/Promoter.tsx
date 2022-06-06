import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useContext, useState } from "react";
import supabase from "../../lib/supabase";
import styles from "../../styles/thanks.module.css";
import { AppContext, DispatchContext } from "../../context/StateContext";
import { adminUserProps } from "../../types/globals";
import Roles from "../../components/Roles";
import Broadcast from "../../components/Broadcast";
import Image from "next/image";
let i: number = 0;
let getUserOnce: boolean = false;
function Promoter() {
  const { state } = useContext(AppContext);
  const [session, setSession] = useState(supabase.auth.session());
  const [status, setStatus] = useState(
    session && session.user && session.user.aud
  );
  const [myuser, setUser] = useState<adminUserProps>();
  const [allUsers, setAllUsers] = useState<[adminUserProps]>();
  const router = useRouter();
  const { dispatch } = useContext(DispatchContext);
  const logOut = async (e: any) => {
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
    getUserOnce = true;

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

      if (result.role === "admin") {
        getAllUsers();
      }
    }
  };

  useEffect(() => {
    if (session && status === "authenticated" && !getUserOnce) {
      console.log(i++);
      getAdminUser();
    } else if (session && status === "unauthenticated") {
      router.push({
        pathname: "/admin/",
        //  search: `?message=" + ${encodeURIComponent(result.details.message)}`,
      });
    } else if (!session) {
      router.push({
        pathname: "/admin/",
        //  search: `?message=" + ${encodeURIComponent(result.details.message)}`,
      });
    }
  });

  return (
    <div className={styles.centerColumnContent}>
      <h1>Promoters</h1>
      <div className={styles.messageContainer}>
        {myuser && myuser.role === "standard" ? (
          <p>
            You have been submitted for consideration as a promoter.
            <br />
            One of our agents will call you soon.
          </p>
        ) : null}

        {myuser && myuser.role === "admin" && allUsers ? (
          <Roles
            allUsers={allUsers}
            getAllUsers={getAllUsers}
            myuser={myuser}
          />
        ) : null}
        {(myuser && myuser.role === "promoter") ||
        (myuser && myuser.role === "admin") ? (
          <Broadcast />
        ) : null}
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
  );
}

export default Promoter;
