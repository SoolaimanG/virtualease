import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { IoIosAdd } from "react-icons/io";
import { BsQuestion, BsCurrencyBitcoin } from "react-icons/bs";
import { useEffect, useState } from "react";
import { FaStripe, FaGoogle, FaCopy } from "react-icons/fa";
import { TbBrandCoinbase } from "react-icons/tb";
import { db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import ConfirmPaymentModal from "./confirmPayment";
import MiniLoader from "./miniLoader";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2,
  overflow: "hidden",
};

export default function AddCredit({ title }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [tab, setTab] = useState(true);
  const [addBalance, setAddBalance] = useState(0);
  const [converter, setConverter] = useState(0);
  const [uid, setUid] = useState(localStorage.getItem("uid"));
  const [address, setAddress] = useState("");
  const [copied, setCopied] = useState(false);
  const [checked, setChecked] = useState(false);
  const [checkNum, setCheckNum] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [id, setID] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(5 * 60);
  const pattern = /^(?!0+$)(?!-)\d*(\.\d+)?$/;

  const currentDate = new Date();
  const day =
    currentDate.getDate() +
    "/" +
    (currentDate.getMonth() + 1) +
    "/" +
    currentDate.getFullYear();

  useEffect(() => {
    setConverter(addBalance * 0.04);

    setCheckNum(pattern.test(addBalance));
  }, [addBalance]);

  useEffect(() => {
    const getAddress = async () => {
      const docRef = doc(db, "liteCoinAddress", uid);
      const docSnap = await getDoc(docRef);

      setAddress(docSnap.data().address);
    };

    getAddress();
  }, []);

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 5000);
    }
  }, [copied]);

  const copyAddress = () => {
    navigator.clipboard.writeText(address).then(() => {
      setCopied(true);
    });
  };

  const updateTransaction = async () => {
    setLoading(true);
    setID(Date.now());
    const transaction = {
      id: Date.now(),
      status: "Funded my account with",
      date: day,
      amount: addBalance,
      credit: converter,
      state: "pending",
    };

    const docRef = doc(db, "userActivities", uid);
    const docSnap = await getDoc(docRef);
    // Set the "capital" field of the city 'DC'
    if (addBalance === undefined || addBalance.length < 1) {
      alert("Error");
      setLoading(false);
    } else {
      await updateDoc(docRef, {
        transactions: [...docSnap.data().transactions, transaction],
      }).then(() => {
        setOpenConfirmModal(true);
        setLoading(false);
      });
    }
  };

  return (
    <>
      <div>
        <button onClick={handleOpen} className="balance_two_one">
          {title === "Add Credit" ? <IoIosAdd /> : <BsQuestion />}
          {title}
        </button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="addCredit">
              <div className="addCredit_one">
                {title === "Add Credit" ? (
                  <div className="credit_one">
                    <div className="credit_two">
                      <div className="credt_three">
                        <button
                          onClick={() => setTab(true)}
                          className={`credit_btn ${
                            tab ? "active_credit_tab" : ""
                          }`}
                        >
                          Add with button
                        </button>
                        <button
                          onClick={() => setTab(false)}
                          className={`credit_btn ${
                            !tab ? "active_credit_tab" : ""
                          }`}
                        >
                          LiteCoin Address
                        </button>
                      </div>
                      {tab ? (
                        <div className="credit_tab_one">
                          <div className="credit_tab_two">
                            <h2>This feature is not yet supported.</h2>
                            <div className="credit_tab_three">
                              <button disabled className="credit_tab_three_btn">
                                <FaStripe />
                              </button>
                              <button disabled className="credit_tab_three_btn">
                                <TbBrandCoinbase />
                                Coinbase
                              </button>
                              <button disabled className="credit_tab_three_btn">
                                <FaGoogle />
                                Pay
                              </button>
                              <button disabled className="credit_tab_three_btn">
                                <BsCurrencyBitcoin />
                                BitPay
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="credit_tab_one_one">
                          <div className="credit_tab_two_two">
                            <div className="credit_tab_two_three">
                              <h4>Amount($)</h4>
                              <input
                                placeholder="Amount to deposit in $"
                                type="number"
                                className="credit_tab_three_input"
                                value={addBalance}
                                onChange={(event) => {
                                  setAddBalance(
                                    event.target.value === undefined
                                      ? 0
                                      : event.target.value
                                  );
                                }}
                              />
                              <div className="convertBalance">
                                <p>${addBalance} dollar</p>
                                <p>in credit is</p>
                                <p>{converter}c</p>
                              </div>

                              <h4>Your Wallet Address</h4>
                              <div className="creditAddressShow">
                                <p>{address}</p>
                                <div
                                  onClick={copyAddress}
                                  className="adress_copy_svg"
                                >
                                  <FaCopy
                                    className={copied ? "copied_addresss" : ""}
                                  />
                                </div>
                              </div>
                              <p className="copied_addresss">
                                {copied && "Copied"}
                              </p>

                              <p>
                                <strong>Note:</strong>Please note that it may
                                take up to 5 minutes for your payment to reflect
                                in our system. All transactions are recorded and
                                any discrepancies will be investigated. By
                                proceeding with the payment, you agree to the
                                terms and conditions of our service
                              </p>

                              <div className="permission">
                                <input
                                  value={checked}
                                  onChange={(e) => setChecked(e.target.checked)}
                                  type="checkbox"
                                  name=""
                                  id=""
                                />
                                <p>I agree.</p>
                              </div>

                              <button
                                disabled={checked && checkNum ? false : true}
                                className="btn-fill sent_coin"
                                onClick={() => {
                                  updateTransaction();
                                  setTimeRemaining(300);
                                }}
                              >
                                {loading ? (
                                  <MiniLoader />
                                ) : (
                                  "  I have sent the coin to my address"
                                )}
                              </button>
                              <ConfirmPaymentModal
                                openConfirmModal={openConfirmModal}
                                setOpenConfirmModal={setOpenConfirmModal}
                                id={id}
                                setTimeRemaining={setTimeRemaining}
                                timeRemaining={timeRemaining}
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="how_it_works_one">
                    <h1>Welcome to VirtualEase Credit System</h1>
                    <p>
                      We've created our own currency called "credits" that you
                      can use to purchase goods or services. Our credit system
                      is designed to make transactions on our website easier and
                      more efficient.
                    </p>
                    <h2>How It Works:</h2>
                    <ol>
                      <li>
                        <strong>Exchange Rate:</strong> Each credit is
                        equivalent to $0.04. So, if you want to purchase a
                        product that costs $2, you will need 50 credits. If you
                        want to purchase a product that costs $5, you will need
                        125 credits.
                      </li>
                      <li>
                        <strong>Purchase Credits:</strong> To purchase credits,
                        simply navigate to the "Credit Purchase" page, enter the
                        amount of credits you want to purchase, and complete the
                        checkout process. We accept payment via credit card,
                        PayPal, and other payment methods.
                      </li>
                      <li>
                        <strong>Use Credits:</strong> Once you have purchased
                        credits, you can use them to purchase goods or services
                        on our website. During the checkout process, you will
                        have the option to pay with credits instead of cash.
                        Just select the option to pay with credits, and we will
                        automatically deduct the appropriate number of credits
                        from your account.
                      </li>
                      <li>
                        <strong>Crypto Payments:</strong> We also accept
                        payments in various cryptocurrencies, including Bitcoin,
                        Ethereum, and Litecoin. To make a payment with
                        cryptocurrency, simply select the cryptocurrency payment
                        option during checkout and follow the instructions to
                        complete your transaction.
                      </li>
                      <li>
                        <strong>Credit Balance:</strong> You can check your
                        credit balance at any time by logging into your account
                        and navigating to the "Credit Balance" page. This page
                        will show you how many credits you have, how many you
                        have used, and how many are remaining.
                      </li>
                      <li>
                        <strong>Customer Support:</strong> If you have any
                        questions or issues related to our credit system or
                        cryptocurrency payments, please don't hesitate to
                        contact our customer support team. We're always here to
                        help and ensure that you have a positive experience on
                        our website.
                      </li>
                    </ol>
                    <button
                      onClick={handleClose}
                      className="btn-outline addCredit_btn_one"
                    >
                      Ok! I understand
                    </button>
                  </div>
                )}
              </div>
            </div>
          </Box>
        </Modal>
      </div>
    </>
  );
}
