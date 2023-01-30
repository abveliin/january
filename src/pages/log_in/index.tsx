import React, { useState, useRef } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import axios from "axios";
import { prisma } from "../../../lib/prisma";
import en from "../../locales/en";
import fr from "../../locales/fr";

import Input_text from "@/modules/Input_text";

interface FormData {
  username: string;
  password: string;
  id: string;
}

interface I_users {
  users: FormData[];
}

export default function Team({ users }: I_users) {
  const router = useRouter();
  const { locale } = router;
  const translation = locale === "fr" ? fr : en;
  const refresh_data = () => {
    router.replace(router.asPath);
  };

  const empty_form = { username: "", password: "", id: "" };
  const url = "http://localhost:3000";

  const [form, setForm] = useState<FormData>(empty_form);
  const [error, set_error] = useState(false);
  // I use these two variable of codes in order to update the list after pushing on a server and I'mna call it after submitting the form in then method

  async function create(data: FormData) {
    try {
      const user = await axios.post(`${url}/api/auth/log_in`, data);
      setForm(empty_form);

      if (user.status === 200) {
        router.push(`${url}/manage`);
        console.log("we are in a 200 status code");
        console.log("yeah we get it");
      }
      console.log("log user", user);
    } catch (error) {
      console.log(error);
      console.log("we are fail to login");
      set_error(true);
    }
  }
  async function log_out() {
    try {
      const user = await fetch(`${url}/api/auth/log_out`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
      })
        .then(() => {
          console.log("you logged out successfully");
        })
        .catch((e) => console.log(e));
      console.log("log user", user);
    } catch (error) {
      console.log(error);
    }
  }

  // DOMPurify.sanitize(data) React.FormEvent<HTMLFormElement> React.FormEventHandler<HTMLFormElement>
  const submit_fn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-1"
                htmlFor="Name"
              >
                Username
              </label>
              <input
                type="text"
                placeholder="enter your username"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                className="border-2 rounded border-gray-400 p-2 w-full mx-auto"
              />
            </div>
            <Input_text
              label="password"
              label_display="Password"
              placeholder="password"
              value={form.password}
              on_change={(e: any) =>
                setForm({ ...form, password: e.target.value })
              }
            />

            <button
              type="submit"
              className="bg-blue-500 text-white rounded p-1"
            >
              Login
            </button>
            <button
              onClick={log_out}
              className="bg-blue-500 text-white rounded p-1"
            >
              Log out
            </button>
            {error && (
              <h1 className="text-red-900 bg-red-300">there is error</h1>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  const users = await prisma.user.findMany({
    // created_at and updated_at can be dificult to retreive that's why I add these parameters in findMany function
    select: {
      username: true,
      password: true,
    },
    orderBy: { username: "desc" },
  });

  return {
    props: {
      users,
    },
  };
};
