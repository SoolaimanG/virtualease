import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { auth } from "../firebase";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import MiniLoader from "./miniLoader";
import { useState } from "react";

export const SignInwithGoogle = ({ setPopUpClose }) => {
  //Loading Effect
  const [loading, setLoading] = useState(false);

  //SignIn with Google
  const signInWithGoogle = async () => {
    //Start
    setLoading(true);
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const user = result.user;
        const { displayName, email, photoURL, phoneNumber, uid } = user;

        //Setting New User Data
        await setDoc(doc(db, "userInfo", uid), {
          displayName: displayName,
          phoneNumber: phoneNumber,
          photoURL: photoURL,
          currentPassword: null,
          email: email,
          firstTimeLogin: true,
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

        //Pause Loading
        setLoading(false);
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
  //SignInEmailAndPassword
  const signInWithEmail = (e) => {
    e.preventDefault();
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setLoading(!user);
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
