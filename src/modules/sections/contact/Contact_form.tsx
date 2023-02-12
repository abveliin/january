import React, { useState } from "react";

import { Input_text } from "@/modules/form/Input_text";
import { Input_email } from "@/modules/form/Input_email";
import { Text_area } from "@/modules/form/Text_area";
import { validate } from "@/lib/validate";

interface I_form_data {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
}

function Contact_form() {
  const empty_form = {
    id: "",
    name: "",
    email: "",
    subject: "",
    message: "",
  };
  const [form, setForm] = useState<I_form_data>(empty_form);
  const [errors, set_errors] = useState<{
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
  }>({});

  const on_submit_fn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(form);
    const errors = validate(form);
    const is_error = Object.keys(errors).length;

    if (is_error && is_error > 0) {
      set_errors(errors);
      // console.log(errors);
      return;
    }
    console.log(form);
    // try {
    //   await fetch(`/api/sendgrid`, {
    //     body: JSON.stringify(form),
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     method: "POST",
    //   })
    //     .then(() => {
    //       setForm(empty_form);
    //       console.log("then we create");
    //     })
    //     .catch((e) => console.log(e));
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
    <div className="md:w-1/2">
      <form
        onSubmit={on_submit_fn}
        className="w-auto min-w-[75%] mx-0 sm:mx-auto md:mx-8 px-4 md:px-6 py-6 flex flex-col items-stretch "
      >
        <Input_text
          name="name"
          label="Votre nom"
          placeholder="entrer votre nom"
          value={form.name}
          on_change={on_change}
          error={!!errors.name}
          error_message={errors.name}
        />
        <Input_text
          name="email"
          label="Email"
          placeholder="entrer votre email ici"
          value={form.email}
          on_change={on_change}
          error={!!errors.email}
          error_message={errors.email}
        />

        <Input_text
          name="subject"
          label="Sujet"
          placeholder="entrer le sujet de votre message"
          value={form.subject}
          on_change={on_change}
          error={!!errors.subject}
          error_message={errors.subject}
        />

        <Text_area
          name="message"
          label="Message"
          placeholder="Veuillez entrer message svp"
          value={form.message}
          on_change={on_change}
          error={!!errors.message}
          error_message={errors.message}
        />

        <button type="submit" className="p-1 text-white bg-blue-500 rounded">
          Send your message
        </button>
      </form>
    </div>
  );
}

export default Contact_form;
