import { Link } from "react-router-dom";

const SocialNumbers = () => {
  return (
    <Link to={"/numbers/socialmedia"} className="number_page_five">
      <div className="usaSpecial_two">
        <div className="useSpecial_img">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQS0LtcmTCyWX-rP9i48HFqIzcfCWCO6Dr7ag&usqp=CAU"
            alt="SocialMedia"
          />
        </div>
        <h4>Socail Media Numbers</h4>
      </div>
    </Link>
  );
};

export default SocialNumbers;
