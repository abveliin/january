import React from "react";

interface I_info_with_icon {
  info: string;
  icon: JSX.Element;
}
function Info_with_icon({ icon, info }: I_info_with_icon) {
  return (
    <div className="flex items-center text-ye text-base">
      {icon}
      <h2 className="ml-4 text-bl">{info}</h2>
    </div>
  );
}

export default Info_with_icon;
