import "./socialmedia.css";
import Sidebar from "../../components/sidebar";
import Topbar from "../../components/topbar";
import { useEffect, useState } from "react";
import { NumbersFrom, SocialMediaTypes } from "../../data";
import { v4 as uuidv4 } from "uuid";
import Chance from "chance";
import { db } from "../../firebase";
import { doc, getDoc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { toast, Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { MdArrowForwardIos } from "react-icons/md";
import { NoData } from "../../components/history";

const Socialmedia = () => {
  const [openMenu, setOpenMenu] = useState(false);
  //const [datas, setDatas] = useState([]);
  const chance = new Chance();
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const timer = setInterval(async () => {
      const randomNums = Math.floor(Math.random() * NumbersFrom.length);
      const randomType = Math.floor(Math.random() * SocialMediaTypes.length);
      const randomPrice = Math.random() * (2.5 - 1) + 1;

      const socialNums = {
        id: uuidv4(),
        status: "Social Media",
        socailType: SocialMediaTypes[randomType].name,
        email: chance.email(),
        password: chance.word(),
        logo: SocialMediaTypes[randomType].logo,
        country: NumbersFrom[randomNums].country,
        number:
          NumbersFrom[randomNums].countryCode +
          NumbersFrom[randomNums].areaCode +
          Math.floor(
            NumbersFrom[randomNums].numberLength === 11
              ? chance.timestamp() / 10000
              : NumbersFrom[randomNums].numberLength === 12
              ? chance.timestamp() / 100
              : chance.timestamp() / 100000
          ),
        price: randomPrice.toFixed(1),
        expires: Math.floor(Math.random() * 3),
      };

      const docRef = doc(db, "SocailMedia", "SoolaimanG1");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        await updateDoc(docRef, {
          socialNums: [...docSnap.data().socialNums, socialNums],
        });
      } else {
        await setDoc(docRef, {
          socialNums: [socialNums],
        });
      }
    }, 10000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    const getData = async () => {
      onSnapshot(doc(db, "SocailMedia", "SoolaimanG1"), (doc) => {
        setFiltered(
          doc.data().socialNums.filter((data) => {
            return search.length < 1
              ? data
              : data.socailType.toLowerCase() === search.toLowerCase();
          })
        );
      });
    };

    getData();
  }, [search]);

  return (
    <section className="home_one">
      <div className="home_two">
        <div className="home_three">
          <Sidebar setOpenMenu={setOpenMenu} openMenu={openMenu} />
        </div>
        <div className="home_four">
          <Topbar setOpenMenu={setOpenMenu} />
          <div className="p-md home_five">
            <div className="socailMedia_page_one">
              <div className="socailMedia_page_three">
                <h4>Social Media Numbers ({filtered.length})</h4>
                <Link to={"/numbers"} className="socailMedia_page_link">
                  Back
                </Link>
              </div>
              <div className="socailMedia_page_two">
                <form className="socailMedia_page_form" action="">
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search for number or Social media"
                    type="text"
                  />
                </form>
                <div className="overflow_page">
                  <div className="socailMedia_page_four">
                    {filtered.length < 1 ? (
                      <NoData value={"No Result"} />
                    ) : (
                      filtered.map((data) => (
                        <Link
                          to={"/numbers/socialmedia/" + data.id}
                          key={data.id}
                          className="socailMedia_page_five"
                        >
                          <div className="socailMedia_page_six">
                            <img
                              width={50}
                              height={50}
                              src={data.logo}
                              alt=""
                            />
                            <div className="socailMedia_page_seven">
                              <pre>{data.number}</pre>
                              <small>${data.price}</small>
                            </div>
                          </div>
                          <MdArrowForwardIos />
                        </Link>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Socialmedia;
