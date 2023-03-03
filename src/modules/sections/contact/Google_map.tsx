import React from "react";
import { useState } from "react";
import { MdZoomOutMap } from "react-icons/md";

function Google_map() {
  const [is_full_screen, set_is_full_screen] = useState(false);

  const full_screen_fn = () => {
    set_is_full_screen(!is_full_screen);
  };
  return (
    <div>
      <div className="w-screen h-48 mx-auto md:h-48  lg:h-96 aspect-video">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3982.8771540575044!2d29.374630914757912!3d-3.3801834975394938!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zM8KwMjInNDguNyJTIDI5wrAyMiczNi42IkU!5e0!3m2!1sen!2sbi!4v1676709486950!5m2!1sen!2sbi"
          width="600"
          height="450"
          // style="border:0;"

          className="w-full h-full"
          // allowfullscreen="true"
          loading="lazy"
          //  referrerpolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
}

export default Google_map;

{
  /* <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3219.142621422411!2d29.357074964432528!3d-3.3846272526542123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19c1831acff0f1b1%3A0x9a12435d6e8c0c66!2sMaketch%20Hotel!5e1!3m2!1sen!2sbi!4v1674788469617!5m2!1sen!2sbi"
          width="600"
          height="450"
          //style="border:0;"
          className="w-full h-full
         border border-green-200"
          //allowfullscreen="true"
          loading="lazy"
          //referrerpolicy="no-referrer-when-downgrade"
        /> */
}
