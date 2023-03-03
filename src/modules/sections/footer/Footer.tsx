import React, { useState } from "react";
import { useRouter } from "next/router";
import { prisma } from "../../../../lib/prisma";
import Our_team from "../contact/Our_team";
import Parteners from "../parteners/Parteners";
import Contact_us from "@/modules/sections/contact/Contact_us";
import { Apply_modal } from "@/modules/components/Apply_modal";
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
  translation: any;
}

function Footer({ team_members, parteners, language, translation }: I_footer) {
  const [is_modal_open, set_is_modal_open] = useState<boolean>(false);
  const toggle_modal_fn = () => {
    set_is_modal_open(!is_modal_open);
  };

  return (
    <div>
      {team_members && team_members.length != 0 ? (
        <Our_team team_members={team_members} language={language} />
      ) : (
        ""
      )}

      <div className="flex items-center justify-center py-4 text-base text-red-600 bg-red-200">
        <span>We hire in the field of our expertise</span>
        <button
          className="px-4 py-3 ml-4 transition duration-150 ease-out bg-blue-500 rounded-lg text-slate-50 hover:scale-110 hover:ease-in"
          onClick={toggle_modal_fn}
        >
          Apply
        </button>
      </div>

      {is_modal_open && (
        <Apply_modal
          show={is_modal_open}
          on_close={() => set_is_modal_open(!is_modal_open)}
        />
      )}

      <Contact_us translation={translation} />
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
