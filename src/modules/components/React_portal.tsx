import { useState, useLayoutEffect } from "react";
import { createPortal } from "react-dom";

const create_wrapper_and_append_to_body = (wraper_Id: string) => {
  if (!document) return null;
  const wrapper_element = document.createElement("div");
  wrapper_element.setAttribute("id", wraper_Id);
  document.body.appendChild(wrapper_element);
  return wrapper_element;
};

function React_portal({
  children,
  wrapper_id,
}: {
  children: React.ReactElement;
  wrapper_id: string;
}) {
  const [wrapper_element, set_wrapper_element] = useState<HTMLElement>();

  useLayoutEffect(() => {
    let element = document.getElementById(wrapper_id);
    let system_created = false;
    //if element is ont found with wrapper_id or wrapper_id is not provided,
    //create and append to body
    if (!element) {
      system_created = true;
      element = create_wrapper_and_append_to_body(wrapper_id);
    }
    set_wrapper_element(element!);

    return () => {
      //delete the programatically created element
      if (system_created && element?.parentNode) {
        element.parentNode.removeChild(element);
      }
    };
  }, [wrapper_id]);

  if (!wrapper_element) return null;
  return createPortal(children, wrapper_element);
}

export default React_portal;
