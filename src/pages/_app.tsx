import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/router";
import { Provider } from "react-redux";
import { store } from "@/store";
import { Session } from "next-auth";
import { useEffect, useState } from "react";
import { fetchAppData } from "@/store/slices/appSlice";
import { Box } from "@mui/material";
import NavBar from "@/components/NavBar";

type CustomAppProps = AppProps & { session: Session };

export default function App({ Component, pageProps, session }: CustomAppProps) {
  const router = useRouter();

  const pathName = router.pathname;
  const isOrder = pathName.split("/")[1] === "order";
  const isRoot = pathName.split("/")[1] === "";
  const isBackoffice = pathName.split("/")[1] === "backoffice";

  useEffect(() => {
    if (!isOrder && !isRoot) {
      console.log("store data is fetching");
      store.dispatch(fetchAppData());
    }
  }, [isOrder, isRoot]);
  console.log({ pathName });

  // for backoffice
  if (!isOrder && !isRoot) {
    return (
      <Box>
        <NavBar />
        <Provider store={store}>
          <SessionProvider session={session}>
            <Component {...pageProps} />
          </SessionProvider>
        </Provider>
      </Box>
    );
  }

  return (
    <Provider store={store}>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </Provider>
  );
}
