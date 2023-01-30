import React, { useState, useEffect } from "react";
import Landing from "./Landing";
import { useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import Main from "./Main";
// import { googleLogout } from '@react-oauth/google';

export default function Home() {
  const [{ token }] = useCookies(["token"]);

  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);
  if (!hydrated) {
    return null;
  }

  return <>{token ? <Main /> : <Landing />}</>;
}
