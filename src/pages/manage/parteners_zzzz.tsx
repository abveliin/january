import React, { useState, useRef } from "react";
import Head from "next/head";

import { useRouter } from "next/router";
import { prisma } from "../../../lib/prisma";

import { en } from "../../locales/en";
import { fr } from "../../locales/fr";

import { insert_file, file_uploaded } from "../../lib/insert_file";
import { Create_fn } from "../../lib/Create_fn";

import Sidebar from "./components/Sidebar";
import { Input_file } from "@/modules/form/Input_file";
import { Input_text } from "@/modules/form/Input_text";
import { validate_partener_form } from "@/lib/validate_partener_form";
import { on_change } from "@/lib/on_change";

interface I_form_data {
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

  const [form, set_form] = useState<I_form_data>(empty_form);
  const [message, set_message] = useState("");

  const [errors, set_errors] = useState<{
    name?: string;
    logo_url?: string;
  }>({});
  // I use these two variable of codes in order to update the list after pushing on a server and I'mna call it after submitting the form in then method

  // DOMPurify.sanitize(data) React.FormEvent<HTMLFormElement> React.FormEventHandler<HTMLFormElement>
  const submit_fn = async (event) => {
    event.preventDefault();

    const formula = event.currentTarget;
    const file_input: any = Array.from(formula.elements).find(
      ({ name }: any) => name === "file"
    );
    // set_errors({ ...errors, title: e.target.value });
    console.log("file_input", file_input);
    const file_to_send = file_input.files[0];
    console.log("file_input exist?", file_to_send?.length);
    console.log("file_input is a image?", file_to_send);

    const errors = validate_partener_form(form);

    set_errors(errors);

    if (file_to_send && file_to_send?.type.includes("image")) {
      set_errors({ ...errors, logo_url: "" });
    } else {
      set_errors({
        ...errors,
        logo_url: "vous devez envoyer une image valide",
      });

      return;
    }
    console.log("errors are here", errors);
    // set_errors({ ...errors, logo_url: e.target.value })
    const errors_values = Object.values(errors);

    const is_no_error = errors_values.every(
      (error_value) => error_value.length === 0
    );

    if (!is_no_error) return;
    await insert_file(event, "team_member");

    form.logo_url = file_uploaded.secure_url;

    console.log("form.photo_url", form.logo_url);

    try {
      Create_fn(form, api_redirection, set_form, empty_form, refresh_data);
      set_message("votre requete a ete envoye avec sucess");
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

        <div className="w-1/2 mx-auto mt-20">
          <form
            method="post"
            onSubmit={submit_fn}
            className="flex flex-col w-1/2 justify-center  min-w-[75%] mx-0 sm:mx-auto md:mx-8 px-4 md:px-6 py-6  items-stretch"
          >
            <Input_text
              name="name"
              label="Nom du parteneur"
              placeholder="Nom du parteneur"
              value={form.name}
              on_change={on_change}
              error={!!errors.name}
              error_message={errors.name}
            />

            <Input_file
              label="Photo"
              on_change={on_change}
              error={!!errors.logo_url}
              error_message={errors.logo_url}
            />
            {/* <input type="file" name="file" /> */}
            <button
              type="submit"
              className="p-1 text-white bg-blue-500 rounded"
            >
              Enregistrer
            </button>
            {message && (
              <span className="mt-6 text-sm text-center text-green-600 bg-green-100 border-2 border-green-800">
                envoyer avec succes
              </span>
            )}
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
