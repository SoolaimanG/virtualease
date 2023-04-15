import "./signup.css";
import Logo from "../../components/logo";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import "react-phone-number-input/style.css";
import PhoneInput, {
  isValidPhoneNumber,
  formatPhoneNumber,
  isPossiblePhoneNumber,
} from "react-phone-number-input";
import { useEffect, useState } from "react";
import TransitionsModal from "../../components/termsandcondition";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

export const BackToPrevious = () => {
  //Using UseNavigator
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate("/");
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

  const signUpUser = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  return (
    <div className="signUp">
      <div className="signUp_container">
        <div className="signUp_one">
          <div className="signUp_one_one">
            <BackToPrevious />
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
                  value={email}
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
                <p></p>
                <button
                  disabled={isChecked && checkPhone ? disabled : true}
                  className="signUp_submit"
                  type="submit"
                  onClick={signUpUser}
                >
                  Sign Up
                </button>
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
                Let's get you all set up so you can verify your personal account
                and begin setting your profile.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
