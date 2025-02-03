import { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";

export function useAuthFetch(path: string) {
  const { getToken } = useAuth();
  const [data, setData] = useState();
  async function getFetchData() {
    const token = await getToken();
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URLs}/${path}`, {
      headers: {
        Token: token,
      },
    })
      .then((res) => res.json())
      .then((data) => setData(data));
  }
  useEffect(() => {
    getFetchData();
  }, []);
  return { isLoading: !data, data };
}
