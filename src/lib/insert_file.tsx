import axios from "axios";
let file_uploaded: any;

export async function insert_file(event, upload_preset) {
  console.log("in a submit form");

  const formula = event.currentTarget;
  const file_input = Array.from(formula.elements).find(
    ({ name }: any) => name === "file"
  );
  const form_data = new FormData();

  for (const file of file_input.files) {
    form_data.append("file", file);
  }
  form_data.append("upload_preset", upload_preset);

  const new_photo = await axios.post(
    `https://api.cloudinary.com/v1_1/somabu/image/upload`,
    form_data
  );

  if (new_photo.status === 200) {
    file_uploaded = new_photo.data;
  }

  return file_uploaded;
}
export { file_uploaded };
