import { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import Img from "../assets/nodata.svg";
import { HiPaperAirplane } from "react-icons/hi";
import { TiTick } from "react-icons/ti";
import { MdCancel } from "react-icons/md";

export const NoData = ({ value }) => {
  return (
    <div className="history_empty">
      <img src={Img} alt="No data" />
      <h4>{value}</h4>
    </div>
  );
};

const History = () => {
  const uid = localStorage.getItem("uid");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const getHistory = async () => {
      const docRef = doc(db, "userActivities", uid);
      const docSnap = await getDoc(docRef);

      setHistory(docSnap.data().transactions);
    };

    getHistory();
  }, []);
  return (
    <div className="history_one">
      <div className="p-s history_two">
        <h3 className="">Transaction History</h3>
      </div>
      <div className="history_scroll">
        <div className="history_record_two">
          {history.length < 1 ? (
            <NoData value={`You have'nt tried any transaction...`} />
          ) : (
            history?.map((data) => (
              <div key={data.id} className="p-s transactions_state">
                <div className={`transactions_state_one ${data.state}`}>
                  {data.state === "pending" ? <TiTick /> : <HiPaperAirplane />}
                </div>
                <small className={data.state}>{data.state}</small>
                <small className={data.state}>{data.date}</small>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default History;
