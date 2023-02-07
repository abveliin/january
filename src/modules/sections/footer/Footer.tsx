import React from "react";
import { useRouter } from "next/router";
import { prisma } from "../../../../lib/prisma";
import Our_team from "../contact/Our_team";
import Parteners from "../parteners/Parteners";
import Contact_us from "@/modules/sections/contact/Contact_us";
import { App_signature } from "./App_signature";

interface I_footer {
  team_members: {
    id: string;
    order: number;
    name: string;
    position: string;
    position_fr: string;
    photo_url: string;
  }[];

  parteners: {
    id: string;
    order: number;
    logo_url: string;
  }[];

  language: string | undefined;
}

function Footer({ team_members, parteners, language }: I_footer) {
  return (
    <div>
      {team_members && team_members.length != 0 ? (
        <Our_team team_members={team_members} language={language} />
      ) : (
        ""
      )}

      <Contact_us />
      {parteners && parteners.length != 0 ? (
        <Parteners parteners={parteners} />
      ) : (
        ""
      )}
      <App_signature />
    </div>
  );
}

export { Footer };
