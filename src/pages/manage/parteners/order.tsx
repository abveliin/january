import { useState } from "react";
import Head from "next/head";
import Image from "next/image";

import { resetServerContext } from "react-beautiful-dnd";

import { BsArrowDownUp } from "react-icons/bs";

import { Inter } from "@next/font/google";
import { prisma } from "../../../../lib/prisma";

import Sidebar from "../components/Sidebar";

import { useRouter } from "next/router";
import en from "../../../locales/en";
import fr from "../../../locales/fr";

import Title_section from "@/modules/sections/Title_section";
import Change_list_order from "@/lib/Change_list_order";

interface I_parteners {
  parteners: {
    id: string;
    name: string;
    logo_url: string;
  }[];
}

export default function Parteners_list_order(parteners, partener, children) {
  const router = useRouter();
  const { locale } = router;
  const translation = locale === "fr" ? fr : en;

  return (
    <div className="relative mt-32 bg-slate-100">
      <Head>
        <title>SOMABU</title>
        <meta name="description" content="test of a multilanguage website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="flex min-h-screen py-8  mt-[60px]">
        <div className="w-2/6 p-6 bg-blue-100">
          <Sidebar />
        </div>
        <div className="w-1/2  mx-auto bg-gray-50">
          <Title_section title="Order realisations" />

          {/* <div className="ml-4">
            {locale === "fr" &&
              character.title_fr.length > 5 &&
              character.title_fr}

            {locale === "en" && character.title.length > 5 && character.title}
          </div> */}

          <Change_list_order
            elements_to_change_order={parteners}
            api_redirection="partener"
          >
            <h1>element</h1>
          </Change_list_order>

          <form onSubmit={submit_fn}>
            <button
              type="submit"
              className="bg-blue-400 py-2 px-3 text-white rounded-lg"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  const parteners = await prisma.partener.findMany({
    // created_at and updated_at can be dificult to retreive that's why I add these parameters in findMany function
    select: {
      id: true,
      name: true,
      logo_url: true,
    },
    orderBy: { order: "asc" },
  });

  console.log("parteners", parteners);

  resetServerContext();

  return {
    props: {
      parteners,
    },
  };
};
