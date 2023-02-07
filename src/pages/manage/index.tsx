import React, { useState, useRef } from "react";
import Head from "next/head";
import Image from "next/image";

import { useRouter } from "next/router";
import { prisma } from "../../../lib/prisma";
import en from "@/locales/en";
import fr from "@/locales/fr";
import Nav_link from "@/modules/sections/menu/link/Nav_link";
import Link_with_icon from "@/modules/components/Link_with_icon";
import Sidebar from "./components/Sidebar";

export default function Manage() {
  const router = useRouter();
  const { locale } = router;
  const translation = locale === "fr" ? fr : en;
  const refresh_data = () => {
    router.replace(router.asPath);
  };

  return (
    <div className="relative bg-red-400 h-">
      <Head>
        <title>SOMABU</title>
        <meta name="description" content="test of a multilanguage website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="flex min-h-screen bg-red-600 py-8  mt-[60px]">
        <div className="w-2/6 p-6 bg-blue-100">
          <Sidebar />
        </div>
        <div className="w-1/2 flex-1 flex justify-center items-center mx-auto bg-blue-500">
          tableau de bord pour l'administration de notre site
        </div>
      </div>
    </div>
  );
}
