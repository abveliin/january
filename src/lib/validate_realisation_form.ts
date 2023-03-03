interface I_realisation_form {
  id?: string;
  category: string;
  category_fr: string;
  title: string;
  title_fr: string;
  description?: string;
  description_fr?: string;
  lasting_of_execution?: string;
  photo_url?: string;
}
export const validate_realisation_form = ({
  //   id,
  category,
  category_fr,
  title,
  title_fr,
  description,
  description_fr,
}: //   lasting_of_execution,
//   photo_url,
//   photo_url,
//   photo_url,
I_realisation_form) => {
  const errors: {
    // id?: string;
    category?: string;
    category_fr?: string;
    title?: string;
    title_fr?: string;
    description?: string;
    description_fr?: string;
    // lasting_of_execution?: string;
    // photo_url?: string;
  } = {
    category: "",
    category_fr: "",
    title: "",
    title_fr: "",
    description: "",
    description_fr: "",
    // lasting_of_execution: "",

    // photo_url: "",
  };
  if (!category || category.trim() === "") {
    errors.category = "This field is required";
  }
  if (!category_fr || category_fr.trim() === "") {
    errors.category_fr = "Ce champ est obligatoire";
  }
  if (!title_fr || title_fr.trim() === "") {
    errors.title_fr = "Ce champ est obligatoire";
  }
  if (!title || title.trim() === "") {
    errors.title = "title is required";
  }
  if (!description || description.trim() === "") {
    errors.description = "This field is required";
  }
  if (!description_fr || description_fr.trim() === "") {
    errors.description_fr = "Ce champ est obligatoire";
  }

  // if (!photo_url || photo_url.trim() === "") {
  //   errors.photo_url = "a photo is required";
  // }
  return errors;
};
