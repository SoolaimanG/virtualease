import { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import Topbar from "../components/topbar";
import "./global.css";
import { Link, useParams } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { NoData } from "../components/history";
import { MdArrowForwardIos } from "react-icons/md";
import { RiMessage3Fill } from "react-icons/ri";

const SingleUSA = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const params = useParams();
  const [singleUsa, setSingleUsa] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const docRef = doc(db, "UsaSpecials", params.name);
      const docSnap = await getDoc(docRef);

      setSingleUsa(docSnap.data().state);
    };

    getData();
  }, []);
  return (
    <section className="home_one">
      <div className="home_two">
        <div className="home_three">
          <Sidebar setOpenMenu={setOpenMenu} openMenu={openMenu} />
        </div>
        <div className="home_four">
          <Topbar setOpenMenu={setOpenMenu} />
          <div className="p-md home_five">
            <div className="single_usa">
              <div className="single_usa_one">
                <div className="single_one_one_one">
                  <h2>{params.name}</h2>
                  <p>Select Number</p>
                </div>
                <div className="single_two_two_two">
                  <Link
                    className="single_two_two_two"
                    to={"/numbers/usaspecials"}
                  >
                    Back
                  </Link>
                </div>
              </div>
              <div className="single_usa_two">
                {singleUsa.length < 1 ? (
                  <div className="noresult_found">
                    <NoData value="No Number Found" />
                  </div>
                ) : (
                  singleUsa.map((data) => (
                    <Link
                      to={"/numbers/usaspecials/" + data.state + "/" + data.id}
                      key={data.id}
                      className="single_usa_four"
                    >
                      <pre>{data.number}</pre>
                      <div className="single_usa_three">
                        <RiMessage3Fill className="singleUsa_svg" />
                        <MdArrowForwardIos className="singleUsa_svg" />
                      </div>
                    </Link>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleUSA;
