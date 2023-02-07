import { useState } from "react";
import Mobile_menu from "./Mobile_menu";
import Mobile_nav_toggle from "./Mobile_nav_toggle";

const Sm_screen = () => {
  const [is_nav_open, set_is_nav_open] = useState(false);
  return (
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
  );
};

export default Sm_screen;
