import React, { useState, useRef } from "react";
import Head from "next/head";
import Image from "next/image";

import { useRouter } from "next/router";
import { prisma } from "../../../lib/prisma";
import en from "../../locales/en";
import fr from "../../locales/fr";
import Input_text from "@/modules/Input_text";
import Input_file from "@/modules/Input_file";

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

  const [form, setForm] = useState<FormData>(emtpy_form);
  // I use these two variable of codes in order to update the list after pushing on a server and I'mna call it after submitting the form in then method

  async function create(data: FormData) {
    if (data.id) {
      try {
        fetch(`http://localhost:3000/api/realisation/${data.id}`, {
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
          method: "PUT",
        })
          .then(() => {
            setForm(emtpy_form);
            refresh_data();
            console.log("then we update");
          })
          .catch((e) => console.log(e));
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await fetch(`http://localhost:3000/api/realisation/create`, {
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        })
          .then(() => {
            setForm(emtpy_form);
            console.log("then we create");
          })
          .catch((e) => console.log(e));
      } catch (error) {
        console.log(error);
      }
    }
  }

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
  const submit_fn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formula = e.currentTarget;

    const file_input = Array.from(formula.elements).find(
      ({ name }) => name === "file"
    );

    const form_data = new FormData();

    for (const file of file_input.files) {
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
    form.photo_url = data.secure_url;
    console.log("data form", form);
    try {
      // DOMPurify.sanitize(data)
      create(form);
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
      <div className="relative flex mt-32">
        <div className="w-1/2 mx-auto">
          <form
            method="post"
            onSubmit={submit_fn}
            // onSubmit={}
            className="w-auto min-w-[75%] mx-0 sm:mx-auto md:mx-8 px-4 md:px-6 py-6 flex flex-col items-stretch shadow-2xl"
          >
            <Input_text
              label="tag_fr"
              label_display="catégorie"
              placeholder="veuillez entrer la catégorie"
              value={form.tag_fr}
              on_change={(e) => setForm({ ...form, tag_fr: e.target.value })}
            />
            <Input_text
              label="tag"
              label_display="tag"
              placeholder="enter the category please"
              value={form.tag}
              on_change={(e) => setForm({ ...form, tag: e.target.value })}
            />

            <Input_text
              label="title_fr"
              label_display="le titre du projet"
              placeholder="veuiller entre le titre du projet"
              value={form.title_fr}
              on_change={(e) => setForm({ ...form, title_fr: e.target.value })}
            />
            <Input_text
              label="title"
              label_display="title"
              placeholder="The project title please"
              value={form.title}
              on_change={(e) => setForm({ ...form, title: e.target.value })}
            />
            <Input_text
              label="excerpt_fr"
              label_display="description du projet"
              placeholder="veuillez entrer la description du projet"
              value={form.excerpt_fr}
              on_change={(e) =>
                setForm({ ...form, excerpt_fr: e.target.value })
              }
            />
            <Input_text
              label="excerpt"
              label_display="excerpt"
              placeholder="Enter your excerpt please"
              value={form.excerpt}
              on_change={(e) => setForm({ ...form, excerpt: e.target.value })}
            />
            <Input_text
              label="lasting_of_execution"
              label_display="lasting_of_execution"
              placeholder="Your lasting_of_execution please"
              value={form.lasting_of_execution}
              on_change={(e) =>
                setForm({ ...form, lasting_of_execution: e.target.value })
              }
            />

            <Input_file name="file" label_display="Photo" />
            <button
              type="submit"
              className="bg-blue-500 text-white rounded p-1"
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
  const realisations = await prisma.realisation.findMany({
    // created_at and updated_at can be dificult to retreive that's why I add these parameters in findMany function
    select: {
      id: true,
      tag: true,
      title: true,
      excerpt: true,
      photo_url: true,
      lasting_of_execution: true,
    },
    orderBy: { created_at: "desc" },
  });

  return {
    props: {
      realisations,
    },
  };
};
