import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { FaTimes } from "react-icons/fa";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
};

export default function Enough() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <button className="insufficient enough-btn" onClick={handleOpen}>
        Buy with balance
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="enough">
            <div className="enough_icon">
              <FaTimes />
            </div>
            <h3>Payment Successful</h3>
            <p>Check your email for instructions</p>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
