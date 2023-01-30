import React from "react";

interface I_input_text {
  label: string;
  label_display: string;
  placeholder: string;
  value: string;
  on_change: any;
}
function Input_text({
  label,
  label_display,
  placeholder,
  value,
  on_change,
}: I_input_text) {
  return (
    <div className="mb-4">
      <label
        className="block text-gray-700 text-sm font-bold mb-1"
        htmlFor={label}
      >
        {label_display}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={on_change}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
  );
}

export default Input_text;
