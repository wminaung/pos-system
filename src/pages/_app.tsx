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
import { useEffect } from "react";
import { fetchAppData } from "@/store/slices/appSlice";

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
    !isOrder ? store.dispatch(fetchAppData(selectedLocationId)) : "";
  }, [isOrder]);

  return isOrder ? (
    <OrderContextProvider>
      <OrderLayout>
        <Component {...pageProps} />
      </OrderLayout>
    </OrderContextProvider>
  ) : (
    <Provider store={store}>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </Provider>
  );
}
