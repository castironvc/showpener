import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useState, useContext, useEffect, useRef } from "react";
import styles from "../../styles/Home.module.css";
import { AppContext, DispatchContext } from "../../context/StateContext";
import { normalizePhone, stripLetters } from "../../utils/validation";
import getStateCode from "../../utils/getStateCode";
import supabase from "../../lib/supabase";
import { UserProfileAdminProps } from "../../types/globals";
const randNum = Math.floor(Math.random() * 4);

function Promoter() {
  let addUserOnce: boolean = false;
  const { state } = useContext(AppContext);
  const [checked, acceptTerms] = useState(false);
  const [authError, setAuthError] = useState("");
  const [tokenScreen, tokenScreenSet] = useState(false);
  const [session, setSession] = useState(supabase.auth.session());
  const [status, setStatus] = useState(
    session && session.user && session.user.aud
  );
  const { dispatch } = useContext(DispatchContext);
  const router = useRouter();

  const userAdminProfile: UserProfileAdminProps = {
    mobilePhone: "",
    session: null,
  };

  // handle errors
  const errorRedirect = (message: string) => {
    console.log(message);
    /*  router.push({
      pathname: "/Oops/",
      search: `?message=${encodeURIComponent(message)}`,
    }); */
  };

  // set the form fields to the state
  const setPhone = (phone: string) => {
    dispatch({
      type: "setPhone",
      payload: phone,
    });
  };
  // set the form fields to the state
  const setCode = (code: string) => {
    dispatch({
      type: "setCode",
      payload: code,
    });
  };

  const beginSignIn = async () => {
    dispatch({
      type: "setLoader",
      payload: true,
    });
    console.log(stripLetters(state.userProfile.mobilePhone));
    const result = await supabase.auth.signIn({
      phone: stripLetters(state.userProfile.mobilePhone),
    });
    console.log(result);
    tokenScreenSet(true);
    dispatch({
      type: "setLoader",
      payload: false,
    });
  };

  const verifyToken = async () => {
    dispatch({
      type: "setLoader",
      payload: true,
    });
    let { session, error } = await supabase.auth.verifyOTP({
      phone: stripLetters(state.userProfile.mobilePhone),
      token: state.phoneAuth.authCode,
    });

    if (error) {
      setAuthError(error.message);
      console.log(error.message);
    } else if (session && session.user) {
      setSession(session);
      setStatus(session.user.aud);
    } else {
      router.push({
        pathname: "/",
        //  search: `?message=" + ${encodeURIComponent(result.details.message)}`,
      });
    }
    dispatch({
      type: "setLoader",
      payload: false,
    });
  };
  const createAdminUser = async () => {
    addUserOnce = true;
    userAdminProfile.session = session;
    userAdminProfile.mobilePhone = "+" + session!.user!.phone;
    const user = await fetch("/api/admin/newadminuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userAdminProfile),
    });

    const result = await user.json();

    if (result.error) {
      errorRedirect(result.details.message);
    } else {
      router.push({
        pathname: "/admin/Promoter",
        //  search: `?message=" + ${encodeURIComponent(result.details.message)}`,
      });
    }
    dispatch({
      type: "setLoader",
      payload: false,
    });
  };

  useEffect(() => {
    if (session && status === "authenticated" && !addUserOnce) {
      createAdminUser();
    }
  });

  return (
    <div>
      <div>
        <h1 className="mainTitle">Showpener</h1>
        <h2 className="subTitle">Promoter Login</h2>

        <div>
          {!tokenScreen ? (
            <>
              {" "}
              <p className="center-text">
                Get access to a wide audience of music fans.
              </p>
              <div className={styles.fieldContainer}>
                <div className={styles.hint}>Log in with your phone number</div>
                <input
                  id="phone-number"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  value={state.userProfile.mobilePhone}
                  onChange={(e) =>
                    setPhone(normalizePhone(e.target.value) || "")
                  }
                  className={styles.inputShort}
                  placeholder="(000) 000-0000"
                />
              </div>
              <div
                className={styles.checkboxContainer}
                style={{ marginBottom: "20px" }}
              >
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
                  className="submitButton"
                  disabled={!checked}
                  onClick={() => beginSignIn()}
                >
                  <span>Log in</span>
                </button>
              </div>
            </>
          ) : (
            <>
              {" "}
              {!authError ? (
                <>
                  <div className={styles.fieldContainer}>
                    <div className={styles.hint}>
                      Enter your verification code
                    </div>
                    <input
                      id="code"
                      name="verifycode"
                      type="text"
                      value={state.phoneAuth.authCode}
                      onChange={(e) => setCode(e.target.value || "")}
                      className={styles.inputShort}
                    />
                  </div>
                  <div
                    className={styles.fieldContainer}
                    style={{ marginTop: "40px" }}
                  >
                    <button className="submitButton" onClick={verifyToken}>
                      <span>Verify</span>
                    </button>
                  </div>
                </>
              ) : (
                <div>
                  <div
                    className="notice"
                    style={{ marginTop: "40px", textAlign: "center" }}
                  >
                    {authError}
                  </div>
                  <div
                    className={styles.fieldContainer}
                    style={{ marginTop: "40px" }}
                  >
                    <button
                      className="submitButton"
                      onClick={() => tokenScreenSet(false)}
                    >
                      <span>Try Again</span>
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Promoter;
