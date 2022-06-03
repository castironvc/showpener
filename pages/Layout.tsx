import React, { FunctionComponent, useContext } from "react";

import Head from "next/head";
import { Loader } from "../components/Loader";
import Image from "next/image";
import { AppContext } from "../context/StateContext";
const randNum = Math.floor(Math.random() * 10);
const customCss = `body {background: url(/images/Showpener_BG${randNum}.jpg) no-repeat center center fixed;}`;

type LayoutProps = {
  children: any;
};

const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
  const { state } = useContext(AppContext);
  return (
    <div>
      <Head>
        <title>
          Showpener - Text alerts for new concerts in your area and ticket sale
          releases.
        </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <style>{customCss} </style>
      </Head>

      <div className="container">
        {state.loading ? <Loader /> : null}
        <div className="main">
          <div className="blackpanel">
            <div className="logo">
              <Image
                src="/images/Showpener_logo.svg"
                layout="intrinsic"
                width={180}
                height={90}
                className="logoimg"
                alt=""
              ></Image>
            </div>
            <div>{children}</div>
          </div>
          <footer className="disclaimer">
            We will not be sharing your personal information with{" "}
            <span className="widow">third parties.</span>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Layout;
