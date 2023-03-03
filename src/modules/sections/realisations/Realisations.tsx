import React from "react";
import Image from "next/image";
import Title_section from "../Title_section";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

interface I_realisations {
  realisations: {
    id: string;
    order: number;
    category: string;
    category_fr: string;
    title: string;
    title_fr: string;
    photo_url: string;
  }[];
  language: string | undefined;
  translation: any;
}

function Realisations({ realisations, translation }: I_realisations) {
  const slide_lefta = () => {
    let slidera = document.getElementById("slidera");
    slidera.scrollLeft = slidera.scrollLeft - 500;
  };
  const slide_righta = () => {
    let slidera = document.getElementById("slidera");
    slidera.scrollLeft = slidera.scrollLeft + 500;
  };

  return (
    <div>
      <div className="mt-8">
        <Title_section title="Our realisations" />
      </div>
      <div className="flex items-center w-full px-6 py-6">
        <MdChevronLeft
          className="hidden opacity-50 cursor-pointer lg:inline-block hover:opacity-100"
          onClick={slide_lefta}
          size={40}
        />
        <div
          id="slidera"
          className="flex w-full h-full overflow-x-scroll scroll scroll-smooth scrollbar-hide"
        >
          {realisations.map((realisation) => (
            <div
              key={realisation.id}
              className="mx-2 duration-300 ease-in-out shadow-xl hover:scale-105"
            >
              <div key={realisation.id} className="mx-4">
                <div className="w-64 h-64 overflow-hidden rounded-lg shadow-2xl">
                  <Image
                    src={realisation.photo_url}
                    alt="image"
                    width={500} // ×
                    height={500}
                    //placeholder="blur"
                    className="object-cover object-center w-full h-full shadow-2xl"
                  />
                </div>
                <div className="relative w-4/5 h-24 mx-auto -mt-4 bg-white rounded-lg shadow-xl">
                  <h1 className="flex items-center justify-center pt-4">
                    {realisation.title}
                  </h1>
                </div>
              </div>
            </div>
          ))}
        </div>
        <MdChevronRight
          className="hidden opacity-50 cursor-pointer lg:inline-block hover:opacity-100"
          onClick={slide_righta}
          size={40}
        />
      </div>
    </div>
  );
}

export default Realisations;
