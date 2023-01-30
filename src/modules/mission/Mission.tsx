import { useRouter } from "next/router";
import Image from "next/image";
import mission_bg_img from "../../../public/pictures/mission_side_photo.jpeg";

import en from "./locales/en";
import fr from "./locales/fr";

interface I_mission {
  description: string;
}
const Mission = () => {
  const router = useRouter();
  const { locale } = router;
  const translation = locale === "fr" ? fr : en;
  return (
    <div className="flex flex-wrap mt-6">
      <div className="md:w-1/2 px-8  bg_image_mission">
        <h2 className="text-3xl text-gray-900 uppercase font-bold">Mission</h2>
        <p className="mt-4 text-sm text-blue-900 font-bold">
          {translation.mission}
        </p>
      </div>
      <div className="md:w-1/2 px-6">
        <Image
          src={mission_bg_img}
          alt="image"
          width={2000} // ×
          height={1333}
          //placeholder="blur"
          className="object-cover object-center   "
        />
      </div>
    </div>
  );
};
export default Mission;
