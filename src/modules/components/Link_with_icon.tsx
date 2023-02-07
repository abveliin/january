import React from "react";
import Nav_link from "../sections/menu/link/Nav_link";

interface I_link_with_icon {
  link: string;
  icon: JSX.Element;
  title: string;
}
function Link_with_icon({ icon, link, title }: I_link_with_icon) {
  return (
    <div className="flex items-center text-ye text-base">
      {icon}
      <Nav_link href={link} title={title} />
    </div>
  );
}

export default Link_with_icon;
