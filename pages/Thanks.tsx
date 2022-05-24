import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useContext } from "react";
import { getProviders, signIn, signOut, useSession } from "next-auth/react";
import { Provider } from "../types/globals";
import Image from "next/image";
import styles from "../styles/connectSpotify.module.css";
import { AppContext, DispatchContext } from "../context/StateContext";

function Thanks({ providers }: { providers: { spotify: Provider } }) {
  const { state } = useContext(AppContext);
  const { status, data: session } = useSession();
  const router = useRouter();
  const logOut = async (e: any) => {
    e.preventDefault();
    signOut();
  };

  useEffect(() => {
    if (status && status !== "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  console.log(state);
  return (
    <div className={styles.container}>
      {status && status === "authenticated" ? (
        <div className={styles.main}>
          {Object.values(providers).map((provider: Provider) => (
            <div key={provider.id} className="">
              <div className={styles.card}>
                <h1 className={styles.mainTitle}>All done!</h1>
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
                  Look out for shows happening near you{" "}
                  <span className="widow">for artists that you love:</span>
                </div>
                {state.error.message ? (
                  <div className={styles.notice}>{state.error.message}</div>
                ) : null}
                <div className={styles.buttonContainer}>
                  <button className={styles.submitButton} onClick={logOut}>
                    <span>Log out of {provider.name}</span>
                  </button>
                </div>
              </div>

              {/*      <div>
          <button
            onClick={() => signIn(provider.id, { callbackUrl: "/Login" })}
            className="rounded-lg bg-[#18D860] p-5 text-white"
          >
            Log in with {provider.name}{" "}
          </button>
          <button
            onClick={logOut}
            className="rounded-lg bg-[#18D860] p-5 text-white"
          >
            Log Out
          </button>
        </div> */}
              <div className={styles.disclaimer}>
                We will not be sharing your personal information with{" "}
                <span className="widow">third parties.</span>
              </div>
            </div>
          ))}
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
