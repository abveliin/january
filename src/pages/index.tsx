import Head from "next/head";
import { Inter } from "@next/font/google";
import { prisma } from "../../lib/prisma";
import Home_parallax from "../modules/parallax/Home";
import Summary_parallax from "../modules/parallax/Summary";
import Mission from "../modules/mission/Mission";
import Parteners from "../modules/parteners/Parteners";

import { useRouter } from "next/router";
import en from "../locales/en";
import fr from "../locales/fr";
import Our_team from "@/modules/Our_team";
import Contact_us from "@/modules/Contact_us";
import Realisations from "@/modules/realisations/Realisations";

const inter = Inter({ subsets: ["latin"] });

interface I_home {
  team_members: {
    id: string;
    name: string;
    position: string;
    photo_url: string;
  }[];
  parteners: {
    id: string;
    name: string;
    logo_url: string;
  }[];
  realisations: {
    id: string;
    tag: string;
    title: string;
    excerpt: string;
    photo_url: string;
    lasting_of_execution: string;
  }[];
}

export default function Home({
  team_members,
  parteners,
  realisations,
}: I_home) {
  const router = useRouter();
  const { locale } = router;
  const translation = locale === "fr" ? fr : en;

  return (
    <div className="relative">
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
      {team_members.length != 0 ? <Our_team team_members={team_members} /> : ""}
      {realisations.length != 0 ? (
        <Realisations realisations={realisations} />
      ) : (
        ""
      )}

      {parteners.length != 0 ? <Parteners parteners={parteners} /> : ""}

      <Contact_us />
    </div>
  );
}

export const getServerSideProps = async () => {
  const team_members = await prisma.team_member.findMany({
    // created_at and updated_at can be dificult to retreive that's why I add these parameters in findMany function
    select: {
      id: true,
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
      name: true,
      logo_url: true,
    },
    orderBy: { created_at: "desc" },
  });

  const realisations = await prisma.realisation.findMany({
    // created_at and updated_at can be dificult to retreive that's why I add these parameters in findMany function
    select: {
      id: true,
      tag: true,
      title: true,
      excerpt: true,
      lasting_of_execution: true,
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
