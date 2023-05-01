import { IoIosAdd } from "react-icons/io";
import { BsQuestion } from "react-icons/bs";
import { db } from "../firebase";
import { getDoc, doc } from "firebase/firestore";
import { useState, useEffect } from "react";
import AddCredit from "./addCredit";
import { useConvertCredit } from "../customHooks";

const Balance = () => {
  const [uid, setUid] = useState(localStorage.getItem("uid") || "");
  const [balance, setBalance] = useState(0);

  const convert = useConvertCredit(balance);

  useEffect(() => {
    const getBalance = async () => {
      const docRef = doc(db, "userInfo", uid);
      const docSnap = await getDoc(docRef);

      setBalance(docSnap.data().balance);
    };

    getBalance();
  }, []);
  return (
    <div className="comp_dashboard">
      <div className="balance_one">
        <h4>Balance</h4>
        <h2>${balance}</h2>
        <p>~{convert.toFixed(2)}c</p>
        <div className="balance_two">
          <AddCredit title="Add Credit" />
          <AddCredit title="How it works" />
        </div>
      </div>
    </div>
  );
};

export default Balance;
