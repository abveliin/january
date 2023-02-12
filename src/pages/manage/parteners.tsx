import React, { useState, useRef } from "react";
import Head from "next/head";

import { useRouter } from "next/router";
import { prisma } from "../../../lib/prisma";

import en from "../../locales/en";
import fr from "../../locales/fr";

import { insert_photo, file_uploaded } from "../../lib/insert_photo";
import { Create_fn } from "../../lib/Create_fn";

import Sidebar from "./components/Sidebar";
import Input_file from "@/modules/form/Input_file";
import Input_text from "@/modules/form/Input_text";
import { validate } from "@/lib/validate";

interface FormData {
  id: string;
  name: string;
  logo_url: string;
}

interface I_parteners {
  parteners: {
    id: string;
    name: string;
    logo_url: string;
  }[];
}

export default function Team({ parteners }: I_parteners) {
  const router = useRouter();
  const { locale } = router;
  const translation = locale === "fr" ? fr : en;
  const refresh_data = () => {
    router.replace(router.asPath);
  };

  const empty_form = {
    id: "",
    name: "",
    logo_url: "",
  };

  const api_redirection: string = "partener";

  const [form, setForm] = useState<FormData>(empty_form);
  // I use these two variable of codes in order to update the list after pushing on a server and I'mna call it after submitting the form in then method

  // DOMPurify.sanitize(data) React.FormEvent<HTMLFormElement> React.FormEventHandler<HTMLFormElement>
  const submit_fn = async (event) => {
    event.preventDefault();
    await insert_photo(event, "team_member");

    form.logo_url = file_uploaded.secure_url;

    console.log("form.photo_url", form.logo_url);

    try {
      // DOMPurify.sanitize(data)</div>

      const errors = validate({ name });
      const is_error = Object.keys(errors).length;
      if (is_error && is_error > 0) {
        console.log(errors);
        return;
      }
      Create_fn(form, api_redirection, setForm, empty_form, refresh_data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative bg-grey-50">
      <Head>
        <title>SOMABU</title>
        <meta name="description" content="test of a multilanguage website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="flex min-h-screen py-8  mt-[60px]">
        <div className="w-2/6 p-6 bg-blue-100">
          <Sidebar />
        </div>

        <div className="mx-auto w-1/2 mt-20">
          <form
            method="post"
            onSubmit={submit_fn}
            className="flex flex-col w-1/2 justify-center  min-w-[75%] mx-0 sm:mx-auto md:mx-8 px-4 md:px-6 py-6  items-stretch"
          >
            <Input_text
              label="name"
              label_display="Nom du parteneur"
              placeholder="Nom du parteneur"
              value={form.name}
              on_change={(e: any) => setForm({ ...form, name: e.target.value })}
              error_message="name must contains only letter"
            />
            <Input_file name="file" label_display="Photo" />

            <button
              type="submit"
              className="bg-blue-500 text-white rounded p-1"
            >
              Enregistrer
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  const parteners = await prisma.partener.findMany({
    // created_at and updated_at can be dificult to retreive that's why I add these parameters in findMany function
    select: {
      name: true,
      logo_url: true,
    },
    orderBy: { created_at: "desc" },
  });

  return {
    props: {
      parteners,
    },
  };
};
