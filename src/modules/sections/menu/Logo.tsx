import { Link } from "react-scroll";
import Image from "next/image";

import logo from "/public/pictures/somabu_logo.png";

const Logo = () => {
  return (
    <Link
      activeClass="active"
      to="home"
      spy={true}
      smooth={true}
      //offset={-50}
      duration={50}
      className="flex items-center justify-start font-extrabold lg:py-0 text-sm hover:text-ye active:text-ye text-bl  focus:outline-none capitalize"
    >
      <Image
        src={logo}
        alt="logo"
        width={126}
        height={30}
        priority
        className="md:w-48 lg:w-64 h-auto border-black aspect-auto object-cover"
      />
    </Link>
  );
};

export default Logo;
