import React from "react";
import { useRouter } from "next/router";

const Languages = () => {
  const router = useRouter();
  const change_language_fn = (e: any) => {
    const locale = e.target.value;
    router.push("/", "/", { locale });
  };
  return (
    <>
      <button
        className="p-0 text-xl scale-150 bg-rjed-300"
        value="fr"
        onClick={change_language_fn}
      >
        🇫🇷
      </button>
      <span className="px-2 text-lg">|</span>
      <button
        className="pl-1 text-base transition duration-500 ease-in-out scale-100 bg-rsed-300 hover:scale-150"
        value="en"
        onClick={change_language_fn}
      >
        🇺🇸
      </button>
    </>
  );
};
export default Languages;
