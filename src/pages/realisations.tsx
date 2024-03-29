import Head from "next/head";
import Image from "next/image";
import { MdAlarm } from "react-icons/md";

import { Inter } from "@next/font/google";
import { prisma } from "../../lib/prisma";

import { useRouter } from "next/router";
import { en } from "../locales/en";
import { fr } from "../locales/fr";

import { Footer } from "@/modules/sections/footer/Footer";
import Title_section from "@/modules/sections/Title_section";

const inter = Inter({ subsets: ["latin"] });

interface I_realisations {
  realisations: {
    id: string;
    category: string;
    category_fr: string;
    title: string;
    title_fr: string;
    description: string;
    description_fr: string;
    photo_url: string;
    lasting_of_execution: string;
  }[];
  parteners: {
    id: string;
    order: number;
    logo_url: string;
  }[];

  team_members: {
    id: string;
    order: number;
    name: string;
    position: string;
    position_fr: string;
    photo_url: string;
  }[];

  language: string | undefined;
}

export default function Realisations({
  realisations,
  parteners,
  team_members,
}: I_realisations) {
  const router = useRouter();
  const { locale } = router;
  const language: string | undefined = locale;
  const translation = locale === "fr" ? fr : en;

  return (
    <div className="relative mt-32 bg-slate-100">
      <Head>
        <title>SOMABU</title>
        <meta name="description" content="test of a multilanguage website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Title_section title="Our realisations" />

      <div className="flex flex-wrap w-full bg-slate-50">
        {realisations.map((realisation) => (
          <div
            key={realisation.id}
            className="w-full p-6 md:w-1/2 2xl:w-1/3 text-bl"
          >
            <div className="">
              <div className="relative pb-[56%]   shadow-2xl bg-green-600">
                <Image
                  src={realisation.photo_url}
                  alt="image"
                  width={500} // ×
                  height={500}
                  //placeholder="blur"
                  className="absolute object-cover object-center w-full h-full "
                />
              </div>
              <div className="relative flex flex-col mx-8 -mt-12 shadow-xl rounded-2xl bg-gray-50">
                <div className="flex flex-col p-12 justify-center h-[200px] md:h-[300px]">
                  {locale === "fr" && (
                    <h3 className="font-semibold text-yellow-600 uppercase ">
                      {realisation.category_fr}
                    </h3>
                  )}
                  {locale === "en" && (
                    <h3 className="font-semibold text-yellow-600 uppercase ">
                      {realisation.category}
                    </h3>
                  )}
                  {locale === "fr" && (
                    <h1 className="pt-2 text-base font-semibold leading-8 uppercase">
                      {realisation.title_fr}
                    </h1>
                  )}

                  {locale === "en" && (
                    <h1 className="pt-2 text-base font-semibold leading-8 uppercase">
                      {realisation.title}
                    </h1>
                  )}
                  {locale === "fr" && (
                    <h3 className="flex-1 pt-4 text-sm leading-6">
                      {realisation.description_fr}
                    </h3>
                  )}
                  {locale === "en" && (
                    <h3 className="flex-1 pt-4 text-sm leading-6">
                      {realisation.description}
                    </h3>
                  )}

                  {realisation.lasting_of_execution && (
                    <div className="flex items-center w-full">
                      <span className="flex text-yellow-600 ">
                        <MdAlarm />
                      </span>
                      <span className="flex ml-1 uppercase">
                        {realisation.lasting_of_execution}{" "}
                        {locale === "en" ? "month" : "mois"}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Footer
        team_members={team_members}
        parteners={parteners}
        language={language}
        translation={translation}
      />
    </div>
  );
}

export const getStaticProps = async () => {
  const realisations = await prisma.realisation.findMany({
    // created_at and updated_at can be dificult to retreive that's why I add these parameters in findMany function
    select: {
      id: true,
      category: true,
      category_fr: true,
      title: true,
      title_fr: true,
      description: true,
      description_fr: true,
      lasting_of_execution: true,
      photo_url: true,
    },
    orderBy: { order: "asc" },
  });

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

  return {
    props: {
      realisations,
      team_members,
      parteners,
    },
  };
};
