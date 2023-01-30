import Nav_link from "./Nav_link";

import { useRouter } from "next/router";

import en from "../../locales/en";
import fr from "../../locales/fr";

const Nav_links = () => {
  const router = useRouter();
  const { locale } = router;
  const translation = locale === "fr" ? fr : en;

  return (
    <ul className="flex flex-col lg:flex-row">
      <Nav_link href="/" title={translation.home} />
      <Nav_link href="/about_us" title={translation.about} />
      <Nav_link href="/services" title={translation.services} />
      <Nav_link href="/realisations" title="realisations" />
      <Nav_link href="/contact" title={translation.contact} />
      <Nav_link href="/manage" title="manage" />
    </ul>
  );
};

export default Nav_links;
