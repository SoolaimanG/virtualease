import { Link } from "react-router-dom";
import Image from "../assets/united.png";
import { UsaSpecialsNum } from "../data";
import { useEffect, useState } from "react";
import { doc, updateDoc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { v4 as uuidv4 } from "uuid";
import Chance from "chance";
import { toast } from "react-hot-toast";

const UsaSpecials = () => {
  const chance = new Chance();
  const uid = localStorage.getItem("uid");
  const [liveNotifications, setLiveNotifications] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const docRef = doc(db, "acctSettings", uid);
      const docSnap = await getDoc(docRef);

      setLiveNotifications(docSnap.data().liveNotifications);
    };

    getData();
    const timer = setInterval(async () => {
      const randomNum = Math.floor(Math.random() * UsaSpecialsNum.length);

      const numberToAdd = {
        id: uuidv4(),
        number:
          "+1" +
          UsaSpecialsNum[randomNum].code.toString() +
          Math.floor(chance.timestamp() / 1000).toString(),
        allowMessage: true,
        state: UsaSpecialsNum[randomNum].state,
        price: UsaSpecialsNum[randomNum].price,
      };

      const docRef = doc(db, "UsaSpecials", UsaSpecialsNum[randomNum].state);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        await updateDoc(docRef, {
          state: [...docSnap.data().state, numberToAdd],
        }).then(() => {
          liveNotifications && toast.success("New Usa Specials Added");
        });
      } else {
        // docSnap.data() will be undefined in this case
        await setDoc(docRef, {
          state: [numberToAdd],
        });
      }
    }, 10000);

    console.log(liveNotifications);
    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <div className="number_page_five">
      <Link
        to={"/numbers/usaspecials"}
        className="usaSpecial_two socialMedia_gap"
      >
        <div className="useSpecial_img">
          <img src={Image} alt="" />
          <div className="clip_path">
            <small>%</small>
          </div>
        </div>
        <h4>USA Special offers</h4>
      </Link>
    </div>
  );
};

export default UsaSpecials;
