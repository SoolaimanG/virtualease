import { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar";
import Topbar from "../../components/topbar";
import "./reward.css";
import {
  AiFillInstagram,
  AiOutlineWhatsApp,
  AiFillTwitterCircle,
} from "react-icons/ai";
import { db } from "../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { Toaster, toast } from "react-hot-toast";
import { NoData } from "../../components/history";

const Reward = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [referralLink, setReferralLink] = useState("");
  const uid = localStorage.getItem("uid");
  const [filter, setFilter] = useState([]);
  const [completed, setCompleted] = useState([]);

  const shareIcons = [
    {
      id: 1,
      name: "Twitter",
      icon: <AiFillTwitterCircle />,
    },
    {
      id: 2,
      name: "Instagram",
      icon: <AiFillInstagram />,
    },
    {
      id: 3,
      name: "WhatsApp",
      icon: <AiOutlineWhatsApp />,
    },
  ];

  useEffect(() => {
    const getData = async () => {
      const link = window.location.href;

      const docRef = doc(db, "userInfo", uid);
      const docSnap = await getDoc(docRef);
      setReferralLink(link + "/" + docSnap.data().displayName);
    };

    const getReferral = async () => {
      const docRef = doc(db, "contestant", "SoolaimanG1");
      const docSnap = await getDoc(docRef);

      const docRef1 = doc(db, "userInfo", uid);
      const docSnap1 = await getDoc(docRef1);

      const filterd = docSnap.data().referBy.filter((data) => {
        return data.name == docSnap1.data().displayName;
      });

      setFilter(filterd);

      setCompleted(
        filterd.filter((data) => {
          return data.completeSignUp == true;
        })
      );
    };

    getData();
    getReferral();
  }, []);

  const copyLink = () => {
    navigator.clipboard
      .writeText(referralLink)
      .then(() => toast.success("Copied"));
  };

  const moveToBalance = async () => {
    if (completed.length === 0) {
      toast.error("Low Earnings");
    } else {
      const docRef = doc(db, "userInfo", uid);
      const docSnap = await getDoc(docRef);
      await updateDoc(docRef, {
        balance: docSnap.data().balance + completed.length * 0.7,
      })
        .then(async () => {
          const docSnap = await getDoc(doc(db, "contestant", "SoolaimanG1"));
          const docRef1 = doc(db, "userInfo", uid);
          const docSnap1 = await getDoc(docRef1);
          const filter = docSnap.data().referBy.filter((data) => {
            return data.name === docSnap1.data().displayName;
          });
          await updateDoc(doc(db, "contestant", "SoolaimanG1"), {
            referBy: filter,
          });
        })
        .then(() => {
          toast.success("Successfully added");
        })
        .catch((err) => {
          toast.error("Something went wrong");
        });
    }
  };

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
            <div className="reward_one">
              <div className="reward_two">
                <div className="reward_two_one">
                  <h3>Spread the word and earn rewards</h3>
                  <p>
                    We are excited to announce our referral program to reward
                    our users for sharing our platform with their friends and
                    family. By referring seven people using your unique referral
                    link, you'll receive a $5 credit to your account.
                  </p>
                  <p>
                    We believe that our platform can offer immense value to many
                    individuals, and we're counting on you to help us grow our
                    community. Simply share your unique referral link with your
                    network and encourage them to sign up to get started.
                  </p>
                  <p>
                    Thank you for your continued support, and please let us know
                    if you have any questions or concerns.
                  </p>
                </div>
                <div className="reward_share_link">
                  <strong>Share your referral link</strong>
                  <div className="reward_share_link_one">
                    <div className="reward_share_link_two">
                      <p>{referralLink}</p>
                      <button onClick={copyLink}>Copy</button>
                    </div>
                    <div className="reward_share_link_icons">
                      {shareIcons.map((data) => (
                        <a
                          href={
                            data.name === "Twitter"
                              ? `https://twitter.com/intent/tweet?url=${referralLink}&text=${encodeURI(
                                  "Join this website and earn!"
                                )}`
                              : data.name === "WhatsApp"
                              ? `https://web.whatsapp.com/send?text=Join this website and earn ${referralLink}`
                              : "https://instagram.com/"
                          }
                          target="_blank"
                          key={data.id}
                          className="reward_share_link_three"
                        >
                          {data.icon}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="referrals_list">
                  <h3>Referrals</h3>
                  {filter.length < 1 ? (
                    <NoData
                      value={
                        "You have'nt refer anybody yet(Your Referrals will appear here!)"
                      }
                    />
                  ) : (
                    filter?.map((data) => (
                      <div key={data.id} className="referrals_list_one">
                        <p>{data.email}</p>
                        <button
                          className={
                            data.completeSignUp
                              ? "referral_complete"
                              : "referral_pending"
                          }
                        >
                          {data.completeSignUp ? "Completed" : "Pending"}
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
              <div className="reward_three">
                <div className="p-md referral_stats">
                  <h4>Referrals Statistic</h4>
                  <div className="referral_stats_one">
                    <div className="referral_stats_one_one">
                      <strong>Total Invited</strong>
                      <p>{filter.length}</p>
                    </div>
                    <div className="referral_stats_one_one">
                      <strong>Completed</strong>
                      <p>{completed.length}</p>
                    </div>
                    <div className="referral_stats_one_one">
                      <strong>Potential Earning</strong>
                      <p>
                        ${completed.length > 0 ? completed.length * 0.7 : 0}
                      </p>
                    </div>
                    <button onClick={moveToBalance} className="btn-fill">
                      Move to balance
                    </button>
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

export default Reward;
