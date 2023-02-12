import React, { useState, useRef } from "react";
import Head from "next/head";
import Image from "next/image";

import { useRouter } from "next/router";
import { prisma } from "../../../lib/prisma";

import en from "../../locales/en";
import fr from "../../locales/fr";

import Sidebar from "./components/Sidebar";
import Input_text from "@/modules/form/Input_text";
import Input_file from "@/modules/form/Input_file";
import { file_uploaded, insert_photo } from "../../lib/insert_photo";
import { Create_fn } from "@/lib/Create_fn";

interface FormData {
  id: string;
  tag: string;
  tag_fr: string;
  title: string;
  title_fr: string;
  excerpt: string;
  excerpt_fr: string;
  photo_url: string;
  lasting_of_execution: string;
}

interface I_realisations {
  realisations: FormData;
}

export default function Realisation_form({ realisations }: I_realisations) {
  const router = useRouter();
  const { locale } = router;
  const translation = locale === "fr" ? fr : en;
  const refresh_data = () => {
    router.replace(router.asPath);
  };

  const emtpy_form = {
    id: "",
    tag: "",
    tag_fr: "",
    title: "",
    title_fr: "",
    excerpt: "",
    excerpt_fr: "",
    photo_url: "",
    lasting_of_execution: "",
  };

  const api_redirection: string = "realisation";

  const [form, setForm] = useState<FormData>(emtpy_form);
  // I use these two variable of codes in order to update the list after pushing on a server and I'mna call it after submitting the form in then method

  const delete_fn = async (id: string) => {
    try {
      await fetch(`http://localhost:3000/api/realisation/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(() => {
          refresh_data(); // for updating the retreiving list after a submit
          console.log("delete");
        })
        .catch((e) => console.log(e));
    } catch (error) {
      console.log(error);
    }
  };
  // DOMPurify.sanitize(data) React.FormEvent<HTMLFormElement> React.FormEventHandler<HTMLFormElement>
  const submit_fn = async (event) => {
    await insert_photo(event, "team_member");

    form.photo_url = file_uploaded.secure_url;

    console.log("form.photo_url", form.photo_url);

    try {
      // DOMPurify.sanitize(data)
      Create_fn(form, api_redirection, setForm, emtpy_form, refresh_data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Head>
        <title>SOMABU</title>
        <meta name="description" content="test of a multilanguage website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="flex min-h-screen py-8  mt-[60px]">
        <div className="w-2/6 p-6 bg-blue-100">
          <Sidebar />
        </div>
        <div className="w-1/2 flex-1 flex justify-center items-center mx-auto bg-gray-50">
          <form
            method="post"
            onSubmit={submit_fn}
            className="w-auto min-w-[75%] mx-0 sm:mx-auto md:mx-8 px-4 md:px-6 py-6 flex flex-col items-stretch "
          >
            <Input_text
              label="tag_fr"
              label_display="Catégorie"
              placeholder="Veuillez entrer la catégorie"
              value={form.tag_fr}
              on_change={(e) => setForm({ ...form, tag_fr: e.target.value })}
            />
            <Input_text
              label="tag"
              label_display="Category"
              placeholder="Enter the category please"
              value={form.tag}
              on_change={(e) => setForm({ ...form, tag: e.target.value })}
            />

            <Input_text
              label="title_fr"
              label_display="Le titre du projet"
              placeholder="Veuiller entre le titre du projet"
              value={form.title_fr}
              on_change={(e) => setForm({ ...form, title_fr: e.target.value })}
            />
            <Input_text
              label="title"
              label_display="Title"
              placeholder="The project title please"
              value={form.title}
              on_change={(e) => setForm({ ...form, title: e.target.value })}
            />
            <Input_text
              label="excerpt_fr"
              label_display="Description du projet"
              placeholder="veuillez entrer la description du projet"
              value={form.excerpt_fr}
              on_change={(e) =>
                setForm({ ...form, excerpt_fr: e.target.value })
              }
            />
            <Input_text
              label="excerpt"
              label_display="excerpt"
              placeholder="Enter the project description"
              value={form.excerpt}
              on_change={(e) => setForm({ ...form, excerpt: e.target.value })}
            />
            <Input_text
              label="lasting_of_execution"
              label_display="Lasting of execution"
              placeholder={`${
                locale === "en"
                  ? `Enter the lasting of execution`
                  : `Durée d'execution`
              }`}
              value={form.lasting_of_execution}
              on_change={(e) =>
                setForm({ ...form, lasting_of_execution: e.target.value })
              }
            />

            <Input_file name="file" label_display="Image" />
            <button
              type="submit"
              className="bg-blue-500 text-white rounded p-1"
            >
              {locale === "en" ? `Save` : `Enregistrer`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  const realisations = await prisma.realisation.findMany({
    // created_at and updated_at can be dificult to retreive that's why I add these parameters in findMany function
    select: {
      id: true,
      order: true,
      tag: true,
      title: true,
      excerpt: true,
      tag_fr: true,
      title_fr: true,
      excerpt_fr: true,
      photo_url: true,
      lasting_of_execution: true,
    },
    orderBy: { order: "asc" },
  });

  return {
    props: {
      realisations,
    },
  };
};
