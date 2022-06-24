import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useContext, useState } from "react";
import { getProviders, signOut, useSession } from "next-auth/react";
import { AppContext, DispatchContext } from "../context/StateContext";

function Thanks() {
  const { state } = useContext(AppContext);
  const { status, data: session } = useSession();
  const router = useRouter();
  const { dispatch } = useContext(DispatchContext);

  const logOut = async (e: any) => {
    dispatch({
      type: "setLoader",
      payload: true,
    });
    e.preventDefault();
    signOut();
  };

  useEffect(() => {
    if (status && status === "unauthenticated") {
      router.push("/");
    } else {
      dispatch({
        type: "setLoader",
        payload: false,
      });
    }
  }, [status]);

  return (
    <div>
      {status && status === "authenticated" ? (
        <div className="centerColumnContent">
          <h1 className="mainTitle">Thank you!</h1>

          <div className="messageContainer">
            <p>
              We will notify you when tickets for the artists you love go on
              sale!
            </p>
          </div>
          {state.error.message ? (
            <div className="notice">{state.error.message}</div>
          ) : null}

          <span className="whitelink" onClick={logOut}>
            Disconnect from Spotify
          </span>
          <div className="caption captionContainer">
            Reply STOP to our text messages to unsubscribe from{" "}
            <span className="widow">Showpener alerts</span>.
          </div>
        </div>
      ) : null}
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
