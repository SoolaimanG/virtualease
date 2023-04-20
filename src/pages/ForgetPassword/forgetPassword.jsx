import "./forgetpassword.css";
import { useEffect, useState } from "react";
import forgetpassword1 from "../../assets/forgetpassword1.svg";
import forgetpassword2 from "../../assets/forgetpassword2.svg";
import forgetpassword3 from "../../assets/forgetpassword3.svg";
import forgetpassword4 from "../../assets/forgetpassword4.svg";
import Logo from "../../components/logo";
import { BackToPrevious } from "../SignUp/signup";
import Loader from "../../components/loader";
import { motion } from "framer-motion";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase";
import Notify from "../../components/notify";
import MiniLoader from "../../components/miniLoader";

const Forgetpassword = () => {
  //Email Reggex
  const EmailReggex = /^([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

  const [img, setImg] = useState(["Image1", "Image2", "Image3", "Image4"]);
  const [email, setEmail] = useState("");
  const [emailCheck, setEmailCheck] = useState(false);
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState("Success");
  const [open, setOpen] = useState(false);
  const [res, setRes] = useState(false);

  //Checking Email
  useEffect(() => {
    setEmailCheck(EmailReggex.test(email));
  }, [email]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Rotate the array by shifting the first element to the end
      setImg((prevImg) => [...prevImg.slice(1), prevImg[0]]);
    }, 6000);

    // Clean up the interval timer
    return () => clearInterval(intervalId);
  }, []);

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

  //Reset Password
  const resetPassword = async (e) => {
    e.preventDefault();
    setRes(true);
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setState("Success");
        setOpen(true);
        setRes(false);
      })
      .catch((error) => {
        const errorCode = error.code;
        setState("Error");
        setOpen(true);
        setRes(false);
      });
  };

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
          className="forgetPassword_container"
        >
          <BackToPrevious to={"/signin"} />
          <div className="notify_position">
            <Notify setOpen={setOpen} open={open} state={state} />
          </div>
          <div className="forgetPassword_wrapper">
            <div className="forgetPassword_one">
              <div className="forgetPassword_two">
                <div className="forgetPassword_two_one">
                  <Logo />
                  <h2 className="forgetPassword_two_one_h2">
                    Did you forget your password?
                  </h2>
                  <p>
                    Zero worries you are just a click away from resseting it.
                  </p>

                  <form action="">
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="E-Mail"
                      className="forgetPassword_input"
                      type="text"
                    />
                    <button
                      onClick={resetPassword}
                      disabled={!emailCheck}
                      className="btn-fill"
                    >
                      {res ? <MiniLoader /> : "Submit"}
                    </button>
                  </form>
                </div>
              </div>
              <div className="forgetPassword_three">
                <div className="forgetPassword_three_one">
                  {img[0] === "Image1" ? (
                    <div className="image_change">
                      <img src={forgetpassword1} alt="" />
                      <h2>
                        Calm down and reset your password. Everything will fall
                        back into place.
                      </h2>
                    </div>
                  ) : img[0] === "Image2" ? (
                    <div className="image_change">
                      <img src={forgetpassword2} alt="" />
                      <h2>
                        Forgot your password? No worries, we've got you covered.
                        Let's get you back in action.
                      </h2>
                    </div>
                  ) : img[0] === "Image3" ? (
                    <div className="image_change">
                      <img src={forgetpassword3} alt="" />
                      <h2>
                        Passwords are like keys to your online world. Don't
                        worry if you misplace them, just reset and keep moving
                        forward.
                      </h2>
                    </div>
                  ) : (
                    <div className="image_change">
                      <img src={forgetpassword4} alt="" />
                      <h2>
                        Your password is your first line of defense. If you
                        forget it, reset it and come back stronger.
                      </h2>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Forgetpassword;
