import { config } from "@/config/config";
import type { Session } from "next-auth";
import React, { useEffect, useState } from "react";
interface FetchStatus {
  loading: boolean;
  isFetched: boolean;
}

export const useGetData = (session: Session | null): FetchStatus => {
  const [loading, setLoading] = useState(true);
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${config.apiBaseUrl}/app`);

        await new Promise((resolve) => setTimeout(resolve, 2000));

        setIsFetched(true);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [session]);

  return { loading, isFetched };
};
