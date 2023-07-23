import { BackofficeProvider } from "@/contexts/BackofficeContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { OrderContextProvider } from "@/contexts/OrderContext";
import { useRouter } from "next/router";
import OrderLayout from "@/components/OrderLayout";
import { Provider } from "react-redux";
import { store } from "@/store";
import { Session } from "next-auth";
import { getSelectedLocationId } from "@/utils";
import { useEffect, useState } from "react";
import { fetchAppData } from "@/store/slices/appSlice";
import SetLocation from "@/components/SetLocation";

type CustomeAppProps = AppProps & { session: Session };

export default function App({
  Component,
  pageProps,
  session,
}: CustomeAppProps) {
  const router = useRouter();

  const pathName = router.pathname;
  const isOrder = pathName.split("/")[1] === "order";
  const selectedLocationId = getSelectedLocationId() as string;

  useEffect(() => {
    if (!isOrder) {
      store.dispatch(fetchAppData(selectedLocationId));
    }
  }, [isOrder]);

  return (
    <Provider store={store}>
      {isOrder ? (
        <OrderLayout>
          <Component {...pageProps} />
        </OrderLayout>
      ) : (
        <SessionProvider session={session}>
          <SetLocation>
            <Component {...pageProps} />
          </SetLocation>
        </SessionProvider>
      )}
    </Provider>
  );
}
