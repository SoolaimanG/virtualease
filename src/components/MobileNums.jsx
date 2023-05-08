import { AiOutlineMobile } from "react-icons/ai";
import { Link } from "react-router-dom";

const MobileNums = () => {
  return (
    <Link to={"/numbers/mobilenumbers"} className="number_page_four_general">
      <div className="number_page_four_one">
        <AiOutlineMobile />
        <h4>Mobile Numbers</h4>
      </div>
    </Link>
  );
};

export default MobileNums;
