import React from "react";

interface I_title_section {
  title: string;
}
function Title_section({ title }: I_title_section) {
  return (
    <div>
      <h1 className=" flex justify-center items-center text-2xl uppercase font-bold bg-slate-600">
        {title}
      </h1>
    </div>
  );
}

export default Title_section;
