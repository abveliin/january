import React, { useState } from "react";
import { BiMenu } from "react-icons/bi";
import { MdOutlineClose } from "react-icons/md";

interface I_mobile_nav_toggle {
  is_nav_open: boolean;
  set_is_nav_open: any;
}
const Mobile_nav_toggle = ({
  is_nav_open,
  set_is_nav_open,
}: I_mobile_nav_toggle) => {
  const nav_fn = () => set_is_nav_open(!is_nav_open);

  return (
    <div onClick={nav_fn} className="block lg:hidden pl-2 md:pl-4 z-10">
      {is_nav_open ? (
        <MdOutlineClose size={30} className="text-bl" />
      ) : (
        <BiMenu size={30} className="text-bl" />
      )}
    </div>
  );
};
export default Mobile_nav_toggle;
