import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  height: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
  overflow: "hidden",
  border: "2px solid #000c99",
};

export default function TransitionsModal({ setIsChecked }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <p onClick={handleOpen}>
        By clicking you are accepting out Terms and Condition
      </p>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <div className="termandcondition">
              <h1>Terms and Conditions for Virtual Number and VPN Log Sales</h1>
              <p>
                Welcome to our website that sells virtual numbers and VPN logs.
                These Terms and Conditions outline the rules and regulations for
                the use of our website.
              </p>

              <h2>1. Acceptance of Terms</h2>
              <p>
                By accessing and using our website, you agree to these Terms and
                Conditions. If you do not agree with any of the terms, please do
                not use our website.
              </p>

              <h2>2. Changes to Terms</h2>
              <p>
                We reserve the right to modify, amend, or update these Terms and
                Conditions at any time, and without prior notice. Any changes
                will be effective immediately upon posting on our website. Your
                continued use of our website after any modifications indicates
                your acceptance of the changes.
              </p>

              <h2>3. Use of the Website</h2>
              <p>
                You agree to use our website for lawful purposes only and in a
                manner that does not infringe upon the rights of any third
                party. You also agree not to use our website to:
              </p>
              <ul>
                <li>
                  Upload, post, email, or otherwise transmit any content that is
                  unlawful, harmful, threatening, abusive, harassing,
                  defamatory, vulgar, obscene, libelous, invasive of another's
                  privacy, hateful, or racially, ethnically or otherwise
                  objectionable;
                </li>
                <li>
                  Impersonate any person or entity, including, but not limited
                  to, our company, our employees, or any other third party;
                </li>
                <li>
                  Falsely state or misrepresent your affiliation with a person
                  or entity;
                </li>
                <li>
                  Upload, post, email or otherwise transmit any content that
                  infringes any patent, trademark, trade secret, copyright or
                  other proprietary rights of any party;
                </li>
                <li>
                  Upload, post, email, or otherwise transmit any unsolicited or
                  unauthorized advertising, promotional materials, "junk mail,"
                  "spam," "chain letters," "pyramid schemes," or any other form
                  of solicitation;
                </li>
                <li>
                  Upload, post, email, or otherwise transmit any material that
                  contains software viruses or any other computer code, files or
                  programs designed to interrupt, destroy or limit the
                  functionality of any computer software or hardware or
                  telecommunications equipment;
                </li>
                <li>
                  Interfere with or disrupt our website or servers or networks
                  connected to our website, or disobey any requirements,
                  procedures, policies, or regulations of networks connected to
                  our website;
                </li>
                <li>
                  Collect or store personal data about other users without their
                  consent; or
                </li>
                <li>
                  Violate any applicable local, state, national or international
                  law.
                </li>
              </ul>

              <h2>4. Product Information</h2>
              <p>
                We make every effort to ensure that the product information on
                our website is accurate and up-to-date. However, we do not
                warrant or guarantee the accuracy, completeness, or reliability
                of any information on our website, including product
                descriptions, pricing, availability, or any other content. We
                reserve the right to correct any errors, inaccuracies, or
                omissions and to change or update information at any time
                without prior notice.
              </p>

              <h2>5. Product Sales</h2>
              <p>
                We offer virtual numbers and VPN logs for sale on our website.
              </p>
              <p>All sales of products on our website are final. We do not</p>

              <div className="acceptBtn">
                <button
                  onClick={() => {
                    setIsChecked(true);
                    handleClose();
                  }}
                  className="btn-fill"
                >
                  I accept
                </button>
                <button onClick={handleClose} className="btn-outline">
                  I do not accept
                </button>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
