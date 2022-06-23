import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import { Loader } from "../components/Loader";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />

        {/*     {Loader} */}

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
