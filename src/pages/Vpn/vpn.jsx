import { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar";
import Topbar from "../../components/topbar";
import "./vpn.css";
import { VPNs } from "../../data";
import { ImLocation2 } from "react-icons/im";
import { RiSearchLine } from "react-icons/ri";
import { AllNums } from "../../data";

const Vpn = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const search = "";

  return (
    <section className="home_one">
      <div className="home_two">
        <div className="home_three">
          <Sidebar setOpenMenu={setOpenMenu} openMenu={openMenu} />
        </div>
        <div className="home_four">
          <Topbar setOpenMenu={setOpenMenu} />
          <div className="p-md home_five">
            <div className="vpn_logs">
              <div className="vpn_logs_one"></div>
              <div className="vpn_logs_two">
                {VPNs.map((vpn) => (
                  <div key={vpn.id} className="vpn_logs_three">
                    <div className="vpn_logs_four">
                      <img src={vpn.logo} alt="" />
                      <h4>{vpn.name}</h4>
                      <p>Available in all these countries</p>
                    </div>
                    <div className="p-s vpn_logs_five">
                      <div className="vpn_logs_six">
                        <div className={`vpn_logs_svg_div ${vpn.name}`}>
                          <ImLocation2 />
                        </div>
                        <div className="vpn_logs_svg">
                          <strong>
                            {AllNums.slice(vpn.sliceFrom, vpn.sliceEnd).length}
                            Countries
                          </strong>
                          <p>Secured and Fast</p>
                        </div>
                      </div>
                      <div className="vpn_logs_seven">
                        <RiSearchLine />
                        <input
                          value={search}
                          placeholder="Search"
                          type="text"
                        />
                      </div>
                      <div className="vpn_logs_eight">
                        {AllNums.slice(vpn.sliceFrom, vpn.sliceEnd).map(
                          (data) => (
                            <div key={data.id} className="vpn_logs_nine">
                              <img src={data.flag} alt="" />
                              <small>{data.countryName}</small>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                    <a
                      href={vpn.site}
                      target="_blank"
                      className={`btn-fill ${vpn.name}`}
                    >
                      Go to website
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Vpn;
