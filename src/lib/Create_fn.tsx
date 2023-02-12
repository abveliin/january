export async function Create_fn(
  data,
  api_redirection,
  setForm,
  empty_form,
  refresh_data
) {
  if (data.id) {
    try {
      fetch(`/api/${api_redirection}/${data.id}`, {
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
      })
        .then(() => {
          setForm(empty_form);
          refresh_data();
          console.log("then we update");
        })
        .catch((e) => console.log(e));
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      await fetch(`/api/${api_redirection}/create`, {
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      })
        .then(() => {
          setForm(empty_form);
          console.log("then we create");
        })
        .catch((e) => console.log(e));
    } catch (error) {
      console.log(error);
    }
  }
}
