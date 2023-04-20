import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing/landing";
import SignUp from "./pages/SignUp/signup";
import SignIn from "./pages/SignIn/signIn";
import Forgetpassword from "../src/pages/ForgetPassword/forgetPassword";
import { Navigate } from "react-router-dom";
import { selectAll } from "./redux/docSlice";
import { useSelector } from "react-redux";
import Home from "./pages/Home/home";
import { useEffect } from "react";

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
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/forgetpassword" element={<Forgetpassword />} />
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
