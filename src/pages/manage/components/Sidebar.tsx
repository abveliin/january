import React from "react";
import { BsArrowDownUp } from "react-icons/bs";
import Create_link_with_icon from "@/modules/components/Create_link_with_icon";
import List_link_with_icon from "@/modules/components/List_link_with_icon";
import { Oder_list_link } from "@/modules/components/Order_list_link";

function Sidebar() {
  return (
    <div className="fixed">
      <h1 className="text-lg font-bold">Gestion de notre site web</h1>
      <div className="mt-8">
        <div>
          <div className="text-lg text-bl">Parteners</div>

          <Create_link_with_icon link="/manage/parteners" />
          <List_link_with_icon link="/manage/parteners/index" />
        </div>
        <div className="mt-4">
          <div className="text-lg text-bl">Realisations</div>

          <Create_link_with_icon link="/manage/realisations" />
          <Oder_list_link link="/manage/realisations/order" />
        </div>
        <div className="mt-4">
          <div className="text-lg text-bl">Team</div>

          <Create_link_with_icon link="/manage/team" />
          <List_link_with_icon link="/manage/parteners/index" />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
