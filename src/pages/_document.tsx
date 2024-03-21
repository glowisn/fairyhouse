import { Html, Head, Main, NextScript } from "next/document";
import { NextUIProviders } from "@/utils/NextUIProviders";

export default function Document() {
  return (
    <Html lang="ko" className="light">
      <Head />
      <body>
        <NextUIProviders>
          <Main />
          <NextScript />
        </NextUIProviders>
      </body>
    </Html>
  );
}
