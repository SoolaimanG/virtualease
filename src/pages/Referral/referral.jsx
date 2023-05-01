import "./referral.css";
import Logo from "../../components/logo";
import Img from "../../assets/referral.svg";
import { BackToPrevious } from "../SignUp/signup";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { v4 as uuidv4 } from "uuid";
import MiniLoader from "../../components/miniLoader";

const Referral = () => {
  const params = useParams();
  const [ref, setRef] = useState("");
  const EmailReggex = /^([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
  const [checkEmail, setCheckEmail] = useState(false);
  const [reward, setReward] = useState(false);
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);

  const addReferral = async (e) => {
    e.preventDefault();
    setLoading(true);
    const docRef = doc(db, "contestant", "SoolaimanG1");
    const docSnap = await getDoc(docRef);

    const referByName = {
      id: uuidv4(),
      email: ref,
      name: params.name,
      completeSignUp: false,
    };

    const find = docSnap.data().referBy.find((data) => {
      return data.email === ref;
    });

    console.log(find);

    if (find) {
      setErr(true);
      setReward(false);
      setRef("");
      setLoading(false);
    } else {
      //Updating Referrals
      await updateDoc(docRef, {
        referBy: [...docSnap.data().referBy, referByName],
      })
        .then(() => {
          setReward(true);
          setRef("");
          setLoading(false);
          setErr(false);
        })
        .catch((err) => {
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    setCheckEmail(EmailReggex.test(ref));
  }, [ref]);
  return (
    <main className="ref">
      <div className="ref_one">
        <div className="ref_two">
          <BackToPrevious to={"/"} />
          <div className="p-md ref_two_one">
            <h3>What's your email?</h3>
            <p>You have been invited here by {params.name}</p>
            <form onSubmit={addReferral} className="ref_form" action="">
              <input
                className="ref_input"
                placeholder="Your Email Address"
                type="text"
                value={ref.toLowerCase().trim()}
                onChange={(e) => setRef(e.target.value)}
              />
              <button
                disabled={!checkEmail}
                className="btn-fill ref_btn"
                type="submit"
              >
                {loading ? <MiniLoader /> : "Claim Reward"}
              </button>
              <p className="ref_com">
                {reward && "Complete SignUp To Claim Reward"}
              </p>
              <p className="ref_com3">
                {err && "This Email Can't Be Used To Claim Reward"}
              </p>
              <p className="ref_com1">
                {reward ? (
                  <Link className="ref_com2" to={"/signup"}>
                    SignUp Here
                  </Link>
                ) : (
                  ""
                )}
              </p>
              <p className="ref_com2">
                {reward && <Link to={"/signin"}>SignIn With Google Here</Link>}
              </p>
            </form>
          </div>
        </div>
        <div className="ref_three">
          <div className="p-md ref_three_one">
            <Logo />
            <div className="ref_img">
              <img src={Img} alt="" />
            </div>
            <p className="ref_content">
              We're thrilled to have you as a new member of our community, and
              we're excited to see the amazing results we can achieve together.
              As a referral member, you'll have the opportunity to earn rewards
              simply by sharing our product or service with your friends and
              family.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Referral;
