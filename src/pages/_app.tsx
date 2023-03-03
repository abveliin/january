import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { Footer } from "@/modules/sections/footer/Footer";

import Navbar from "../modules/sections/menu/navbar/Navbar";
import { useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [is_scrollable, set_is_scrollable] = useState(true);
  //return <Component {...pageProps} />
  return (
    <div className="">
      {/* <div className={`${is_scrollable ? `relative` : `fixed`} `}> */}
      <Navbar />
      <Component {...pageProps} />
      {/* </div> */}
    </div>
  );
}
