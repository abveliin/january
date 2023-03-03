import { Parallax, Background } from "react-parallax";

import { useRouter } from "next/router";
import { en } from "../../../locales/en";
import { fr } from "../../../locales/fr";

interface I_summary_parallax {
  translation: object;
}
const Summary_parallax = () => {
  const router = useRouter();
  const { locale } = router;
  const translation = locale === "fr" ? fr : en;
  return (
    <Parallax
      strength={400}
      //className="relative flex items-center justify-center w-full mt-8 bg-red-900 aspect-video" // h-screen bg-fixed bg-center bg-cover
      className="relative px-8 py-16 -mt-16 text-base leading-none text-white bg-blue-900 md:w-1/2"
    >
      <Background className="w-screen aspect-video bg_image_summary" />
      {
        <div className="">
          <p>{translation.description}</p>

          <ul className="mt-6 ml-8">
            <li>&#x2022; {translation.description_point_1}</li>
            <li>&#x2022; {translation.description_point_2}</li>
            <li>&#x2022; {translation.description_point_3}</li>
            <li>&#x2022; {translation.description_point_4}</li>
            <li>&#x2022; {translation.description_point_5}</li>
            <li>&#x2022; {translation.description_point_6}</li>
          </ul>
          <p className="mt-12 text-xl">{translation.historical}</p>
        </div>
      }
    </Parallax>
  );
};
export default Summary_parallax;
