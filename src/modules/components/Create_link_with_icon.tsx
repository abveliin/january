import React from "react";
import Link_with_icon from "./Link_with_icon";
import { HiPencil } from "react-icons/hi";

function Create_link_with_icon({ link }: { link: string }) {
  return <Link_with_icon icon={<HiPencil />} link={link} title="create" />;
}

export default Create_link_with_icon;
