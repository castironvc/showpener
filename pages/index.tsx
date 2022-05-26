import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import { useState, useContext } from "react";
import styles from "../styles/Home.module.css";
import { AppContext, DispatchContext } from "../context/StateContext";
import { normalizePhone } from "../utils/validation";
import { LogOutput } from "concurrently";
const Home: NextPage = () => {
  const { state } = useContext(AppContext);
  const [checked, acceptTerms] = useState(false);
  const { dispatch } = useContext(DispatchContext);
  const router = useRouter();

  const { status, data: session } = useSession();

  if (status === "authenticated") {
    router.push("/Thanks");
  }

  const setPhone = (phone: string) => {
    dispatch({
      type: "setPhone",
      payload: phone,
    });
  };

  const handleClick = async (e: any) => {
    e.preventDefault();

    if (checked) {
      router.push({
        pathname: "/ConnectSpotify" /* ,
      query: { phone: state.userProfile.mobilePhone }, */,
      });
    }
  };
  const sendAlertsToUsers = async (e: any) => {
    e.preventDefault();
    const events = await fetch("/api/sms/B3783766e49a2a83c03a0addbe3f7", {
      method: "GET",
    });

    const result = await events.json();
    console.log(result);
    return result;
  };
  return (
    <div className={styles.container}>
      {!session && status === "unauthenticated" ? (
        <div className={styles.main}>
          <div className="">
            <div className="logo">
              <Image
                src="/images/Showpener_logo.svg"
                layout="responsive"
                width={140}
                height={35}
                className=""
                alt=""
              ></Image>
            </div>
            <div className={styles.formContainer}>
              <form
                className="flex flex-col items-center mt-4 max-w-md space-y-3"
                action="#"
                method="POST"
              >
                <h1 className={styles.mainTitle}>Showpener</h1>
                <h2 className={styles.subTitle}>Never Miss A Show.</h2>
                <p className={styles.p}>
                  Text alerts for new concerts in your area and ticket sale
                  releases.
                </p>
                <div className={styles.hint}>
                  Enter your phone number to get started.
                </div>
                <input type="hidden" name="remember" defaultValue="true" />

                <div className={styles.fieldContainer}>
                  <input
                    id="phone-number"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    value={state.userProfile.mobilePhone}
                    onChange={(e) =>
                      setPhone(normalizePhone(e.target.value) || "")
                    }
                    required
                    className={styles.input}
                    placeholder="(000) 000-0000"
                  />
                </div>
                <div className={styles.checkboxContainer}>
                  <input
                    type="checkbox"
                    id="TC"
                    onChange={() => acceptTerms(!checked)}
                    value="I agree to Showpener's Terms of Usage & Privacy Policy"
                  ></input>
                  <label htmlFor="TC" className="">
                    I agree to Showpener&apos;s Terms & Privacy Policy
                  </label>
                </div>
                <div className={styles.fieldContainer}>
                  <button
                    onClick={handleClick}
                    type="submit"
                    className={styles.submitButton}
                    disabled={!checked}
                  >
                    <span>Sign up</span>
                  </button>
                  {/*          <button
                    onClick={sendAlertsToUsers}
                    type="submit"
                    className={styles.submitButton}
          
                  >
                    <span>Alert Test</span>
                  </button> */}
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : null}
      {/*   <button
        onClick={logOut}
        className="rounded-lg bg-[#18D860] p-5 text-white"
      >
        Log Out
      </button> */}
    </div>
  );
};

export default Home;
