import React, { useState, useEffect, KeyboardEvent } from "react";
import { useRouter } from "next/router";

import { GrDocumentPdf } from "react-icons/gr";

import React_portal from "./React_portal";

import { insert_file, file_uploaded } from "@/lib/insert_file";
import { MdOutlineClose } from "react-icons/md";

import { Input_file } from "@/modules/form/Input_file";
import { Input_text } from "@/modules/form/Input_text";
import { validate_apply } from "@/lib/validate_apply";

import { en } from "../../locales/en";
import { fr } from "../../locales/fr";
import { Text_area } from "../form/Text_area";

interface I_apply_modal {
  show: boolean;
  on_close: () => void;
}

interface I_form_data {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  motivation: string;
  language: string | undefined;
  file_url: string;
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
    motivation: "",
    language: locale,
    file_url: "",
  };

  const [form, setForm] = useState<I_form_data>(emtpy_form);

  const [errors, set_errors] = useState<{
    name?: string;
    email?: string;
    phone?: string;
    position?: string;
    motivation?: string;
    language?: string;
    file_url?: string;
  }>({});

  useEffect(() => {
    const close_on_escape_key: any = (e: KeyboardEvent) => {
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
    const errors = validate_apply(form);
    const is_error = Object.keys(errors).length;

    if (is_error && is_error > 0) {
      set_errors(errors);
      // console.log(errors);
      return;
    }
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
              label="name"
              placeholder="enter your name"
              value={form.name}
              on_change={on_change}
              error={!!errors.name}
              error_message={errors.name}
            />
            <Input_text
              name="email"
              label="email"
              placeholder="Enter email please"
              value={form.email}
              on_change={on_change}
              error={!!errors.email}
              error_message={errors.email}
            />

            <Input_text
              name="phone"
              label="Phone number"
              placeholder="enter your phone number"
              value={form.phone}
              on_change={on_change}
              error={!!errors.phone}
              error_message={errors.phone}
            />
            <Input_text
              name="position"
              label="position"
              placeholder="position"
              value={form.position}
              on_change={on_change}
              error={!!errors.position}
              error_message={errors.position}
            />

            <Text_area
              name="motivation"
              label="your motivation"
              placeholder="your motivation"
              value={form.motivation}
              on_change={on_change}
              error={!!errors.motivation}
              error_message={errors.motivation}
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
