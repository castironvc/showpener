import { useRouter } from "next/router";
import { useContext } from "react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import styles from "../styles/connectSpotify.module.css";
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

  console.log(state);
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div>
          <div className={styles.card}>
            <h1 className={styles.mainTitle}>Oops!</h1>
            <div>
              <Image
                src="/images/Showpener_logo_transparent.svg"
                width={140}
                height={60}
                className=""
                alt=""
              />
            </div>
            <div className={styles.textContainer}>
              <span> Looks like we ran into some trouble.</span>
            </div>

            <div className={styles.notice}>{router.query.message}</div>

            <div className={styles.buttonContainer}>
              <button
                className={styles.submitButton}
                onClick={status && status === "authenticated" ? logOut : goHome}
              >
                <span>Try again</span>
              </button>
            </div>
          </div>

          <div className={styles.disclaimer}>
            We will not be sharing your personal information with{" "}
            <span className="widow">third parties.</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Oops;
