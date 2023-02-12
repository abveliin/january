import React, { useState, useEffect, KeyboardEvent } from "react";
import { useRouter } from "next/router";

import { GrDocumentPdf } from "react-icons/gr";

import React_portal from "./React_portal";

import { insert_photo, file_uploaded } from "@/lib/insert_photo";
import { MdOutlineClose } from "react-icons/md";

import Input_file from "@/modules/form/Input_file";
import Input_text from "@/modules/form/Input_text";

import en from "../../locales/en";
import fr from "../../locales/fr";
import Text_area from "../form/Text_area";

interface I_apply_modal {
  show: boolean;
  on_close: () => void;
}

interface FormData {
  id: string;
  name: string;
  message: string;
}

const Apply_modal = ({ show, on_close }: I_apply_modal) => {
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
  useEffect(() => {
    const close_on_escape_key = (e: KeyboardEvent) => {
      e.key === "Escape" ? on_close() : null;
    };

    document.body.addEventListener("keydown", close_on_escape_key);
    return () => {
      document.body.removeEventListener("keydown", close_on_escape_key);
    };
  }, [on_close]);

  //disable scroll on modal load
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return (): void => {
      document.body.style.overflow = "unset";
    };
  }, [show]);

  if (!show) return null;

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

  const submit_fn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(form);
    // await insert_photo(event, "team_member");

    // form.file_url = file_uploaded.secure_url;

    // console.log("form.photo_url", form.file_url);

    // try {
    //   // DOMPurify.sanitize(data)
    //   create(form);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const on_change = (
    e:
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <React_portal wrapper_id="react_portal_apply_modal">
      <div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center w-full h-screen text-4xl transition duration-700 ease-out bg-black/80"
        onClick={on_close}
      >
        <div
          className="relative w-4/5 h-auto px-5 mt-4 overflow-y-scroll text-sm transition duration-700 ease-out border-2 rounded-lg bg-gray-50 scrollbar-hide"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="sticky top-0 left-0 right-0 flex justify-between px-5 pt-4 -mx-5 text-lg bg-gray-400">
            <div>the formula to enter</div>

            <MdOutlineClose
              className="w-8 h-8 bg-gray-200 md:text-sm"
              onClick={on_close}
            />
          </div>

          <form
            method="post"
            onSubmit={submit_fn}
            className="flex flex-col items-stretch w-auto px-4 py-6 mx-0 sm:mx-auto md:mx-8 md:px-6 "
          >
            <Input_text
              name="name"
              label="Catégorie"
              placeholder="Veuillez entrer la catégorie"
              value={form.name}
              on_change={on_change}
            />
            <Text_area
              name="message"
              label="Catégorie"
              placeholder="Veuillez entrer la catégorie"
              value={form.message}
              on_change={on_change}
            />

            <Input_file name="file" label_display="cv pdf" />
            <button className="flex items-center w-auto p-2 text-gray-800 transition duration-75 bg-blue-300 rounded-lg hover:scale-105 hover:ease-in-out">
              <GrDocumentPdf className="text-lg text-red-800" />
              <span className="ml-4">cliquer ici pour ajouter votre cv</span>
            </button>
            <div className="flex justify-between">
              <button
                type="submit"
                className="w-auto p-1 mt-4 text-white bg-blue-500 rounded disabled:bg-opacity-50"
                //disabled={true}
              >
                {locale === "en" ? `Save` : `Enregistrer`}
              </button>
              <button
                type="submit"
                className="w-auto p-1 mt-4 text-white bg-red-500 rounded disabled:cursor-not-allowed disabled:bg-opacity-50"
                onClick={on_close}
                disabled={true}
              >
                {locale === "en" ? `Cancel` : `Retour`}
              </button>
            </div>
          </form>
        </div>
      </div>
    </React_portal>
  );
};

export { Apply_modal };
