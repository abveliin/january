import React, { useState, useRef } from "react";
import Head from "next/head";

import { useRouter } from "next/router";
import { prisma } from "../../../lib/prisma";
import en from "../../locales/en";
import fr from "../../locales/fr";

import Input_file from "@/modules/Input_file";
import Input_text from "@/modules/Input_text";

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

  const [form, setForm] = useState<FormData>({
    id: "",
    name: "",
    logo_url: "",
  });
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
            setForm({
              id: "",
              name: "",
              logo_url: "",
            });
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
            setForm({
              id: "",
              name: "",
              logo_url: "",
            });
            console.log("then we create");
          })
          .catch((e) => console.log(e));
      } catch (error) {
        console.log(error);
      }
    }
  }

  // DOMPurify.sanitize(data) React.FormEvent<HTMLFormElement> React.FormEventHandler<HTMLFormElement>
  const submit_fn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formula = e.currentTarget;
    const files = e.currentTarget.file;

    const file_input = Array.from(formula.elements).find(
      ({ name }: any) => name === "file"
    );

    const form_data = new FormData();

    for (const file of files) {
      form_data.append("file", file);
      console.log("file value", file);
    }
    form_data.append("upload_preset", "team_member");

    const data = await fetch(
      "https://api.cloudinary.com/v1_1/somabu/image/upload",
      {
        method: "POST", //or put, delete,
        body: form_data,
      }
    )
      .then((res) => res.json())
      .catch((e) => console.log(e));

    console.log("data from cloudinary", data);
    form.logo_url = data.secure_url;
    console.log("data form", form);

    try {
      // DOMPurify.sanitize(data)
      create(form);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative bg-red-400">
      <Head>
        <title>SOMABU</title>
        <meta name="description" content="test of a multilanguage website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="relative bg-white mt-20">
        <p className="py-8 px-8">{translation.description}</p>

        <div className="w-1/2 mx-auto">
          <form
            method="post"
            onSubmit={submit_fn}
            // onSubmit={}
            className="w-auto min-w-[75%] mx-0 sm:mx-auto md:mx-8 px-4 md:px-6 py-6 flex flex-col items-stretch shadow-2xl"
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
              Enregistre
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
