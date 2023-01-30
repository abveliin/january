import React from "react";

function Contact_form() {
  return (
    <div className="md:w-1/2">
      <form
        // onSubmit={}
        className="w-auto min-w-[75%] mx-0 sm:mx-auto md:mx-8 px-4 md:px-6 py-6 flex flex-col items-stretch shadow-2xl"
      >
        <div className="mb-4">
          <input
            type="text"
            placeholder="enter your name"
            //value={form.title}
            //onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="border-2 rounded border-gray-400 p-2 w-full mx-auto"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="your email pleasse"
            //value={form.title}
            //onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="border-2 rounded border-gray-400 p-2 w-full mx-auto"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="enter your subject"
            //value={form.title}
            //onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="border-2 rounded border-gray-400 p-2 w-full mx-auto"
          />
        </div>

        <div className="mb-4">
          <textarea
            placeholder="enter your message here"
            cols={20}
            rows={4}
            //value={form.title}
            //onChange={(e) => setForm({ ...form, title: e.target.value })}
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
