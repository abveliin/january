import React from "react";

function Get_in_touch() {
  return (
    <div className="md:w-1/2 p-4">
      <h1 className="uppercase text-2xl font-bold">get in touch</h1>
      <div className="bg-white pb-4 border-b border-gray-300">
        <h2 className="uppercase text-base lead">email address</h2>
        <div className="text-sm leading-relaxed">
          <li>info@somabu.bi</li>
          <li>directeur@somabu.bi</li>
        </div>
      </div>
      <div className="bg-white pb-4 border-b border-gray-300">
        <h2 className="uppercase text-base lead">PHONE NUMBER</h2>
        <div className="text-sm leading-relaxed">
          <li>+257 79 741 558</li>
        </div>
      </div>
      <div className="bg-white pb-4 border-b border-gray-300">
        <h2 className="uppercase text-base lead">OFFICE ADDRESS</h2>
        <div className="text-sm leading-relaxed">
          <li className="capitalize">Avenue Muyinga , Bujumbura, Burundi</li>
        </div>
      </div>
    </div>
  );
}

export default Get_in_touch;
