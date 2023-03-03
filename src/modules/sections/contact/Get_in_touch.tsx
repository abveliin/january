import React from "react";
import { HiPhone } from "react-icons/hi";
import { FaMobileAlt, FaHome } from "react-icons/fa";
import Info_with_icon from "../../components/Info_with_icon";

import Mail_link_with_icon from "../../components/Mail_link_with_icon";

function Get_in_touch(translation) {
  return (
    <div className="p-4 md:w-1/2">
      <h1 className="py-4 text-2xl font-bold uppercase">get in touch</h1>
      <div className="text-sm leading-relaxed">
        <Mail_link_with_icon email="directeur@somabu.bi" />
        <Mail_link_with_icon email="info@somabu.bi" />

        <Info_with_icon icon={<FaMobileAlt />} info="+257 61 22 22 21" />
        <Info_with_icon icon={<HiPhone />} info="+257 22 28 02 78" />

        <Info_with_icon
          icon={<FaHome className="text-ye" />}
          info="Avenue Muyinga , Bujumbura, Burundi"
        />
      </div>
    </div>
  );
}

export default Get_in_touch;
