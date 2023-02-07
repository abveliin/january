import React from "react";
import { MdCopyright } from "react-icons/md";

function App_signature() {
  return (
    <div className="flex items-center justify-center p-6 text-xs md:text-base font-bold text-bl bg-gray-400">
      Copyright
      <MdCopyright />
      2023 SOMABU. Tous droits réservés| Conception par Abvelin
    </div>
  );
}

export { App_signature };
