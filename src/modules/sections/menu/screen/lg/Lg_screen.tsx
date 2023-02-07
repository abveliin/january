import Nav_links from "../../link/Nav_links";
import Languages from "../../Languages";

const Lg_screen = () => {
  return (
    <div className="hidden lg:flex">
      <div className="flex">
        <Nav_links />
        <div className="flex ml-8">
          <Languages />
        </div>
      </div>
    </div>
  );
};

export default Lg_screen;
