import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Logo from "./logo";
import { useEffect, useState } from "react";
import { AiFillEyeInvisible, AiFillEye, AiOutlineCheck } from "react-icons/ai";
import { FiAtSign } from "react-icons/fi";
import { Link } from "react-router-dom";
import { SignInWithEmailAndPassword, SignInwithGoogle } from "./signInOptions";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "1.5px solid #000c99",
  boxShadow: 24,
  p: 2,
  borderRadius: "10px",
};

export default function SignInModal({ className, name }) {
  //Email Reggex
  const EmailReggex = /^([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

  //All SignIn UseState
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [emailCheck, setEmailCheck] = useState(false);
  const [view, setView] = useState(false);
  const [popUpClose, setPopUpClose] = useState(false);
  const [acctDoesNotExist, setAcctDoesNotExist] = useState(false);
  const [wrongPassword, setWrongPassword] = useState(false);

  //Modal Funcs
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //Checking Email
  useEffect(() => {
    setEmailCheck(EmailReggex.test(email));
  }, [email]);

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth < 900) {
        setOpen(false);
      }
    });

    localStorage.removeItem("uid");

    return () => {
      window.removeEventListener("resize", () => {
        return handleClose();
      });
    };
  }, []);

  //SignIn with Google Account

  return (
    <div>
      <button onClick={handleOpen} className={className}>
        {name}
      </button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <div className="signIn_container">
              <div className="signIn_wrapper">
                <Logo />
                <div className="signIn_header">
                  <h2>Hello There👋</h2>
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
                <Link to={"/forgetpassword"} className="signIn_forgetPassword">
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
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
