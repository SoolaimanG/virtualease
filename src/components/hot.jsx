import { useEffect, useState } from "react";
import { Chip } from "@mui/material";
import { db } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { NoData } from "./history";
import { toast } from "react-hot-toast";

const Hot = () => {
  const [HotCountries, setHotCountries] = useState([]);
  useEffect(() => {
    const getHotNums = () => {
      onSnapshot(doc(db, "HotNumbers", "SoolaimanG1"), (doc) => {
        setHotCountries(doc.data().HotNumbers);
      });
    };

    getHotNums();
  }, []);
  return (
    <div className="hot_one">
      <div className="hot_two">
        <div className="p-s">
          <h3>Hot🔥</h3>
        </div>
      </div>
      <div className="hot_three">
        <h3>All ({HotCountries.length})</h3>
        {HotCountries.length < 1 ? (
          <NoData value={"No Numbers Available"} />
        ) : (
          HotCountries.map((country) => (
            <div key={country.id} className="hot_four">
              <div className="hot_flag">
                <img src={country.flag} alt="" />
              </div>
              <div className="hot_chips">
                <Chip label={country.country} />
                <Chip label={country.countryCode} />
              </div>
              <div className="hot_email">
                <small>
                  {country.email.length > 10
                    ? country.email.slice(0, 10) + "***"
                    : country.email}
                </small>
              </div>
              <div className="hot_created">
                <pre>Created:{country.createdOn}</pre>
                <pre>Expires on:{country.expires}</pre>
              </div>
              <button onClick={() => toast.error("Sold")} className="hot_btn">
                Buy
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Hot;
