import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing/landing";
import SignUp from "./pages/SignUp/signup";
import SignIn from "./pages/SignIn/signIn";
import Forgetpassword from "../src/pages/ForgetPassword/forgetPassword";
import { Navigate } from "react-router-dom";
import { selectAll } from "./redux/docSlice";
import { useSelector } from "react-redux";
import Onboarding from "./pages/Onboarding/onboarding";
import { useEffect } from "react";
import Home from "./pages/Home/home";
import Referral from "./pages/Referral/referral";
import { ToastContainer } from "react-toastify";

function App() {
  const login = useSelector(selectAll).login;
  //Function to protect Route
  const RoutesProtect = ({ children }) => {
    return login ? children : <Navigate to={"/signin"} />;
  };

  useEffect(() => {
    localStorage.setItem("login", JSON.parse(login));
  }, []);
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/ref/:name" element={<Referral />} />
        <Route path="/forgetpassword" element={<Forgetpassword />} />
        <Route
          path="/onboarding"
          element={
            <RoutesProtect>
              <Onboarding />
            </RoutesProtect>
          }
        />
        <Route
          path="/home"
          element={
            <RoutesProtect>
              <Home />
            </RoutesProtect>
          }
        />
      </Routes>
    </>
  );
}

export default App;
