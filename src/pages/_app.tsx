import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { useRouter } from "next/router";

import en from "../locales/en";
import fr from "../locales/fr";

import Navbar from "../modules/menu/Navbar";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { locale } = router;
  const translation = locale === "fr" ? fr : en;
  //return <Component {...pageProps} />
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}
