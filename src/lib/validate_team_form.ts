interface I_team_form {
  id?: string;
  name: string;
  position: string;
  position_fr: string;
  photo_url?: string;
}
export const validate_team_form = ({
  //   id,
  name,
  position,
  position_fr,
}: //   photo_url,
//   photo_url,
I_team_form) => {
  const errors: {
    // id?: string;
    name?: string;
    position?: string;
    position_fr?: string;
    // photo_url?: string;
  } = {
    name: "",
    position: "",
    position_fr: "",
    // photo_url: "",
  };
  if (!name || name.trim() === "") {
    errors.name = "Name is required";
  }
  if (!position || position.trim() === "") {
    errors.position = "position is required";
  }
  if (!position_fr || position_fr.trim() === "") {
    errors.position_fr = "postion_fr is required";
  }

  // if (!photo_url || photo_url.trim() === "") {
  //   errors.photo_url = "a photo is required";
  // }
  return errors;
};
