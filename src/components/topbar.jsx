import { RiMenu3Line } from "react-icons/ri";
import { ImCart } from "react-icons/im";
import { FiSearch } from "react-icons/fi";
import Tooltip from "@mui/material/Tooltip";
import { IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { useTime } from "../customHooks";
import Query from "./query";

const Topbar = ({ setOpenMenu }) => {
  const greeting = useTime();

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
          <Tooltip title="Toggle Cart" placement="bottom">
            <IconButton className="topBar_position">
              <div className="numOfItem">
                <p className="numOfItem_p">0</p>
              </div>
              <ImCart className="mui_svg" />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </nav>
  );
};

export default Topbar;
