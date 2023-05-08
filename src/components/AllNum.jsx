import { AiOutlineSearch } from "react-icons/ai";
import { AllNums } from "../data";
import { useEffect, useState } from "react";
import { MdArrowForwardIos } from "react-icons/md";
import { updateDoc, getDoc, setDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";

const AllNum = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState([]);
  const navigate = useNavigate();
  const uid = localStorage.getItem("uid");

  useEffect(() => {
    const filtered = AllNums.filter((data) => {
      return search.length < 1
        ? data
        : data.countryName[0] === search.toLowerCase() ||
          data.countryName.toLowerCase().includes(search)
        ? data
        : data.countryName.toLowerCase() == search.toLowerCase();
    });

    setFilter(filtered);
  }, [search]);

  useEffect(() => {
    const timer = setInterval(async () => {
      const randomNum = Math.floor(Math.random() * AllNums.length);
      let result = "";
      for (
        let i = 0;
        i <
        AllNums[randomNum].numberLength -
          (AllNums[randomNum].countryCodes.length - 1);
        i++
      ) {
        const randomIndex = Math.floor(Math.random() * 9);
        result += randomIndex;
      }
      const allNums = {
        id: uuidv4(),
        price: Math.floor(Math.random() * (3.3 + 1) + 1),
        countryName: AllNums[randomNum].countryName,
        flag: AllNums[randomNum].flag,
        type: AllNums[randomNum].type,
        number: AllNums[randomNum].countryCodes + result,
      };

      const docRef = doc(db, "AllNums", "SoolaimanG1");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        await updateDoc(docRef, {
          allNums: [...docSnap.data().allNums, allNums],
        });
      } else {
        await setDoc(docRef, {
          allNums: [allNums],
        });
      }

      return () => {
        clearInterval(timer);
      };
    }, 10000);
  }, []);

  //Incase a user click submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const filtered = AllNums.filter((data) => {
      return search.length < 1
        ? data
        : data.countryName[0] === search || data.countryName.includes(search)
        ? data
        : data.countryName.toLowerCase() == search.toLowerCase();
    });

    setFilter(filtered);
  };

  return (
    <div className="allNum_one">
      <Toaster />
      <div className="p-s allNume_two">
        <h4>All countries</h4>
        <small>Phone numbers from 50+ counties and 4000+ cities</small>
        <form onSubmit={handleSubmit} className="allNumForm" action="">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for numbers"
            type="text"
          />
          <AiOutlineSearch />
        </form>
      </div>
      <div className="addNums_three">
        {filter.map((data) => (
          <div
            onClick={() => {
              navigate(`/numbers/allNums/${data.countryName}`);
            }}
            key={data.id}
            className="allNums_four"
          >
            <div className="allNums_five">
              <img src={data.flag} alt={data.countryName} />
              <div className="allNums_six">
                <h4>{data.countryName}</h4>
                <small>{data.type}</small>
              </div>
            </div>
            <MdArrowForwardIos />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllNum;
