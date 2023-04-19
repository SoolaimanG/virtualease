import Logo from "../../components/logo";
import "./signIn.css";
import { AiFillEyeInvisible, AiFillEye, AiOutlineCheck } from "react-icons/ai";
import { FiAtSign } from "react-icons/fi";
import { Link } from "react-router-dom";
import {
  SignInWithEmailAndPassword,
  SignInwithGoogle,
} from "../../components/signInOptions";
import { BackToPrevious } from "../SignUp/signup";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Loader from "../../components/loader";

const SignIn = () => {
  //Email Reggex
  const EmailReggex = /^([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

  //All SignIn UseState
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailCheck, setEmailCheck] = useState(false);
  const [view, setView] = useState(false);
  const [popUpClose, setPopUpClose] = useState(false);
  const [acctDoesNotExist, setAcctDoesNotExist] = useState(false);
  const [wrongPassword, setWrongPassword] = useState(false);
  const [loading, setLoading] = useState(true);

  //Checking Email
  useEffect(() => {
    setEmailCheck(EmailReggex.test(email));
  }, [email]);

  useEffect(() => {
    const randomSec = [
      1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000,
    ];
    const random = Math.floor(Math.random() * randomSec.length);
    const timer = setTimeout(() => {
      setLoading(false);
    }, randomSec[random]);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      {loading ? (
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
          className="signInPage_container"
        >
          <BackToPrevious to={"/"} />
          <div className="signInPage_wrapper">
            <div className="signInPageform">
              <div className="signInPage_one">
                <div className="signIn_containerPage">
                  <div className="signIn_wrapper">
                    <Logo />
                    <div className="signIn_header">
                      <p>Please enter your details to signIn</p>
                    </div>
                  </div>
                  <div className="signInwithThirdPartyBtn">
                    <SignInwithGoogle setPopUpClose={setPopUpClose} />
                    <p>{popUpClose ? "PopUp is closed by user" : ""}</p>
                  </div>

                  <div className="signInOr">
                    <div></div>
                    <p>or</p>
                    <div></div>
                  </div>
                  <div className="signIn_form" action="">
                    <div className="signIn_input">
                      <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                      />
                      <div className="signIn_input_svg">
                        {!emailCheck ? (
                          <FiAtSign className="fade-in-top" />
                        ) : (
                          <AiOutlineCheck className="fade-in-top" />
                        )}
                      </div>
                    </div>
                    <div className="signIn_input">
                      <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type={view ? "text" : "password"}
                      />
                      <div
                        onClick={() => setView((prev) => !prev)}
                        className="signIn_input_svg"
                      >
                        {view ? (
                          <AiFillEyeInvisible className="fade-in-top" />
                        ) : (
                          <AiFillEye className="fade-in-top" />
                        )}
                      </div>
                    </div>
                    <Link
                      to={"/forgetpassword"}
                      className="signIn_forgetPassword"
                    >
                      Forget Password?
                    </Link>
                    <div className="signUpwithEmail_container">
                      <SignInWithEmailAndPassword
                        emailCheck={emailCheck}
                        email={email}
                        password={password}
                        setAcctDoesNotExist={setAcctDoesNotExist}
                        setWrongPassword={setWrongPassword}
                      />
                      <p>
                        {acctDoesNotExist &&
                          "Seems you don't have an account with us"}
                      </p>
                      <p>
                        {wrongPassword &&
                          "The Password you input is not corresponding"}
                      </p>
                    </div>
                  </div>
                  <p className="idonthaveanAcct">
                    Don't have an account yet?
                    <Link to={"/signUp"}>Create Account.</Link>
                  </p>
                </div>
              </div>
            </div>
            <div className="signInBg"></div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default SignIn;
