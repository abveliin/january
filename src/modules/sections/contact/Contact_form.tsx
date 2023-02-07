import React, { useState } from "react";

interface FormData {
  id: string;
  email: string;
  subject: string;
  message: string;
}

function Contact_form() {
  const empty_form = {
    id: "",
    email: "",
    subject: "",
    message: "",
  };
  const [form, setForm] = useState<FormData>(empty_form);

  const on_submit_fn = async () => {
    try {
      await fetch(`/api/sendgrid`, {
        body: JSON.stringify(form),
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
  };

  return (
    <div className="md:w-1/2">
      <form
        onSubmit={on_submit_fn}
        className="w-auto min-w-[75%] mx-0 sm:mx-auto md:mx-8 px-4 md:px-6 py-6 flex flex-col items-stretch "
      >
        <div className="mb-4">
          <input
            type="email"
            placeholder="your email pleasse"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="border-2 rounded border-gray-400 p-2 w-full mx-auto"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="enter your subject"
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
            className="border-2 rounded border-gray-400 p-2 w-full mx-auto"
          />
        </div>

        <div className="mb-4">
          <textarea
            placeholder="enter your message here"
            cols={20}
            rows={4}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="border-2 rounded border-gray-400 p-2 w-full mx-auto"
          />
        </div>

        <button type="submit" className="bg-blue-500 text-white rounded p-1">
          Send your message
        </button>
      </form>
    </div>
  );
}

export default Contact_form;
