interface I_partener_form {
  name: string;
}
interface I_error_message {
  error_field_message: string;
}
export function Validate_partener_form(
  { name }: I_partener_form,
  { error_field_message }: I_error_message
) {
  const errors: {
    // id?: string;
    name?: string;
    logo_url?: string;
  } = {
    name: "",
    logo_url: "",
  };
  if (!name || name.trim() === "") {
    errors.name = error_field_message;
    console.log("translation in console", error_field_message);
  }

  return errors;
}
