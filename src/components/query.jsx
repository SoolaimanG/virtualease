import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Modal from "@mui/material/Modal";
import { IconButton, Tooltip } from "@mui/material";
import { FiSearch } from "react-icons/fi";
import { useState } from "react";
import { MostSearch } from "../data";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
};

export default function Query() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [query, setQuery] = useState("");

  const handleChipClick = (id) => {
    const find = MostSearch.find((data) => {
      return data.id === id ? data.value : "";
    });

    setQuery(find.value);
  };

  return (
    <div>
      <Tooltip title="Search" placement="bottom">
        <IconButton onClick={handleOpen}>
          <FiSearch className="mui_svg" />
        </IconButton>
      </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="query_modal">
            <div className="query_modal_one">
              <form className="form_inside_div" action="">
                <div className="query_form">
                  <FiSearch className="mui_svg" />
                  <input
                    placeholder="Search by Number,Country,Area Code,Type,Vpn"
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </div>
              </form>
              <div className="p-md query_modal_two">
                <h4>Most Search</h4>
                <div className="most_searched">
                  {MostSearch.map((search) => (
                    <div
                      key={search.id}
                      onClick={() => {
                        handleChipClick(search.id);
                      }}
                      className="most_search_one"
                    >
                      <Chip label={search.value} clickable />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
