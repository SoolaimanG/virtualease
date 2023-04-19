import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing/landing";
import SignUp from "./pages/SignUp/signup";
import SignIn from "./pages/SignIn/signIn";
import Forgetpassword from "../src/pages/ForgetPassword/forgetPassword";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/forgetpassword" element={<Forgetpassword />} />
      </Routes>
    </>
  );
}

export default App;
