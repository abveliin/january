import React from "react";

interface I_title_section {
  title: string;
}
function Title_section({ title }: I_title_section) {
  return (
    <div>
      <h1 className=" flex justify-center items-center text-2xl py-4 my-4 text-bl uppercase font-bold bg-gray-400">
        {title}
      </h1>
    </div>
  );
}

export default Title_section;
