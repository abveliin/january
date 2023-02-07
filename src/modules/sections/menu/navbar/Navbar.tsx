import React, { ChangeEvent, useEffect, useState } from "react";

import Logo from "../Logo";
import Lg_screen from "../screen/lg/Lg_screen";
import Sm_screen from "../screen/sm/Sm_screen";
import Languages from "../Languages";

const Navbar = () => {
  //set_is_nav_open()

  return (
    <nav className="fixed left-0 top-0 w-full mx-auto px-1 md:px-6 z-10 ease-in duration-300 bg-gray-50">
      <div className="flex justify-between items-center py-4 bg">
        <Logo />
        <div className="flex lg:hidden">
          <Languages />
        </div>
        <Sm_screen />
        <Lg_screen />
      </div>
    </nav>
  );
};

export default Navbar;
