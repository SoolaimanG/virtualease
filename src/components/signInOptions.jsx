import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { auth } from "../firebase";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

export const SignInwithGoogle = () => {
  //SignIn with Google
  const signInWithGoogle = async () => {
    //Start

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
        });

        //Setting Up The User Settings
        await setDoc(doc(db, "acctSettings", uid), {
          liveNotifications: false,
          loginNotification: false,
          loginJustThisLocation: false,
          termsAndConditions: true,
          geoLocation: null,
        });

        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
      });
  };
  return (
    <button onClick={signInWithGoogle}>
      <FcGoogle />
      Continue with Google
    </button>
  );
};
