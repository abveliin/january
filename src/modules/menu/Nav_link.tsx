import React from "react";
import Link from "next/link";

interface I_nav_link {
  href: string;
  title: string;
}

const Nav_link = ({ href, title }: I_nav_link) => {
  //const base_style = "p-4 hover:text-gray-500 text-black focus:outline-none";
  return (
    <li className="p-2 hover:text-blue-700 text-gray-700 focus:outline-none">
      <Link
        href={href}
        className="flex items-center justify-start py-4 lg:py-0 font-bold capitalize"
      >
        {title}
      </Link>
    </li>
  );
};

export default Nav_link;
