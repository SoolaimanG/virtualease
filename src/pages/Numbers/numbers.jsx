import { useState } from "react";
import "./numbers.css";
import Sidebar from "../../components/sidebar";
import Topbar from "../../components/topbar";
import MobileNums from "../../components/MobileNums";
import UsaSpecials from "../../components/usaSpecials";
import TollFree from "../../components/TollFree";
import SocialNumbers from "../../components/SocialNumbers";
import AllNum from "../../components/AllNum";

const Numbers = () => {
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
            <div className="number_page_one">
              <div className="number_page_two">
                <div className="number_page_three">
                  <UsaSpecials />
                  <SocialNumbers />
                </div>
                <div className="number_page_four">
                  <MobileNums />
                  <TollFree />
                </div>
              </div>
              <AllNum />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Numbers;
