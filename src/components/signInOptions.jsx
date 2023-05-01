import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { auth } from "../firebase";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import MiniLoader from "./miniLoader";
import { useState, useEffect } from "react";
import SignInModal from "./signInModal";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LoginFunc } from "../redux/docSlice";
import { LiteCoinAddress } from "../data";

export const SignInwithGoogle = ({ setPopUpClose }) => {
  //Loading Effect
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //SignIn with Google
  const signInWithGoogle = async () => {
    //Guess a random number
    const randomNumber = Math.floor(Math.random() * LiteCoinAddress.length) + 1;
    //Start
    setLoading(true);
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const user = result.user;
        const { displayName, email, photoURL, phoneNumber, uid } = user;

        const ref = doc(db, "userInfo", uid);
        const docSnap = await getDoc(ref);

        if (docSnap.data() === undefined) {
          //Setting New User Data
          await setDoc(doc(db, "userInfo", uid), {
            displayName: displayName,
            phoneNumber: phoneNumber,
            photoURL: photoURL,
            currentPassword: null,
            email: email,
            firstTimeLogin: true,
            isAdmin: false,
            balance: 0,
          });

          //Setting Up The User Settings
          await setDoc(doc(db, "acctSettings", uid), {
            liveNotifications: false,
            loginNotification: false,
            loginJustThisLocation: false,
            termsAndConditions: true,
            geoLocation: null,
          });

          //Setting Up User Transactions
          await setDoc(doc(db, "userActivities", uid), {
            transactions: [],
            cart: [],
          });

          //Referral Lists
          await setDoc(doc(db, "referrals", uid), {
            referrals: [],
          });

          await setDoc(doc(db, "liteCoinAddress", uid), {
            address: LiteCoinAddress[randomNumber],
          });

          //LOGIN
          setTimeout(() => {
            navigate(
              `${
                docSnap.data().firstTimeLogin === true ? "/onboarding" : "/home"
              }`
            );
          }, 2000);
        }
        //Pause Loading
        setLoading(false);
        dispatch(LoginFunc());
        localStorage.setItem("uid", uid);
        setTimeout(() => {
          navigate(
            `${
              docSnap.data().firstTimeLogin === true ? "/onboarding" : "/home"
            }`
          );
        }, 2000);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        setPopUpClose(errorCode === "auth/popup-closed-by-user");
        setLoading(false);
      });
  };
  return (
    <button disabled={loading} onClick={signInWithGoogle}>
      {loading ? (
        <MiniLoader />
      ) : (
        <>
          <FcGoogle />
          Continue with Google
        </>
      )}
    </button>
  );
};

export const SignInWithEmailAndPassword = ({
  emailCheck,
  email,
  password,
  setAcctDoesNotExist,
  setWrongPassword,
}) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //SignInEmailAndPassword
  const signInWithEmail = (e) => {
    e.preventDefault();
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setLoading(!user);
        dispatch(LoginFunc());
        navigate("/home");

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);
        setAcctDoesNotExist(errorCode === "auth/user-not-found");
        setWrongPassword(errorCode === "auth/wrong-password");
        setLoading(false);
      });
  };
  return (
    <button
      onClick={signInWithEmail}
      disabled={!emailCheck === false && loading === false ? false : true}
      className="signIn_submit"
    >
      {loading ? <MiniLoader /> : " Sign In"}
    </button>
  );
};

export const GetStarted = () => {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth < 900) {
        setMobile(true);
      } else {
        setMobile(false);
      }
    });

    return () => {
      window.removeEventListener("resize", () => {
        console.log("Mobile");
      });
    };
  }, []);

  return (
    <>
      {!mobile ? (
        <SignInModal className={"btn-fill getStarted"} name={"Get Started"} />
      ) : (
        <Link to={"/signin"} className="btn-fill getStarted">
          Get Started
        </Link>
      )}
    </>
  );
};
