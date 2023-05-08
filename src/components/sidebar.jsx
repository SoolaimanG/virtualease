import { RiDashboardFill } from "react-icons/ri";
import { BsSimFill } from "react-icons/bs";
import {
  MdInsertInvitation,
  MdOutlineVpnKey,
  MdHelpCenter,
} from "react-icons/md";
import { AiFillSetting, AiOutlineClose } from "react-icons/ai";
import Logo from "../components/logo";
import { NavLink } from "react-router-dom";

const Sidebar = ({ openMenu, setOpenMenu }) => {
  return (
    <nav className={`p-md sideBar_one ${openMenu ? "openSideBar" : ""}`}>
      <AiOutlineClose
        onClick={() => setOpenMenu(false)}
        className="sideBar_close"
      />
      <div className="sideBar_two">
        <Logo />
      </div>
      <div className="sideBar_three">
        <ul className="sideBar_five">
          <li>
            <NavLink to={"/home"} className="sideBar_four">
              <RiDashboardFill />
              <p className="sideBar_nav_name">Dashboard</p>
            </NavLink>
          </li>
          <li>
            <NavLink to={"/numbers"} className="sideBar_four">
              <BsSimFill />
              <p className="sideBar_nav_name">Numbers</p>
            </NavLink>
          </li>
          <li>
            <NavLink to={"/vpn"} className="sideBar_four">
              <MdOutlineVpnKey />
              <p className="sideBar_nav_name">VPN Logs</p>
            </NavLink>
          </li>
          <li>
            <NavLink to={"/ref"} className="sideBar_four">
              <MdInsertInvitation />
              <p className="sideBar_nav_name">Rewards</p>
            </NavLink>
          </li>
          <li>
            <NavLink to={"/settings"} className="sideBar_four">
              <AiFillSetting />
              <p className="sideBar_nav_name">Settings</p>
            </NavLink>
          </li>
          <li>
            <NavLink to={"/faq"} className="sideBar_four">
              <MdHelpCenter />
              <p className="sideBar_nav_name">Help</p>
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
