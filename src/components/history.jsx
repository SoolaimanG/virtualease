import { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import Img from "../assets/nodata.svg";

export const NoData = () => {
  return (
    <div className="history_empty">
      <img src={Img} alt="No data" />
      <h4>You have'nt perform any transaction...</h4>
    </div>
  );
};

const History = () => {
  const [uid, setUi] = useState(localStorage.getItem("uid") || "");
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
            <NoData />
          ) : (
            history?.map((data) => (
              <div
                key={data.id}
                className={`p-s ${
                  data.state === "pending"
                    ? "history_pending"
                    : "history_failed"
                }`}
              >
                <small className="history_record">
                  {data.status} ${data.amount}
                </small>
                <small className="history_record">:{data.state}</small>
                <small className="history_record">{data.date}</small>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default History;
