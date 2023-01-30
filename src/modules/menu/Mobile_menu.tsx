import React from "react";

import Nav_links from "./Nav_links";
import Languages from "./Languages";

interface I_mobile_menu {
  is_nav_open: boolean;
  set_is_nav_open: any;
}
//is_nav_open, set_is_nav_open
const Mobile_menu = ({ is_nav_open, set_is_nav_open }: I_mobile_menu) => {
  return (
    <div className="flex lg:hidden">
      <div className="">
        <Languages />
      </div>
      <button
        className={
          is_nav_open
            ? "fixed inset-0 h-full w-full bg-black/70"
            : "hidden inset-0 h-full w-full bg-black/70"
        }
        onClick={() => set_is_nav_open(!is_nav_open)}
      />
      <div
        className={
          is_nav_open
            ? "absolute top-0 right-0 flex flex-col justify-center items-center w-4/5 md:w-2/5 h-screen bg-gray-100 text-center shadow-lg ease-in duration-700"
            : "absolute top-0 right-[-100%] flex flex-col justify-center items-center w-4/5 md:w-2/5 h-screen bg-gray-100 text-center shadow-lg ease-in duration-700"
        }
      >
        <div className="flex">
          <Nav_links />
        </div>
      </div>
    </div>
  );
};

export default Mobile_menu;
