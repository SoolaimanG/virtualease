import "./signup.css";
import Logo from "../../components/logo";
import { BiArrowBack } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import "react-phone-number-input/style.css";
import PhoneInput, { isPossiblePhoneNumber } from "react-phone-number-input";
import { useEffect, useState } from "react";
import TransitionsModal from "../../components/termsandcondition";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import Loader from "../../components/loader";
import MiniLoader from "../../components/miniLoader";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { motion } from "framer-motion";

export const BackToPrevious = ({ to }) => {
  //Using UseNavigate
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate(to);
      }}
      className="backToPrevious"
    >
      <BiArrowBack />
    </div>
  );
};

const SignUp = () => {
  //REGGEXXXX
  const Reggex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  const EmailReggex = /^([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

  //Using UseNavigate
  const navigate = useNavigate();

  //All UseStates
  const [viewPassword, setViewPassword] = useState(false);
  const [viewPassword2, setViewPassword2] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [value, setValue] = useState();
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [passwordStregth, setPasswordStregth] = useState(true);
  const [confirmPasswordStrength, setConfirmPasswordStrength] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [checkPhone, setCheckPhone] = useState(false);
  const [checkEmail, setCheckEmail] = useState(false);
  const [loadings, setLoadings] = useState(true);
  const [signingUp, setSigningUp] = useState(false);
  const [acctExist, setAcctExist] = useState(false);
  const [redirectTo, setRedirectTo] = useState(10);
  const [acctCreated, setAcctCreated] = useState(false);

  //Condtions for the form control
  useEffect(() => {
    //Checking For Phone Number
    setCheckPhone(value === undefined ? false : isPossiblePhoneNumber(value));

    setPasswordStregth(password.length < 1 ? false : Reggex.test(password));
    setConfirmPasswordStrength(
      confirmpassword.length < 1 ? false : Reggex.test(confirmpassword)
    );
    setCheckEmail(email.length < 1 ? true : EmailReggex.test(email));

    if (passwordStregth && confirmPasswordStrength) {
      setDisabled(!(password === confirmpassword));
    }
  }, [password, confirmpassword, email, userName, value]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadings(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  //Redirect UseEffects
  useEffect(() => {
    if (acctExist) {
      const timer = setInterval(() => {
        setRedirectTo((prev) => prev - 1);

        if (redirectTo === 0) {
          setRedirectTo(10);
          navigate("/signin");
        }
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [acctExist, redirectTo]);

  //SignUp Users
  const signUpUser = (e) => {
    e.preventDefault();
    setSigningUp(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        setAcctCreated(user);
        const { uid } = user;
        setSigningUp(false);

        //Setting Up The User Basic Info
        await setDoc(doc(db, "userInfo", uid), {
          displayName: userName,
          phoneNumber: value,
          photoURL: "",
          currentPassword: password,
          firstTimeLogin: true,
          isAdmin: false,
          balance: 0,
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

        //Setting Up User Transactions
        await setDoc(doc(db, "userActivities", uid), {
          transactions: [],
          cart: [],
        });

        //For Referral
        await setDoc(doc(db, "referrals", uid), {
          referrals: [],
        });

        const docRef = doc(db, "contestant", "SoolaimanG1");
        const docSnap = await getDoc(docRef);

        const find = docSnap.data().referBy.map((data) => {
          return data.email === email
            ? { ...data, completeSignUp: true }
            : data;
        });

        await updateDoc(doc(db, "contestant", "SoolaimanG1"), {
          referBy: find,
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        setAcctExist(errorCode === "auth/email-already-in-use");
        setSigningUp(false);
        setAcctCreated(false);
      });
  };

  return (
    <>
      {loadings ? (
        <Loader />
      ) : (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
          className="signUp"
        >
          <div className="signUp_container">
            <div className="signUp_one">
              <div className="signUp_one_one">
                <BackToPrevious to={"/"} />
                <div className="signUp_one_three">
                  <div className="signUp_header">
                    <h2>Create an account.</h2>
                    <p>create an account to start using virtualease</p>
                  </div>
                  <form className="signUp_form" action="">
                    <input
                      className="signUp_input"
                      type="text"
                      name="userName"
                      id="userName"
                      placeholder="UserName"
                      value={userName}
                      onChange={(e) => {
                        setUserName(e.target.value);
                      }}
                    />
                    <input
                      className="signUp_input"
                      type="email"
                      name="email"
                      id="email"
                      placeholder="E-mail"
                      value={email.toLowerCase().trim()}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                    <p>{!checkEmail && "Invalid E-mail"}</p>
                    <PhoneInput
                      initialValueFormat="national"
                      international={true}
                      placeholder="Phone Number"
                      value={value}
                      onChange={setValue}
                    />
                    <p>
                      {value === undefined
                        ? ""
                        : !checkPhone
                        ? "Input Valid Phone Number"
                        : ""}
                    </p>
                    <div className="signUp_password">
                      <input
                        className="signUp_input"
                        type={viewPassword ? "text" : "password"}
                        name="password"
                        id="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                      />
                      {!viewPassword ? (
                        <AiFillEye
                          onClick={() => setViewPassword((prev) => !prev)}
                        />
                      ) : (
                        <AiFillEyeInvisible
                          onClick={() => setViewPassword((prev) => !prev)}
                        />
                      )}
                    </div>
                    <p>
                      {password.length < 1
                        ? false
                        : !Reggex.test(password) && "Password is weak"}
                    </p>
                    <div className="signUp_password">
                      <input
                        className="signUp_input"
                        type={viewPassword2 ? "text" : "password"}
                        name="Confirmpassword"
                        id="Confirmpassword"
                        placeholder="Confirm Password"
                        value={confirmpassword}
                        onChange={(e) => {
                          setConfirmpassword(e.target.value);
                        }}
                        onPaste={(e) => e.preventDefault()}
                      />
                      {!viewPassword2 ? (
                        <AiFillEye
                          onClick={() => setViewPassword2((prev) => !prev)}
                        />
                      ) : (
                        <AiFillEyeInvisible
                          onClick={() => setViewPassword2((prev) => !prev)}
                        />
                      )}
                    </div>
                    <p>{disabled && "Make sure your password is matching"}</p>
                    <div className="TC">
                      <input
                        checked={isChecked}
                        onChange={(e) => setIsChecked(e.target.checked)}
                        type="checkbox"
                        name="checkbox"
                        id="checkbok"
                      />
                      <TransitionsModal setIsChecked={setIsChecked} />
                    </div>
                    <p className="acctExist">
                      {acctExist &&
                        "An account with this email already exist in our database"}
                    </p>
                    <p className="redirectingTo">
                      {acctExist &&
                        `Redirecting you to the login page in ${redirectTo}`}
                    </p>
                    <button
                      disabled={
                        isChecked && checkPhone && !signingUp ? disabled : true
                      }
                      className="signUp_submit"
                      type="submit"
                      onClick={signUpUser}
                    >
                      {signingUp ? <MiniLoader /> : "Sign Up"}
                    </button>
                    <p id="acctCreated">
                      {acctCreated ? "Your Account has been created," : ""}{" "}
                      {acctCreated && (
                        <Link to={"/signin"}>Proceed to login</Link>
                      )}
                    </p>
                  </form>
                </div>
              </div>
            </div>
            <div className="signUp_two">
              <div className="signUp_two_one">
                <div className="signUp_two_two">
                  <h2>
                    Welcome to
                    <Logo />
                  </h2>
                  <p>
                    Let's get you all set up so you can verify your personal
                    account and begin setting your profile.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default SignUp;
