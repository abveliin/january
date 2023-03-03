import React, { useRef, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import { Apply_modal } from "../../components/Apply_modal";
import Title_section from "../Title_section";

import { insert_photo } from "@/lib/insert_file";

import en from "../../../locales/en";
import fr from "../../../locales/fr";
//import { Modal_to_apply } from "./Modal_to_apply";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

interface I_team_members {
  team_members: {
    id: string;
    name: string;
    position: string;
    position_fr: string;
    photo_url: string;
  }[];

  language: string | undefined;
}

function Our_team({ team_members, language }: I_team_members) {
  const [is_modal_open, set_is_modal_open] = useState(false);

  const router = useRouter();
  const { locale } = router;
  const translation = locale === "fr" ? fr : en;
  const refresh_data = () => {
    router.replace(router.asPath);
  };

  const slide_left = () => {
    let slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 500;
  };
  const slide_right = () => {
    let slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  return (
    <div>
      <div className="mt-8">
        <Title_section title="Our team" />
      </div>
      <div className="flex items-center w-full py-6 px-6">
        <MdChevronLeft
          className="hidden lg:inline-block opacity-50 cursor-pointer hover:opacity-100"
          onClick={slide_left}
          size={40}
        />
        <div
          id="slider"
          className="flex w-full h-full overflow-x-scroll scroll scroll-smooth scrollbar-hide"
        >
          {team_members.map((team_member) => (
            <div
              key={team_member.id}
              className="hover:scale-105 ease-in-out duration-300 mx-2 shadow-xl"
            >
              <div className="flex w-32 md:w-64 rounded-xl overflow-hidden">
                <Image
                  src={team_member.photo_url}
                  alt="image"
                  width={500} // ×
                  height={500}
                  //placeholder="blur"
                  className="object-cover object-center h-full w-full"
                />
              </div>
              <div className="relative h-[100px] md:h-[130px]">
                <div className="flex flex-col justify-center items-center">
                  <h2 className="flex justify-center items-center w-full h-auto pt-2 text-center  text-xs md:text-sm leading-5 uppercase">
                    {team_member.name}
                  </h2>
                  <h1 className="w-auto pt-3 text-center  text-xs md:text-sm leading-5 capitalize text-yellow-600">
                    {language === "en"
                      ? team_member.position
                      : team_member.position_fr}
                  </h1>
                </div>
              </div>
            </div>
          ))}
        </div>
        <MdChevronRight
          className="hidden lg:inline-block opacity-50 cursor-pointer hover:opacity-100"
          onClick={slide_right}
          size={40}
        />
      </div>
    </div>
  );
}

export default Our_team;
