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
  const isOrder = pathName.split("/")[1] === "order";
  const isRoot = pathName.split("/")[1] === "";

  useEffect(() => {
    if (!isOrder && !isRoot) {
      store.dispatch(fetchAppData());
    }
  }, [isOrder, isRoot]);

  return (
    <Provider store={store}>
      {isOrder || isRoot ? (
        <OrderLayout>
          <Component {...pageProps} />
        </OrderLayout>
      ) : (
        <SessionProvider session={session}>
          <BackofficeApp>
            <Component {...pageProps} />
          </BackofficeApp>
        </SessionProvider>
      )}
    </Provider>
  );
}
