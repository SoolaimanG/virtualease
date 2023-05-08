import { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import Topbar from "../components/topbar";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { RiMessage3Fill } from "react-icons/ri";
import { MdArrowForwardIos } from "react-icons/md";
import { useParams, Link } from "react-router-dom";
import { NoData } from "../components/history";

const AllNumSingle = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const params = useParams();
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const docRef = doc(db, "AllNums", "SoolaimanG1");
      const docSnap = await getDoc(docRef);

      const filteredData = docSnap.data().allNums.filter((data) => {
        return data.countryName == params.country;
      });

      setDatas(filteredData);
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
            <div className="each_mobile_numbr_one">
              <div className="each_mobile_numbers">
                <h4>{params.country}</h4>
                <Link to={"/numbers"} className="single_two_two_two">
                  Back
                </Link>
              </div>
              <div className="single_usa_two">
                {datas.length < 1 ? (
                  <div className="noresult_found">
                    <NoData value="No Number Found" />
                  </div>
                ) : (
                  datas.map((data) => (
                    <Link
                      to={
                        "/numbers/" +
                        "AllNums/" +
                        params.country +
                        "/" +
                        data.id
                      }
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

export default AllNumSingle;
