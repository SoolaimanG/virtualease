import { BiCustomize } from "react-icons/bi";
import { Link } from "react-router-dom";

const TollFree = () => {
  return (
    <Link to={"/customNum"} className="number_page_four_general">
      <div className="number_page_four_one">
        <BiCustomize />
        <h4>Custom Number</h4>
      </div>
    </Link>
  );
};

export default TollFree;
