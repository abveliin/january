import React from "react";
import { useRouter } from "next/router";

const Languages = () => {
  const router = useRouter();
  const change_language_fn = (e) => {
    const locale = e.target.value;
    router.push("/", "/", { locale });
  };
  return (
    <>
      <button className="pr-1 text-sm" value="fr" onClick={change_language_fn}>
        🇫🇷
      </button>

      <button
        className="pl-1 border-l-2 border-gray-900"
        value="en"
        onClick={change_language_fn}
      >
        🇺🇸
      </button>
    </>
  );
};
export default Languages;