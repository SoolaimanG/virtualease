import NavBar from "../../components/navbar";
import "./landing.css";
import { FaLock } from "react-icons/fa";
import { AiOutlineCheck } from "react-icons/ai";

const Landing = () => {
  return (
    <main className="hero_section">
      <NavBar />
      <section id="home" className="landing_home">
        <div className="landing_home_one">
          <h2>Your all in one virtual tools.</h2>

          <p>
            Welcome to our website, where we offer VPN logs and virtual numbers.
            Browse our selection, add to cart, and checkout for fast and easy
            privacy and communication. Contact us with any questions. Thank you
            for choosing us!
          </p>
          <button className="btn-fill getStarted">Get Started</button>
          <div className="detailed-info-short">
            <small>
              <FaLock />
              100% Secure
            </small>
            <small>
              <AiOutlineCheck />
              The right tools for you to use
            </small>
          </div>
        </div>
      </section>
      <section className="video_section">
        {/*https://youtu.be/VGbyKO8bN68*/}
        <div className="video_embedded">
          <video
            typeof="vide0/mp4"
            loop
            src="https://youtu.be/VGbyKO8bN68"
          ></video>
        </div>
      </section>
    </main>
  );
};

export default Landing;
