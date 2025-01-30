"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";

export function useAuthFetch(path: string) {
  const [data, setData] = useState([]);
  async function getFetchData() {
    fetch(`http://localhost:3004/${path}`, {
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => setData(data));
  }
  useEffect(() => {
    getFetchData();
  }, []);
  return data;
}
