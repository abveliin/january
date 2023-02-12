import React from "react";

interface I_input_file {
  name: string;
  label_display: string;
}
function Input_file({ name, label_display }: I_input_file) {
  return (
    <div className="mb-4">
      <label
        className="block mb-1 text-sm font-bold text-gray-700"
        htmlFor={name}
      >
        {label_display}
      </label>
      <input type="file" name={name} />
    </div>
  );
}

export { Input_file };
