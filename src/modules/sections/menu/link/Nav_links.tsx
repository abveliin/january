import Nav_link from "./Nav_link";

import { useRouter } from "next/router";
import { Link } from "react-scroll";

import en from "../../../../locales/en";
import fr from "../../../../locales/fr";
import Nav_scroll from "./Nav_scroll";

const Nav_links = () => {
  const router = useRouter();
  const { locale } = router;
  const translation = locale === "fr" ? fr : en;

  const is_home_path = router.pathname === "/" || router.asPath === "/";

  return (
    <div>
      <ul className="flex flex-col lg:flex-row">
        {router.pathname === "/" ? (
          <li
            className={`${
              is_home_path ? "font-extrabold text-ye" : "font-extrabold text-bl"
            } p-2 focus:outline-none cursor-pointer`}
          >
            <Nav_scroll href="home" display={translation.home} />
          </li>
        ) : (
          <Nav_link href="/" title={translation.home} />
        )}

        <Nav_link href="/about_us" title={translation.about} />
        <Nav_link href="/services" title={translation.services} />

        <Nav_link href="/realisations" title="realisations" />
        <li className="font-extrabold cursor-pointer text-bl p-2 focus:outline-none">
          <Nav_scroll href="contact" display="Contact" />
        </li>
        <Nav_link href="/manage" title="manage" />
      </ul>
    </div>
  );
};

export default Nav_links;
