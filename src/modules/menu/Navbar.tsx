import React, { ChangeEvent, useEffect, useState } from "react";

import Mobile_nav_toggle from "./Mobile_nav_toggle";
import Mobile_menu from "./Mobile_menu";
import Logo from "./Logo";
import Lg_screen from "./Lg_screen";

const Navbar = () => {
  const [is_nav_open, set_is_nav_open] = useState(false);

  return (
    <nav className="fixed left-0 top-0 w-full mx-auto px-1 md:px-6 z-10 ease-in duration-300 bg-gray-100">
      <div className="flex justify-between items-center py-4">
        <Logo />
        <Lg_screen />
        <div className="flex lg:hidden justify-center items-center">
          <Mobile_menu
            is_nav_open={is_nav_open}
            set_is_nav_open={set_is_nav_open}
          />
          <Mobile_nav_toggle
            set_is_nav_open={set_is_nav_open}
            is_nav_open={is_nav_open}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
