import Link from "next/link";
import Image from "next/image";

import logo from "../../../public/pictures/somabu_logo.png";

const Logo = () => {
  return (
    <Link href="/">
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
