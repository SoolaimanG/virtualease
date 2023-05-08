import { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import Topbar from "../components/topbar";
import { Link } from "react-router-dom";
import "./global.css";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import Loader from "../components/loader";
import OpenPayment from "../components/openPayment";

const EachAllNum = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [data, setData] = useState({});
  const params = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const docRef = doc(db, "AllNums", "SoolaimanG1");
      const docSnap = await getDoc(docRef);

      const find = docSnap.data().allNums.find((data) => {
        return data.id === params.id;
      });

      setData(find);
    };

    getData();
  }, []);

  useEffect(() => {
    if ("number" in data) {
      setLoading(false);
    }
  }, [data]);

  return (
    <section className="home_one">
      <div className="home_two">
        <div className="home_three">
          <Sidebar setOpenMenu={setOpenMenu} openMenu={openMenu} />
        </div>
        <div className="home_four">
          <Topbar setOpenMenu={setOpenMenu} />
          <div className="p-md home_five">
            {loading ? (
              <Loader />
            ) : (
              <div className="each_social_num_one">
                <div className="each_social_num_two">
                  <div className="each_social_num_three">
                    <h4>Purchase This Number.</h4>
                    <Link
                      className="socailMedia_page_link"
                      to={"/numbers/" + "allNums/" + params.country}
                    >
                      Back
                    </Link>
                  </div>
                  <div className="each_social_num_four">
                    <div className="each_social_num_five">
                      <div className="each_social_num_num">
                        <p>{data.number}</p>
                      </div>
                      <div className="each_social_num_num">
                        <p>{params.country}</p>
                      </div>
                      <div className="each_social_num_num">
                        <p>Expires in {data.expires}month</p>
                      </div>
                      <OpenPayment price={data.price} />
                    </div>
                    <div className="each_social_num_five">
                      <div className="each_social_num_price">
                        <div className="each_social_num_price_one">
                          <h3>${data.price}</h3>
                        </div>
                        <div className="p-s each_social_num_price_two">
                          <p>
                            <strong>Note:</strong>This number is intended for
                            use with Facebook verification only and will not
                            work with any other platform or service. We take our
                            users' privacy and security very seriously, and we
                            believe that this extra layer of verification will
                            help keep your Facebook account secure. However, if
                            you attempt to use this number for verification with
                            another platform or service, it will not work and
                            may result in an error message. We appreciate your
                            understanding and encourage you to use this number
                            exclusively for Facebook verification purposes. If
                            you have any questions or concerns, please do not
                            hesitate to contact our customer support team.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EachAllNum;
