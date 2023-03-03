export async function on_change(
  e:
    | React.ChangeEvent<HTMLTextAreaElement>
    | React.ChangeEvent<HTMLInputElement>,
  set_form: any
) {
  console.log("in a submit form");

  set_form((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));
}
