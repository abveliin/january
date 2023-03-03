import Nav_links from "../../link/Nav_links";
import Languages from "../../Languages";
import { useState } from "react";

const Lg_screen = () => {
  const [is_nav_open, set_is_nav_open] = useState(false);
  return (
    <div className="hidden lg:flex">
      <div className="flex">
        <Nav_links set_is_nav_open={set_is_nav_open} />
        <div className="flex ml-8">
          <Languages />
        </div>
      </div>
    </div>
  );
};

export default Lg_screen;
