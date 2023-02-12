import React, { useState, useRef } from "react";

export const Cud = (data, api_redirection) => {
  async function create() {
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
            setForm(emtpy_form);
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
            setForm(emtpy_form);
            console.log("then we create");
          })
          .catch((e) => console.log(e));
      } catch (error) {
        console.log(error);
      }
    }
  }

  const delete_fn = async (id: string) => {
    try {
      await fetch(`/api/${api_redirection}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(() => {
          refresh_data(); // for updating the retreiving list after a submit
          console.log("delete");
        })
        .catch((e) => console.log(e));
    } catch (error) {
      console.log(error);
    }
  };
};
