import Head from "next/head";

import { useRouter } from "next/router";
import en from "../locales/en";
import fr from "../locales/fr";

export default function Home() {
  const router = useRouter();
  const { locale } = router;
  const translation = locale === "fr" ? fr : en;

  return (
    <div className="relative bg-red-400">
      <Head>
        <title>SOMABU</title>
        <meta name="description" content="test of a multilanguage website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="relative bg-red-400 mt-20">
        <p>{translation.description}</p>
        <ul>
          <li>{translation.description_point_1}</li>
          <li>{translation.description_point_2}</li>
          <li>{translation.description_point_3}</li>
          <li>{translation.description_point_4}</li>
          <li>{translation.description_point_5}</li>
          <li>{translation.description_point_6}</li>
        </ul>
      </div>
    </div>
  );
}
