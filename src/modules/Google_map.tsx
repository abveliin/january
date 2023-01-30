import React from "react";

function Google_map() {
  return (
    <div className="w-screen h-48 p-2 md:h-48 md:p-4 lg:h-96 lg:p-6 aspect-video bg-white">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3219.142621422411!2d29.357074964432528!3d-3.3846272526542123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19c1831acff0f1b1%3A0x9a12435d6e8c0c66!2sMaketch%20Hotel!5e1!3m2!1sen!2sbi!4v1674788469617!5m2!1sen!2sbi"
        width="600"
        height="450"
        //style="border:0;"
        className="w-full h-full border border-green-200"
        // allowfullscreen="true"
        loading="lazy"
        //referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
}

export default Google_map;
