import { useEffect, useState } from "react";
import { BackToPrevious } from "../SignUp/signup";
import "./onboarding.css";
import OnboardingLoader from "../../components/onboardingLoader";
import { motion } from "framer-motion";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

const Onboarding = () => {
  const [displayName, setDisplayName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [refer, setRefer] = useState("");
  const [uid, setUid] = useState(localStorage.getItem("uid") || "");
  const [refCode, setRefCode] = useState("");

  useEffect(() => {
    const getRef = async () => {
      const docRef = doc(db, "contestant", "SoolaimanG1");
      const docSnap = await getDoc(docRef);
      const userRef = doc(db, "userInfo", uid);
      const userSnap = await getDoc(userRef);

      const find = docSnap.data().referBy.find((data) => {
        return data.email === userSnap.data().email;
      });

      setRefer(find);
      setRefCode(find === undefined ? "" : find.name);
    };

    getRef();
  }, []);

  return (
    <motion.main
      initial={{ scale: 0 }}
      animate={{ rotate: 0, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
      className="onboarding_one"
    >
      <div className="onboarding_two p-lg">
        <BackToPrevious to={"/signin"} />
        <div className="onboarding_three">
          <div className="onboarding_three_one">
            <h2>Complete your profile.</h2>
            <p>
              Create your profile by adding your personal details and setting
              some of the app prefrence.
            </p>
          </div>
          <div className="onboarding_three_form">
            <label htmlFor="displayName">
              UserName
              <input
                className="onboarding_input"
                type="text"
                id="displayName"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </label>
            <label htmlFor="tel">
              Phone Number
              <input
                className="onboarding_input"
                type="tel"
                name="tel"
                id="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </label>
            <label htmlFor="ref">
              Referral Code
              <input
                className="onboarding_input"
                type="text"
                name="ref"
                id="ref"
                value={refCode}
                readOnly
                placeholder="Referral Code || Optional"
              />
            </label>
            <p className="onboarding_reason">
              You SignIn With Google That's Why You Are Seeing This!
            </p>
            <div className="onboarding_btn">
              <button className="btn-outline">Skip</button>
              <OnboardingLoader
                displayName={displayName}
                phoneNumber={phoneNumber}
                refer={refer}
              />
            </div>
          </div>
        </div>
        <div className="onboarding_four">
          <img
            src="https://images.pexels.com/photos/7562114/pexels-photo-7562114.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt=""
          />
        </div>
      </div>
    </motion.main>
  );
};

export default Onboarding;
