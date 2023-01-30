import React from "react";
import Image from "next/image";
import Title_section from "./Title_section";

interface I_team_members {
  team_members: {
    id: string;
    name: string;
    position: string;
    photo_url: string;
  }[];
}

function Our_team({ team_members }: I_team_members) {
  return (
    <div>
      <div className="mt-8 px-6">
        <Title_section title="Our team" />
      </div>
      <div className="flex justify-center items-center w-full py-6 px-6  bg-slate-300">
        {team_members.map((team_member) => (
          <div key={team_member.id} className="relative mx-4">
            <div className="w-64 h-64 bg-black">
              <Image
                src={team_member.photo_url}
                alt="image"
                width={500} // ×
                height={500}
                //placeholder="blur"
                className="object-cover object-center h-full w-full rounded-lg overflow-hidden"
              />
            </div>
            <div className="relative w-5/6 h-24 shadow-2xl mx-auto -mt-4 bg-white">
              <div className="absolute flex flex-col justify-center items-center">
                <h2 className="text-sm uppercase">{team_member.name}</h2>
                <h1 className="w-auto h-fit text-base capitalize text-yellow-600">
                  {team_member.position}
                </h1>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Our_team;
