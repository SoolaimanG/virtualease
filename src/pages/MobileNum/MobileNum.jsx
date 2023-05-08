import { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar";
import Topbar from "../../components/topbar";
import "./MobileNum.css";
import { MobileNumbers } from "../../data";
import { MdArrowForward } from "react-icons/md";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { updateDoc, getDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { toast, Toaster } from "react-hot-toast";

const MobileNum = () => {
  const [openMenu, setOpenMenu] = useState(false);

  useEffect(() => {
    const timer = setInterval(async () => {
      const randomNum = Math.floor(Math.random() * MobileNumbers.length);
      let empty = "";
      for (
        let i = 0;
        i <
        MobileNumbers[randomNum].numberLength -
          MobileNumbers[randomNum].countryCodes.toString().length;
        i++
      ) {
        empty += Math.floor(Math.random() * 9);
      }
      const numbers = {
        id: uuidv4(),
        price: 5,
        country: MobileNumbers[randomNum].country,
        type: MobileNumbers[randomNum].type,
        number: "+" + MobileNumbers[randomNum].countryCodes.toString() + empty,
        expires: Math.floor(Math.random() * (5 + 1) + 1),
      };

      const docRef = doc(db, "MobileNumbers", "numbers");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        await updateDoc(docRef, {
          numbers: [...docSnap.data().numbers, numbers],
        }).then(() => toast.success("New Number Added"));
      } else {
        await setDoc(docRef, {
          numbers: [numbers],
        });
      }
    }, 1000000000);

    return () => clearInterval(timer);
  }, []);
  return (
    <section className="home_one">
      <Toaster position="bottom-right" />
      <div className="home_two">
        <div className="home_three">
          <Sidebar setOpenMenu={setOpenMenu} openMenu={openMenu} />
        </div>
        <div className="home_four">
          <Topbar setOpenMenu={setOpenMenu} />
          <div className="p-md home_five">
            <div className="mobile_numbers">
              <div className="mobile_numbers_one">
                <h2>Does not need identification</h2>
                <Link
                  to={"/numbers/mobilenumbers"}
                  className="socailMedia_page_link"
                >
                  Back
                </Link>
              </div>
              <div className="mobile_numbers_two">
                {MobileNumbers.map((data, i) => (
                  <Link
                    to={"/numbers/" + data.country}
                    className="mobile_numbers_three"
                    key={i}
                  >
                    <div className="mobile_numbers_four">
                      <img width={40} height={40} src={data.flag} alt="" />
                      <div className="mobile_numbers_five">
                        <strong>{data.country}</strong>
                        <small>{data.type}</small>
                      </div>
                    </div>
                    <div className="mobile_number_six">
                      <p>${data.price} / Month</p>
                      <MdArrowForward />
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

export default MobileNum;
