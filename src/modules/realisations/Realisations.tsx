import React from "react";
import Image from "next/image";
import Title_section from "../Title_section";

interface I_realisations {
  realisations: {
    id: string;
    tag: string;
    title: string;
    excerpt: string;
    photo_url: string;
    lasting_of_execution: string;
  }[];
}

function Realisations({ realisations }: I_realisations) {
  return (
    <div>
      <div className="mt-8 px-6">
        <Title_section title="Our realisations" />
      </div>
      <div className="flex w-full h-96 py-6 px-6 bg-red-400">
        {realisations.map((realisation) => (
          <div key={realisation.id} className="mx-4">
            <div className="w-64 h-64  bg-black">
              <Image
                src={realisation.photo_url}
                alt="image"
                width={500} // ×
                height={500}
                //placeholder="blur"
                className="object-cover object-center h-full w-full rounded-lg overflow-hidden"
              />
            </div>
            <div className="relative w-4/5 h-24 mx-auto -mt-4 shadow-xl bg-white">
              <h1 className="flex justify-center items-center">
                {realisation.title}
              </h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Realisations;
