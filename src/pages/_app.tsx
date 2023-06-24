import { BackofficeProvider } from "@/contexts/BackofficeContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { OrderContextProvider } from "@/contexts/OrderContext";
import { useRouter } from "next/router";
import OrderLayout from "@/components/OrderLayout";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const pathName = router.pathname;
  const isOrder = pathName.split("/")[1] === "order";

  return (
    <SessionProvider session={pageProps.session}>
      {isOrder ? (
        <OrderContextProvider>
          <OrderLayout>
            <Component {...pageProps} />
          </OrderLayout>
        </OrderContextProvider>
      ) : (
        <BackofficeProvider>
          <Component {...pageProps} />
        </BackofficeProvider>
      )}
    </SessionProvider>
  );
}
