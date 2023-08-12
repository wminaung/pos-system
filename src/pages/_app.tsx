import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/router";
import OrderLayout from "@/components/OrderLayout";
import { Provider } from "react-redux";
import { store } from "@/store";
import { Session } from "next-auth";
import { useEffect, useState } from "react";
import { fetchAppData } from "@/store/slices/appSlice";
import BackofficeApp from "@/components/BackofficeApp";

type CustomeAppProps = AppProps & { session: Session };

export default function App({
  Component,
  pageProps,
  session,
}: CustomeAppProps) {
  const router = useRouter();

  const pathName = router.pathname;
  const isBackoffice = pathName.split("/")[1] === "backoffice";

  useEffect(() => {
    if (isBackoffice) {
      store.dispatch(fetchAppData());
    }
  }, [isBackoffice]);

  return (
    <Provider store={store}>
      {isBackoffice ? (
        <SessionProvider session={session}>
          <BackofficeApp>
            <Component {...pageProps} />
          </BackofficeApp>
        </SessionProvider>
      ) : (
        <OrderLayout>
          <Component {...pageProps} />
        </OrderLayout>
      )}
    </Provider>
  );
}
