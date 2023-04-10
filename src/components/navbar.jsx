import { useEffect, useState } from "react";
import Logo from "./logo";
import { RiMenu3Fill } from "react-icons/ri";
import { AiOutlineClose } from "react-icons/ai";

const NavBar = () => {
  //All useStates
  const [openNav, setOpenNav] = useState(false);

  return (
    <>
      <nav className="nav-lg p-md">
        <div className="navBar_one">
          <div>
            <ul className="nav_ul">
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/">About</a>
              </li>
              <li>
                <a href="/">Testimonials</a>
              </li>
              <li>
                <a href="/">Contact</a>
              </li>
            </ul>
          </div>
          <div className="nav_logo">
            <Logo />
          </div>
          <div className="nav_cta_btn">
            <div className="btn_align">
              <button className="btn-outline signIn">SignIn</button>
              <button
                className={`btn-fill ${true ? "signOut_changed" : "signOut"}`}
              >
                SignUp
              </button>
            </div>
          </div>
        </div>
      </nav>
      <nav className="nav-md-sm">
        <div className="nav-md-sm_one">
          <div className="nav-md-sm_logo">
            <Logo />
          </div>
          <div className="nav_menu_open_one">
            <div
              onClick={() => setOpenNav((prev) => !prev)}
              className="nav-svg"
            >
              {openNav ? (
                <AiOutlineClose className="rotate-in-diag-2" />
              ) : (
                <RiMenu3Fill className="rotate-in-diag-2" />
              )}
            </div>
            <div
              className={`nav_open_container ${
                openNav ? "open-nav" : "close-nav"
              }`}
            >
              <ul>
                <li>
                  <a href="">Home</a>
                </li>
                <li>
                  <a href="">About</a>
                </li>
                <li>
                  <a href="">Testimonial</a>
                </li>
                <li>
                  <a href="">Contact Us</a>
                </li>
              </ul>
              <div className="btn-align-sm">
                <button className="signIn-sm">SignIn</button>
                <button className="btn-fill signOut-sm">SignUp</button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
