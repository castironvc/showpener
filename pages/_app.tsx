import "../styles/globals.css";
import "../styles/components.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import React, { useContext, useReducer } from "react";

import { AppContext, DispatchContext } from "../context/StateContext";
import { NextUIProvider, createTheme, Text } from "@nextui-org/react";
import { reducer } from "../context/reducer";
import { initialState } from "../context/reducer";
import Layout from "./Layout";

const theme = createTheme({
  type: "light", // it could be "light" or "dark"
  theme: {
    colors: {
      // brand colors
      primaryLight: "#69448e",
      primaryLightHover: "#69448e",
      primaryLightActive: "#69448e",
      primaryLightContrast: "#69448e",
      primary: "#b893de",

      gradient:
        "linear-gradient(112deg, #69448e -25%, $pink500 -10%, #09408e 80%)",
      link: "#5E1DAD",

      // you can also create your own color
      myColor: "#ff4ecd",

      // ...  more colors
    },
    space: {},
    fonts: {},
  },
});
/* import ErrorBoundary from "../utils/errorBoundary"; */
function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <DispatchContext.Provider value={{ dispatch }}>
      <NextUIProvider theme={theme}>
        <AppContext.Provider value={{ state }}>
          <SessionProvider session={session}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </SessionProvider>
        </AppContext.Provider>
      </NextUIProvider>
    </DispatchContext.Provider>
  );
}

export default MyApp;
