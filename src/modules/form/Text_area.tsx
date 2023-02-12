import React from "react";

interface I_text_area {
  //id: string;
  name: string;
  label: string;
  placeholder: string;
  value: string;
  on_change: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error: boolean;
  error_message: string | undefined;
}
function Text_area({
  name,
  label,
  placeholder,
  value,
  on_change,
  error,
  error_message = "",
  ...props
}: I_text_area) {
  return (
    <div className="mb-2">
      <label className="block font-bold text-gray-900" htmlFor={name}>
        {label}
      </label>
      <textarea
        autoComplete="off"
        id={name}
        name={name}
        rows={3}
        style={{ resize: "none" }}
        placeholder={placeholder}
        value={value}
        onChange={on_change}
        className="w-full p-2 mx-auto text-gray-900 border-2 border-gray-500 border-opacity-50 rounded outline-none focus:border-blue-500"
        //pattern="[A-Za-z]"
        //required
      />
      {error ? (
        <span className="text-sm italic text-red-500">*{error_message}</span>
      ) : null}
    </div>
  );
}

export { Text_area };
