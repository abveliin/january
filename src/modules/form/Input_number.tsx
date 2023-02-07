import React from "react";

interface I_input_number {
  label: string;
  label_display: string;
  placeholder: string;
  value: number;
  on_change: any;
}
function Input_number({
  label,
  label_display,
  placeholder,
  value,
  on_change,
}: I_input_number) {
  return (
    <div className="mb-4">
      <label className="block text-bl text-sm font-bold mb-1" htmlFor={label}>
        {label_display}
      </label>
      <input
        type="number"
        placeholder={placeholder}
        value={value}
        onChange={on_change}
        className="border-2 rounded border-gray-400 p-2 w-full mx-auto"
      />
    </div>
  );
}

export default Input_number;
