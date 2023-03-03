import React from "react";
import { useRouter } from "next/router";

const Languages = () => {
  const router = useRouter();
  const { locale } = router;
  const change_language_fn = (e: any) => {
    const locale = e.target.value;
    router.push("/", "/", { locale });
  };
  return (
    <>
      <button
        className={`${
          locale === "fr" ? `scale-150 text-xl` : `scale-100 text-base`
        } ${
          locale === "fr" ? `scale-150 text-xl` : `scale-100 text-base`
        } pr-1 transition duration-500 ease-in-out`}
        value="fr"
        onClick={change_language_fn}
      >
        🇫🇷
      </button>
      <span className="px-2 text-lg">|</span>
      <button
        className={`${
          locale === "en" ? `scale-150 text-xl` : `scale-100 text-base`
        } pl-1  transition duration-500 ease-in-out hover:scale-150`}
        value="en"
        onClick={change_language_fn}
      >
        🇬🇧
      </button>
    </>
  );
};
export default Languages;
