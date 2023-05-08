import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Modal from "@mui/material/Modal";
import { IconButton, Tooltip } from "@mui/material";
import { FiSearch } from "react-icons/fi";
import { useEffect, useState } from "react";
import { MostSearch } from "../data";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { NoData } from "./history";

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
  const [hot, setHot] = useState([]);
  const [showQuery, setShowQuery] = useState([]);

  const handleChipClick = (id) => {
    const find = MostSearch.find((data) => {
      return data.id === id ? data.value : "";
    });

    setQuery(find.value);
  };

  useEffect(() => {
    const getQuery = async () => {
      const docRef = doc(db, "HotNumbers", "SoolaimanG1");
      const docSnap = await getDoc(docRef);

      setHot(docSnap.data().HotNumbers);
    };

    getQuery();
  }, []);

  useEffect(() => {
    setShowQuery(
      hot.filter((data) => {
        return (
          data.country.toLowerCase() == query.toLowerCase() ||
          data.phoneNumber == query ||
          data.email.toLowerCase() == query.toLowerCase() ||
          data.expires == query ||
          data.price == query
        );
      })
    );
  }, [query]);

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
                <div className="query_one_one">
                  <table>
                    <thead className="query_table_head">
                      <tr>
                        <th>Country</th>
                        <th>Created On</th>
                        <th>Email</th>
                        <th>Expires</th>
                        <th>Price($)</th>
                        <th>Buy</th>
                      </tr>
                    </thead>
                    <tbody className="query_table_head add_to_query">
                      {showQuery.length < 1 ? (
                        <NoData value="No Result" />
                      ) : (
                        showQuery.map((row) => (
                          <tr key={row.id}>
                            <td>{row.country}</td>
                            <td>{row.createdOn}</td>
                            <td>
                              {row.email.length > 10
                                ? row.email.slice(0, 10) + "***"
                                : row.email}
                            </td>
                            <td>{row.expires}</td>
                            <td>{row.price}</td>
                            <button className="query_buy">Buy</button>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
