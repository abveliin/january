interface I_contact_form {
  name?: string;
  email: string;
  subject?: string;
  message: string;
}
interface I_error_message {
  error_field_message: string;
}
export const validate = (
  { name, email, subject, message }: I_contact_form,
  { error_field_message }: I_error_message
) => {
  const errors: {
    name?: string;
    email: string;
    subject?: string;
    message: string;
  } = { name: "", email: "", subject: "", message: "" };
  if (!name || name.trim() === "") {
    errors.name = error_field_message;
  }
  if (!email || email.trim() === "") {
    errors.email = error_field_message;
  } else if (!/^[A-Z0-9._]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    errors.email = "votre adresse email n'est pas valide";
  }
  if (!subject || subject.trim() === "") {
    errors.subject = error_field_message;
  }
  if (!message || message.trim() === "") {
    errors.message = error_field_message;
  }
  return errors;
};
