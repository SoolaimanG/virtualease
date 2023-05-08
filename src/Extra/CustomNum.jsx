import { useState } from "react";
import Sidebar from "../components/sidebar";
import Topbar from "../components/topbar";
import { AiFillSetting } from "react-icons/ai";
import { Link } from "react-router-dom";

const CustomNum = () => {
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <section className="home_one">
      <div className="home_two">
        <div className="home_three">
          <Sidebar setOpenMenu={setOpenMenu} openMenu={openMenu} />
        </div>
        <div className="home_four">
          <Topbar setOpenMenu={setOpenMenu} />
          <div className="p-md home_five">
            <div className="customNum_one">
              <div className="customNum_two">
                <AiFillSetting />
              </div>
              <div className="customNum_three">
                <h3>This Feauture is currently under maintainance...</h3>
              </div>
              <div className="customNum_four">
                <Link to={"/numbers"} className="btn-fill">
                  Go Back
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomNum;
