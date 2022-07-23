import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import styles from "../styles/thanks.module.css";
import { AppContext } from "../context/StateContext";

function Tickets() {
  const { state } = useContext(AppContext);
  const { status, data: session } = useSession();
  const router = useRouter();
  const [runOnce, setRunOnce] = useState(false);

  const goToLink = async (result: any) => {
    setTimeout(function () {
      router.push({
        pathname: `${result.event_url}`,
      });
    }, 3000);
  };

  const getEvent = async (eventid: any) => {
    const foundEvent = await fetch("/api/tm/getevent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ eventid: eventid }),
    });

    const result = await foundEvent.json();
    //  console.log(result);
    if (result.error) {
      //errorRedirect(result.details.message);
      // console.log(result.details.message);
    } else {
      goToLink(result);
    }
    setRunOnce(true);
  };
  useEffect(() => {
    if (!runOnce) {
      if (router.query.tm) {
        getEvent(router.query.tm);
      }
    }
  });

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
