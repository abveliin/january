import Head from "next/head";
import { Inter } from "@next/font/google";
import { prisma } from "../../lib/prisma";
import { useRouter } from "next/router";

import Modal from "react-modal";

import Home_parallax from "../modules/sections/parallax/Home";
import Summary_parallax from "../modules/sections/parallax/Summary";
import Mission from "../modules/sections/mission/Mission";

import Realisations from "@/modules/sections/realisations/Realisations";
import { Footer } from "@/modules/sections/footer/Footer";

import en from "../locales/en";
import fr from "../locales/fr";

const inter = Inter({ subsets: ["latin"] });

interface I_home {
  realisations: {
    id: string;
    order: number;
    tag: string;
    tag_fr: string;
    title: string;
    title_fr: string;
    photo_url: string;
  }[];

  team_members: {
    id: string;
    order: number;
    name: string;
    position: string;
    position_fr: string;
    photo_url: string;
  }[];

  parteners: {
    id: string;
    order: number;
    logo_url: string;
  }[];
}

Modal.setAppElement("#__next");

export default function Home({
  team_members,
  parteners,
  realisations,
}: I_home) {
  const router = useRouter();
  const { locale } = router;
  const language: string | undefined = locale;
  const translation = locale === "fr" ? fr : en;

  return (
    <div id="home" className="text-bl bg-slate-50">
      <Head>
        <title>SOMABU</title>
        <meta name="description" content="test of a multilanguage website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Home_parallax
        heading={translation.para_heading}
        message={translation.para_message}
      />

      <Summary_parallax />
      <Mission />

      {realisations.length != 0 ? (
        <Realisations realisations={realisations} />
      ) : (
        ""
      )}

      <Footer
        team_members={team_members}
        parteners={parteners}
        language={language}
      />
    </div>
  );
}

export const getServerSideProps = async () => {
  const team_members = await prisma.team_member.findMany({
    // created_at and updated_at can be dificult to retreive that's why I add these parameters in findMany function
    select: {
      id: true,
      order: true,
      name: true,
      position: true,
      photo_url: true,
    },
    orderBy: { created_at: "desc" },
  });

  const parteners = await prisma.partener.findMany({
    // created_at and updated_at can be dificult to retreive that's why I add these parameters in findMany function
    select: {
      id: true,
      order: true,
      logo_url: true,
    },
    orderBy: { created_at: "desc" },
  });

  const realisations = await prisma.realisation.findMany({
    // created_at and updated_at can be dificult to retreive that's why I add these parameters in findMany function
    select: {
      id: true,
      order: true,
      tag: true,
      tag_fr: true,
      title: true,
      title_fr: true,
      photo_url: true,
    },
    orderBy: { created_at: "desc" },
  });

  return {
    props: {
      team_members,
      parteners,
      realisations,
    },
  };
};
