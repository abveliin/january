import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import Title_section from "../modules/sections/Title_section";
import { fr } from "../../src/locales/about/fr";
import { en } from "../../src/locales/about/en";

import about_1 from "/public/pictures/about/about_1.jpeg";
import about_2 from "/public/pictures/about/about_2.jpeg";

export default function About() {
  const router = useRouter();
  const { locale } = router;
  const translation = locale === "fr" ? fr : en;

  const {
    historical_2,
    historical_3,
    historical_4,
    historical_5,
    historical_6,
    historical_7,
  } = translation;

  const { vision_1, vision_2, vision_3, vision_4, vision_5, vision_6 } =
    translation;

  return (
    <div className="mt-32 text-sm leading-5 text-gray-900 bg-gray-50 md:leading-7">
      <Title_section title="ABOUT SOMABU" />
      <div className="p-2 mx-1 -m-4 bg-red-300 md:p-4 md:mx-8 lg:flex md:text-base">
        <div className="w-full bg-blue-300 lg:w-1/2">
          <div className="px-4">
            <div className="relative pb-[53%]">
              <Image
                src={about_1}
                alt="image"
                width={1024} // ×
                height={682}
                //placeholder="blur"
                className="absolute object-cover object-center w-full h-full "
              />
            </div>
          </div>
          <div className="px-4 pt-2">
            <div className="relative pb-[53%]">
              <Image
                src={about_2}
                alt="image"
                width={1024} // ×
                height={682}
                //placeholder="blur"
                className="absolute object-cover object-center w-full h-full "
              />
            </div>
          </div>
        </div>
        <div className="w-full px-4 mt-8 lg:-mt-4 lg:w-1/2">
          <Title_section title="MISSION" />
          <p className="leading-7">{translation.mission}</p>
        </div>
      </div>
      <div className="p-2 py-5 mx-8 my-4 text-xl text-center uppercase border-b-4 shadow bg-gray-50 border-ye shadow-ye">
        {/* {locale === "en" ? "We have" : "Nous avons"}
        <span className="mx-4 text-3xl border-b-2 shadow-lg text-ye shadow-ye">
          12 {locale === "en" ? "years" : "ans"}
        </span>
         */}

        <div className="flex border-2 border-red-500 w-fit">
          <div className="text-4xl align-bottom text-ye">
            {new Date().getFullYear() - 2008}
          </div>
          <div className="flex flex-col pl-4 align-bottom">
            <span className="text-sm text-start">
              {locale === "en" ? "years" : "ans"}
            </span>
            <span className="text-lg font-extrabold text-start">
              {locale === "en" ? "of experience" : "d'expérience"}
            </span>
          </div>
        </div>
      </div>
      <div className="p-2 mx-1 mt-8 mb-8 md:mx-8 lg:flex">
        <div className="w-full mx-4 lg:w-1/3">
          <div className="mt-8">
            <h1 className="text-base font-bold">
              {translation.historical_title}
            </h1>
            <br />

            <div className="">
              {translation.historical_1}
              <br />
              <br />

              <div className="flex">
                <span className="mr-1">•</span>
                {historical_2}
                <br />
              </div>
              <div className="flex">
                <span className="mr-1">•</span>
                {historical_3}
                <br />
              </div>
              <div className="flex">
                <span className="mr-1">•</span>
                {historical_4}
                <br />
              </div>
              <div className="flex">
                <span className="mr-1">•</span>
                {historical_5}
                <br />
              </div>
              <div className="flex">
                <span className="mr-1">•</span>
                {historical_6}
                <br />
              </div>
              <div className="flex">
                <span className="mr-1">•</span>
                {historical_7}
                <br />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full mx-4 lg:w-1/3">
          <h1 className="mt-8 text-lg font-bold">{translation.vision_title}</h1>
          <br />
          <div className="">
            <div className="flex">
              <span className="mr-1">-</span>
              {vision_1}
              <br />
            </div>
            <div className="flex">
              <span className="mr-1">-</span>
              {vision_2}
              <br />
            </div>
            <div className="flex">
              <span className="mr-1">-</span>
              {vision_3}
              <br />
            </div>
            <div className="flex">
              <span className="mr-1">-</span>
              {vision_4}
              <br />
            </div>
            <div className="flex">
              <span className="mr-1">-</span>
              {vision_5}
              <br />
            </div>
            <div className="flex">
              <span className="mr-1">-</span>
              {vision_6}
              <br />
            </div>
          </div>
        </div>
        <div className="w-full mx-4 lg:w-1/3">
          <h1 className="mt-8 text-lg font-bold">
            {translation.resources_title}
          </h1>
          <br />
          <p className="">{translation.resources}</p>
        </div>
      </div>
    </div>
  );
}
