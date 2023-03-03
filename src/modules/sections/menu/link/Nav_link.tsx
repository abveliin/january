import React, { useState } from "react";

import { useRouter, withRouter } from "next/router";
import Link from "next/link";
//import { Link } from "react-scroll";

const Nav_link = ({ href, title }: any) => {
  const router = useRouter();

  const on_click_fn = (event: React.MouseEvent) => {
    event.preventDefault();

    router.push(href);
  };

  (function prefetch_pages() {
    if (typeof window !== "undefined") {
      router.prefetch(router.pathname);
    }
  })(); //work perfectly in production

  const is_current_path = router.pathname === href || router.asPath === href;
  //const base_style = "flex items-center ustify-start py-4 lg:py-0 font-bold capitalize";
  return (
    <span className="p-2 duration-300 ease-in-out hover:text-ye hover:scale-105 text-bl focus:outline-none">
      <Link
        href={href}
        onClick={on_click_fn}
        className={`${
          is_current_path ? "font-extrabold text-ye" : "font-extrabold"
        } flex items-center justify-start py-4 lg:py-0 text-sm capitalize`}
      >
        {title}
      </Link>
    </span>
  );
};

export default withRouter(Nav_link);
