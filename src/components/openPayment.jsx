import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { WalletAddress } from "./addCredit";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { toast, Toaster } from "react-hot-toast";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
};

export default function OpenPayment({ price }) {
  const [timeLeft, setTimeLeft] = React.useState(5 * 60);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const [stop, setStop] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const [address, setAddress] = React.useState("");
  const [uid, setUid] = React.useState(localStorage.getItem("uid") || "");

  React.useEffect(() => {
    const getData = async () => {
      const docRef = doc(db, "liteCoinAddress", uid);
      const docSnap = await getDoc(docRef);
      setAddress(docSnap.data().address);
    };

    getData();
  }, []);

  React.useEffect(() => {
    if (stop) {
      const intervalId = setInterval(() => {
        if (timeLeft < 1) {
          setTimeLeft(5 * 60);
          setStop(false);
          setOpen(false);
        } else {
          setTimeLeft((prevTime) => prevTime - 1);
        }
      }, 1000);

      if (timeLeft == 0) {
        setOpen(false);
        setTimeout(5 * 60);
      }

      return () => clearInterval(intervalId);
    }
  }, [timeLeft, stop]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div>
      <Toaster />
      <div className="usa-offer-each-six litecoinpayment">
        <button
          onClick={() => {
            handleOpen();
            setStop(true);
          }}
        >
          Buy with LiteCoin
        </button>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="opem_payment_one">
            <h4>You are to send ${price} worth of litecoin to this address</h4>
            <WalletAddress address={address} />
            <p>
              Payments are confirm automatically and payment modal will after
              count down
            </p>
            <h3>
              {minutes}:
              {seconds.toString().length < 2 ? "0" + seconds : seconds}
            </h3>
            <button
              onClick={() => {
                setStop(false);
                setTimeLeft(5 * 60);
                setOpen(false);
                toast.error("Payment Cancelled");
              }}
              className="btn-fill"
            >
              Cancel
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
