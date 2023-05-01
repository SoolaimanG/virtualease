import Box from "@mui/material/Box";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import Modal from "@mui/material/Modal";
import { useState, useEffect } from "react";
import { RiSignalWifiErrorFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

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

export default function OnboardingLoader({ phoneNumber, displayName, refer }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(0);
  const [error, setError] = useState(false);
  const [uid, setUid] = useState(localStorage.getItem("uid") || "");
  const [start, setStart] = useState(false);
  const navigate = useNavigate();

  //Functions
  const handleOpen = () => {
    setOpen(true);
    setStart(true);
  };

  const handleClose = () => {
    setOpen(false);
    setLoading(0);
    setStart(false);
    if (loading === 100) {
      navigate("/home");
    }
  };

  const onClickForm = async () => {
    console.log(refer.id);
    const docRef = doc(db, "contestant", "SoolaimanG1");
    const docSnap = await getDoc(docRef);
    await updateDoc(doc(db, "userInfo", uid), {
      displayName: displayName,
      phoneNumber: phoneNumber,
      firstTimeLogin: false,
    })
      .then(async () => {
        const find = docSnap.data().referBy.map((data) => {
          return data.id === refer.id
            ? { ...data, completeSignUp: true }
            : data;
        });
        await updateDoc(doc(db, "contestant", "SoolaimanG1"), {
          referBy: find,
        });
      })
      .catch((e) => {
        setError(true);
      });
  };

  //Loading
  useEffect(() => {
    if (start) {
      const interval = setInterval(() => {
        if (error) {
          setLoading(loading + 1);
          if (loading === 50) {
            setLoading(50);
          }
        } else {
          if (loading < 100) {
            setLoading(loading + 1);
          }
        }
      }, 50);

      return () => clearInterval(interval);
    }
  }, [loading, start]);

  return (
    <div>
      <button
        disabled={
          displayName.length > 3 && phoneNumber.length > 10 ? false : true
        }
        className="btn-fill onboarding_continue"
        onClick={() => {
          onClickForm();
          handleOpen();
        }}
      >
        Continue
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="onboarding_modal">
            {loading < 99 ? (
              <div className="onboarding_modal">
                <h3>Setting Up!</h3>
                <h4>{loading}%</h4>
                <video
                  autoPlay={true}
                  className="onboarding_video"
                  src="https://cdn.dribbble.com/userupload/6271442/file/original-ec994b2a4d626bdb232dc252473d64ae.mp4"
                ></video>
              </div>
            ) : (
              <div className="onboarding_modal">
                <video
                  autoPlay={false}
                  controls={false}
                  className="onboarding_video"
                  src="https://cdn.dribbble.com/userupload/6271442/file/original-ec994b2a4d626bdb232dc252473d64ae.mp4"
                ></video>
                <h3>Awesome!</h3>
                <p>Your Account is ready and 100% active</p>
                <button
                  onClick={() => navigate("/home")}
                  className="onboarding_modal_btn btn-fill"
                >
                  Proceed to dashboard
                </button>
              </div>
            )}
          </div>
        </Box>
      </Modal>
    </div>
  );
}
