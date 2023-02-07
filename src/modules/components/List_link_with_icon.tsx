import React from "react";
import Link_with_icon from "./Link_with_icon";
import { ImList2 } from "react-icons/im";

function List_link_with_icon({ link }: { link: string }) {
  return <Link_with_icon icon={<ImList2 />} link={link} title="list" />;
}

export default List_link_with_icon;
