import { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Success from "../assets/success.gif";
import Error from "../assets/error.gif";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Notify({ setOpen, open, state }) {
  //const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="notify_div">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="notifyModal">
            <div className="notifyModal_img">
              <img src={state === "Success" ? Success : Error} alt="" />
            </div>
            <p
              className={
                state === "Success" ? "Success_Notify" : "Error_Notify"
              }
            >
              {state === "Success"
                ? "Success! An email has been sent to your registered email address with instructions on how to reset your password. Please check your inbox and follow the steps provided to regain access to your account. If you don't receive an email within a few minutes, please check your spam folder or contact our support team for further assistance."
                : "Oops! Something went wrong while sending the email to reset your password. Please try again later or contact our support team for further assistance. If you continue to experience this issue, please provide us with the error message displayed below so we can investigate and resolve the problem as quickly as possible"}
            </p>
            <button onClick={handleClose} className="btn-fill">
              Close
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
