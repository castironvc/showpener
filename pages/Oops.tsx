import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import styles from "../styles/thanks.module.css";
import { AppContext } from "../context/StateContext";

function Oops() {
  const { state } = useContext(AppContext);
  const { status, data: session } = useSession();
  const router = useRouter();
  const logOut = async (e: any) => {
    e.preventDefault();
    signOut();
  };
  const goHome = async (e: any) => {
    e.preventDefault();
    router.push({
      pathname: `/`,
    });
  };
  useEffect(() => {
    if (status && status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);
  console.log(state);
  return (
    <div className={styles.centerColumnContent}>
      <h1>Oops!</h1>
      <div className={styles.messageContainer}>
        <p>Looks like we ran into some trouble.</p>
      </div>

      <div className="notice">{router.query.message}</div>

      <button
        className="submitButton"
        onClick={status && status === "authenticated" ? logOut : goHome}
      >
        <span>Try again</span>
      </button>
    </div>
  );
}

export default Oops;
