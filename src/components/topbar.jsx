import { RiMenu3Line } from "react-icons/ri";
import Tooltip from "@mui/material/Tooltip";
import { IconButton } from "@mui/material";
import { useTime } from "../customHooks";
import Query from "./query";
import { BiLogOut } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const Topbar = ({ setOpenMenu }) => {
  const greeting = useTime();
  const navigate = useNavigate();

  return (
    <nav className="topBar_one">
      <div className="p-md topBar_two">
        <div className="topBar_three">
          <h3>{greeting}</h3>
        </div>
        <div className="topBar_three">
          <div className="menu_disappear">
            <Tooltip title="Toggle Menu" placement="bottom">
              <IconButton onClick={() => setOpenMenu((prev) => !prev)}>
                <RiMenu3Line className="mui_svg" />
              </IconButton>
            </Tooltip>
          </div>

          <Query />
          <Tooltip title="Log Out" placement="bottom">
            <IconButton onClick={() => navigate("/")}>
              <BiLogOut className="mui_svg" />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </nav>
  );
};

export default Topbar;
