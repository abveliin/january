import Image from "next/image";
import { Parallax, Background } from "react-parallax";
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
      //className="relative flex justify-center items-center w-full aspect-video mt-8 bg-red-900" // h-screen bg-fixed bg-center bg-cover
      className="flex justify-center items-center w-screen h-screen md:w-screen md:aspect-video mt-8 bg-red-900"
    >
      <Background className="w-screen h-screen  md:w-screen md:aspect-video">
        <Image
          //src="my_uploads /ervagdk5yq8ylo8hmbs1"
          src={niveleuse}
          alt="image"
          width={2000} // ×
          height={1339}
          //placeholder="blur"
          className="object-cover object-center rounded-3xl w-screen h-screen  md:w-screen md:aspect-video"
        />
      </Background>
      {
        <div className="flex items-center justify-center aspect-square">
          <div className="inset-0 bg-black/70 " />
          <div className="p-2 md:p-5 w-4/5 sm:w-3/5 justify-center items-center  bg-black/50">
            <h2 className="text-xl font-bold text-white">{heading}</h2>
            <p className="py-2 md:py-5 text-sm text-white">
              <span className="text-sky-500 text-3xl">SOMABU</span> {message}
            </p>
            <button className="px-8 py-2 bg-blue-600 font-bold hover:bg-blue-900 text-white border">
              Contact
            </button>
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
