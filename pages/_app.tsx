import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import React, { useContext, useReducer } from "react";
import { AppContext, DispatchContext } from "../context/StateContext";
import { reducer } from "../context/reducer";
import { initialState } from "../context/reducer";
import ErrorBoundary from "../utils/errorBoundary";
function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <DispatchContext.Provider value={{ dispatch }}>
      <ErrorBoundary>
        <AppContext.Provider value={{ state }}>
          <SessionProvider session={session}>
            <Component {...pageProps} />
          </SessionProvider>
        </AppContext.Provider>
      </ErrorBoundary>
    </DispatchContext.Provider>
  );
}

export default MyApp;
