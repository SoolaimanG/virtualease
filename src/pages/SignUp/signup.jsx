import "./signup.css";
import Logo from "../../components/logo";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

export const BackToPrevious = () => {
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
  return (
    <div className="signUp">
      <div className="signUp_container">
        <div className="signUp_one">
          <div className="signUp_one_one">
            <div className="signUp_one_two">
              <BackToPrevious />
              <div className="signUp_one_three">
                <h2>Create an account.</h2>
                <p>create an account to start using virtualease</p>
                <form className="signUp_form" action="">
                  <div className="signUp_wrapper">
                    <label className="sigup_label" htmlFor="userName">
                      UserName
                    </label>
                    <input
                      className="signUp_input"
                      type="text"
                      name="userName"
                      id="userName"
                    />
                  </div>
                  <div className="signUp_wrapper">
                    <label className="sigup_label" htmlFor="email">
                      E-mail
                    </label>
                    <input
                      className="signUp_input"
                      type="email"
                      name="email"
                      id="email"
                    />
                  </div>
                  <div className="signUp_wrapper">
                    <label className="sigup_label" htmlFor="password">
                      Password
                    </label>
                    <input
                      className="signUp_input"
                      type="password"
                      name="password"
                      id="password"
                    />
                    <p></p>
                  </div>
                  <div className="signUp_wrapper">
                    <label className="sigup_label" htmlFor="password">
                      Confirm Password
                    </label>
                    <input
                      className="signUp_input"
                      type="password"
                      name="password"
                      id="password"
                    />
                    <p></p>
                  </div>
                  <div className="TC">
                    <input type="checkbox" name="checkbox" id="checkbok" />
                    <p>By clicking you are accepting out Terms and Condition</p>
                  </div>
                  <p></p>

                  <button
                    disabled={true}
                    className="btn-fill signUp_submit"
                    type="submit"
                  >
                    Sign Up
                  </button>
                </form>
              </div>
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
