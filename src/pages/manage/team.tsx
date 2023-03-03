import React, { useState, useRef } from "react";
import Head from "next/head";

import { useRouter } from "next/router";
import { prisma } from "../../../lib/prisma";
import { en } from "../../locales/en";
import { fr } from "../../locales/fr";

import { insert_file, file_uploaded } from "../../lib/insert_file";
import { Create_fn } from "../../lib/Create_fn";
import { validate_team_form } from "../../lib/validate_team_form";

import { Input_file } from "@/modules/form/Input_file";
import { Input_text } from "@/modules/form/Input_text";
//import insert_photo from "./insert_photo";
import Sidebar from "./components/Sidebar";
import { Cud } from "@/lib/cud";

interface I_form_data {
  name: string;
  position: string;
  position_fr: string;
  photo_url: string;
  id: string;
}

interface I_team_members {
  team_members: {
    id: string;
    name: string;
    photo_url: string;
  }[];
  positions: {
    id: string;
    name_fr: string;
    name_en: string;
  }[];
}

export default function Team({ team_members, positions }: I_team_members) {
  const router = useRouter();
  const { locale } = router;
  const translation = locale === "fr" ? fr : en;
  const refresh_data = () => {
    router.replace(router.asPath);
  };

  const empty_form = {
    name: "",
    position: "",
    position_fr: "",
    photo_url: "",
    id: "",
  };

  const [form, set_form] = useState<I_form_data>(empty_form);
  const [errors, set_errors] = useState<{
    name?: string;
    position?: string;
    position_fr?: string;
    //photo_url?: string;
  }>({});
  // I use these two variable of codes in order to update the list after pushing on a server and I'mna call it after submitting the form in then method

  let api_redirection: string = "team";

  //Cud(data, api_redirection);

  // DOMPurify.sanitize(data) React.FormEvent<HTMLFormElement> React.FormEventHandler<HTMLFormElement>
  const submit_fn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const errors = validate_team_form(form);
    set_errors(errors);

    const errors_values = Object.values(errors);

    const is_no_error = errors_values.every(
      (error_value) => error_value.length === 0
    );

    if (!is_no_error) return;
    await insert_file(event, "team_member");

    form.photo_url = file_uploaded.secure_url;

    try {
      // DOMPurify.sanitize(data)
      Create_fn(form, api_redirection, set_form, empty_form, refresh_data);
      //Cud(form, api_redirection);
    } catch (error) {
      console.log(error);
    }
  };

  const on_change = (
    e:
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => {
    set_form((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="relative">
      <Head>
        <title>SOMABU</title>
        <meta name="description" content="test of a multilanguage website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="flex min-h-screen py-8  mt-[60px]">
        <div className="w-2/6 p-6 bg-blue-100">
          <Sidebar />
        </div>

        <div className="w-1/2 mx-auto mt-20">
          <form
            method="post"
            onSubmit={submit_fn}
            className="w-auto min-w-[75%] mx-0 sm:mx-auto md:mx-8 px-4 md:px-6 py-6 flex flex-col items-stretch"
          >
            <Input_text
              name="name"
              label="name"
              placeholder="enter your name"
              value={form.name}
              on_change={on_change}
              error={!!errors.name}
              error_message={errors.name}
            />
            <Input_text
              name="position"
              label="position"
              placeholder="enter your position"
              value={form.position}
              on_change={on_change}
              error={!!errors.position}
              error_message={errors.position}
            />
            <Input_text
              name="position_fr"
              label="Position occupé"
              placeholder="Position"
              value={form.position_fr}
              on_change={on_change}
              error={!!errors.position_fr}
              error_message={errors.position_fr}
            />

            <input type="file" name="file" accept="image/*" />

            {/* <Input_file
              name="file"
              label="photo"
              error={!!errors.photo_url}
              error_message={errors.photo_url}
            /> */}

            <button
              type="submit"
              className="p-1 text-white bg-blue-500 rounded"
            >
              Send your message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  const team_members = await prisma.team_member.findMany({
    // created_at and updated_at can be dificult to retreive that's why I add these parameters in findMany function
    select: {
      name: true,
      position: true,
      photo_url: true,
    },
    orderBy: { created_at: "desc" },
  });

  return {
    props: {
      team_members,
    },
  };
};
