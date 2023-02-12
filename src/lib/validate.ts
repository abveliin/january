interface I_contact_form {
  name?: string;
  email: string;
  subject?: string;
  message: string;
}
export const validate = ({ name, email, subject, message }: I_contact_form) => {
  const errors: {
    name?: string;
    email: string;
    subject?: string;
    message: string;
  } = { name: "", email: "", subject: "", message: "" };
  if (!name || name.trim() === "") {
    errors.name = "Name is required";
  }
  if (!email || email.trim() === "") {
    errors.email = "Email is required";
  } else if (!/^[A-Z0-9._]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    errors.email = "votre adresse email n'est pas valide";
  }
  if (!subject || subject.trim() === "") {
    errors.subject = "Subject is required";
  }
  if (!message || message.trim() === "") {
    errors.message = "Message is required";
  }
  return errors;
};
