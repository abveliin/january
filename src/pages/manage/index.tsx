import React, { useState, useRef } from "react";
import Head from "next/head";
import Image from "next/image";

import { useRouter } from "next/router";
import { prisma } from "../../../lib/prisma";
import en from "@/locales/en";
import fr from "@/locales/fr";
import Nav_link from "@/modules/menu/Nav_link";

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
      <div className="flex min-h-screen bg-red-600 py-8 px-8 mt-20">
        <div className="w-2/5 p-4 bg-blue-100">
          <h1 className="text-lg font-bold">Gestion de notre site web</h1>

          <Nav_link href="/manage/parteners" title="Parteners" />
          <Nav_link href="/manage/realisations" title="Realisations" />
          <Nav_link href="/manage/team" title="team" />
        </div>

        <div className="w-1/2 flex-1 mx-auto bg-blue-500"></div>
      </div>
    </div>
  );
}
