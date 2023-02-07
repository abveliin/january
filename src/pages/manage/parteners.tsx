import React, { useState, useRef } from "react";
import Head from "next/head";

import { useRouter } from "next/router";
import { prisma } from "../../../lib/prisma";

import en from "../../locales/en";
import fr from "../../locales/fr";

import { insert_photo, photo } from "../../lib/insert_photo";

import Sidebar from "./components/Sidebar";
import Input_file from "@/modules/form/Input_file";
import Input_text from "@/modules/form/Input_text";

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
  const [form, setForm] = useState<FormData>(empty_form);
  // I use these two variable of codes in order to update the list after pushing on a server and I'mna call it after submitting the form in then method

  async function create(data: FormData) {
    if (data.id) {
      try {
        fetch(`http://localhost:3000/api/partener/${data.id}`, {
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
          method: "PUT",
        })
          .then(() => {
            setForm(empty_form);
            refresh_data();
            console.log("then we update");
          })
          .catch((e) => console.log(e));
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await fetch(`http://localhost:3000/api/partener/create`, {
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        })
          .then(() => {
            setForm(empty_form);
            console.log("then we create");
          })
          .catch((e) => console.log(e));
      } catch (error) {
        console.log(error);
      }
    }
  }

  // DOMPurify.sanitize(data) React.FormEvent<HTMLFormElement> React.FormEventHandler<HTMLFormElement>
  const submit_fn = async (event) => {
    await insert_photo(event, "team_member");

    form.logo_url = photo.secure_url;

    console.log("form.photo_url", form.logo_url);

    try {
      // DOMPurify.sanitize(data)
      create(form);
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
