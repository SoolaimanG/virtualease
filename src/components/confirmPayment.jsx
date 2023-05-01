import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Confirming from "./confirming";
import { FcCancel } from "react-icons/fc";
import { db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
};

export default function ConfirmPaymentModal({
  openConfirmModal,
  setOpenConfirmModal,
  id,
  timeRemaining,
  setTimeRemaining,
}) {
  const [uid, setUid] = React.useState(localStorage.getItem("uid"));
  const [finished, setFinished] = React.useState(false);

  const handleClose = () => {
    setOpenConfirmModal(false);
    setTimeRemaining(300);
  };

  React.useEffect(() => {
    if (timeRemaining === 0) {
      setTimeRemaining(0);
      setFinished(true);
    } else {
      const timer = setInterval(() => {
        setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 1);
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [timeRemaining]);

  React.useEffect(() => {
    if (finished) {
      const updateTransaction = async () => {
        const docRef = doc(db, "userActivities", uid);
        const docSnap = await getDoc(docRef);

        const find = docSnap.data().transactions.map((data) => {
          return data.id === id ? { ...data, state: "failed" } : data;
        });

        await updateDoc(docRef, {
          transactions: find,
        });
      };

      updateTransaction();
    }
  }, [finished]);

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  const formattedTime = `${minutes}:${seconds.toString().padStart(2, "0")}`;

  return (
    <>
      {openConfirmModal && (
        <div>
          <Modal
            open={openConfirmModal}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <div className="confirmPaymentModal_one_one">
                {timeRemaining <= 0 ? (
                  <div className="confirmPaymentModal_one_one">
                    <div className="confirmPaymentModal_one_one_two">
                      <FcCancel />
                    </div>
                    <h3 className="confirmPaymentModal_one_one_h3">
                      Could Not Process Your Payment.
                    </h3>
                    <button
                      onClick={() => {
                        setOpenConfirmModal(false);
                      }}
                      className="btn-fill"
                    >
                      Close
                    </button>
                  </div>
                ) : (
                  <div className="confirmPaymentModal_one_one">
                    <h2>Confirming your payment</h2>
                    <Confirming />
                    <p>Your payment should be confirm within {formattedTime}</p>
                    <div className="confirmPayment_modal_btn">
                      <button className="btn-outline">Support</button>
                      <button
                        onClick={() => {
                          setOpenConfirmModal(false);
                          setFinished(true);
                        }}
                        className="btn-fill"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </Box>
          </Modal>
        </div>
      )}
    </>
  );
}
