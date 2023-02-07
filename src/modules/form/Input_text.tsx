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
    <div className="mb-2">
      <label className="block text-bl font-bold" htmlFor={label}>
        {label_display}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={on_change}
        className="border-2 rounded border-gray-400 p-2 w-full mx-auto"
      />
    </div>
  );
}

export default Input_text;
