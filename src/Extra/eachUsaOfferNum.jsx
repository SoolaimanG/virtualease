import React, { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import Topbar from "../components/topbar";
import { Link, useParams } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import Insufficient from "../components/insufficient";
import Enough from "../components/enough";
import OpenPayment from "../components/openPayment";
import Loader from "../components/loader";

const EachUsaOfferNum = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [data, setData] = useState([]);
  const params = useParams();
  const [uid, setUid] = useState(localStorage.getItem("uid") || "");
  const [input, setInput] = useState("");
  const [selectValue, setSelectValue] = useState("email");
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const docRef = doc(db, "UsaSpecials", params.name);
      const docSnap = await getDoc(docRef);

      const getEmail = await getDoc(doc(db, "userInfo", uid));
      //Getting the Emaila and the number
      setInput(
        selectValue === "email"
          ? getEmail.data().email
          : getEmail.data().phoneNumber
      );
      const find = docSnap.data().state.find((data) => {
        return data.id === params.id;
      });

      setData(find);
      //Getting the user balance
      setBalance(getEmail.data().balance);
    };

    getData();
  }, [selectValue]);
  console.log(data === {});

  useEffect(() => {
    "number" in data ? setLoading(false) : setLoading(true);
    console.log("number" in data);
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
              <div className="each-usa-offer">
                <div className="usa-offer-eachone">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <h4>Buy This Number.</h4>
                    <Link
                      style={{
                        fontSize: "0.9rem",
                      }}
                      to={"/numbers/usaspecials"}
                    >
                      Back
                    </Link>
                  </div>
                  <div className="usa-offer-each-two">
                    <p>{data.number}</p>
                  </div>
                  {data.allowMessage && (
                    <ul className="usa-offer-each-three">
                      <li>Messaging</li>
                      <li>Calls</li>
                      <li>OTP Verification</li>
                    </ul>
                  )}
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="usa-offer-each-four"
                    type="text"
                  />
                  <div className="usa-offer-each-five">
                    <p>I want to receive this number in my</p>
                    <div className="selective">
                      <label htmlFor="Email">
                        Email
                        <input
                          value={"email"}
                          onChange={() => setSelectValue("email")}
                          checked={selectValue === "email"}
                          type="radio"
                          id="Email"
                        />
                      </label>
                      <label htmlFor="text">
                        As Text Message
                        <input
                          onChange={() => setSelectValue("phoneNumber")}
                          value={"phoneNumber"}
                          checked={selectValue === "phoneNumber"}
                          type="radio"
                          id="text"
                        />
                      </label>
                    </div>
                    <div className="usa-offer-each-six">
                      {balance < 1 ? (
                        <Insufficient balance={balance} />
                      ) : (
                        <Enough balance={balance} />
                      )}
                      <OpenPayment price={data.price} />
                    </div>
                  </div>
                </div>
                <div className="p-s explain-how-it-works">
                  <h3>How to Access Your Virtual Number</h3>
                  <ol>
                    <li>
                      After completing your purchase, you will receive a
                      confirmation email containing your virtual number, email
                      address associated with the number, and a temporary
                      password to access your account.
                    </li>
                    <li>
                      Log in to your account using the provided email address
                      and temporary password.
                    </li>
                    <li>
                      Change your password to a secure password of your
                      choosing.
                    </li>
                    <li>
                      Once logged in, you can access your virtual number and
                      begin using it to make and receive calls and text
                      messages.
                    </li>
                    <li>
                      Configure any additional settings or preferences as
                      needed, such as call forwarding or voicemail.
                    </li>
                    <li>
                      Keep your login credentials secure and monitor your
                      account activity regularly.
                    </li>
                  </ol>
                  <p>
                    If you have any questions or issues accessing your virtual
                    number, please click <Link to={"/"}>here</Link>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EachUsaOfferNum;
