import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useContext } from "react";
import { getProviders, signOut, useSession } from "next-auth/react";

import styles from "../styles/thanks.module.css";
import { AppContext } from "../context/StateContext";

function Thanks() {
  const { state } = useContext(AppContext);
  const { status, data: session } = useSession();
  const router = useRouter();
  const logOut = async (e: any) => {
    e.preventDefault();
    signOut();
  };

  useEffect(() => {
    console.log(status);
    if (status && status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  return (
    <div>
      <div className={styles.centerColumnContent}>
        <h1>Thank you!</h1>
        <div className={styles.messageContainer}>
          <p>
            We will notify you when tickets for the artists you love go on sale!
          </p>
        </div>
        {state.error.message ? (
          <div className="notice">{state.error.message}</div>
        ) : null}

        <span className="whitelink" onClick={logOut}>
          Disconnect from Spotify
        </span>
        <div className={`caption ${styles.captionContainer}`}>
          Reply STOP to our text messages to unsubscribe from{" "}
          <span className="widow">Showpener alerts</span>.
        </div>
      </div>
    </div>
  );
}

export default Thanks;

export const getServerSideProps: GetServerSideProps = async ({}) => {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
};
