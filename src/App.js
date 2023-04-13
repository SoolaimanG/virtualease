import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing/landing";
import SignUp from "./pages/SignUp/signup";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
