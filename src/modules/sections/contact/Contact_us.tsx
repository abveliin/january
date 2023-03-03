import React from "react";
import Contact_form from "./Contact_form";
import Google_map from "./Google_map";
import Get_in_touch from "./Get_in_touch";
import Title_section from "../Title_section";

function Contact_us({ translation }) {
  return (
    <div id="contact">
      <div>
        <Title_section title="Contact us" />
      </div>
      <div className="">
        <div className="md:flex">
          <Get_in_touch translation={translation} />
          <Contact_form translation={translation} />
        </div>
        <Google_map />
      </div>
    </div>
  );
}

export default Contact_us;
