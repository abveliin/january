import Nav_link from "./Nav_link";

//import { useRouter } from "next/router";
import { useRouter, withRouter } from "next/router";
import { Link } from "react-scroll";

import { en } from "../../../../locales/en";
import { fr } from "../../../../locales/fr";

interface I_nav_scroll {
  href: string;
  display: string;
  // set_is_nav_open: () void
}
const Nav_scroll = ({ href, display, set_is_nav_open }: I_nav_scroll) => {
  const router = useRouter();
  const { locale } = router;
  const translation = locale === "fr" ? fr : en;

  const is_current_path = router.pathname === href || router.asPath === href;

  const on_click_fn = (event: React.MouseEvent) => {
    event.preventDefault();

    // router.push(href);
    //set_is_nav_open(false);
  };

  return (
    <Link
      activeClass="active"
      to={href}
      spy={true}
      smooth={true}
      offset={-90}
      duration={50}
      className={`${
        is_current_path ? "font-extrabold text-bl" : "font-extrabold"
      } flex items-center hover:text-ye hover:scale-105 ease-in-out duration-300 justify-start py-4 lg:py-0 text-sm capitalize`}
      onClick={() => set_is_nav_open(false)}
    >
      {display}
    </Link>
  );
};

export default Nav_scroll;
