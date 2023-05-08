import "./404.css";
import Image from "../../assets/404.svg";
import { Link } from "react-router-dom";

const LostPage = () => {
  return (
    <div className="lost_one">
      <div className="lost_two">
        <h2>404</h2>
        <h4>NOT FOUND</h4>
        <p>Sorry we are unable to find that page</p>
        <img width={200} height={200} src={Image} alt="404" />
        <Link to={"/home"} className="btn-fill">
          Take Me Back
        </Link>
      </div>
    </div>
  );
};

export default LostPage;
