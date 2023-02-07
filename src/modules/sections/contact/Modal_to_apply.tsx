import React, { useState } from "react";
import { useRouter } from "next/router";

import { GrDocumentPdf } from "react-icons/gr";

import { insert_photo, photo } from "@/lib/insert_photo";
import { MdOutlineClose } from "react-icons/md";

import Input_file from "@/modules/form/Input_file";
import Input_text from "@/modules/form/Input_text";

import en from "../../../locales/en";
import fr from "../../../locales/fr";

interface FormData {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  subject: string;
  message: string;
  language: string | undefined;
  file_url: string;
}

interface I_modal_to_apply {
  is_modal_open: boolean;
}

function Modal_to_apply({ on_close }) {
  const router = useRouter();
  const { locale } = router;
  const translation = locale === "fr" ? fr : en;
  const refresh_data = () => {
    router.replace(router.asPath);
  };
  const emtpy_form = {
    id: "",
    name: "",
    email: "",
    phone: "",
    position: "",
    subject: "",
    message: "",
    language: locale,
    file_url: "",
  };

  const [form, setForm] = useState<FormData>(emtpy_form);

  async function create(data: FormData) {
    try {
      await fetch(`/api/modal_to_apply/create`, {
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

  const submit_fn = async (event) => {
    await insert_photo(event, "team_member");

    form.file_url = photo.secure_url;

    console.log("form.photo_url", form.file_url);

    try {
      // DOMPurify.sanitize(data)
      create(form);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="absolute inset-0 mx-auto bg-white/70">
      <div className="mt-24 w-3/4 mx-auto overflow-scroll border-2 border-red-700 bg-gray-50 shadow-2xl">
        <div className="flex">
          <div className="relative flex w-full h-full justify-end p-4">
            <h2 className="flex justify-start w-full text-sm text-center bg-green-500">
              Apply to join our team
            </h2>
            <MdOutlineClose
              className="text-9xl md:text-sm w-8 h-8 bg-gray-200"
              onClick={on_close}
            />
          </div>
        </div>
        <form
          method="post"
          onSubmit={submit_fn}
          className="w-auto min-w-[75%] mx-0 sm:mx-auto md:mx-8 px-4 md:px-6 py-6 flex flex-col items-stretch "
        >
          <Input_text
            label="tag_fr"
            label_display="Catégorie"
            placeholder="Veuillez entrer la catégorie"
            value={form.name}
            on_change={(e) => setForm({ ...form, name: e.target.value })}
          />
          <Input_text
            label="tag"
            label_display="Category"
            placeholder="Enter the category please"
            value={form.email}
            on_change={(e) => setForm({ ...form, email: e.target.value })}
          />

          <Input_text
            label="title_fr"
            label_display="Le titre du projet"
            placeholder="Veuiller entre le titre du projet"
            value={form.phone}
            on_change={(e) => setForm({ ...form, phone: e.target.value })}
          />
          <Input_text
            label="title"
            label_display="Title"
            placeholder="The project title please"
            value={form.position}
            on_change={(e) => setForm({ ...form, position: e.target.value })}
          />
          <Input_text
            label="excerpt_fr"
            label_display="Description du projet"
            placeholder="veuillez entrer la description du projet"
            value={form.subject}
            on_change={(e) => setForm({ ...form, subject: e.target.value })}
          />
          <Input_text
            label="excerpt"
            label_display="excerpt"
            placeholder="Enter the project description"
            value={form.message}
            on_change={(e) => setForm({ ...form, message: e.target.value })}
          />

          <Input_file name="file" label_display="cv pdf" />
          <button className="flex w-auto items-center p-2 bg-red-400 rounded-lg">
            <GrDocumentPdf className="text-lg" />
            <span className="ml-4">ajouter votre cv</span>
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white rounded p-1 it"
          >
            {locale === "en" ? `Save` : `Enregistrer`}
          </button>
        </form>
      </div>
    </div>
  );
}

export { Modal_to_apply };
