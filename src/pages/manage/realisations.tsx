import React, { useState, useRef } from "react";
import Head from "next/head";
import Image from "next/image";

import { useRouter } from "next/router";
import { prisma } from "../../../lib/prisma";

import { en } from "../../locales/en";
import { fr } from "../../locales/fr";

import Sidebar from "./components/Sidebar";
import { Input_text } from "@/modules/form/Input_text";
import { Input_file } from "@/modules/form/Input_file";
import { file_uploaded, insert_file } from "../../lib/insert_file";
import { Create_fn } from "@/lib/Create_fn";
import { validate_realisation_form } from "@/lib/validate_realisation_form";

interface I_form_data {
  id: string;
  category: string;
  category_fr: string;
  title: string;
  title_fr: string;
  description: string;
  description_fr: string;
  photo_url: string;
  lasting_of_execution: string;
}

interface I_realisations {
  realisations: I_form_data;
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
    category: "",
    category_fr: "",
    title: "",
    title_fr: "",
    description: "",
    description_fr: "",
    photo_url: "",
    lasting_of_execution: "",
  };

  const api_redirection: string = "realisation";

  const [form, set_form] = useState<I_form_data>(emtpy_form);

  const [errors, set_errors] = useState<{
    category?: string;
    category_fr?: string;
    title?: string;
    title_fr?: string;
    description?: string;
    description_fr?: string;
    // photo_url?: string;
  }>({});
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
    event.preventDefault();
    const errors = validate_realisation_form(form);
    set_errors(errors);

    const errors_values = Object.values(errors);

    const is_no_error = errors_values.every(
      (error_value) => error_value.length === 0
    );

    if (!is_no_error) return;
    await insert_file(event, "team_member");

    form.photo_url = file_uploaded.secure_url;

    console.log("form.photo_url", form.photo_url);

    try {
      // DOMPurify.sanitize(data)
      Create_fn(form, api_redirection, set_form, emtpy_form, refresh_data);
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
        <div className="flex items-center justify-center flex-1 w-1/2 mx-auto bg-gray-50">
          <form
            method="post"
            onSubmit={submit_fn}
            className="w-auto min-w-[75%] mx-0 sm:mx-auto md:mx-8 px-4 md:px-6 py-6 flex flex-col items-stretch "
          >
            <Input_text
              name="category_fr"
              label="Catégorie"
              placeholder="Veuillez entrer la catégorie"
              value={form.category_fr}
              on_change={on_change}
              error={!!errors.category_fr}
              error_message={errors.category_fr}
            />
            <Input_text
              name="category"
              label="Category"
              placeholder="Enter the category please"
              value={form.category}
              on_change={on_change}
              error={!!errors.category}
              error_message={errors.category}
            />

            <Input_text
              name="title_fr"
              label="Le titre du projet"
              placeholder="Veuiller entre le titre du projet"
              value={form.title_fr}
              on_change={on_change}
              error={!!errors.title_fr}
              error_message={errors.title_fr}
            />
            <Input_text
              name="title"
              label="Title"
              placeholder="The project title please"
              value={form.title}
              on_change={on_change}
              error={!!errors.title}
              error_message={errors.title}
            />
            <Input_text
              name="description_fr"
              label="Description du projet"
              placeholder="veuillez entrer la description du projet"
              value={form.description_fr}
              on_change={on_change}
              error={!!errors.description_fr}
              error_message={errors.description_fr}
            />
            <Input_text
              name="description"
              label="description"
              placeholder="Enter the project description"
              value={form.description}
              on_change={on_change}
              error={!!errors.description}
              error_message={errors.description}
            />
            <Input_text
              name="lasting_of_execution"
              label="Lasting of execution"
              placeholder={`${
                locale === "en"
                  ? `Enter the lasting of execution`
                  : `Durée d'execution`
              }`}
              value={form.lasting_of_execution}
              on_change={on_change}
              error={false}
              error_message={""}
            />

            {/* <Input_file name="file" label="Image" /> */}

            <input
              type="file"
              name="file"
              accept="image/png, image/jpeg, image/jpg "
            />
            <button
              type="submit"
              className="p-1 text-white bg-blue-500 rounded"
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
      category: true,
      title: true,
      description: true,
      category_fr: true,
      title_fr: true,
      description_fr: true,
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
