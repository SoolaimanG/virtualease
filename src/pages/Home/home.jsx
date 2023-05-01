import "./home.css";
import Sidebar from "../../components/sidebar";
import Hot from "../../components/hot";
import History from "../../components/history";
import Referals from "../../components/referals";
import Balance from "../../components/balance";
import Topbar from "../../components/topbar";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import {
  countryAbbrev,
  countryCodes,
  countryFlags,
  countryNames,
  countryNumLength,
} from "../../data";
import Chance from "chance";
import { v4 as uuidv4 } from "uuid";
import { formatDistance } from "date-fns";
import toast, { Toaster } from "react-hot-toast";

const Home = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [hotNums, setHotNums] = useState([]);

  //Generating Random Phone Number
  const chance = new Chance();

  const docRef = doc(db, "HotNumbers", "SoolaimanG1");
  const [timeRemaining, setTimeRemaining] = useState(5 * 60 * 60);
  const [production, setProduction] = useState(false);
  const [enableNotifications, setEnableNotifications] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      const randomNumber = Math.floor(Math.random() * countryNumLength.length);
      const numberTypeRan = Math.floor(Math.random() * 2);
      const priceRandom = Math.random() * 3;
      const numberType = ["Virtual Number", "International Number"];
      const result = formatDistance(new Date(2023, 5, 1), new Date(), {
        addSuffix: true,
      });
      const generatedNums = {
        id: uuidv4(),
        country: countryNames[randomNumber],
        countryAbbrev: countryAbbrev[randomNumber],
        countryCode: countryCodes[randomNumber],
        phoneNumber: chance.phone({ formatted: false }),
        email: chance.email(),
        status: "Hot",
        numberType:
          randomNumber === 0 ? "Google Voice" : numberType[numberTypeRan],
        flag: countryFlags[randomNumber],
        password: chance.word(),
        available: true,
        price: priceRandom.toFixed(2),
        expires: Math.floor(Math.random() * 5) + 1 + "Months",
        createdOn: result,
      };

      if (production) {
        const upadteHotNumber = async () => {
          const docSnap = await getDoc(docRef);

          await updateDoc(docRef, {
            HotNumbers: [...docSnap.data().HotNumbers, generatedNums],
          }).then(() => {
            if (enableNotifications) {
              toast.success("New Number Added");
            }
          });
        };

        upadteHotNumber();
      }
    }, timeRemaining);

    return () => {
      clearInterval(timer);
    };
  }, [timeRemaining]);
  return (
    <main className="home_one">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="home_two">
        <div className="home_three">
          <Sidebar setOpenMenu={setOpenMenu} openMenu={openMenu} />
        </div>
        <div className="home_four">
          <Topbar setOpenMenu={setOpenMenu} />
          <div className="p-md home_five">
            <div className="home_five_one">
              <Balance />
              <Referals />
              <History />
            </div>
            <div className="home_five_two">
              <Hot />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
