import React from "react";
import Link_with_icon from "./Link_with_icon";
import { BsArrowDownUp } from "react-icons/bs";

function Oder_list_link({ link }: { link: string }) {
  return <Link_with_icon icon={<BsArrowDownUp />} link={link} title="order" />;
}

export { Oder_list_link };
