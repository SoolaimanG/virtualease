import { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar";
import Topbar from "../../components/topbar";
import "./settings.css";
import { AiFillEdit } from "react-icons/ai";
import { db } from "../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { toast, Toaster } from "react-hot-toast";
import MiniLoader from "../../components/miniLoader";
import { auth } from "../../firebase";
import { updatePassword } from "firebase/auth";
import Switch from "@mui/material/Switch";

const Settings = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [edit, setEdit] = useState(false);
  const [edit1, setEdit1] = useState(false);
  const [email, setEmail] = useState("Email");
  const [phoneNumber, setphoneNumber] = useState("Phone Number");
  const [displayName, setDisplayName] = useState("Display Name");
  const uid = localStorage.getItem("uid");
  const docRef = doc(db, "userInfo", uid);
  const [miniLoader, setMiniLoader] = useState(false);
  const [password, setPassword] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [checked, setChecked] = useState(false);

  const handleChange = async () => {
    setChecked(!checked);

    const docRef = doc(db, "acctSettings", uid);
    const docSnap = await getDoc(docRef);

    await updateDoc(docRef, {
      liveNotifications: !docSnap.data().liveNotifications,
    })
      .then(() => toast.success("Updated"))
      .catch((err) => toast.error("Something went wrong"));
  };

  useEffect(() => {
    const getData = async () => {
      const docSnap = await getDoc(docRef);

      setEmail(docSnap.data().email);
      setDisplayName(docSnap.data().displayName);
      setphoneNumber(docSnap.data().phoneNumber);
      setPassword(docSnap.data().currentPassword);

      const donSnapp = await getDoc(doc(db, "acctSettings", uid));
      setChecked(donSnapp.data().liveNotifications);
    };

    getData();
  }, []);

  const updateInfo = async () => {
    setMiniLoader(true);
    const Reggex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    const condition = phoneNumber.length > 8 && displayName.length > 2;
    if (Reggex.test(email) && condition) {
      await updateDoc(docRef, {
        displayName: displayName,
        email: email,
        phoneNumber: phoneNumber,
      }).then(() => {
        toast.success("Info Updated");
        setEdit(false);
        setMiniLoader(false);
      });
    } else {
      toast.error("Enter a valid input");
      setMiniLoader(false);
    }
  };

  const updatePasswordInfo = async () => {
    const user = auth.currentUser;
    const Reggex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const test = Reggex.test(newPassword);
    if (test && newPassword === confirmPassword) {
      updatePassword(user, newPassword)
        .then(() => {
          toast.success("Successfully updated");
        })
        .catch((error) => {
          toast.error("Oh no! Something went wrong");
        });
    } else {
      toast.error("Passwords do not match or password is weak");
    }
  };

  console.log(password);
  return (
    <section className="home_one">
      <Toaster />
      <div className="home_two">
        <div className="home_three">
          <Sidebar setOpenMenu={setOpenMenu} openMenu={openMenu} />
        </div>
        <div className="home_four">
          <Topbar setOpenMenu={setOpenMenu} />
          <div className="p-md home_five">
            <div className="settings_one">
              <div className="settings_two">
                <h3>Account Settings</h3>
                <div className="p-md settings_three">
                  <div className="settings_four">
                    <strong>My Info</strong>
                    {edit ? (
                      <button
                        onClick={updateInfo}
                        className="btn-fill settings_save"
                      >
                        {miniLoader ? <MiniLoader /> : " Save"}
                      </button>
                    ) : (
                      <button
                        onClick={() => setEdit(!edit)}
                        className="settings_edit_btn"
                      >
                        <AiFillEdit />
                        Edit
                      </button>
                    )}
                  </div>
                  <div className="settings_info">
                    <div className="settngs_info_one">
                      <strong>Display Name</strong>

                      {edit ? (
                        <input
                          onChange={(e) => setDisplayName(e.target.value)}
                          value={displayName}
                          type="text"
                        />
                      ) : (
                        <small>{displayName}</small>
                      )}
                    </div>
                    <div className="settngs_info_one">
                      <strong>Email</strong>
                      {edit ? (
                        <input
                          onChange={(e) => setEmail(e.target.value)}
                          value={email}
                          type="text"
                        />
                      ) : (
                        <small>{email}</small>
                      )}
                    </div>
                  </div>
                  <div className="settings_info">
                    <div className="settngs_info_one">
                      <strong>phone Number</strong>
                      {edit ? (
                        <input
                          onChange={(e) => setphoneNumber(e.target.value)}
                          value={phoneNumber}
                          type="text"
                        />
                      ) : (
                        <small>{phoneNumber}</small>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="settings_two">
                <div className="p-md settings_three">
                  <div className="settings_four">
                    <strong>Account Security</strong>
                    {edit1 ? (
                      <button
                        onClick={updatePasswordInfo}
                        className="btn-fill settings_save"
                      >
                        {miniLoader ? <MiniLoader /> : "Update"}
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          password === null
                            ? toast.error("Denied")
                            : setEdit1(!edit1);
                        }}
                        className="settings_edit_btn"
                      >
                        <AiFillEdit />
                        Change
                      </button>
                    )}
                  </div>
                  <div className="settings_info">
                    <div className="settngs_info_one">
                      <strong>New Password</strong>

                      {password === null ? (
                        <small className="google_login">
                          You Logged in with google
                        </small>
                      ) : edit1 ? (
                        <input
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="Enter a strong password"
                          type="text"
                        />
                      ) : (
                        "***************"
                      )}
                    </div>
                    <div className="settngs_info_one">
                      <strong>Confirm Password</strong>
                      {password === null ? (
                        <small className="google_login">
                          You Logged in with google
                        </small>
                      ) : edit1 ? (
                        <input
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Make sure your password is matching"
                          type="text"
                        />
                      ) : (
                        "***************"
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="settings_two">
                <div className="p-md settings_three">
                  <div className="settings_four">
                    <strong>Personalize</strong>
                  </div>
                  <div className="switch_toggle">
                    <div className="switch_toggle_one">
                      <strong>Notification</strong>
                      <small>
                        If you turn this on you see any toast notification on
                        any new number created
                      </small>
                    </div>
                    <Switch
                      checked={checked}
                      onChange={handleChange}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Settings;
