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
      <label className="block mb-1 text-sm font-bold text-bl" htmlFor={label}>
        {label_display}
      </label>
      <input
        type="number"
        placeholder={placeholder}
        value={value}
        onChange={on_change}
        className="w-full p-2 mx-auto border-2 border-gray-400 rounded"
      />
    </div>
  );
}

export { Input_number };
