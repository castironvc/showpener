import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import styles from "../styles/thanks.module.css";
import { AppContext } from "../context/StateContext";

function Tickets() {
  const { state } = useContext(AppContext);
  const { status, data: session } = useSession();
  const router = useRouter();
  const [runOnce, setRunOnce] = useState(false);
  const logOut = async (e: any) => {
    e.preventDefault();
    signOut();
  };

  useEffect(() => {
    const goToLink = async () => {
      setTimeout(function () {
        router.push({
          pathname: `${router.query.tm}`,
        });
      }, 3000);
      setRunOnce(true);
    };
    if (!runOnce) {
      if (router.query.tm) {
        goToLink();
      }
    }
  }, [runOnce, status, router]);
  console.log(state);
  return (
    <div className="centerColumnContent">
      <h1 className="mainTitle">Redirecting...</h1>
      <div>
        <p>Taking you to your tickets now.</p>
      </div>

      <div
        style={{ margin: "30px 0 50px 0", backgroundColor: "white" }}
        className="logoLoader"
      />

      <button
        className="submitButton"
        onClick={() =>
          router.push({
            pathname: `${router.query.tm}`,
          })
        }
      >
        <span>Go there now</span>
      </button>
    </div>
  );
}

export default Tickets;
