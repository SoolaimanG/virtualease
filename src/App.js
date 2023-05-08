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
import Numbers from "./pages/Numbers/numbers";
import USAspecials from "./pages/USAspecials/USAspecials";
import SingleUSA from "./Extra/singleUSA";
import EachUsaOfferNum from "./Extra/eachUsaOfferNum";
import Socialmedia from "./pages/SocialMedia/socialmedia";
import EachSocialNum from "./Extra/eachSocialNum";
import MobileNum from "./pages/MobileNum/MobileNum";
import EachMobileNum from "./Extra/eachMobileNum";
import LastMobileNum from "./Extra/lastMobileNum";
import CustomNum from "./Extra/CustomNum";
import AllNumSingle from "./Extra/AllNumSingle";
import EachAllNum from "./Extra/eachAllNums";
import Vpn from "./pages/Vpn/vpn";
import Reward from "./pages/Reward/reward";
import Settings from "./pages/Settings/settings";
import Faq from "./pages/Faq/faq";
import LostPage from "./pages/404/404";

function App() {
  const login = useSelector(selectAll).login;
  //Function to protect Route
  const RoutesProtect = ({ children }) => {
    return login ? children : <Navigate to={"/signin"} />;
  };

  useEffect(() => {
    sessionStorage.setItem("login", JSON.parse(login));
  }, []);
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/ref/:name" element={<Referral />} />
        <Route path="/*" element={<LostPage />} />
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
        <Route
          path="/numbers"
          element={
            <RoutesProtect>
              <Numbers />
            </RoutesProtect>
          }
        />
        <Route
          path="/numbers/usaspecials"
          element={
            <RoutesProtect>
              <USAspecials />
            </RoutesProtect>
          }
        />
        <Route
          path="/numbers/usaspecials/:name"
          element={
            <RoutesProtect>
              <SingleUSA />
            </RoutesProtect>
          }
        />
        <Route
          path="/numbers/usaspecials/:name/:id"
          element={
            <RoutesProtect>
              <EachUsaOfferNum />
            </RoutesProtect>
          }
        />
        <Route
          path="/numbers/socialmedia"
          element={
            <RoutesProtect>
              <Socialmedia />
            </RoutesProtect>
          }
        />
        <Route
          path="/numbers/socialmedia/:id"
          element={
            <RoutesProtect>
              <EachSocialNum />
            </RoutesProtect>
          }
        />
        <Route
          path="/numbers/mobilenumbers"
          element={
            <RoutesProtect>
              <MobileNum />
            </RoutesProtect>
          }
        />
        <Route
          path="/numbers/:country"
          element={
            <RoutesProtect>
              <EachMobileNum />
            </RoutesProtect>
          }
        />
        <Route
          path="/numbers/:country/:id"
          element={
            <RoutesProtect>
              <LastMobileNum />
            </RoutesProtect>
          }
        />
        <Route
          path="/customNum"
          element={
            <RoutesProtect>
              <CustomNum />
            </RoutesProtect>
          }
        />
        <Route
          path="/numbers/allNums/:country"
          element={
            <RoutesProtect>
              <AllNumSingle />
            </RoutesProtect>
          }
        />
        <Route
          path="/numbers/allNums/:country/:id"
          element={
            <RoutesProtect>
              <EachAllNum />
            </RoutesProtect>
          }
        />
        <Route
          path="/vpn"
          element={
            <RoutesProtect>
              <Vpn />
            </RoutesProtect>
          }
        />
        <Route
          path="/ref"
          element={
            <RoutesProtect>
              <Reward />
            </RoutesProtect>
          }
        />
        <Route
          path="/settings"
          element={
            <RoutesProtect>
              <Settings />
            </RoutesProtect>
          }
        />
        <Route
          path="/faq"
          element={
            <RoutesProtect>
              <Faq />
            </RoutesProtect>
          }
        />
      </Routes>
    </>
  );
}

export default App;
