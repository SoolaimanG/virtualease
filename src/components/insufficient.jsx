import * as React from "react";
import Box from "@mui/material/Box";
import { FaTimes } from "react-icons/fa";
import Modal from "@mui/material/Modal";
import { Link } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
};

export default function Insufficient({ balance }) {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  return (
    <div>
      <button className="insufficient" onClick={handleOpen}>
        Buy with balance
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="insuffient_one">
            <div className="insufient_icon">
              <FaTimes />
            </div>
            <h3>Low Balance</h3>
            <p>Current Balance: {balance}</p>
            <Link to={"/home"} className="addToMyAcct" role="button">
              Fund My Account
            </Link>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
