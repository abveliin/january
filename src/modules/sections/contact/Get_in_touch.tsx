import React from "react";
import { HiPhone } from "react-icons/hi";
import { FaMobileAlt, FaHome } from "react-icons/fa";
import Info_with_icon from "../../components/Info_with_icon";

import Mail_link_with_icon from "../../components/Mail_link_with_icon";

function Get_in_touch() {
  return (
    <div className="md:w-1/2 p-4">
      <h1 className="uppercase text-2xl py-4 font-bold">get in touch</h1>
      <div className="text-sm leading-relaxed">
        <Mail_link_with_icon email="directeur@somabu.bi" />
        <Mail_link_with_icon email="info@somabu.bi" />

        <Info_with_icon icon={<FaMobileAlt />} info="+257 79 741 558" />
        <Info_with_icon icon={<HiPhone />} info="+257 22 22 2w 2w" />

        <Info_with_icon
          icon={<FaHome className="text-ye" />}
          info="Avenue Muyinga , Bujumbura, Burundi"
        />
      </div>
    </div>
  );
}

export default Get_in_touch;
