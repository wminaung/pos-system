import { BackofficeProvider } from "@/contexts/BackofficeContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <BackofficeProvider>
        <Component {...pageProps} />
      </BackofficeProvider>
    </SessionProvider>
  );
}
