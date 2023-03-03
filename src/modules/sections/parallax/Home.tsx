import Image from "next/image";
import { Parallax, Background } from "react-parallax";
import Nav_scroll from "../menu/link/Nav_scroll";
import niveleuse from "/public/pictures/niveleuse.jpeg";
//import { CldImage } from "next-cloudinary"; //next-cloudinary

interface I_para {
  heading: string;
  message: string;
}

const Home_parallax = ({ heading, message }: I_para) => {
  /* const ratio_value = aspect_ratio;
  if (aspect_ratio) */
  return (
    <Parallax
      strength={400}
      //className="relative flex items-center justify-center w-full mt-8 bg-red-900 aspect-video" // h-screen bg-fixed bg-center bg-cover
      className="flex items-center justify-center w-screen h-screen mt-8 md:w-screen md:aspect-video"
    >
      <Background className="w-screen h-screen md:w-screen md:aspect-video">
        <Image
          //src="my_uploads /ervagdk5yq8ylo8hmbs1"
          src={niveleuse}
          alt="image"
          width={2000} // ×
          height={1339}
          priority
          //placeholder="blur"
          className="object-cover object-center w-screen h-screen rounded-3xl md:w-screen md:aspect-video"
        />
      </Background>
      {
        <div className="flex items-center justify-center aspect-square">
          <div className="inset-0 bg-black/70 " />
          <div className="items-center justify-center w-4/5 p-2 md:p-5 sm:w-3/5 bg-black/50">
            <h2 className="text-xl font-bold text-white">{heading}</h2>
            <p className="py-2 text-sm text-white md:py-5">
              <span className="text-3xl text-sky-500">SOMABU</span> {message}
            </p>
            {/* <button className="px-8 py-2 font-bold text-white transition duration-200 ease-in-out bg-blue-600 border w-fit hover:scale-105"> */}
            <Nav_scroll href="contact" display="Contact" />
            {/* </button> */}
          </div>
        </div>
      }
    </Parallax>
  );
};
export default Home_parallax;

{
  /* <Background className="custom-bg">
            <img src={Parallax_data} alt="fill murray" />
        </Background> */
}
