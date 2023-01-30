import React from "react";
import Image from "next/image";

import Title_section from "../Title_section";

interface I_parteners {
  parteners: {
    id: string;
    name: string;
    logo_url: string;
  }[];
}

function Parteners({ parteners }: I_parteners) {
  return (
    <div>
      <Title_section title="Nos parteneurs" />

      <div className="flex justify-center items-center w-full py-6 px-6  bg-slate-300">
        {parteners.map((partener) => (
          <div
            key={partener.id}
            className="mx-4 flex justify-center items-center"
          >
            <Image
              src={partener.logo_url}
              alt="image"
              width={500} // ×
              height={500}
              //placeholder="blur"
              className="object-cover object-center w-auto h-32 rounded-lg shadow-2xl overflow-hidden"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Parteners;
