import { useState } from "react";
import Sidebar from "../../components/sidebar";
import Topbar from "../../components/topbar";
import "./USAspecials.css";
import { UsaSpecialsNum } from "../../data";
import { MdArrowForwardIos } from "react-icons/md";
import { Link } from "react-router-dom";

const USAspecials = () => {
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
            <div className="usa_offer">
              <div className="usa_special_one">
                <h2>USA Special offers</h2>
                <p>Select Area</p>
              </div>
              <div className="discount">
                <p>80% Discount</p>
              </div>
              <div className="usa_offer_one">
                {UsaSpecialsNum.map((data) => (
                  <Link
                    to={"/numbers/usaspecials/" + data.state}
                    className="usa_offer_two"
                    key={data.id}
                  >
                    <div className="usa_offer_three">
                      <pre>(+{data.code})</pre>
                      <pre>{data.state}</pre>
                    </div>
                    <div className="usa_offer_three">
                      <pre>${data.price}</pre>
                      <MdArrowForwardIos />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default USAspecials;
