interface I_apply_form {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  motivation: string;
  language: string | undefined;
  file_url: string;
}
export const validate_apply = ({
  name,
  email,
  phone,
  position,
  motivation,
  file_url,
}: I_apply_form) => {
  const errors: {
    name?: string;
    email: string;
    phone?: string;
    position?: string;
    motivation?: string;
    language?: string;

    file_url?: string;
  } = {
    name: "",
    email: "",
    phone: "",
    position: "",
    motivation: "",
    file_url: "",
  };
  if (!name || name.trim() === "") {
    errors.name = "Name is required";
  }
  if (!email || email.trim() === "") {
    errors.email = "Email is required";
  } else if (!/^[A-Z0-9._]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    errors.email = "votre adresse email n'est pas valide";
  }
  if (!phone || phone.trim() === "") {
    errors.phone = "phone is required";
  }
  if (!position || position.trim() === "") {
    errors.position = "position is required";
  }
  if (!motivation || motivation.trim() === "") {
    errors.motivation = "motivation is required";
  }

  if (!file_url || file_url.trim() === "") {
    errors.file_url = "cv is required";
  }
  return errors;
};
